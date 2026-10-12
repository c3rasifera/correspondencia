"""Servidor sense dependències. Publicar darrere d'un proxy HTTPS."""
import argparse
import csv
import json
import os
from pathlib import Path
import re
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit
import mimetypes

ROOT = Path(__file__).resolve().parent
DB = Path(os.environ.get('CORRESPONDENCIA_DB', str(ROOT / 'private' / 'inscripcions.sqlite3')))
CONTACT = os.environ.get('PRIVACY_EMAIL', 'hola@gemmacalmet.cat')
CONSENT_VERSION = 'nadal-2026-v1'
CONSENT_TEXT = 'He llegit la política de privacitat i accepto rebre informació per correu electrònic sobre Correspondència de Nadal 2026.'
LOCK = threading.Lock()
ATTEMPTS = {}
PUBLIC = {'index.html', 'nadal.css', 'nadal.js', 'styles.css', 'script.js', 'privacitat.html', 'avis-legal.html', 'estiu-2026/index.html'}

def connect():
    DB.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    db = sqlite3.connect(DB)
    db.execute('CREATE TABLE IF NOT EXISTS registrations (email TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL, consent_version TEXT NOT NULL, consent_text TEXT NOT NULL)')
    db.commit()
    os.chmod(DB, 0o600)
    return db

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Evita registrar correus, URL i adreces IP.

    def send(self, status, body, content_type='application/json; charset=utf-8'):
        if isinstance(body, dict):
            body = json.dumps(body).encode()
        elif isinstance(body, str):
            body = body.encode()
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'no-store' if content_type.startswith('application/json') else 'no-cache')
        self.send_header('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'self'; frame-src https://docs.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path).strip('/')
        if path == 'estiu-2026':
            path = 'estiu-2026/index.html'
        path = path or 'index.html'
        if path not in PUBLIC and not (path.startswith('assets/') and Path(path).name in {p.name for p in (ROOT / 'assets').iterdir()}):
            return self.send(404, {'error': 'No trobat'})
        file = (ROOT / path).resolve()
        if not file.is_relative_to(ROOT) or not file.is_file():
            return self.send(404, {'error': 'No trobat'})
        content = file.read_bytes()
        self.send(200, content, mimetypes.guess_type(file)[0] or 'application/octet-stream')

    def do_POST(self):
        self.send(410, {'error': 'La captació es gestiona amb Google Forms'})

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['serve', 'export', 'delete'])
    parser.add_argument('--email')
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--host', default='127.0.0.1')
    args = parser.parse_args()
    if args.action == 'serve':
        ThreadingHTTPServer((args.host, args.port), Handler).serve_forever()
        return
    with connect() as db:
        if args.action == 'export':
            import sys
            writer = csv.writer(sys.stdout)
            writer.writerow(['email', 'name', 'created_at', 'consent_version', 'consent_text'])
            for row in db.execute('SELECT * FROM registrations ORDER BY created_at'):
                writer.writerow(["'" + value if value.startswith(('=', '+', '-', '@', '\t', '\r')) else value for value in row])
            return
        if args.action == 'delete':
            if not args.email:
                parser.error('--email és obligatori')
            db.execute('DELETE FROM registrations WHERE email = ?', (args.email.strip().lower(),))
            return
    ThreadingHTTPServer((args.host, args.port), Handler).serve_forever()

if __name__ == '__main__':
    main()

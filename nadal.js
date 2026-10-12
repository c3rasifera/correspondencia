const historic = new Set(['#compra', '#inici', '#que-rebras', '#com-funciona']);
if (historic.has(location.hash)) location.replace('/estiu-2026/' + location.hash);

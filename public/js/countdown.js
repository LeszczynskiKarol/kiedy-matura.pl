/* =====================================================================
   kiedy-matura.pl — warstwa interaktywna
   ---------------------------------------------------------------------
   Cała TREŚĆ jest już w HTML z builda: kalendarz, oś czasu, lista
   przedmiotów i wszystkie fazy wraz z bohaterami. Ten skrypt tylko:
     • tyka licznikiem,
     • przełącza widoczną fazę (bo build się starzeje),
     • obsługuje wehikuł czasu, wyrocznię, kalendarz i wybór przedmiotów.
   Dzięki temu strona ma sens bez JS, a CLS zostaje przy zerze.
   ===================================================================== */
(() => {
'use strict';

const KM = window.__KM;
if (!KM) return;

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const MS_DAY = 86400000;
const DOW = ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'];
const MON = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'];

function dt(s) {
  const [d, t = '00:00'] = s.split('T');
  const [y, m, dd] = d.split('-').map(Number);
  const [h, mi] = t.split(':').map(Number);
  return new Date(y, m - 1, dd, h, mi, 0, 0);
}
const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const daysBetween = (a, b) => Math.round((midnight(b) - midnight(a)) / MS_DAY);
const fmtDate  = (d) => `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
const fmtShort = (d) => `${d.getDate()} ${MON[d.getMonth()]}`;
const capital  = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function plural(n, one, few, many) {
  const a = Math.abs(n), t = a % 10, h = a % 100;
  if (a === 1) return one;
  if (t >= 2 && t <= 4 && (h < 12 || h > 14)) return few;
  return many;
}
const dniWord = (n) => plural(n, 'dzień', 'dni', 'dni');

const START   = dt(KM.start);
const LAST    = dt(KM.last);
const RESULTS = dt(KM.results);
const YEAR_A  = dt(KM.yearStart);

/* ================= FAZY ================= */

function phaseForDays(d, now) {
  if (d < 0) return KM.phases.find(p => p.id === (now <= LAST ? 'sesja' : 'wolnosc'));
  return KM.phases.find(p => d <= p.max && d >= p.min) || KM.phases[0];
}

let pinned = null;      // faza przypięta wehikułem (null = tryb „teraz")
let shownId = null;

function showPhase(id) {
  if (id === shownId) return;
  const ph = KM.phases.find(p => p.id === id);
  /* Stan „trwa sesja" nie ma własnego bloku w HTML — pożycza tekst od
     ostatniej fazy, ale kolory ma swoje. */
  const domId = KM.travelIds.includes(id) ? id : 'dzis';
  $$('.phase-el').forEach(el => { el.hidden = el.dataset.phase !== domId; });
  if (ph) {
    document.documentElement.style.setProperty('--c1', ph.c1);
    document.documentElement.style.setProperty('--c2', ph.c2);
  }
  shownId = id;
}

/* ================= ODLICZANIE ================= */

function tick() {
  const now  = new Date();
  const diff = START - now;
  const past = diff < 0;
  const d    = Math.max(0, daysBetween(now, START));

  if (past) {
    const toEnd = daysBetween(now, LAST);
    if (toEnd >= 0) {
      $('#days').textContent     = toEnd;
      $('#daysWord').textContent = dniWord(toEnd) + ' do końca sesji';
    } else {
      const toRes = Math.max(0, daysBetween(now, RESULTS));
      $('#days').textContent     = toRes;
      $('#daysWord').textContent = dniWord(toRes) + ' do wyników';
    }
  } else {
    $('#days').textContent     = d;
    $('#daysWord').textContent = dniWord(d) + ' do matury';
  }

  const rest = Math.abs(diff) % MS_DAY;
  $('#hh').textContent = String(Math.floor(rest / 3600000)).padStart(2, '0');
  $('#mm').textContent = String(Math.floor(rest / 60000) % 60).padStart(2, '0');
  $('#ss').textContent = String(Math.floor(rest / 1000) % 60).padStart(2, '0');

  if (!pinned) showPhase(phaseForDays(past ? -1 : d, now).id);
}

/* ================= WEHIKUŁ CZASU ================= */

function currentTravelIndex() {
  const now = new Date();
  const d = daysBetween(now, START);
  const p = phaseForDays(START - now < 0 ? -1 : d, now);
  const i = KM.travelIds.indexOf(p.id);
  return i < 0 ? KM.travelIds.length - 1 : i;
}

function initTimewarp() {
  const range = $('#twRange'), nowBtn = $('#twNow');
  if (!range) return;
  const ticks = $$('#twTicks span');

  const paint = (i) => ticks.forEach((s, k) => s.classList.toggle('on', k === i));
  range.value = currentTravelIndex();
  paint(+range.value);

  range.addEventListener('input', () => {
    const i = +range.value;
    pinned = (i === currentTravelIndex()) ? null : KM.travelIds[i];
    showPhase(KM.travelIds[i]);
    paint(i);
    nowBtn.hidden = !pinned;
  });

  nowBtn.addEventListener('click', () => {
    pinned = null; nowBtn.hidden = true;
    const i = currentTravelIndex();
    range.value = i; paint(i); tick();
  });
}

/* ================= WYROCZNIA ================= */

function initOracle() {
  const stage = $('#stage'), out = $('#oracle');
  if (!stage) return;
  let pool = [];
  const fire = () => {
    if (!pool.length) pool = KM.oracle.slice().sort(() => Math.random() - .5);
    stage.classList.remove('is-poked');
    void stage.offsetWidth;
    stage.classList.add('is-poked');
    setTimeout(() => stage.classList.remove('is-poked'), 600);
    out.classList.remove('show');
    setTimeout(() => { out.textContent = '„' + pool.pop() + '"'; out.classList.add('show'); }, 140);
  };
  stage.addEventListener('click', fire);
  stage.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
  });
}

/* ================= PASEK ROKU ================= */

function initYearbar() {
  const total = START - YEAR_A;
  const done  = Math.min(Math.max(Date.now() - YEAR_A, 0), total);
  const pct   = total > 0 ? (done / total) * 100 : 100;
  requestAnimationFrame(() => {
    $('#ybFill').style.width = pct.toFixed(1) + '%';
    $('#ybKnob').style.left  = pct.toFixed(1) + '%';
  });
  $('#ybPct').textContent = pct < 1 ? 'jeszcze nie wystartował'
                                    : Math.round(pct) + '% roku maturalnego za Tobą';
}

/* ================= ODŚWIEŻENIE DAT WZGLĘDNYCH =================
   HTML niesie wartości z czasu builda. Gdy build się zestarzeje, te
   podpisy byłyby nieaktualne — poprawiamy je w miejscu (ta sama długość
   tekstu, więc bez przeskoku layoutu). */

function refreshRelative() {
  const now = new Date();
  $$('[data-in-for]').forEach(el => {
    const n = daysBetween(now, dt(el.dataset.inFor));
    el.textContent = n < 0 ? `${Math.abs(n)} ${dniWord(n)} temu`
                   : n === 0 ? 'dzisiaj' : `za ${n} ${dniWord(n)}`;
    el.closest('.tl')?.classList.toggle('past', n < 0);
  });
  $$('[data-count-for]').forEach(el => {
    const n = daysBetween(now, dt(el.dataset.countFor));
    el.textContent = n > 0 ? `za ${n} ${dniWord(n)}`
                   : n === 0 ? 'to dzisiaj' : `${Math.abs(n)} ${dniWord(n)} temu`;
  });
}

/* ================= KALENDARZ ================= */

function initCalendar() {
  const grid = $('#calGrid');
  if (!grid) return;
  grid.addEventListener('click', ev => {
    const c = ev.target.closest('.cell[data-d]');
    if (!c) return;
    $$('#calGrid .cell').forEach(x => x.classList.remove('sel'));
    c.classList.add('sel');
    $$('.day-panel').forEach(p => { p.hidden = p.dataset.day !== c.dataset.d; });
  });
}

/* ================= TWOJA MATURA ================= */

const KEY = 'km-subjects';
const loadPicked = () => {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return new Set(); }
};
const savePicked = (set) => {
  try { localStorage.setItem(KEY, JSON.stringify([...set])); } catch {}
};

function initPicker() {
  const grid = $('#subjectGrid');
  if (!grid) return;

  const picked = loadPicked();
  $$('#subjectGrid input').forEach(i => { if (picked.has(i.value)) i.checked = true; });

  const quick = [
    e => e.core,
    e => e.core || (e.s === 'Język angielski' && e.lvl === 'PR'),
    e => e.core || ['Biologia', 'Chemia'].includes(e.s),
    e => e.core || (e.s === 'Matematyka' && e.lvl === 'PR') || e.s === 'Fizyka',
    e => e.core || (e.s === 'Język polski' && e.lvl === 'PR') || e.s === 'Historia' || e.s === 'Wiedza o społeczeństwie',
  ];

  const sync = () => {
    const set = new Set($$('#subjectGrid input:checked').map(i => i.value));
    savePicked(set); renderMine(set);
  };

  grid.addEventListener('change', sync);
  $('#quickPick').addEventListener('click', ev => {
    const b = ev.target.closest('[data-q]'); if (!b) return;
    const f = quick[+b.dataset.q];
    $$('#subjectGrid input').forEach(inp => { inp.checked = f(KM.exams[+inp.value]); });
    sync();
  });
  $('#clearPick').addEventListener('click', () => {
    $$('#subjectGrid input').forEach(i => i.checked = false); sync();
  });

  renderMine(picked);
}

function renderMine(set) {
  const box = $('#mine');
  const sel = [...set].map(i => KM.exams[+i]).filter(Boolean)
                      .sort((a, b) => dt(`${a.d}T${a.t}`) - dt(`${b.d}T${b.t}`));
  if (!sel.length) { box.hidden = true; return; }
  box.hidden = false;

  const now = new Date();
  const f = dt(`${sel[0].d}T${sel[0].t}`);
  const lastEx = sel[sel.length - 1];
  const l = dt(`${lastEx.d}T${lastEx.t}`);
  const span = daysBetween(f, l) + 1;
  const inTxt = (n) => n > 0 ? `za ${n} ${dniWord(n)}` : n === 0 ? 'dzisiaj' : `${Math.abs(n)} ${dniWord(n)} temu`;

  $('#mineFirst').textContent   = `${sel[0].s} · ${sel[0].lvl}`;
  $('#mineFirstIn').textContent = `${capital(DOW[f.getDay()])}, ${fmtShort(f)}, ${sel[0].t} — ${inTxt(daysBetween(now, f))}`;
  $('#mineLast').textContent    = `${lastEx.s} · ${lastEx.lvl}`;
  $('#mineLastIn').textContent  = `${capital(DOW[l.getDay()])}, ${fmtShort(l)}, ${lastEx.t} — ${inTxt(daysBetween(now, l))}`;
  $('#mineSpan').textContent    = `${span} ${dniWord(span)}`;
  $('#mineCount').textContent   = `${sel.length} ${plural(sel.length, 'egzamin', 'egzaminy', 'egzaminów')} pisemne — od pierwszego do ostatniego`;
}

/* ================= START ================= */

function boot() {
  initTimewarp();
  initOracle();
  initYearbar();
  initPicker();
  initCalendar();
  refreshRelative();
  tick();
  setInterval(tick, 1000);
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();

})();

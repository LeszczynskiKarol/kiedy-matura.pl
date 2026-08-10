/* =====================================================================
   kiedy-matura.pl — BOHATEROWIE
   SVG budowane w czasie builda (Astro) i wstrzykiwane do HTML — dzięki
   temu postać jest w źródle strony, a nie dorysowywana JS-em.
   ===================================================================== */

const M = (() => {
  const BODY = 'M110 32 C148 32 172 58 172 98 C172 142 146 176 110 176 C74 176 48 142 48 98 C48 58 72 32 110 32 Z';
  const INK = '#14121C';

  /* ---------- części wspólne ---------- */

  const shadow = () =>
    `<ellipse class="mc-shadow" cx="110" cy="198" rx="50" ry="8"/>`;

  const feet = (dx = 0) =>
    `<ellipse cx="${92 + dx}" cy="177" rx="13" ry="8" fill="${INK}" opacity=".9"/>
     <ellipse cx="${130 - dx}" cy="177" rx="13" ry="8" fill="${INK}" opacity=".9"/>`;

  const arms = (kind = 'down') => {
    if (kind === 'up')
      return `<path class="mc-limb" d="M54 118 C38 108 32 92 34 76"/>
              <path class="mc-limb" d="M166 118 C182 108 188 92 186 76"/>`;
    if (kind === 'oneUp')
      return `<path class="mc-limb" d="M54 120 C40 126 32 138 32 150"/>
              <path class="mc-limb" d="M166 118 C182 108 188 92 186 78"/>`;
    return `<path class="mc-limb" d="M54 120 C40 126 32 138 32 150"/>
            <path class="mc-limb" d="M166 120 C180 126 188 138 188 150"/>`;
  };

  const body = (id) =>
    `<path d="${BODY}" fill="url(#g${id})" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
     <ellipse cx="84" cy="70" rx="21" ry="13" fill="#fff" opacity=".16" transform="rotate(-22 84 70)"/>`;

  const blush = (o = .55) =>
    `<ellipse cx="72" cy="122" rx="11" ry="7" fill="#FF6B8B" opacity="${o}"/>
     <ellipse cx="148" cy="122" rx="11" ry="7" fill="#FF6B8B" opacity="${o}"/>`;

  /* ---------- oczy ---------- */

  const eye = {
    dots: `<g class="mc-blink"><circle cx="88" cy="100" r="7.5" fill="${INK}"/><circle cx="132" cy="100" r="7.5" fill="${INK}"/>
           <circle cx="90.5" cy="97.5" r="2.4" fill="#fff"/><circle cx="134.5" cy="97.5" r="2.4" fill="#fff"/></g>`,

    closed: `<path class="mc-line" d="M77 100 q11 11 22 0"/><path class="mc-line" d="M121 100 q11 11 22 0"/>`,

    happy: `<path class="mc-line" d="M77 104 q11 -13 22 0"/><path class="mc-line" d="M121 104 q11 -13 22 0"/>`,

    wide: `<g class="mc-blink">
             <ellipse cx="88" cy="99" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="3"/>
             <ellipse cx="132" cy="99" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="3"/>
             <circle cx="89" cy="102" r="6" fill="${INK}"/><circle cx="133" cy="102" r="6" fill="${INK}"/>
           </g>`,

    tired: `<g class="mc-blink">
              <ellipse cx="88" cy="101" rx="12" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/>
              <ellipse cx="132" cy="101" rx="12" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/>
              <circle cx="88" cy="103" r="5.5" fill="${INK}"/><circle cx="132" cy="103" r="5.5" fill="${INK}"/>
            </g>
            <path class="mc-line" d="M76 90 q12 -6 24 -1"/><path class="mc-line" d="M120 89 q12 -5 24 1"/>`,

    spiral: `<ellipse cx="88" cy="99" rx="14" ry="15" fill="#fff" stroke="${INK}" stroke-width="3"/>
             <ellipse cx="132" cy="99" rx="14" ry="15" fill="#fff" stroke="${INK}" stroke-width="3"/>
             <path class="mc-spin" style="transform-origin:88px 99px" d="M88 90 a9 9 0 1 1 -8.5 9.4 a6 6 0 1 1 6.4 -6" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
             <path class="mc-spin" style="transform-origin:132px 99px" d="M132 90 a9 9 0 1 1 -8.5 9.4 a6 6 0 1 1 6.4 -6" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`,

    focus: `<g class="mc-blink">
              <ellipse cx="88" cy="100" rx="12" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
              <ellipse cx="132" cy="100" rx="12" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
              <circle cx="91" cy="101" r="5.5" fill="${INK}"/><circle cx="135" cy="101" r="5.5" fill="${INK}"/>
            </g>`,

    shades: `<path d="M62 92 h96 v6 h-96 z" fill="${INK}"/>
             <rect x="62" y="90" width="42" height="30" rx="12" fill="${INK}"/>
             <rect x="116" y="90" width="42" height="30" rx="12" fill="${INK}"/>
             <path d="M70 98 l14 14" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>
             <path d="M124 98 l14 14" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>`,
  };

  /* ---------- usta ---------- */

  const mouth = {
    smile: `<path class="mc-line" d="M96 130 q14 14 28 0"/>`,
    grin: `<path d="M92 128 q18 22 36 0 z" fill="${INK}"/><path d="M99 128 h22" stroke="#fff" stroke-width="3" opacity=".5"/>`,
    flat: `<path class="mc-line" d="M98 132 h24"/>`,
    wobble: `<path class="mc-line" d="M92 133 q7 -9 14 0 q7 9 14 0"/>`,
    yawn: `<ellipse cx="110" cy="134" rx="13" ry="17" fill="${INK}"/><ellipse cx="110" cy="144" rx="8" ry="6" fill="#FF6B8B"/>`,
    small: `<ellipse cx="110" cy="132" rx="6" ry="7" fill="${INK}"/>`,
    scream: `<ellipse cx="110" cy="137" rx="16" ry="19" fill="${INK}"/><ellipse cx="110" cy="149" rx="9" ry="6" fill="#FF6B8B"/>`,
    smirk: `<path class="mc-line" d="M96 131 q16 10 26 -3"/>`,
  };

  /* ---------- rekwizyty ---------- */

  const props = {
    nightcap: `<path d="M62 52 C74 22 146 22 158 52 C140 44 80 44 62 52 Z" fill="#6E7BFF" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
               <path d="M158 52 C176 40 184 24 170 14" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
               <circle cx="168" cy="12" r="9" fill="#FFF2C2" stroke="${INK}" stroke-width="3"/>`,

    zzz: `<g class="mc-float-slow" fill="#fff" opacity=".85" font-family="var(--ff-display)" font-weight="700">
            <text x="176" y="60" font-size="17">z</text>
            <text x="188" y="42" font-size="13">z</text>
            <text x="196" y="28" font-size="10">z</text>
          </g>`,

    plan: `<g transform="rotate(-8 150 130)">
             <rect x="128" y="106" width="52" height="64" rx="6" fill="#FFF8EC" stroke="${INK}" stroke-width="3.2"/>
             <rect x="136" y="116" width="36" height="5" rx="2.5" fill="#FF7A59"/>
             <rect x="136" y="127" width="28" height="5" rx="2.5" fill="#4FB3FF"/>
             <rect x="136" y="138" width="34" height="5" rx="2.5" fill="#7CE0C3"/>
             <rect x="136" y="149" width="22" height="5" rx="2.5" fill="#FFD166"/>
           </g>
           <g transform="rotate(24 56 118)">
             <rect x="46" y="96" width="14" height="44" rx="5" fill="#FF7A59" stroke="${INK}" stroke-width="3"/>
             <path d="M46 134 h14 l-7 12 z" fill="${INK}"/>
           </g>`,

    blanket: `<path d="M34 116 C60 100 160 100 186 116 C190 150 176 182 110 182 C44 182 30 150 34 116 Z"
                    fill="#5C6BD8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
              <path d="M40 132 h140 M40 148 h140" stroke="${INK}" stroke-width="2.2" opacity=".35"/>
              <g transform="translate(150 88) rotate(10)">
                <path d="M0 0 h30 a5 5 0 0 1 5 5 v22 a5 5 0 0 1 -5 5 h-30 z" fill="#FFF8EC" stroke="${INK}" stroke-width="3"/>
                <path d="M35 8 a9 9 0 0 1 0 18" fill="none" stroke="${INK}" stroke-width="3"/>
                <path class="mc-steam" d="M8 -6 q6 -8 0 -16" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
                <path class="mc-steam" style="animation-delay:-1.2s" d="M20 -6 q6 -8 0 -16" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
              </g>`,

    bowtie: `<path d="M92 150 l-22 -12 v24 z" fill="#FF3D71" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
             <path d="M128 150 l22 -12 v24 z" fill="#FF3D71" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
             <circle cx="110" cy="150" r="8" fill="#FF6B8B" stroke="${INK}" stroke-width="3"/>
             <g class="mc-sparkle" fill="#FFF2C2">
               <path d="M186 40 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z"/>
               <path d="M26 62 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" opacity=".8"/>
               <path d="M172 152 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" opacity=".7"/>
             </g>`,

    paper: `<g transform="rotate(6 156 128)">
              <rect x="130" y="98" width="56" height="70" rx="5" fill="#FFF8EC" stroke="${INK}" stroke-width="3.2"/>
              <rect x="139" y="110" width="38" height="4.5" rx="2" fill="${INK}" opacity=".35"/>
              <rect x="139" y="121" width="30" height="4.5" rx="2" fill="${INK}" opacity=".35"/>
              <rect x="139" y="132" width="34" height="4.5" rx="2" fill="${INK}" opacity=".35"/>
              <path d="M139 150 q10 -10 18 0 q8 10 18 -4" fill="none" stroke="#2F5BFF" stroke-width="3" stroke-linecap="round"/>
            </g>
            <g transform="rotate(-20 46 116)">
              <rect x="40" y="92" width="12" height="40" rx="4" fill="#2F5BFF" stroke="${INK}" stroke-width="3"/>
              <path d="M40 128 h12 l-6 12 z" fill="${INK}"/>
            </g>`,

    phone: `<g transform="rotate(-10 152 132)">
              <rect x="134" y="106" width="38" height="60" rx="8" fill="${INK}"/>
              <rect x="138" y="112" width="30" height="48" rx="4" fill="#7DD3FC"/>
              <rect x="142" y="118" width="22" height="4" rx="2" fill="#fff" opacity=".8"/>
              <rect x="142" y="127" width="16" height="4" rx="2" fill="#fff" opacity=".6"/>
              <rect x="142" y="136" width="20" height="4" rx="2" fill="#fff" opacity=".6"/>
            </g>
            <ellipse cx="152" cy="130" rx="34" ry="34" fill="#7DD3FC" opacity=".22"/>
            <path class="mc-float-slow" d="M40 62 h34 a5 5 0 0 1 5 5 v20 a5 5 0 0 1 -5 5 h-22 l-10 10 v-10 h-2 a5 5 0 0 1 -5 -5 v-20 a5 5 0 0 1 5 -5 z"
                  fill="#FFF8EC" stroke="${INK}" stroke-width="3"/>
            <text x="49" y="83" font-size="15" font-weight="700" fill="${INK}" font-family="var(--ff-display)">jeszcze 5 min</text>`,

    calface: `<rect x="60" y="66" width="100" height="88" rx="10" fill="#FFF8EC" stroke="${INK}" stroke-width="3.5"/>
              <rect x="60" y="66" width="100" height="22" rx="10" fill="#FF7A59" stroke="${INK}" stroke-width="3.5"/>
              <path d="M82 62 v14 M138 62 v14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
              <g fill="${INK}" opacity=".22">
                <rect x="70" y="96" width="14" height="10" rx="3"/><rect x="90" y="96" width="14" height="10" rx="3"/>
                <rect x="110" y="96" width="14" height="10" rx="3"/><rect x="130" y="96" width="14" height="10" rx="3"/>
                <rect x="70" y="112" width="14" height="10" rx="3"/><rect x="130" y="112" width="14" height="10" rx="3"/>
                <rect x="70" y="128" width="14" height="10" rx="3"/><rect x="90" y="128" width="14" height="10" rx="3"/>
              </g>
              <g transform="translate(0 -2)">
                <circle cx="97" cy="117" r="6" fill="${INK}"/><circle cx="127" cy="117" r="6" fill="${INK}"/>
                <path d="M96 136 q14 12 28 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
              </g>`,

    coffee: `<g transform="translate(140 104) rotate(8)">
               <path d="M0 0 h34 a4 4 0 0 1 4 4 v34 a10 10 0 0 1 -10 10 h-22 a10 10 0 0 1 -10 -10 v-34 a4 4 0 0 1 4 -4 z"
                     fill="#FFF8EC" stroke="${INK}" stroke-width="3.2"/>
               <path d="M38 10 a10 10 0 0 1 0 20" fill="none" stroke="${INK}" stroke-width="3.2"/>
               <path d="M2 14 h34 v22 a8 8 0 0 1 -8 8 h-18 a8 8 0 0 1 -8 -8 z" fill="#5A3A22"/>
               <path class="mc-steam" d="M8 -8 q7 -10 0 -20" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" opacity=".75"/>
               <path class="mc-steam" style="animation-delay:-1.4s" d="M24 -8 q7 -10 0 -20" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" opacity=".75"/>
             </g>
             <g class="mc-sparkle" stroke="#FFE66D" stroke-width="4" stroke-linecap="round">
               <path d="M32 66 v-14"/><path d="M20 82 h-14"/><path d="M22 70 l-10 -10"/>
             </g>`,

    tabs: `<g class="mc-float-slow">
             <g transform="rotate(-12 42 74)">
               <rect x="14" y="52" width="56" height="42" rx="6" fill="#FFF8EC" stroke="${INK}" stroke-width="3"/>
               <rect x="14" y="52" width="56" height="11" rx="6" fill="#FF7A59" stroke="${INK}" stroke-width="3"/>
               <rect x="22" y="72" width="34" height="4" rx="2" fill="${INK}" opacity=".3"/>
               <rect x="22" y="81" width="24" height="4" rx="2" fill="${INK}" opacity=".3"/>
             </g>
           </g>
           <g class="mc-float-slow" style="animation-delay:-2s">
             <g transform="rotate(14 176 78)">
               <rect x="150" y="56" width="56" height="42" rx="6" fill="#FFF8EC" stroke="${INK}" stroke-width="3"/>
               <rect x="150" y="56" width="56" height="11" rx="6" fill="#4FB3FF" stroke="${INK}" stroke-width="3"/>
               <rect x="158" y="76" width="34" height="4" rx="2" fill="${INK}" opacity=".3"/>
               <rect x="158" y="85" width="20" height="4" rx="2" fill="${INK}" opacity=".3"/>
             </g>
           </g>`,

    bulb: `<g class="mc-glow-pulse">
             <circle cx="110" cy="26" r="30" fill="#FFE66D" opacity=".28"/>
           </g>
           <path d="M110 4 c14 0 24 10 24 22 0 9 -6 13 -8 20 h-32 c-2 -7 -8 -11 -8 -20 0 -12 10 -22 24 -22 z"
                 fill="#FFE66D" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
           <path d="M96 48 h28 M99 56 h22" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
           <g stroke="#FFE66D" stroke-width="3.6" stroke-linecap="round" class="mc-sparkle">
             <path d="M62 18 l-10 -8"/><path d="M158 18 l10 -8"/><path d="M110 -8 v-8"/>
           </g>`,

    owl: `<path d="M56 66 C64 34 92 26 110 26 C128 26 156 34 164 66 C140 54 80 54 56 66 Z" fill="#8B5CF6" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
          <path d="M62 60 l-8 -26 22 12 z" fill="#8B5CF6" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
          <path d="M158 60 l8 -26 -22 12 z" fill="#8B5CF6" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
          <path d="M110 112 l-9 12 h18 z" fill="#FFB800" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
          <g transform="translate(0 24)">
            <path d="M40 130 q34 -14 68 0 q34 -14 68 0 l0 26 q-34 -12 -68 0 q-34 -12 -68 0 z"
                  fill="#FFF8EC" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
            <path d="M108 130 v26" stroke="${INK}" stroke-width="3"/>
            <path d="M56 140 h34 M56 148 h28 M126 140 h34 M126 148 h28" stroke="${INK}" stroke-width="2.2" opacity=".35"/>
          </g>`,

    exam: `<path d="M74 148 l36 -10 36 10 v34 h-72 z" fill="#FFF8EC" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
           <path d="M110 138 l-14 16 14 12 14 -12 z" fill="#2F5BFF" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
           <g transform="rotate(28 176 116)">
             <rect x="170" y="88" width="12" height="46" rx="4" fill="#2F5BFF" stroke="${INK}" stroke-width="3"/>
             <path d="M170 130 h12 l-6 13 z" fill="${INK}"/>
           </g>
           <g transform="rotate(-6 36 128)">
             <rect x="16" y="106" width="42" height="54" rx="5" fill="#FFF8EC" stroke="${INK}" stroke-width="3"/>
             <rect x="24" y="116" width="26" height="4" rx="2" fill="${INK}" opacity=".3"/>
             <rect x="24" y="126" width="20" height="4" rx="2" fill="${INK}" opacity=".3"/>
             <rect x="24" y="136" width="24" height="4" rx="2" fill="${INK}" opacity=".3"/>
           </g>`,

    freedom: `<path class="mc-limb" d="M166 118 C182 106 190 88 188 70" />
              <path d="M188 70 C188 46 208 40 208 22" fill="none" stroke="${INK}" stroke-width="2.4" opacity=".8"/>
              <ellipse cx="208" cy="8" rx="15" ry="18" fill="#FF6B8B" stroke="${INK}" stroke-width="3"/>
              <path d="M204 24 l4 -6 4 6 z" fill="#FF6B8B" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
              <g class="mc-sparkle" fill="#FFE66D">
                <path d="M30 40 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z"/>
                <path d="M44 138 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" opacity=".75"/>
              </g>`,
  };

  /* ---------- definicje postaci ---------- */

  const CAST = {
    ziewak: {
      name: 'Ziewak', c1: '#8FE3D0', c2: '#3E9E8F',
      parts: (id) => shadow() + props.zzz + feet() + arms('down') + body(id) + props.nightcap +
                     eye.closed + mouth.yawn + blush(.45),
    },
    planista: {
      name: 'Planista', c1: '#9BD9FF', c2: '#5A7BE8',
      parts: (id) => shadow() + feet() + arms('down') + body(id) + eye.happy + mouth.smile + blush() + props.plan,
    },
    kocyk: {
      name: 'Kocyk', c1: '#A9B6FF', c2: '#5A63C8',
      parts: (id) => shadow() + feet() + body(id) + eye.tired + mouth.flat + blush(.4) + props.blanket,
    },
    studniowkowy: {
      name: 'Studniówkowy', c1: '#D4B0FF', c2: '#8B4FD8',
      parts: (id) => shadow() + feet() + arms('up') + body(id) + eye.happy + mouth.grin + blush(.7) + props.bowtie,
    },
    deklarant: {
      name: 'Deklarant', c1: '#FFDD9E', c2: '#D89B3C',
      parts: (id) => shadow() + feet() + arms('oneUp') + body(id) + eye.focus + mouth.smirk + blush(.4) + props.paper,
    },
    prokrastynator: {
      name: 'Prokrastynator', c1: '#BFF0A6', c2: '#4FAE7C',
      parts: (id) => shadow() + feet() + arms('down') + body(id) + eye.dots + mouth.smirk + blush(.45) + props.phone,
    },
    kalendarz: {
      name: 'Kalendarz', c1: '#FFD98A', c2: '#E08A3C',
      parts: (id) => shadow() + feet() + arms('down') + body(id) + props.calface,
    },
    kofeinowy: {
      name: 'Kofeinowy', c1: '#FFC08A', c2: '#E06A3C', shake: true,
      parts: (id) => shadow() + feet() + arms('down') + body(id) + eye.wide + mouth.wobble + blush(.6) + props.coffee,
    },
    panika: {
      name: 'Panika', c1: '#FF9C8A', c2: '#D8375C', shake: true,
      parts: (id) => shadow() + feet() + arms('up') + body(id) + eye.spiral + mouth.scream + blush(.7) + props.tabs,
    },
    przypominacz: {
      name: 'Przypominacz', c1: '#FF8FB0', c2: '#B93BC8',
      parts: (id) => shadow() + feet() + arms('down') + body(id) + eye.wide + mouth.small + blush(.6) + props.bulb,
    },
    sowa: {
      name: 'Sowa', c1: '#B08CFF', c2: '#5B3BC8',
      parts: (id) => shadow() + feet() + body(id) + props.owl + eye.tired + blush(.4),
    },
    maturzysta: {
      name: 'Maturzysta', c1: '#FFE9A0', c2: '#E0A020',
      parts: (id) => shadow() + feet() + body(id) + eye.focus + mouth.flat + blush(.45) + props.exam,
    },
    wolny: {
      name: 'Wolny', c1: '#93EFD0', c2: '#2FA7C8', float: 'high',
      parts: (id) => shadow() + feet(6) + arms('down') + body(id) + eye.shades + mouth.grin + blush(.5) + props.freedom,
    },
  };

  /* ---------- render ---------- */

  function svg(key) {
    const ch = CAST[key] || CAST.ziewak;
    const id = key;
    const cls = ['mascot-svg', ch.shake ? 'is-jittery' : '', ch.float === 'high' ? 'is-drifty' : ''].join(' ').trim();
    return `<svg class="${cls}" viewBox="-14 -12 248 226" role="img" aria-label="Bohater: ${ch.name}">
      <defs>
        <linearGradient id="g${id}" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stop-color="${ch.c1}"/>
          <stop offset="1" stop-color="${ch.c2}"/>
        </linearGradient>
      </defs>
      <g class="mc-bob">${ch.parts(id)}</g>
    </svg>`;
  }

  const nameOf = (key) => (CAST[key] || CAST.ziewak).name;

  return { svg, nameOf, CAST };
})();

export const mascotSvg = (key: string): string => M.svg(key);
export const mascotName = (key: string): string => M.nameOf(key);
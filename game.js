(function () {
'use strict';

/* =====================================================================
   Merge Slimes — HTML5 game for Yandex Games
   ===================================================================== */
var TAU = 6.2832;
var W = 360, H = 600, LEFT = 12, RIGHT = 348, FLOOR = 588, DANGER = 118, DROPY = 66;
var R = [14, 19, 25, 32, 40, 49, 59, 70, 82, 95];
var COL = [['#ff9fbf', '#e0457b'], ['#ffc08a', '#e8782a'], ['#fff08a', '#e0b81f'], ['#b3f08a', '#4fb52a'], ['#8af5d6', '#1fb58f'],
  ['#8ad0ff', '#2a86e0'], ['#b4a8ff', '#5a45e0'], ['#e8a8ff', '#a83fe0'], ['#ff9a9a', '#d63232'], ['#ffe666', '#ff8c00']];

/* ---------- texts ---------- */
var TXT = {
  ru: {
    score: 'Счёт', best: 'Рекорд', coins: 'Монеты', play: '▶ Играть',
    menu: 'Бросай слаймов и соединяй одинаковых — они растут! Дойди до Золотого Короля и не переполни банку.',
    over: 'Банка полна!', again: '↻ Заново', cont: '▶ Продолжить', best2: 'Рекорд: ', combo: 'КОМБО x', king: 'КОРОЛЬ!',
    daily: 'Награда дня', shop: 'Скины', lbT: 'Рейтинг', achievements: 'Достижения', claim: 'Забрать', x2: 'Забрать x2', claimed: 'Приходи завтра!', day: 'День ',
    buy: 'Купить', use: 'Выбрать', cur: 'Выбран', close: 'Закрыть', videoCoins: '+50 🪙 ', noLb: 'Рейтинг работает на Яндекс Играх',
    login: 'Войти, чтобы попасть в рейтинг', you: 'Ты', loading: 'Загрузка...', bombVideo: '+1 бомба', bombTap: 'Жми на поле!',
    quests: 'Задания дня', cases: 'Кейсы', open: 'Открыть кейс', noCases: 'Кейсов нет. Повышай уровень и выполняй задания!',
    odds: 'Шансы: обычный 60% · редкий 28% · эпик 9% · легенда 3%. Гарантия эпика каждые 15 кейсов. Кейсы нельзя купить — только заработать.',
    levelUp: 'Новый уровень ', caseOnly: '📦 Только из кейсов', dupe: ' (повтор)', allDone: 'Все задания выполнены! +1 кейс 📦',
    qMerge: 'Слей слаймов: ', qScore: 'Набери очков за партию: ', qLevel: 'Вырасти слайма уровня ', qBomb: 'Используй бомб: ', qGames: 'Сыграй партий: ',
    r0: 'Обычный', r1: 'Редкий', r2: 'Эпик', r3: 'Легенда', x2c: 'Удвоить', lvl: 'Ур.', skinNew: 'Новый скин: ', bombsW: 'бомбы',
    hint_bomb: '💣 Нажми на поле', hint_hammer: '🔨 Нажми на слайма', hint_evolve: '✨ Нажми на слайма', maxEvo: 'Этот слайм уже слишком большой!',
    tabSkins: '🎨 Скины', tabBoosts: '⚡ Бусты', tabUp: '⬆ Улучшения', have: 'В запасе: ', maxed: 'МАКС', lvl2: 'Ур. ',
    questDone: '📜 Задание выполнено! Забери награду', kingFly: 'КОРОЛЬ!', win: '👑 ПОБЕДА! Король!', keep: '∞ Играть дальше', caseVideo: '📦 +1 кейс',
    settings: 'Настройки', soundOn: '🔊 Звук: включён', soundOff: '🔇 Звук: выключен', restartRun: '↻ Начать заново', resetAll: '🗑 Сбросить весь прогресс',
    resetSure: '⚠ Точно удалить ВСЁ? Нажми ещё раз', resetDone: 'Прогресс сброшен',
    setNote: 'Сброс удаляет монеты, скины, уровень и рекорд. Рейтинг Яндекс Игр хранится на их сервере и не сбрасывается.', winBonus: '  ·  бонус +100 🪙 +1 📦'
  },
  en: {
    score: 'Score', best: 'Best', coins: 'Coins', play: '▶ Play',
    menu: 'Drop slimes and merge identical ones — they grow! Reach the Golden King and do not overflow the jar.',
    over: 'Jar is full!', again: '↻ Restart', cont: '▶ Continue', best2: 'Best: ', combo: 'COMBO x', king: 'KING!',
    daily: 'Daily reward', shop: 'Skins', lbT: 'Leaderboard', achievements: 'Achievements', claim: 'Claim', x2: 'Claim x2', claimed: 'Come back tomorrow!', day: 'Day ',
    buy: 'Buy', use: 'Use', cur: 'Selected', close: 'Close', videoCoins: '+50 🪙 ', noLb: 'Leaderboard works on Yandex Games',
    login: 'Sign in to join the ranking', you: 'You', loading: 'Loading...', bombVideo: '+1 bomb', bombTap: 'Tap the board!',
    quests: 'Daily quests', cases: 'Cases', open: 'Open case', noCases: 'No cases. Level up and finish quests!',
    odds: 'Odds: common 60% · rare 28% · epic 9% · legendary 3%. Epic guaranteed every 15 cases. Cases cannot be bought — only earned.',
    levelUp: 'Level up ', caseOnly: '📦 Cases only', dupe: ' (duplicate)', allDone: 'All quests done! +1 case 📦',
    qMerge: 'Merge slimes: ', qScore: 'Score in one game: ', qLevel: 'Grow a slime of level ', qBomb: 'Use bombs: ', qGames: 'Play games: ',
    r0: 'Common', r1: 'Rare', r2: 'Epic', r3: 'Legendary', x2c: 'Double', lvl: 'Lv.', skinNew: 'New skin: ', bombsW: 'bombs',
    hint_bomb: '💣 Tap the jar', hint_hammer: '🔨 Tap a slime', hint_evolve: '✨ Tap a slime', maxEvo: 'This slime is already too big!',
    tabSkins: '🎨 Skins', tabBoosts: '⚡ Boosts', tabUp: '⬆ Upgrades', have: 'Owned: ', maxed: 'MAX', lvl2: 'Lv. ',
    questDone: '📜 Quest complete! Claim your reward', kingFly: 'KING!', win: '👑 VICTORY! The King!', keep: '∞ Keep playing', caseVideo: '📦 +1 case',
    settings: 'Settings', soundOn: '🔊 Sound: on', soundOff: '🔇 Sound: off', restartRun: '↻ Restart game', resetAll: '🗑 Reset all progress',
    resetSure: '⚠ Delete EVERYTHING? Tap again', resetDone: 'Progress reset',
    setNote: 'Reset deletes coins, skins, level and best score. The Yandex Games leaderboard is stored on their server and is not reset.', winBonus: '  ·  bonus +100 🪙 +1 📦'
  }
};
var RANKS = [[1, ['Новичок', 'Rookie']], [4, ['Фермер слаймов', 'Slime Farmer']], [8, ['Мастер желе', 'Jelly Master']],
  [13, ['Слайм-король', 'Slime King']], [20, ['Легенда', 'Legend']]];
var lang = 'en'; // English only
function t(k) { return TXT[lang][k]; }
function rankName(L) {
  var n = RANKS[0][1];
  for (var i = 0; i < RANKS.length; i++) if (L >= RANKS[i][0]) n = RANKS[i][1];
  return n[lang === 'ru' ? 0 : 1];
}

/* ---------- DOM ---------- */
function $(id) { return document.getElementById(id); }
var canvas = $('c'), ctx = canvas.getContext('2d');
var elScore = $('score'), elBest = $('best'), elCoins = $('coins');
var menu = $('menu'), over = $('over');
var btnSound = $('btnSound'), btnBomb = $('btnBomb');

/* ---------- state ---------- */
var balls = [], parts = [], floats = [], pending = [], rings = [];
var score = 0, best = 0, state = 'menu';
var aimX = W / 2, curLevel = 0, nextLevel = 1, dropCd = 0, dangerT = 0;
var combo = 0, comboT = 0, shake = 0, time = 0;
var muted = false, soundPref = true;
var ysdk = null, player = null, sdkStarted = false;
var paid = 0, xpPaid = 0, gameCounted = false, kingWon = false, winBonus = false, winFlag = false;
var bombs = 1, tool = null, freezeT = 0, aimY = 0, adHold = false;   // tool: null | 'bomb' | 'hammer' | 'evolve' (armed, waits for a tap)
function defaultSave() {
  return { coins: 0, owned: [0], skin: 0, streak: 0, last: 0, ts: 0, xp: 0, cases: 1, bombs: 0, pity: 0,
    inv: { reroll: 0, hammer: 0, evolve: 0, freeze: 0 }, up: { lucky: 0, coin: 0, pack: 0, patience: 0 },
    q: { d: 0, prog: [0, 0, 0], done: [0, 0, 0], all: 0 },
    ach: { first_merge: 0, king: 0, coins_500: 0, skins_3: 0, games_10: 0, bombs_5: 0, cases_10: 0, quests_all: 0 },
    gamesTotal: 0, bombsUsed: 0, casesOpened: 0 };
}
var save = defaultSave();

/* ---------- view geometry (canvas fills the whole screen, jar is centered) ---------- */
var cw = 360, chh = 600, dpr = 1, ox = 0, oy = 0, vs = 1, sprScale = 0;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  cw = window.innerWidth || 360; chh = window.innerHeight || 600;
  canvas.width = Math.floor(cw * dpr); canvas.height = Math.floor(chh * dpr);
  var SIDE = 54, TOP = 8, BOT = 76, aw = cw - 2 * SIDE, ah = chh - TOP - BOT;
  vs = Math.max(0.3, Math.min(aw / W, ah / H));
  // the stats panel (148px) sits in the top-right corner: if the jar would run under it, push the jar down
  if ((cw - W * vs) / 2 < 164) { TOP = 106; ah = chh - TOP - BOT; vs = Math.max(0.3, Math.min(aw / W, ah / H)); }
  ox = (cw - W * vs) / 2; oy = TOP + (ah - H * vs) / 2;
  var sp = vs * dpr;
  if (Math.abs(sp - sprScale) > 0.04 * sp) { sprCache = {}; sprScale = sp; }
  bgKey = '';
}

/* ---------- save / load ---------- */
function packSave() {
  return { best: best, coins: save.coins, owned: save.owned, skin: save.skin, streak: save.streak, last: save.last, ts: save.ts,
    xp: save.xp, cases: save.cases, bombs: save.bombs, pity: save.pity, inv: save.inv, up: save.up, q: save.q,
    ach: save.ach, gamesTotal: save.gamesTotal, bombsUsed: save.bombsUsed, casesOpened: save.casesOpened };
}
function applySave(d) {
  save.coins = d.coins | 0; save.owned = d.owned && d.owned.length ? d.owned.slice() : [0]; save.skin = d.skin | 0;
  save.streak = d.streak | 0; save.last = d.last | 0; save.ts = d.ts | 0; save.xp = d.xp | 0;
  save.cases = d.cases | 0; save.bombs = Math.max(0, Math.min(99, d.bombs | 0)); save.pity = d.pity | 0;
  var def = defaultSave(), k;
  save.inv = def.inv; save.up = def.up;
  for (k in def.inv) if (d.inv && typeof d.inv === 'object') save.inv[k] = Math.max(0, Math.min(99, d.inv[k] | 0));
  for (k in def.up) if (d.up && typeof d.up === 'object') save.up[k] = Math.max(0, Math.min(3, d.up[k] | 0));
  if (d.q && d.q.prog && d.q.done) {
    save.q = { d: d.q.d | 0, prog: [d.q.prog[0] | 0, d.q.prog[1] | 0, d.q.prog[2] | 0], done: [d.q.done[0] | 0, d.q.done[1] | 0, d.q.done[2] | 0], all: d.q.all | 0 };
  }
  save.ach = def.ach;
  if (d.ach && typeof d.ach === 'object') for (k in def.ach) if (typeof d.ach[k] === 'number') save.ach[k] = d.ach[k] | 0;
  save.gamesTotal = d.gamesTotal | 0;
  save.bombsUsed = d.bombsUsed | 0;
  save.casesOpened = d.casesOpened | 0;
  if (save.owned.indexOf(save.skin) < 0 || !SK[save.skin]) save.skin = 0;
}
function loadBest() {
  try {
    var s = JSON.parse(localStorage.getItem('ms_save') || 'null');
    if (s) { best = s.best | 0; applySave(s); }
  } catch (e) {}
  elBest.textContent = best; updateHud(); updateLevelUI();
}
function saveLocal() {
  save.ts = Date.now();
  try { localStorage.setItem('ms_save', JSON.stringify(packSave())); } catch (e) {}
}
function saveBest() {
  saveLocal();
  if (player && player.setData) { try { player.setData(packSave()).catch(function () {}); } catch (e) {} }
}
function mergeCloud(d) {
  if (!d || typeof d !== 'object') return;
  if ((d.best | 0) > best) best = d.best | 0;
  var owned = save.owned.slice();
  if ((d.ts | 0) > save.ts) applySave(d);
  if (d.owned && d.owned.length) d.owned.forEach(function (i) { if (owned.indexOf(i) < 0) owned.push(i); });
  save.owned = owned;
  if (d.ach && typeof d.ach === 'object') for (var k in d.ach) if (save.ach[k] !== undefined) save.ach[k] = Math.max(save.ach[k] | 0, d.ach[k] | 0);
  save.gamesTotal = Math.max(save.gamesTotal, d.gamesTotal | 0);
  save.bombsUsed = Math.max(save.bombsUsed, d.bombsUsed | 0);
  save.casesOpened = Math.max(save.casesOpened, d.casesOpened | 0);
  if (save.owned.indexOf(save.skin) < 0) save.skin = 0;
  elBest.textContent = best; updateHud(); updateLevelUI(); saveLocal();
}

/* ---------- achievements ---------- */
var ACH = [
  { id: 'first_merge', n: ['Первый слизень', 'First Slime'], d: ['Сделай первое слияние', 'Make your first merge'], rw: 20 },
  { id: 'king', n: ['Король', 'King'], d: ['Досягни Золотого Короля', 'Reach the Golden King'], rw: 100 },
  { id: 'coins_500', n: ['Копилка', 'Piggy Bank'], d: ['Накопи 500 🪙', 'Save 500 coins'], rw: 50 },
  { id: 'skins_3', n: ['Коллекционер', 'Collector'], d: ['Купи 3 скина', 'Buy 3 skins'], rw: 50 },
  { id: 'games_10', n: ['Ветеран', 'Veteran'], d: ['Сыграй 10 партий', 'Play 10 games'], rw: 50 },
  { id: 'bombs_5', n: ['Бомбардир', 'Bombardier'], d: ['Используй 5 бомб', 'Use 5 bombs'], rw: 40 },
  { id: 'cases_10', n: ['Кейсман', 'Case Man'], d: ['Открой 10 кейсов', 'Open 10 cases'], rw: 60 },
  { id: 'quests_all', n: ['Мастер квестов', 'Quest Master'], d: ['Выполни все задания в день', 'Complete all daily quests'], rw: 100 }
];
function unlockAch(id) {
  if (save.ach[id]) return;
  save.ach[id] = 1;
  var a = null, i;
  for (i = 0; i < ACH.length; i++) if (ACH[i].id === id) { a = ACH[i]; break; }
  if (a) { save.coins += a.rw; toast('🏆 ' + a.n[lang === 'ru' ? 0 : 1] + '  +' + a.rw + ' 🪙'); sFanfare(); }
  saveBest(); updateHud();
}
function checkAch() {
  if (save.coins >= 500) unlockAch('coins_500');
  if (save.owned.length >= 3) unlockAch('skins_3');
  if (save.gamesTotal >= 10) unlockAch('games_10');
  if (save.bombsUsed >= 5) unlockAch('bombs_5');
  if (save.casesOpened >= 10) unlockAch('cases_10');
}

/* ---------- player level / xp ---------- */
function needXP(L) { return 100 + 50 * (L - 1); }
function lvlInfo(xp) {
  var L = 1, rem = xp;
  while (L < 99 && rem >= needXP(L)) { rem -= needXP(L); L++; }
  return { L: L, rem: rem, need: needXP(L) };
}
var toastT = 0;
function toast(msg) {
  var e = $('toast'); e.textContent = msg; e.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(function () { e.classList.remove('show'); }, 2800);
}
function addXP(n) {
  if (n <= 0) return;
  var before = lvlInfo(save.xp).L;
  save.xp += n;
  var after = lvlInfo(save.xp).L;
  for (var L = before + 1; L <= after; L++) {
    save.coins += 25; save.cases += 1;
    toast('⭐ ' + t('levelUp') + L + '   +25 🪙  +1 📦'); sFanfare();
  }
  updateLevelUI();
  if (after > before) updateHud();
}
function updateLevelUI() {
  var li = lvlInfo(save.xp);
  $('lvNum').textContent = li.L; $('lvName').textContent = rankName(li.L);
  $('xpFill').style.width = Math.round(li.rem / li.need * 100) + '%';
}

/* ---------- audio ---------- */
var actx = null;
function audio() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
  if (actx && actx.state === 'suspended') actx.resume();
  if (actx && !mus.on) startMusic();
  return actx;
}
function tone(f, d, type, vol, slide, delay) {
  if (muted) return;
  var a = audio(); if (!a) return;
  var o = a.createOscillator(), g = a.createGain(), n = a.currentTime + (delay || 0);
  o.type = type || 'sine'; o.frequency.setValueAtTime(f, n);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, n + d);
  g.gain.setValueAtTime(vol || 0.15, n); g.gain.exponentialRampToValueAtTime(0.0001, n + d);
  o.connect(g); g.connect(a.destination); o.start(n); o.stop(n + d + 0.02);
}
function sPop(l) { tone(260 + l * 70, 0.18, 'sine', 0.2, 520 + l * 90); }
function sDrop() { tone(180, 0.08, 'triangle', 0.12, 90); }
function sOver() { tone(300, 0.6, 'sawtooth', 0.15, 70); }
function sBoom() { tone(110, 0.5, 'sawtooth', 0.3, 30); tone(60, 0.6, 'sine', 0.4, 25); }
function sFanfare() { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.25, 'triangle', 0.18, 0, i * 0.09); }); }
function sTick() { tone(900, 0.03, 'square', 0.05); }
function sWin(r) {
  var seq = r >= 3 ? [523, 659, 784, 1047, 1319, 1568] : r === 2 ? [523, 659, 784, 1047] : r === 1 ? [523, 784] : [523];
  seq.forEach(function (f, i) { tone(f, 0.3, 'triangle', 0.2, 0, i * 0.1); });
}
function vib(ms) { try { if (navigator.vibrate && !muted) navigator.vibrate(ms); } catch (e) {} }

/* ---------- music: one theme per skin, procedural ---------- */
var mus = { on: false, next: 0, step: 0, bus: null, timer: 0, noise: null, skin: -1 };
var MUS = [
  // 0 Slimes: chill lo-fi (Am F C G)
  { ch: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], bpm: 92, padType: 'sine', padVol: 0.04, bass: [0, 4], bassLen: 3.5, bassType: 'triangle', bassVol: 0.16,
    arp: [0, 1, 2, 1, 0, 2, 1, 2], arpOct: 12, arpLen: 1.6, arpType: 'triangle', arpVol: 0.07, kickFrom: 1, hatFrom: 1, melFrom: 2, pent: [69, 72, 74, 76, 79, 81], melType: 'square', melVol: 0.025 },
  // 1 Kitties: music box (C Am F G)
  { ch: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], bpm: 112, padType: 'triangle', padVol: 0.035, bass: [0, 3, 4, 7], bassLen: 1.2, bassType: 'triangle', bassVol: 0.14,
    arp: [2, 1, 0, 1, 2, 1, 0, 2], arpOct: 12, arpLen: 1.0, arpType: 'sine', arpVol: 0.1, kickFrom: 2, hatFrom: 1, melFrom: 1, pent: [72, 74, 76, 79, 81, 84], melType: 'triangle', melVol: 0.06 },
  // 2 Space: ambient (Dm Bb C Am)
  { ch: [[50, 53, 57], [46, 50, 53], [48, 52, 55], [45, 49, 52]], bpm: 76, padType: 'sine', padVol: 0.07, bass: [0], bassLen: 7, bassType: 'sine', bassVol: 0.14,
    arp: [0, 2, 1, 2, 0, 1, 2, 1], arpOct: 24, arpLen: 2.5, arpType: 'sine', arpVol: 0.045, kickFrom: 9, hatFrom: 9, melFrom: 1, pent: [74, 77, 79, 81, 84, 86], melType: 'sine', melVol: 0.05 },
  // 3 Candy: chiptune pop (G D Em C)
  { ch: [[55, 59, 62], [50, 54, 57], [52, 55, 59], [48, 52, 55]], bpm: 124, padType: 'square', padVol: 0.015, bass: [0, 2, 4, 6], bassLen: 1.4, bassType: 'triangle', bassVol: 0.13,
    arp: [0, 2, 1, 2, 0, 2, 1, 2], arpOct: 12, arpLen: 0.9, arpType: 'square', arpVol: 0.035, kickFrom: 0, hatFrom: 0, melFrom: 1, pent: [74, 76, 79, 81, 83, 86], melType: 'square', melVol: 0.03 },
  // 4 Robots: synthwave (Em C G D)
  { ch: [[52, 55, 59], [48, 52, 55], [55, 59, 62], [50, 54, 57]], bpm: 112, padType: 'sawtooth', padVol: 0.02, bass: [0, 1, 2, 3, 4, 5, 6, 7], bassLen: 0.9, bassType: 'sawtooth', bassVol: 0.09,
    arp: [0, 2, 1, 2, 0, 2, 1, 2], arpOct: 12, arpLen: 0.8, arpType: 'sawtooth', arpVol: 0.03, kickFrom: 0, hatFrom: 0, melFrom: 2, pent: [76, 79, 81, 83, 86, 88], melType: 'square', melVol: 0.03 },
  // 5 Lava: heavy (Am F G E)
  { ch: [[45, 48, 52], [41, 45, 48], [43, 47, 50], [40, 44, 47]], bpm: 100, padType: 'sawtooth', padVol: 0.03, bass: [0, 2, 4, 6], bassLen: 1.5, bassType: 'sawtooth', bassVol: 0.12,
    arp: [0, 2, 1, 2, 0, 2, 1, 0], arpOct: 24, arpLen: 0.8, arpType: 'square', arpVol: 0.03, kickFrom: 0, hatFrom: 1, melFrom: 1, pent: [64, 67, 69, 71, 74, 76], melType: 'sawtooth', melVol: 0.03 },
  // 6 Gold: triumphant (C G Am F)
  { ch: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], bpm: 120, padType: 'triangle', padVol: 0.04, bass: [0, 4], bassLen: 3, bassType: 'triangle', bassVol: 0.15,
    arp: [0, 1, 2, 1, 2, 1, 2, 1], arpOct: 12, arpLen: 1.2, arpType: 'triangle', arpVol: 0.08, kickFrom: 0, hatFrom: 0, melFrom: 0, pent: [72, 74, 76, 79, 81, 84], melType: 'sine', melVol: 0.06 }
];
function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function mnote(f, t0, d, type, vol) {
  var a = actx, o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(g); g.connect(mus.bus); o.start(t0); o.stop(t0 + d + 0.05);
}
function mkick(t0) {
  var a = actx, o = a.createOscillator(), g = a.createGain();
  o.frequency.setValueAtTime(140, t0); o.frequency.exponentialRampToValueAtTime(45, t0 + 0.14);
  g.gain.setValueAtTime(0.45, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
  o.connect(g); g.connect(mus.bus); o.start(t0); o.stop(t0 + 0.2);
}
function mhat(t0) {
  var a = actx, s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  s.buffer = mus.noise; f.type = 'highpass'; f.frequency.value = 7000;
  g.gain.setValueAtTime(0.09, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
  s.connect(f); f.connect(g); g.connect(mus.bus); s.start(t0); s.stop(t0 + 0.08);
}
function musicTick() {
  var a = actx; if (!a || !mus.on) return;
  var M = MUS[save.skin] || MUS[0];
  if (mus.skin !== save.skin) { mus.skin = save.skin; mus.step = 0; }
  var bpm = M.bpm + (dangerT > 0 ? 16 : 0) + (state === 'menu' ? -8 : 0), sd = 60 / bpm / 2;
  if (mus.next < a.currentTime) mus.next = a.currentTime + 0.05;
  while (mus.next < a.currentTime + 0.25) {
    var s = mus.step, ch = M.ch[Math.floor(s / 8) % 4], pos = s % 8, t0 = mus.next;
    var lvl = state === 'menu' ? 0 : score >= 800 ? 2 : score >= 250 ? 1 : 0;
    if (!muted && a.state === 'running') {
      if (pos === 0) ch.forEach(function (n) { mnote(mtof(n), t0, sd * 7.5, M.padType, M.padVol); });
      if (M.bass.indexOf(pos) >= 0) mnote(mtof(ch[0] - 12), t0, sd * M.bassLen, M.bassType, M.bassVol);
      mnote(mtof(ch[M.arp[pos]] + M.arpOct), t0, sd * M.arpLen, M.arpType, M.arpVol);
      if (lvl >= M.kickFrom && pos % 4 === 0) mkick(t0);
      if (lvl >= M.hatFrom && pos % 2 === 1) mhat(t0);
      if (lvl >= M.melFrom && (pos === 2 || pos === 6) && Math.random() < 0.7) mnote(mtof(M.pent[Math.floor(Math.random() * M.pent.length)]), t0, sd * 2, M.melType, M.melVol);
    }
    mus.next += sd; mus.step++;
  }
}
function startMusic() {
  var a = actx; if (!a || mus.on) return;
  mus.bus = a.createGain(); mus.bus.gain.value = 0.5; mus.bus.connect(a.destination);
  mus.noise = a.createBuffer(1, Math.floor(a.sampleRate * 0.1), a.sampleRate);
  var d = mus.noise.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  mus.on = true; mus.next = a.currentTime + 0.1; mus.step = 0;
  mus.timer = setInterval(musicTick, 80);
}

/* ---------- Yandex SDK ---------- */
function initSDK() {
  if (sdkStarted) return; sdkStarted = true;
  if (!window.YaGames) { afterInit(); return; }
  YaGames.init().then(function (y) {
    ysdk = y;

    try { applyLang(); } catch (e) {}
    return y.getPlayer({ scopes: false }).then(function (p) {
      player = p;
      return p.getData().then(function (d) { mergeCloud(d); });
    });
  }).catch(function () {}).then(function () {
    try { if (ysdk && ysdk.features && ysdk.features.LoadingAPI) ysdk.features.LoadingAPI.ready(); } catch (e) {}
    afterInit();
  });
}
function gameplay(on) {
  try { if (ysdk && ysdk.features && ysdk.features.GameplayAPI) { on ? ysdk.features.GameplayAPI.start() : ysdk.features.GameplayAPI.stop(); } } catch (e) {}
}

/* ---------- skins & palettes ---------- */
var SK = [
  { n: ['Слаймы', 'Slimes'], price: 0, deco: 0 },
  { n: ['Котики', 'Kitties'], price: 150, deco: 1, h0: 20, step: 28, s: 85 },
  { n: ['Космос', 'Space'], price: 300, deco: 2, h0: 230, step: 14, s: 70 },
  { n: ['Конфеты', 'Candy'], price: 500, deco: 3, h0: 320, step: 40, s: 90 },
  { n: ['Роботы', 'Robots'], price: 800, deco: 4, h0: 190, step: 6, s: 45 },
  { n: ['Лава', 'Lava'], price: 0, deco: 5, h0: 4, step: 6, s: 92, l1: 55, l2: 26, caseOnly: true },
  { n: ['Золото', 'Gold'], price: 0, deco: 6, h0: 42, step: 2, s: 96, l1: 74, l2: 46, caseOnly: true }
];
var palCache = {};
function pal(l, sk) {
  var key = sk * 16 + l, c = palCache[key]; if (c) return c;
  var s = SK[sk];
  if (s.h0 === undefined) c = COL[l];
  else {
    var h = (s.h0 + l * s.step) % 360;
    c = ['hsl(' + h + ',' + s.s + '%,' + (s.l1 || 76) + '%)', 'hsl(' + h + ',' + s.s + '%,' + (s.l2 || 46) + '%)'];
  }
  palCache[key] = c; return c;
}

/* ---------- slime sprites: body is rendered once per (skin, level) and cached ---------- */
var sprCache = {};
function star4(g, x, y, s) {
  g.beginPath(); g.moveTo(x, y - s); g.quadraticCurveTo(x, y, x + s, y); g.quadraticCurveTo(x, y, x, y + s);
  g.quadraticCurveTo(x, y, x - s, y); g.quadraticCurveTo(x, y, x, y - s); g.fill();
}
function paw(g, x, y) {
  g.beginPath(); g.ellipse(x, y + 3, 6, 5, 0, 0, TAU); g.fill();
  [[-6, -3], [-2, -7], [3, -7], [7, -3]].forEach(function (o) { g.beginPath(); g.arc(x + o[0], y + o[1], 2.4, 0, TAU); g.fill(); });
}
function drawBody(g, r, l, sk) {
  var c = pal(l, sk), dk = SK[sk].deco, i;
  g.lineWidth = Math.max(2, r * 0.07); g.strokeStyle = 'rgba(0,0,0,.28)'; g.fillStyle = c[1]; g.lineCap = 'round'; g.lineJoin = 'round';
  if (dk === 1) {
    [-1, 1].forEach(function (sd) {
      g.beginPath(); g.moveTo(sd * r * 0.85, -r * 0.35); g.lineTo(sd * r * 0.7, -r * 1.15); g.lineTo(sd * r * 0.2, -r * 0.88);
      g.closePath(); g.fill(); g.stroke();
    });
  }
  if (dk === 4) {
    g.beginPath(); g.moveTo(0, -r * 0.9); g.lineTo(0, -r * 1.25); g.stroke();
    g.beginPath(); g.arc(0, -r * 1.3, r * 0.1 + 1.5, 0, TAU); g.fillStyle = '#ff5a5a'; g.fill(); g.fillStyle = c[1];
  }
  var gr = g.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
  gr.addColorStop(0, c[0]); gr.addColorStop(1, c[1]);
  g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fillStyle = gr; g.fill(); g.stroke();
  g.beginPath(); g.ellipse(-r * 0.38, -r * 0.5, r * 0.2, r * 0.11, -0.6, 0, TAU); g.fillStyle = 'rgba(255,255,255,.55)'; g.fill();
  if (dk === 2) {
    g.fillStyle = 'rgba(255,255,255,.8)';
    [[-0.5, 0.3, 0.05], [0.45, 0.45, 0.06], [0.1, -0.55, 0.04], [0.55, -0.2, 0.04], [-0.2, 0.62, 0.04]].forEach(function (s) {
      g.beginPath(); g.arc(r * s[0], r * s[1], Math.max(1, r * s[2]), 0, TAU); g.fill();
    });
    if (l >= 3) {
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = Math.max(1.5, r * 0.06);
      g.beginPath(); g.ellipse(0, r * 0.05, r * 1.12, r * 0.28, -0.35, 0, TAU); g.stroke();
    }
  }
  if (dk === 3) {
    g.save(); g.beginPath(); g.arc(0, 0, r * 0.97, 0, TAU); g.clip();
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = r * 0.16;
    for (i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(i * r * 0.5 - r, r); g.lineTo(i * r * 0.5 + r, -r); g.stroke(); }
    g.restore();
  }
  if (dk === 4) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(-r * 0.92, r * 0.12, r * 0.14, r * 0.3); g.fillRect(r * 0.78, r * 0.12, r * 0.14, r * 0.3); }
  if (dk === 1) {
    g.strokeStyle = 'rgba(60,20,30,.6)'; g.lineWidth = Math.max(1, r * 0.04);
    [-1, 1].forEach(function (sd) {
      g.beginPath(); g.moveTo(sd * r * 0.5, r * 0.28); g.lineTo(sd * r * 0.98, r * 0.2);
      g.moveTo(sd * r * 0.5, r * 0.38); g.lineTo(sd * r * 0.96, r * 0.46); g.stroke();
    });
  }
  if (dk === 5) {
    g.save(); g.beginPath(); g.arc(0, 0, r * 0.97, 0, TAU); g.clip();
    g.strokeStyle = '#ffb02e'; g.lineWidth = Math.max(1.5, r * 0.07); g.shadowColor = '#ff6a00'; g.shadowBlur = r * 0.3;
    [[[-0.9, -0.1], [-0.55, -0.25], [-0.4, 0.05], [-0.1, 0.15], [0.05, 0.5]], [[0.9, -0.35], [0.55, -0.2], [0.5, 0.2], [0.25, 0.35], [0.3, 0.8]],
      [[-0.3, -0.9], [-0.2, -0.6], [0.05, -0.5]]].forEach(function (p) {
      g.beginPath(); g.moveTo(p[0][0] * r, p[0][1] * r);
      for (var k = 1; k < p.length; k++) g.lineTo(p[k][0] * r, p[k][1] * r);
      g.stroke();
    });
    g.restore();
  }
  if (dk === 6) {
    g.save(); g.beginPath(); g.arc(0, 0, r * 0.97, 0, TAU); g.clip();
    g.fillStyle = 'rgba(255,255,255,.28)'; g.translate(-r * 0.1, 0); g.rotate(-0.6);
    g.fillRect(-r * 0.15, -r * 1.2, r * 0.22, r * 2.4); g.fillRect(r * 0.2, -r * 1.2, r * 0.08, r * 2.4);
    g.restore();
    g.fillStyle = 'rgba(255,255,255,.95)';
    star4(g, r * 0.5, -r * 0.5, r * 0.16); star4(g, -r * 0.55, r * 0.45, r * 0.11); star4(g, r * 0.25, r * 0.62, r * 0.09);
  }
  if (l === 9) {
    g.fillStyle = '#fff3a0'; g.strokeStyle = '#b36b00'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-r * 0.45, -r * 0.82); g.lineTo(-r * 0.45, -r * 1.2); g.lineTo(-r * 0.22, -r * 1.0);
    g.lineTo(0, -r * 1.3); g.lineTo(r * 0.22, -r * 1.0); g.lineTo(r * 0.45, -r * 1.2); g.lineTo(r * 0.45, -r * 0.82);
    g.closePath(); g.fill(); g.stroke();
  }
}
function sprite(l, sk) {
  var key = sk * 16 + l, e = sprCache[key]; if (e) return e;
  var r = R[l], half = r * 1.5, size = Math.max(8, Math.ceil(half * 2 * sprScale));
  var cv = document.createElement('canvas'); cv.width = cv.height = size;
  var g = cv.getContext('2d');
  g.translate(size / 2, size / 2); g.scale(sprScale, sprScale);
  drawBody(g, r, l, sk);
  e = { cv: cv, half: half }; sprCache[key] = e; return e;
}
// g: any 2d context; r must equal R[l]; sc scales the whole slime
function slimeDraw(g, x, y, r, l, sk, sc, look, vy) {
  var e = sprite(l, sk), sq = Math.max(-0.12, Math.min(0.12, (vy || 0) / 4000));
  g.save(); g.translate(x, y); g.scale(sc * (1 + sq), sc * (1 - sq));
  g.drawImage(e.cv, -e.half, -e.half, e.half * 2, e.half * 2);
  var ex = r * 0.34, ey = -r * 0.05, er = r * 0.2, px = (look || 0) * er * 0.4;
  g.fillStyle = '#fff'; g.beginPath(); g.arc(-ex, ey, er, 0, TAU); g.moveTo(ex + er, ey); g.arc(ex, ey, er, 0, TAU); g.fill();
  g.fillStyle = '#222'; g.beginPath(); g.arc(-ex + px, ey + er * 0.1, er * 0.5, 0, TAU); g.moveTo(ex + px + er * 0.5, ey + er * 0.1); g.arc(ex + px, ey + er * 0.1, er * 0.5, 0, TAU); g.fill();
  g.strokeStyle = '#3a1a2a'; g.lineWidth = Math.max(1.5, r * 0.06); g.lineCap = 'round';
  g.beginPath(); g.arc(0, r * 0.22, r * (l > 5 ? 0.3 : 0.2), 0.15, Math.PI - 0.15); g.stroke();
  g.restore();
}

/* ---------- game logic ---------- */
function upLv(k) { return (save.up && save.up[k]) | 0; }
function DL() { return 2.5 + 0.5 * upLv('patience'); }          // seconds above the line before the jar overflows
// "Lucky drop" upgrade shifts the starting slime sizes up (probabilities always sum to 1)
function randLevel() {
  var L = upLv('lucky'), r = Math.random(), c0 = 0.4 - 0.08 * L, c1 = c0 + 0.3, c2 = c1 + 0.2 + 0.04 * L;
  return r < c0 ? 0 : r < c1 ? 1 : r < c2 ? 2 : 3;
}
function newBall(x, y, l) {
  return { x: x, y: y, vx: 0, vy: 0, l: l, r: R[l], age: 0, pop: 0, merging: false, dead: false, bomb: false, fuse: 0 };
}
function resetGame() {
  balls = []; parts = []; floats = []; pending = []; rings = [];
  score = 0; combo = 0; comboT = 0; dangerT = 0; dropCd = 0.3; shake = 0;
  paid = 0; xpPaid = 0; gameCounted = false; bombs = upLv('pack'); tool = null; freezeT = 0;
  kingWon = false; winBonus = false; winFlag = false;
  save.gamesTotal++; checkAch();
  curLevel = randLevel(); nextLevel = randLevel();
  elScore.textContent = '0';
  updateTools();
}
function startGame() {
  resetGame(); ensureQuests(); checkAch();
  menu.classList.add('hidden'); over.classList.add('hidden');
  state = 'play'; gameplay(true);
}
function addScore(n) {
  score += n; elScore.textContent = score;
  if (score > best) { best = score; elBest.textContent = best; }
}
function burst(x, y, col, n, sp) {
  if (parts.length > 260) return;
  for (var i = 0; i < n; i++) {
    var a = Math.random() * TAU, s = (0.3 + Math.random()) * sp;
    parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: 0.5 + Math.random() * 0.5, col: col, size: 2 + Math.random() * 4 });
  }
}
function floatText(x, y, text, col) { floats.push({ x: x, y: y, t: 0, text: text, col: col || '#fff' }); }

function drop() {
  if (state !== 'play' || dropCd > 0) return;
  if (tool === 'bomb') {
    var bx = Math.max(LEFT + 17, Math.min(RIGHT - 17, aimX)), bb = newBall(bx, DROPY, 0);
    bb.r = 17; bb.bomb = true; bb.fuse = 1.1; bb.vy = 120; balls.push(bb);
    useStock('bomb');
    tool = null; dropCd = 0.5; questAdd('bomb', 1); updateTools(); saveLocal(); sDrop(); return;
  }
  if (tool) return;   // hammer / evolve are applied by applyTool, never drop a slime
  var r = R[curLevel];
  var x = Math.max(LEFT + r, Math.min(RIGHT - r, aimX));
  var b = newBall(x, DROPY, curLevel); b.vy = 120; balls.push(b);
  curLevel = nextLevel; nextLevel = randLevel(); dropCd = 0.5; sDrop();
}

function doMerge(a, b) {
  if (a.dead || b.dead) return;
  a.dead = b.dead = true;
  var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  comboT = 1.4; combo++;
  var mult = combo > 1 ? combo : 1;
  questAdd('merge', 1);
  unlockAch('first_merge');
  if (a.l === R.length - 1) {
    addScore(3000 * mult); burst(mx, my, '#ffe666', 60, 420); shake = 14; vib(40);
    floatText(mx, my, t('king') + ' +' + 3000 * mult, '#ffe666'); sPop(9); sPop(7); addXP(20);
    return;
  }
  var nl = a.l + 1, nb = newBall(mx, my, nl);
  nb.vx = (a.vx + b.vx) / 2; nb.vy = (a.vy + b.vy) / 2; nb.pop = 1; nb.age = 0.2;
  balls.push(nb);
  var pts = (nl + 1) * (nl + 1) * 5 * mult;
  addScore(pts); sPop(nl); burst(mx, my, COL[nl][0], 10 + nl * 3, 160 + nl * 20);
  floatText(mx, my - nb.r, '+' + pts, '#fff');
  if (combo > 1) floatText(W / 2, H / 2 - 40, t('combo') + combo, '#ffe36b');
  if (nl >= 5) { shake = Math.max(shake, 3 + nl); vib(15); }
  addXP(nl + 1); questMax('level', nl + 1);
  if (nl === R.length - 1 && !kingWon) { kingWon = true; winFlag = true; }   // the King is born -> victory
}

function physics(dt) {
  var sub = 3, h = dt / sub, i, j, k, a, b;
  for (var s = 0; s < sub; s++) {
    for (i = 0; i < balls.length; i++) {
      b = balls[i];
      b.vy += 1500 * h; b.vx *= 0.9995; b.x += b.vx * h; b.y += b.vy * h;
      if (b.x - b.r < LEFT) { b.x = LEFT + b.r; if (b.vx < 0) b.vx *= -0.1; }
      if (b.x + b.r > RIGHT) { b.x = RIGHT - b.r; if (b.vx > 0) b.vx *= -0.1; }
      if (b.y + b.r > FLOOR) { b.y = FLOOR - b.r; if (b.vy > 0) b.vy *= -0.1; b.vx *= 0.985; }
    }
    for (k = 0; k < 4; k++) {
      for (i = 0; i < balls.length; i++) {
        a = balls[i]; if (a.dead) continue;
        for (j = i + 1; j < balls.length; j++) {
          b = balls[j]; if (b.dead) continue;
          var dx = b.x - a.x, dy = b.y - a.y, rr = a.r + b.r;
          if (dx > rr || dx < -rr || dy > rr || dy < -rr) continue;
          var d2 = dx * dx + dy * dy;
          if (d2 >= rr * rr || d2 < 0.0001) continue;
          if (a.l === b.l && !a.bomb && !b.bomb && !a.merging && !b.merging && a.age > 0.04 && b.age > 0.04) {
            a.merging = b.merging = true; pending.push([a, b]); continue;
          }
          var d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = rr - d;
          var ma = a.r * a.r, mb = b.r * b.r, tm = ma + mb;
          a.x -= nx * ov * (mb / tm) * 0.8; a.y -= ny * ov * (mb / tm) * 0.8;
          b.x += nx * ov * (ma / tm) * 0.8; b.y += ny * ov * (ma / tm) * 0.8;
          var rvx = b.vx - a.vx, rvy = b.vy - a.vy, vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            var inv = 1 / ma + 1 / mb, jn = -1.1 * vn / inv;
            a.vx -= jn * nx / ma; a.vy -= jn * ny / ma; b.vx += jn * nx / mb; b.vy += jn * ny / mb;
            var tx = -ny, ty = nx, vt = rvx * tx + rvy * ty, jt = -vt * 0.06 / inv;
            a.vx -= jt * tx / ma; a.vy -= jt * ty / ma; b.vx += jt * tx / mb; b.vy += jt * ty / mb;
          }
        }
      }
    }
    if (pending.length) {
      for (i = 0; i < pending.length; i++) doMerge(pending[i][0], pending[i][1]);
      pending = [];
      balls = balls.filter(function (x) { return !x.dead; });
    }
  }
}

function explode(b) {
  var RAD = 100, killed = 0;
  rings.push({ x: b.x, y: b.y, t: 0 });
  balls.forEach(function (o) {
    if (o === b) return;
    var d = Math.hypot(o.x - b.x, o.y - b.y) || 1;
    if (d < RAD + o.r * 0.5) {
      o.dead = true; killed++; addScore((o.l + 1) * 10); burst(o.x, o.y, COL[o.l][0], 8, 220);
    } else if (d < RAD * 1.8) {
      var k = (1 - d / (RAD * 1.8)) * 500;
      o.vx += (o.x - b.x) / d * k; o.vy += (o.y - b.y) / d * k;
    }
  });
  b.dead = true;
  balls = balls.filter(function (o) { return !o.dead; });
  burst(b.x, b.y, '#ffb02e', 50, 520); burst(b.x, b.y, '#ff5a2a', 30, 380);
  shake = 18; sBoom(); vib(60);
  if (killed) floatText(b.x, b.y - 30, 'BOOM! x' + killed, '#ffd36b');
}

function update(dt) {
  time += dt;
  for (var fl = 0; fl < floaters.length; fl++) {
    var fo = floaters[fl]; fo.y -= fo.v * dt;
    if (fo.y < -30) { fo.y = chh + 30; fo.x = Math.random() * cw; }
  }
  var i, b;
  if (state === 'play') {
    if (dropCd > 0) dropCd -= dt;
    physics(dt);
    var danger = false;
    for (i = 0; i < balls.length; i++) {
      b = balls[i]; b.age += dt; if (b.pop > 0) b.pop = Math.max(0, b.pop - dt * 4);
      // above the line for real: not freshly dropped/merged and not flying upwards (speed no longer matters: piles always jitter)
      if (!b.bomb && b.age > 1.5 && b.y - b.r < DANGER && b.vy > -120) danger = true;
    }
    if (freezeT > 0) { freezeT = Math.max(0, freezeT - dt); danger = false; }   // ❄ Freeze: the line is safe
    dangerT = Math.max(0, Math.min(DL() + 0.5, dangerT + (danger ? dt : -dt * 2)));
    for (i = 0; i < balls.length; i++) {
      b = balls[i];
      if (b.bomb) { b.fuse -= dt; if (b.fuse <= 0) { explode(b); break; } }
    }
    if (comboT > 0) { comboT -= dt; if (comboT <= 0) combo = 0; }
    if (winFlag) { winFlag = false; gameOver(true); }
    else if (dangerT >= DL()) gameOver(false);
  } else {
    for (i = 0; i < balls.length; i++) if (balls[i].pop > 0) balls[i].pop = Math.max(0, balls[i].pop - dt * 4);
  }
  for (var p = parts.length - 1; p >= 0; p--) {
    var o = parts[p]; o.life -= dt; o.vy += 600 * dt; o.x += o.vx * dt; o.y += o.vy * dt;
    if (o.life <= 0) { parts[p] = parts[parts.length - 1]; parts.pop(); }
  }
  for (var f = floats.length - 1; f >= 0; f--) { floats[f].t += dt; floats[f].y -= 40 * dt; if (floats[f].t > 1.2) floats.splice(f, 1); }
  for (var rg = rings.length - 1; rg >= 0; rg--) { rings[rg].t += dt; if (rings[rg].t > 0.5) rings.splice(rg, 1); }
  if (shake > 0) shake = Math.max(0, shake - dt * 30);
}

// pays coins/XP for the run so far (safe to call several times: only the not-yet-paid part is given)
function settleRun() {
  var base = Math.floor(score / 60) + (score > 0 ? 1 : 0);
  var gain = Math.max(0, Math.floor(base * (1 + 0.15 * upLv('coin'))) - paid);   // "Coin boost" upgrade: +15% per level
  paid += gain; save.coins += gain;
  var xg = Math.max(0, Math.floor(score / 25) - xpPaid); xpPaid += xg; addXP(xg);
  questMax('score', score);
  if (!gameCounted && score > 0) { gameCounted = true; questAdd('games', 1); }
  saveBest(); updateHud();
  return { gain: gain, xg: xg };
}
function gameOver(win) {
  state = 'over'; gameplay(false); tool = null; updateTools();
  if (win) sFanfare(); else sOver();
  var bonus = 0;
  if (win && !winBonus) { winBonus = true; bonus = 100; save.coins += bonus; save.cases++; }
  if (win) unlockAch('king');
  checkAch();
  var s = settleRun();
  $('overTitle').textContent = win ? t('win') : t('over');
  $('overScore').textContent = score;
  $('overBest').textContent = t('best2') + best + '  ·  +' + s.gain + ' 🪙  ·  +' + s.xg + ' XP' + (bonus ? t('winBonus') : '');
  $('btnKeep').classList.toggle('hidden', !win);
  over.classList.remove('hidden');
}
function keepPlaying() {
  over.classList.add('hidden'); dropCd = 0.6; state = 'play'; gameplay(true);
}

/* ---------- bomb ---------- */
var TOOLS = [['bomb', 'btnBomb'], ['reroll', 'btnReroll'], ['hammer', 'btnHammer'], ['evolve', 'btnEvolve'], ['freeze', 'btnFreeze']];
function toolCount(k) { return k === 'bomb' ? bombs + save.bombs : (save.inv[k] | 0); }
function useStock(k) {
  if (k === 'bomb') { if (bombs > 0) bombs--; else if (save.bombs > 0) save.bombs--; save.bombsUsed++; checkAch(); }
  else if ((save.inv[k] | 0) > 0) { save.inv[k]--; if (k === 'bomb') save.bombsUsed++; checkAch(); }
}
function updateTools() {
  TOOLS.forEach(function (p) {
    var el = $(p[1]); if (!el) return;
    var n = toolCount(p[0]);
    var cnt = el.querySelector('.cnt');
    if (cnt) cnt.textContent = n > 0 ? n : '+';
    el.classList.toggle('empty', n <= 0);
    el.classList.toggle('armed', tool === p[0]);
  });
}
function openShop(tab) { shopTab = tab || shopTab; renderShop(); openModal($('shop')); }
function toolClick(k) {
  if (state !== 'play') return;
  if (k === 'reroll' || k === 'freeze') {                       // instant tools
    if (toolCount(k) <= 0) { openShop('boosts'); return; }
    if (k === 'reroll') { useStock(k); curLevel = randLevel(); nextLevel = randLevel(); sDrop(); }
    else { if (freezeT > 0) return; useStock(k); freezeT = 8; sFanfare(); }
    saveLocal(); updateTools(); return;
  }
  if (tool === k) { tool = null; updateTools(); return; }       // tap again = cancel
  if (toolCount(k) <= 0) { openShop('boosts'); return; }
  tool = k; updateTools();
}
// hammer / evolve: find the slime under the finger
function ballAt(x, y) {
  var pick = null, bd = 1e9;
  for (var i = 0; i < balls.length; i++) {
    var b = balls[i]; if (b.bomb || b.dead) continue;
    var d = Math.hypot(b.x - x, b.y - y);
    if (d <= b.r + 6 && d < bd) { bd = d; pick = b; }
  }
  return pick;
}
function applyTool(x, y) {
  if (state !== 'play' || (tool !== 'hammer' && tool !== 'evolve')) return;
  var b = ballAt(x, y); if (!b) return;                        // missed: stay armed
  if (tool === 'hammer') {
    b.dead = true; balls = balls.filter(function (o) { return !o.dead; });
    burst(b.x, b.y, COL[b.l][0], 14, 260); shake = Math.max(shake, 5); tone(150, 0.15, 'square', 0.2, 60); vib(25);
    floatText(b.x, b.y - b.r, '🔨', '#fff');
  } else {
    if (b.l >= R.length - 2) { toast(t('maxEvo')); return; }   // never makes a King by itself
    b.l++; b.r = R[b.l]; b.pop = 1; b.merging = false;
    burst(b.x, b.y, COL[b.l][0], 16, 200); sPop(b.l); floatText(b.x, b.y - b.r, '✨', '#ffe36b');
  }
  useStock(tool); tool = null; saveLocal(); updateTools();
}

/* ---------- daily quests ---------- */
var QT = [
  { k: 'merge', n: [15, 25, 40], rw: [30, 45, 70], tx: 'qMerge' },
  { k: 'score', n: [400, 800, 1500], rw: [30, 50, 80], tx: 'qScore' },
  { k: 'level', n: [4, 5, 6], rw: [30, 45, 70], tx: 'qLevel' },
  { k: 'bomb', n: [1, 2, 3], rw: [25, 40, 60], tx: 'qBomb' },
  { k: 'games', n: [2, 3, 4], rw: [25, 35, 50], tx: 'qGames' }
];
function rng(seed) {
  var a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    var x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
// day number in the player's LOCAL time zone (rewards/quests refresh at local midnight), time source is Yandex server time when available
function today() {
  var ms = Date.now();
  try { if (ysdk && ysdk.serverTime) ms = ysdk.serverTime(); } catch (e) {}
  return Math.floor((ms - new Date(ms).getTimezoneOffset() * 60000) / 86400000);
}
function dayQuests(d) {
  var r = rng(d * 2654435761), idx = [0, 1, 2, 3, 4], i, j, tmp, out = [];
  for (i = 4; i > 0; i--) { j = Math.floor(r() * (i + 1)); tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp; }
  for (i = 0; i < 3; i++) {
    var q = QT[idx[i]], dl = Math.floor(r() * 3);
    out.push({ k: q.k, n: q.n[dl], rw: q.rw[dl], tx: q.tx });
  }
  return out;
}
function ensureQuests() {
  var d = today();
  if (save.q.d !== d) save.q = { d: d, prog: [0, 0, 0], done: [0, 0, 0], all: 0 };
}
function questAdd(k, v) {
  ensureQuests(); var qs = dayQuests(save.q.d), was = claimableQuests();
  for (var i = 0; i < 3; i++) if (qs[i].k === k && !save.q.done[i]) save.q.prog[i] = Math.min(qs[i].n, save.q.prog[i] + v);
  questNotify(was);
}
function questMax(k, v) {
  ensureQuests(); var qs = dayQuests(save.q.d), was = claimableQuests();
  for (var i = 0; i < 3; i++) if (qs[i].k === k && !save.q.done[i]) save.q.prog[i] = Math.min(qs[i].n, Math.max(save.q.prog[i], v));
  questNotify(was);
}
// a quest just became claimable: refresh the red badge on the 📜 button and tell the player
function questNotify(was) {
  var now = claimableQuests();
  setBadge($('bdgQ'), now);
  if (now > was) { toast(t('questDone')); sPop(5); }
}
function claimableQuests() {
  ensureQuests(); var qs = dayQuests(save.q.d), c = 0;
  for (var i = 0; i < 3; i++) if (!save.q.done[i] && save.q.prog[i] >= qs[i].n) c++;
  return c;
}
function claimQuest(i) {
  ensureQuests(); var qs = dayQuests(save.q.d);
  if (save.q.done[i] || save.q.prog[i] < qs[i].n) return;
  save.q.done[i] = 1; save.coins += qs[i].rw; addXP(40);
  if (save.q.done[0] && save.q.done[1] && save.q.done[2] && !save.q.all) { save.q.all = 1; save.cases++; toast(t('allDone')); sFanfare(); unlockAch('quests_all'); }
  saveBest(); updateHud(); renderQuests(); sPop(6);
}
function renderQuests() {
  ensureQuests();
  var qs = dayQuests(save.q.d), list = $('qList'); list.textContent = '';
  qs.forEach(function (q, i) {
    var row = document.createElement('div'); row.className = 'row';
    var nm = document.createElement('div'); nm.className = 'nm'; nm.textContent = t(q.tx) + q.n;
    var sm = document.createElement('small'); sm.textContent = save.q.prog[i] + '/' + q.n + '  ·  +' + q.rw + ' 🪙  +40 XP'; nm.appendChild(sm);
    var b = document.createElement('button');
    if (save.q.done[i]) { b.className = 'alt sm'; b.textContent = '✔'; b.disabled = true; }
    else if (save.q.prog[i] >= q.n) { b.className = 'main sm'; b.textContent = t('claim'); b.addEventListener('click', function () { claimQuest(i); }); }
    else { b.className = 'alt sm'; b.textContent = '…'; b.disabled = true; }
    row.appendChild(nm); row.appendChild(b); list.appendChild(row);
  });
  $('qNote').textContent = save.q.all ? '✔ ' + t('allDone') : '📦 ' + (lang === 'ru' ? 'За все 3 задания — кейс' : 'All 3 quests give a case');
}

function renderAchievements() {
  var list = $('achList'); list.textContent = '';
  ACH.forEach(function (a) {
    var done = save.ach[a.id] === 1;
    var row = document.createElement('div'); row.className = 'achrow' + (done ? '' : ' locked');
    var ico = document.createElement('div'); ico.className = 'ico'; ico.textContent = done ? '🏆' : '🔒';
    var info = document.createElement('div'); info.className = 'info';
    var name = document.createElement('b'); name.textContent = a.n[lang === 'ru' ? 0 : 1];
    var desc = document.createElement('small'); desc.textContent = a.d[lang === 'ru' ? 0 : 1];
    info.appendChild(name); info.appendChild(desc);
    var rw = document.createElement('div'); rw.className = 'rw'; rw.textContent = done ? '+' + a.rw + ' 🪙' : '';
    row.appendChild(ico); row.appendChild(info); row.appendChild(rw); list.appendChild(row);
  });
}

/* ---------- daily reward ---------- */
var DAILY = [20, 30, 40, 60, 80, 100, 200];
function dailyState() {
  var d = today(), can = save.last !== d, idx = save.streak % 7;
  if (can && save.last && save.last < d - 1) idx = 0;
  return { can: can, idx: idx, d: d };
}
function renderDaily() {
  var st = dailyState(), grid = $('dailyGrid'); grid.textContent = '';
  var doneCount = st.can ? st.idx : (save.streak === 0 ? 7 : save.streak);
  DAILY.forEach(function (v, i) {
    var c = document.createElement('div');
    c.className = 'cell' + (i === 6 ? ' big' : '') + (i < doneCount ? ' done' : '') + (st.can && i === st.idx ? ' cur' : '');
    c.textContent = t('day') + (i + 1);
    var b = document.createElement('b'); b.textContent = (i < doneCount ? '✔ ' : '🪙 ') + v + (i === 6 ? ' +📦' : ''); c.appendChild(b);
    grid.appendChild(c);
  });
  $('btnClaim').textContent = st.can ? t('claim') + ' +' + DAILY[st.idx] : t('claimed');
  $('btnClaim').disabled = !st.can;

}
function claimDaily(mult) {
  var st = dailyState(); if (!st.can) return;
  save.coins += DAILY[st.idx] * mult; save.last = st.d; save.streak = (st.idx + 1) % 7; checkAch();
  if (st.idx === 6) { save.cases++; toast('📦 +1'); }
  saveBest(); updateHud(); renderDaily(); sPop(6);
}

/* ---------- cases (free, earned in-game; odds are shown to the player) ---------- */
var spinning = false, lastRes = null;
function rollCase() {
  save.pity++;
  var x = Math.random() * 100, rar = x < 3 ? 3 : x < 12 ? 2 : x < 40 ? 1 : 0;
  if (save.pity >= 15 && rar < 2) rar = 2;
  if (rar >= 2) save.pity = 0;
  var res = { r: rar, dup: false };
  if (rar === 0) { res.type = 'coins'; res.val = 20 + Math.floor(Math.random() * 21); res.ico = '🪙'; }
  else if (rar === 1) {
    if (Math.random() < 0.5) { res.type = 'coins'; res.val = 60 + Math.floor(Math.random() * 51); res.ico = '🪙'; }
    else { res.type = 'bomb'; res.val = 2; res.ico = '💣'; }
  } else if (rar === 2) {
    if (save.owned.indexOf(5) < 0) { res.type = 'skin'; res.val = 5; res.ico = '🔥'; }
    else { res.type = 'coins'; res.val = 150 + Math.floor(Math.random() * 101); res.ico = '🪙'; res.dup = true; }
  } else {
    if (save.owned.indexOf(6) < 0) { res.type = 'skin'; res.val = 6; res.ico = '👑'; }
    else { res.type = 'coins'; res.val = 400; res.ico = '🪙'; res.dup = true; }
  }
  return res;
}
function applyCase(res) {
  if (res.type === 'coins') save.coins += res.val;
  else if (res.type === 'bomb') save.bombs += res.val;
  else if (save.owned.indexOf(res.val) < 0) save.owned.push(res.val);   // equipped when the reel stops, so the skin is not spoiled
}
function resultText(res) {
  var s = res.type === 'coins' ? '+' + res.val + ' 🪙' : res.type === 'bomb' ? '+' + res.val + ' 💣' : t('skinNew') + SK[res.val].n[lang === 'ru' ? 0 : 1];
  return res.ico + ' ' + s + (res.dup ? t('dupe') : '');
}
var DECOY = ['🪙', '💣', '🔥', '👑'];   // one icon per rarity so the reel looks varied and the colour border tells the rarity
function decoyTile() {
  var x = Math.random() * 100, rar = x < 4 ? 3 : x < 16 ? 2 : x < 50 ? 1 : 0;
  return { r: rar, ico: DECOY[rar] };
}
function buildReel(res) {
  var strip = $('reel'); strip.textContent = '';
  for (var i = 0; i < 42; i++) {
    var tl = (res && i === 34) ? { r: res.r, ico: res.ico } : decoyTile();
    var d = document.createElement('div'); d.className = 'tile r' + tl.r; d.textContent = tl.ico; strip.appendChild(d);
  }
  strip.style.transition = 'none'; strip.style.transform = 'translateX(0px)';
}
function renderCases() {
  $('caseCount').textContent = '📦 × ' + save.cases;
  $('btnOpen').disabled = spinning || save.cases < 1;

  if (!spinning && !lastRes) {
    $('caseResult').className = ''; $('caseResult').textContent = save.cases < 1 ? t('noCases') : '';
  }
}
function openCase() {
  if (spinning || save.cases < 1) return;
  spinning = true; save.cases--; save.casesOpened++; checkAch();
  var res = rollCase(); applyCase(res); lastRes = res;
  saveBest(); updateHud(); renderCases();
  $('btnX2').classList.add('hidden'); $('caseResult').className = ''; $('caseResult').textContent = '';
  buildReel(res);
  var strip = $('reel'), vw = $('reelWrap').clientWidth || 320;
  var target = 34 * 80 + 40 - vw / 2 + (Math.random() * 40 - 20);
  void strip.offsetWidth;
  strip.style.transition = 'transform 4s cubic-bezier(.12,.75,.15,1)';
  strip.style.transform = 'translateX(' + (-target) + 'px)';
  for (var i = 0; i < 22; i++) setTimeout(sTick, 4000 * (1 - Math.pow(1 - i / 22, 2.2)));
  setTimeout(function () { finishCase(res); }, 4150);
}
function finishCase(res) {
  spinning = false;
  var el = $('caseResult'); el.className = 'r' + res.r; el.textContent = t('r' + res.r) + ': ' + resultText(res);
  if (res.type === 'coins') $('btnX2').classList.remove('hidden');
  if (res.type === 'skin') { save.skin = res.val; saveBest(); toast('🎉 ' + resultText(res)); }
  sWin(res.r); vib(res.r >= 2 ? 60 : 20); updateHud(); renderCases();
}

/* ---------- settings: sound, restart run, full progress reset ---------- */
var resetArm = 0, resetTimer = 0;
function updateSoundBtn() { btnSound.textContent = soundPref ? t('soundOn') : t('soundOff'); }
function disarmReset() {
  resetArm = 0; clearTimeout(resetTimer);
  $('btnReset').classList.remove('sure'); $('btnReset').textContent = t('resetAll');
}
function resetProgress() {
  disarmReset();
  save = defaultSave(); best = 0; lastRes = null;
  try { localStorage.removeItem('ms_save'); } catch (e) {}
  saveBest();                       // writes the fresh state locally and to the Yandex cloud (newer timestamp wins on next load)
  elBest.textContent = '0';
  resetGame(); updateHud(); updateLevelUI(); applyLang(); ensureQuests();
  ['daily', 'quests', 'cases', 'shop', 'settings'].forEach(function (id) { $(id).classList.add('hidden'); });
  over.classList.add('hidden'); menu.classList.remove('hidden');
  state = 'menu'; gameplay(false); toast(t('resetDone'));
}
function restartRun() {
  if (state === 'play' || state === 'pause') settleRun();   // pay out what was earned in the abandoned run
  $('settings').classList.add('hidden');
  state = 'menu'; startGame();
}

/* ---------- shop ---------- */
function drawPreview(cv, i) {
  var g = cv.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cv.width, cv.height);
  [1, 4, 7].forEach(function (l, k) { slimeDraw(g, 25 + k * 50, 27, R[l], l, i, 15 / R[l], 0, 0); });
}
var shopTab = 'skins';

function renderShop() {
  var list = $('shopList'); list.textContent = '';
  $('shopCoins').textContent = '🪙 ' + save.coins;
  var tabs = document.querySelectorAll('#shopTabs .tab');
  for (var q = 0; q < tabs.length; q++) tabs[q].classList.toggle('on', tabs[q].getAttribute('data-tab') === shopTab);
  if (shopTab === 'boosts') { renderBoosts(list); return; }
  if (shopTab === 'upgrades') { renderUpgrades(list); return; }
  SK.forEach(function (s, i) {
    var row = document.createElement('div'); row.className = 'row';
    var cv = document.createElement('canvas'); cv.width = 150; cv.height = 50; cv.className = 'prev'; drawPreview(cv, i);
    var nm = document.createElement('div'); nm.className = 'nm'; nm.textContent = s.n[lang === 'ru' ? 0 : 1];
    var b = document.createElement('button'), owned = save.owned.indexOf(i) >= 0;
    if (!owned) {
      if (s.caseOnly) { b.className = 'alt sm'; b.textContent = t('caseOnly'); b.disabled = true; }
      else {
        b.className = 'main sm'; b.textContent = t('buy') + ' ' + s.price + ' 🪙'; b.disabled = save.coins < s.price;
        b.addEventListener('click', function () { buySkin(i); });
      }
    } else if (save.skin === i) {
      b.className = 'alt sm'; b.textContent = t('cur'); b.disabled = true;
    } else {
      b.className = 'alt sm'; b.textContent = t('use');
      b.addEventListener('click', function () { save.skin = i; saveBest(); renderShop(); });
    }
    row.appendChild(cv); row.appendChild(nm); row.appendChild(b); list.appendChild(row);
  });
}
function buySkin(i) {
  var s = SK[i]; if (save.owned.indexOf(i) >= 0 || s.caseOnly || save.coins < s.price) return;
  save.coins -= s.price; save.owned.push(i); save.skin = i;
  saveBest(); updateHud(); renderShop(); sPop(8); checkAch();
}

/* boosts (consumables, used from the bar under the jar) and permanent upgrades */
var ITEMS = [
  { k: 'reroll', ico: '🔄', n: ['Смена слайма', 'Reroll'], d: ['Новый слайм в руке и в очереди', 'New slime in hand and in the queue'], p: 25 },
  { k: 'hammer', ico: '🔨', n: ['Молоток', 'Hammer'], d: ['Разбей любого слайма в банке', 'Smash any slime in the jar'], p: 40 },
  { k: 'bomb', ico: '💣', n: ['Бомба', 'Bomb'], d: ['Взрыв сносит слаймов вокруг', 'The blast clears nearby slimes'], p: 50 },
  { k: 'evolve', ico: '✨', n: ['Эволюция', 'Evolve'], d: ['Слайм вырастает на уровень', 'A slime grows one level'], p: 90 },
  { k: 'freeze', ico: '❄️', n: ['Заморозка', 'Freeze'], d: ['8 секунд линия не опасна', 'The line is safe for 8 seconds'], p: 70 }
];
var UPG = [
  { k: 'lucky', ico: '🍀', n: ['Удачный бросок', 'Lucky drop'], p: [150, 300, 600],
    d: [function (L) { return 'Больше крупных слаймов: +8% за уровень (сейчас +' + 8 * L + '%)'; }, function (L) { return 'More big slimes: +8% per level (now +' + 8 * L + '%)'; }] },
  { k: 'coin', ico: '💰', n: ['Монетный бонус', 'Coin boost'], p: [200, 400, 800],
    d: [function (L) { return 'Монет за партию +15% за уровень (сейчас +' + 15 * L + '%)'; }, function (L) { return 'Coins per game +15% per level (now +' + 15 * L + '%)'; }] },
  { k: 'pack', ico: '🎒', n: ['Запас бомб', 'Bomb stash'], p: [250, 500, 1000],
    d: [function (L) { return '+1 бомба в начале партии за уровень (сейчас +' + L + ', со следующей партии)'; }, function (L) { return '+1 bomb at the start of a game per level (now +' + L + ', from the next game)'; }] },
  { k: 'patience', ico: '⏳', n: ['Терпение', 'Patience'], p: [200, 400, 800],
    d: [function (L) { return '+0,5 с до проигрыша за уровень (сейчас +' + (L * 0.5).toString().replace('.', ',') + ' с)'; }, function (L) { return '+0.5 s before game over per level (now +' + L * 0.5 + ' s)'; }] }
];
function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
function shopRow(ico, name, desc, extra) {
  var row = el('div', 'row'), ic = el('div', 'ico'), nm = el('div', 'nm'), sm = el('small');
  ic.textContent = ico; nm.textContent = name; sm.textContent = desc; nm.appendChild(sm);
  if (extra) { var ex = el('small', 'pips'); ex.textContent = extra; nm.appendChild(ex); }
  row.appendChild(ic); row.appendChild(nm); return row;
}
function renderBoosts(list) {
  var ln = lang === 'ru' ? 0 : 1;
  ITEMS.forEach(function (it) {
    var have = it.k === 'bomb' ? save.bombs : (save.inv[it.k] | 0);
    var row = shopRow(it.ico, it.n[ln], it.d[ln], t('have') + have), bt = el('div', 'btns');
    [[1, it.p], [3, Math.round(it.p * 3 * 0.9)]].forEach(function (o) {
      var b = el('button', 'main sm'); b.textContent = (o[0] === 1 ? '' : '×3  ') + o[1] + ' 🪙';
      b.disabled = save.coins < o[1] || have + o[0] > 99;
      b.addEventListener('click', function () { buyItem(it.k, o[0], o[1]); });
      bt.appendChild(b);
    });
    row.appendChild(bt); list.appendChild(row);
  });
}
function renderUpgrades(list) {
  var ln = lang === 'ru' ? 0 : 1;
  UPG.forEach(function (u) {
    var L = upLv(u.k), pips = '';
    for (var i = 0; i < 3; i++) pips += i < L ? '● ' : '○ ';
    var row = shopRow(u.ico, u.n[ln], u.d[ln](L), pips + t('lvl2') + L + '/3'), bt = el('div', 'btns'), b = el('button');
    if (L >= 3) { b.className = 'alt sm'; b.textContent = t('maxed'); b.disabled = true; }
    else {
      b.className = 'main sm'; b.textContent = u.p[L] + ' 🪙'; b.disabled = save.coins < u.p[L];
      b.addEventListener('click', function () { buyUp(u.k); });
    }
    bt.appendChild(b); row.appendChild(bt); list.appendChild(row);
  });
}
function buyItem(k, qty, price) {
  var have = k === 'bomb' ? save.bombs : (save.inv[k] | 0);
  if (save.coins < price || have + qty > 99) return;
  save.coins -= price;
  if (k === 'bomb') save.bombs += qty; else save.inv[k] = have + qty;
  saveBest(); updateHud(); updateTools(); renderShop(); sPop(7);
}
function buyUp(k) {
  var u = null, i; for (i = 0; i < UPG.length; i++) if (UPG[i].k === k) u = UPG[i];
  var L = upLv(k); if (!u || L >= 3 || save.coins < u.p[L]) return;
  save.coins -= u.p[L]; save.up[k] = L + 1;
  saveBest(); updateHud(); renderShop(); sFanfare();
}

/* ---------- HUD / modals ---------- */
function setBadge(el, n) {
  if (n > 0) { el.textContent = n; el.classList.remove('hidden'); } else el.classList.add('hidden');
}
function updateHud() {
  elCoins.textContent = save.coins;
  var els = document.querySelectorAll('.js-daily'), can = dailyState().can, i;
  for (i = 0; i < els.length; i++) els[i].classList.toggle('pulse', can);
  setBadge($('bdgC'), save.cases); setBadge($('bdgQ'), claimableQuests());
}
function openModal(el) {
  if (state === 'play') { state = 'pause'; gameplay(false); }
  el.classList.remove('hidden');
}
function closeModal(el) {
  el.classList.add('hidden');
  if (state === 'pause') { state = 'play'; gameplay(true); }
}
function afterInit() {
  ensureQuests(); updateHud(); updateLevelUI();
  if (dailyState().can) { renderDaily(); openModal($('daily')); }
}
function applyLang() {
  $('lblScore').textContent = t('score'); $('lblBest').textContent = t('best'); $('lblCoins').textContent = t('coins');
  $('menuText').textContent = t('menu'); $('btnPlay').textContent = t('play');
  $('dailyTitle').textContent = '🎁 ' + t('daily'); $('shopTitle').textContent = '🎨 ' + t('shop'); $('achTitle').textContent = '🏆 ' + t('achievements');
  $('questTitle').textContent = '📜 ' + t('quests'); $('caseTitle').textContent = '📦 ' + t('cases');
  $('btnClaim').textContent = t('claim'); $('btnX2').textContent = t('x2c');
  $('btnOpen').textContent = t('open'); $('caseOdds').textContent = t('odds');
  $('btnKeep').textContent = t('keep');
  $('setTitle').textContent = '⚙️ ' + t('settings'); $('btnRestartRun').textContent = t('restartRun'); $('setNote').textContent = t('setNote');
  disarmReset(); updateSoundBtn();
  var tb = document.querySelectorAll('#shopTabs .tab'), tn = ['tabSkins', 'tabBoosts', 'tabUp'];
  for (var ti = 0; ti < tb.length; ti++) tb[ti].textContent = t(tn[ti]);

  ['btnDailyClose', 'btnShopClose', 'btnQuestClose', 'btnCasesClose', 'btnSettingsClose', 'btnAchClose'].forEach(function (id) { $(id).textContent = t('close'); });
  $('btnRestart').textContent = t('again');
  updateTools(); updateLevelUI();
  document.documentElement.lang = lang;
}
function bindList(cls, fn) {
  var els = document.querySelectorAll(cls);
  for (var i = 0; i < els.length; i++) els[i].addEventListener('click', fn);
}
bindList('.js-daily', function () { renderDaily(); openModal($('daily')); });
bindList('.js-quests', function () { renderQuests(); openModal($('quests')); });
bindList('.js-cases', function () { renderCases(); if (!spinning) { lastRes = null; buildReel(null); renderCases(); } openModal($('cases')); });
bindList('.js-shop', function () { openShop(); });
Array.prototype.forEach.call(document.querySelectorAll('#shopTabs .tab'), function (b) {
  b.addEventListener('click', function () { shopTab = b.getAttribute('data-tab'); renderShop(); });
});

bindList('.js-ach', function () { renderAchievements(); openModal($('ach')); });
bindList('.js-settings', function () { disarmReset(); updateSoundBtn(); openModal($('settings')); });
$('btnClaim').addEventListener('click', function () { claimDaily(1); });
$('btnOpen').addEventListener('click', openCase);
$('btnX2').addEventListener('click', function () {
  var res = lastRes; if (!res || res.type !== 'coins') return;
  lastRes = null;
  $('btnX2').classList.add('hidden');
  save.coins += res.val; saveBest(); updateHud(); toast('+' + res.val + ' 🪙');
});

$('btnDailyClose').addEventListener('click', function () { closeModal($('daily')); });
$('btnQuestClose').addEventListener('click', function () { closeModal($('quests')); });
$('btnCasesClose').addEventListener('click', function () { closeModal($('cases')); });
$('btnShopClose').addEventListener('click', function () { closeModal($('shop')); });
$('btnAchClose').addEventListener('click', function () { closeModal($('ach')); });
$('btnSettingsClose').addEventListener('click', function () { disarmReset(); closeModal($('settings')); });
$('btnRestartRun').addEventListener('click', restartRun);
$('btnReset').addEventListener('click', function () {
  if (!resetArm) {
    resetArm = 1; $('btnReset').classList.add('sure'); $('btnReset').textContent = t('resetSure');
    resetTimer = setTimeout(disarmReset, 5000);
  } else resetProgress();
});
$('btnKeep').addEventListener('click', keepPlaying);
TOOLS.forEach(function (p) { $(p[1]).addEventListener('click', function () { toolClick(p[0]); }); });
$('btnPlay').addEventListener('click', function () { audio(); startGame(); });
$('btnRestart').addEventListener('click', function () { audio(); startGame(); });
btnSound.addEventListener('click', function () {
  soundPref = !soundPref; muted = !soundPref; updateSoundBtn(); if (soundPref) audio();
});

/* ---------- animated backgrounds (one per skin, gradients cached) ---------- */
var BGC = [['#3b2a9e', '#241670'], ['#8a3f9e', '#4a1f5e'], ['#0d1450', '#04051c'], ['#ff7ab8', '#a8407f'], ['#24485c', '#0e1d28'], ['#4a0f0a', '#150404'], ['#9a7412', '#3a2605']];
var tiles = {}, floaters = [], bgKey = '', bgGrad = null, vigGrad = null;
for (var fi = 0; fi < 22; fi++) floaters.push({ x: Math.random() * 400, y: Math.random() * 800, s: 6 + Math.random() * 12, v: 8 + Math.random() * 22, ph: Math.random() * 6.28 });

function tile(sk) {
  if (tiles[sk]) return tiles[sk];
  var cv = document.createElement('canvas'); cv.width = cv.height = 128;
  var g = cv.getContext('2d'); g.scale(2, 2);
  g.fillStyle = 'rgba(255,255,255,.09)'; g.strokeStyle = 'rgba(255,255,255,.09)'; g.lineWidth = 2;
  if (sk === 0) {
    g.beginPath(); g.arc(16, 16, 6, 0, TAU); g.arc(48, 48, 6, 0, TAU); g.fill();
    g.beginPath(); g.arc(48, 16, 2.5, 0, TAU); g.arc(16, 48, 2.5, 0, TAU); g.fill();
  } else if (sk === 1) {
    paw(g, 18, 20); paw(g, 50, 52);
  } else if (sk === 2) {
    g.fillStyle = 'rgba(255,255,255,.35)';
    [[10, 12, 1.2], [40, 8, 0.8], [22, 40, 1.5], [52, 30, 1], [58, 56, 0.8], [8, 58, 1]].forEach(function (s) { g.beginPath(); g.arc(s[0], s[1], s[2], 0, TAU); g.fill(); });
    g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(34, 21); g.lineTo(34, 31); g.moveTo(29, 26); g.lineTo(39, 26); g.stroke();
  } else if (sk === 3) {
    g.lineWidth = 10; g.strokeStyle = 'rgba(255,255,255,.12)';
    [0, 32, 64, 96, 128].forEach(function (c) { g.beginPath(); g.moveTo(c, 0); g.lineTo(c - 64, 64); g.stroke(); });
    g.fillStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.arc(16, 48, 2, 0, TAU); g.arc(48, 16, 2, 0, TAU); g.fill();
  } else if (sk === 4) {
    g.lineWidth = 1.5; g.strokeStyle = 'rgba(120,230,255,.14)'; g.fillStyle = 'rgba(120,230,255,.16)';
    g.beginPath(); g.moveTo(0, 32); g.lineTo(64, 32); g.moveTo(32, 0); g.lineTo(32, 64); g.stroke();
    g.fillRect(29, 29, 6, 6);
    g.beginPath(); g.arc(8, 8, 3, 0, TAU); g.stroke(); g.beginPath(); g.arc(56, 56, 3, 0, TAU); g.stroke();
  } else if (sk === 5) {
    g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,120,30,.2)'; g.fillStyle = 'rgba(255,140,40,.22)';
    g.beginPath(); g.moveTo(0, 20); g.lineTo(14, 28); g.lineTo(22, 18); g.lineTo(40, 34); g.lineTo(64, 24); g.stroke();
    g.beginPath(); g.arc(46, 10, 2, 0, TAU); g.arc(12, 50, 2.5, 0, TAU); g.arc(54, 54, 1.5, 0, TAU); g.fill();
  } else {
    g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,235,140,.16)';
    [0, 32, 64, 96, 128].forEach(function (c) {
      g.beginPath(); g.moveTo(c, 0); g.lineTo(c - 64, 64); g.moveTo(c - 64, 0); g.lineTo(c, 64); g.stroke();
    });
    g.fillStyle = 'rgba(255,245,180,.5)'; star4(g, 16, 16, 3); star4(g, 48, 48, 3);
  }
  var p = ctx.createPattern(cv, 'repeat');
  try { if (p.setTransform) p.setTransform(new DOMMatrix([0.5, 0, 0, 0.5, 0, 0])); } catch (e) {}
  tiles[sk] = p; return p;
}
function floaterShape(sk, s, ph) {
  ctx.lineWidth = 2;
  if (sk === 0) {
    ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, s, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(-s * 0.4, -s * 0.4, s * 0.2, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill();
  } else if (sk === 1) {
    ctx.fillStyle = '#ff9ac2'; ctx.beginPath(); ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.3, -s * 1.1, 0, -s * 0.4); ctx.bezierCurveTo(s * 0.3, -s * 1.1, s, -s * 0.5, 0, s * 0.3); ctx.fill();
  } else if (sk === 2) {
    ctx.fillStyle = '#fff'; star4(ctx, 0, 0, s);
  } else if (sk === 3) {
    ctx.fillStyle = 'hsl(' + ((ph * 57) % 360) + ',90%,70%)'; ctx.fillRect(-s / 2, -s / 4, s, s / 2);
  } else if (sk === 4) {
    ctx.strokeStyle = '#7fe6ff'; ctx.strokeRect(-s / 2, -s / 2, s, s);
    ctx.beginPath(); ctx.arc(0, 0, s * 0.25, 0, TAU); ctx.stroke();
  } else if (sk === 5) {
    ctx.fillStyle = '#ff9a3a'; ctx.beginPath(); ctx.arc(0, 0, s * 0.35, 0, TAU); ctx.fill();
  } else {
    ctx.fillStyle = '#ffd34a'; ctx.beginPath(); ctx.arc(0, 0, s * 0.6, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#a06a00'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, s * 0.35, 0, TAU); ctx.stroke();
  }
}
function drawBackground() {
  var sk = save.skin, key = sk + '_' + cw + '_' + chh;
  if (key !== bgKey) {
    bgKey = key; var c = BGC[sk] || BGC[0];
    bgGrad = ctx.createLinearGradient(0, 0, 0, chh); bgGrad.addColorStop(0, c[0]); bgGrad.addColorStop(1, c[1]);
    vigGrad = ctx.createRadialGradient(cw / 2, chh / 2, Math.min(cw, chh) * 0.35, cw / 2, chh / 2, Math.max(cw, chh) * 0.75);
    vigGrad.addColorStop(0, 'rgba(0,0,0,0)'); vigGrad.addColorStop(1, 'rgba(0,0,0,.4)');
  }
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, cw, chh);
  var o = (time * 5) % 64;
  ctx.save(); ctx.translate(o, o); ctx.fillStyle = tile(sk); ctx.fillRect(-64, -64, cw + 128, chh + 128); ctx.restore();
  for (var i = 0; i < floaters.length; i++) {
    var f = floaters[i];
    ctx.save(); ctx.translate(f.x + Math.sin(time + f.ph) * 10, f.y); ctx.rotate(time * 0.5 + f.ph);
    ctx.globalAlpha = 0.22; floaterShape(sk, f.s, f.ph); ctx.restore();
  }
  ctx.fillStyle = vigGrad; ctx.fillRect(0, 0, cw, chh);
  if (dangerT > 0) {
    ctx.fillStyle = 'rgba(255,40,40,' + (0.25 * Math.min(1, dangerT / DL()) * (0.6 + 0.4 * Math.sin(time * 10))) + ')';
    ctx.fillRect(0, 0, cw, chh);
  }
  if (freezeT > 0) { ctx.fillStyle = 'rgba(130,210,255,' + (0.12 + 0.05 * Math.sin(time * 4)) + ')'; ctx.fillRect(0, 0, cw, chh); }
}

/* ---------- world drawing ---------- */
function roundRect(x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function drawBomb(x, y, r, fuse) {
  ctx.save(); ctx.translate(x, y);
  var g = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
  g.addColorStop(0, '#6a6a85'); g.addColorStop(1, '#16161f');
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-r * 0.38, -r * 0.45, r * 0.2, r * 0.11, -0.6, 0, TAU); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * 0.3, r * 0.05, r * 0.2, 0, TAU); ctx.moveTo(r * 0.5, r * 0.05); ctx.arc(r * 0.3, r * 0.05, r * 0.2, 0, TAU); ctx.fill();
  ctx.fillStyle = '#d22'; ctx.beginPath(); ctx.arc(-r * 0.3, r * 0.08, r * 0.1, 0, TAU); ctx.moveTo(r * 0.4, r * 0.08); ctx.arc(r * 0.3, r * 0.08, r * 0.1, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.2); ctx.lineTo(-r * 0.12, -r * 0.05); ctx.moveTo(r * 0.55, -r * 0.2); ctx.lineTo(r * 0.12, -r * 0.05); ctx.stroke();
  ctx.strokeStyle = '#c9a46a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, -r); ctx.quadraticCurveTo(r * 0.3, -r * 1.35, r * 0.6, -r * 1.3); ctx.stroke();
  ctx.fillStyle = Math.random() < 0.5 ? '#ffd36b' : '#ff6a2a';
  ctx.beginPath(); ctx.arc(r * 0.6 + (Math.random() - 0.5) * 3, -r * 1.3 + (Math.random() - 0.5) * 3, 3 + Math.random() * 3, 0, TAU); ctx.fill();
  if (fuse < 0.6 && Math.sin(time * 40) > 0) { ctx.globalAlpha = 0.45; ctx.fillStyle = '#f33'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); }
  ctx.restore();
}

function draw() {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawBackground();
  ctx.setTransform(dpr * vs, 0, 0, dpr * vs, dpr * ox, dpr * oy);
  if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  var i, k, sk = save.skin;
  // jar
  ctx.fillStyle = 'rgba(255,255,255,.09)';
  roundRect(LEFT, DANGER - 20, RIGHT - LEFT, FLOOR - DANGER + 20, 16); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(LEFT, DANGER - 20); ctx.lineTo(LEFT, FLOOR); ctx.lineTo(RIGHT, FLOOR); ctx.lineTo(RIGHT, DANGER - 20); ctx.stroke();
  var gl = ctx.createLinearGradient(LEFT, 0, LEFT + 40, 0);
  gl.addColorStop(0, 'rgba(255,255,255,.18)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gl; ctx.fillRect(LEFT, DANGER - 20, 40, FLOOR - DANGER + 20);
  // danger line
  var dAlpha = 0.25 + (dangerT > 0 ? 0.5 + 0.5 * Math.sin(time * 14) : 0) * Math.min(1, dangerT);
  ctx.strokeStyle = 'rgba(255,70,70,' + dAlpha + ')'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
  ctx.beginPath(); ctx.moveTo(LEFT, DANGER); ctx.lineTo(RIGHT, DANGER); ctx.stroke(); ctx.setLineDash([]);
  // evolution chain
  for (i = 0; i < R.length; i++) {
    var pc = pal(i, sk);
    ctx.beginPath(); ctx.arc(20 + i * 15, 106, 6, 0, TAU); ctx.fillStyle = pc[1]; ctx.fill();
    ctx.strokeStyle = pc[0]; ctx.lineWidth = 2; ctx.stroke();
  }
  // next
  ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(lang === 'ru' ? 'ДАЛЕЕ' : 'NEXT', 322, 82);
  slimeDraw(ctx, 322, 99, R[nextLevel], nextLevel, sk, Math.min(1, 14 / R[nextLevel]), 0, 0);
  // aim
  if (state === 'play') {
    var armedBomb = tool === 'bomb', ar = armedBomb ? 17 : R[curLevel], ax = Math.max(LEFT + ar, Math.min(RIGHT - ar, aimX));
    if (!tool || armedBomb) {
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.setLineDash([4, 8]);
      ctx.beginPath(); ctx.moveTo(ax, DROPY + ar); ctx.lineTo(ax, FLOOR); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.globalAlpha = dropCd > 0 ? 0.4 : 1;
    if (armedBomb) drawBomb(ax, DROPY, 17, 1.1);
    else if (!tool) slimeDraw(ctx, ax, DROPY, R[curLevel], curLevel, sk, 1, 0, 0);
    ctx.globalAlpha = 1;
  }
  // balls
  for (k = 0; k < balls.length; k++) {
    var b = balls[k];
    if (b.bomb) drawBomb(b.x, b.y, b.r, b.fuse);
    else slimeDraw(ctx, b.x, b.y, b.r, b.l, sk, 1 + b.pop * 0.25 * Math.sin(b.pop * 3.14), Math.max(-1, Math.min(1, b.vx / 200)), b.vy);
  }
  // hammer / evolve: highlight the slime under the finger
  if (state === 'play' && (tool === 'hammer' || tool === 'evolve')) {
    var hb = ballAt(aimX, aimY);
    if (hb) { ctx.strokeStyle = tool === 'hammer' ? '#ff6a6a' : '#7dffb0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(hb.x, hb.y, hb.r + 4, 0, TAU); ctx.stroke(); }
  }
  // top line of the jar: hint for the armed tool, freeze timer
  if (state === 'play') {
    ctx.textAlign = 'center'; ctx.font = 'bold 13px sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.fillStyle = '#fff';
    if (tool) { var ht = t('hint_' + tool); ctx.strokeText(ht, W / 2, 20); ctx.fillText(ht, W / 2, 20); }
    if (freezeT > 0) { var ft2 = '❄ ' + Math.ceil(freezeT); ctx.fillStyle = '#9fe3ff'; ctx.strokeText(ft2, 36, 20); ctx.fillText(ft2, 36, 20); }
  }
  // explosion rings
  for (i = 0; i < rings.length; i++) {
    var rn = rings[i], k2 = rn.t / 0.5;
    ctx.globalAlpha = 1 - k2; ctx.beginPath(); ctx.arc(rn.x, rn.y, 100 * k2 + 10, 0, TAU);
    ctx.fillStyle = 'rgba(255,190,70,.3)'; ctx.fill();
    ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 8 * (1 - k2) + 2; ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // particles
  for (i = 0; i < parts.length; i++) {
    var o = parts[i]; ctx.globalAlpha = Math.max(0, o.life); ctx.fillStyle = o.col;
    ctx.beginPath(); ctx.arc(o.x, o.y, o.size, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
  // floating text
  ctx.textAlign = 'center';
  for (i = 0; i < floats.length; i++) {
    var ft = floats[i]; ctx.globalAlpha = Math.max(0, 1 - ft.t / 1.2);
    ctx.font = 'bold 20px sans-serif'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.5)';
    ctx.strokeText(ft.text, ft.x, ft.y); ctx.fillStyle = ft.col; ctx.fillText(ft.text, ft.x, ft.y);
  }
  ctx.globalAlpha = 1;
}

/* ---------- input ---------- */
function pointerX(e) { return (e.clientX - ox) / vs; }
function pointerY(e) { return (e.clientY - oy) / vs; }
canvas.addEventListener('pointerdown', function (e) { audio(); aimX = pointerX(e); aimY = pointerY(e); e.preventDefault(); });
canvas.addEventListener('pointermove', function (e) { aimX = pointerX(e); aimY = pointerY(e); });
canvas.addEventListener('pointerup', function (e) {
  aimX = pointerX(e); aimY = pointerY(e);
  if (tool === 'hammer' || tool === 'evolve') applyTool(aimX, aimY); else drop();
  e.preventDefault();
});
window.addEventListener('keydown', function (e) {
  if (e.code === 'ArrowLeft') aimX -= 14;
  else if (e.code === 'ArrowRight') aimX += 14;
  else if (e.code === 'Space' || e.code === 'ArrowDown') { drop(); e.preventDefault(); }
});
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', function () { setTimeout(resize, 200); });
// quest progress and coins must survive a closed tab: autosave locally every 15 s and when the page is left
setInterval(saveLocal, 15000);
window.addEventListener('pagehide', saveLocal);
document.addEventListener('visibilitychange', function () {
  if (document.hidden) { saveLocal(); if (actx && actx.suspend) actx.suspend(); }
  else if (actx && actx.resume && soundPref) actx.resume();
});

/* ---------- main loop ---------- */
var last = 0;
function frame(ts) {
  var dt = Math.min(0.033, (ts - last) / 1000 || 0.016); last = ts;
  try { update(dt); draw(); } catch (e) { if (window.console) console.error(e); }   // one bad frame must never freeze the game
  requestAnimationFrame(frame);
}

applyLang(); loadBest(); resize(); resetGame(); state = 'menu';
window.addEventListener('load', initSDK);
if (document.readyState === 'complete') initSDK();
requestAnimationFrame(frame);
})();

/*
  Chidiya Udd — Bird Fly
  A nostalgic Indian playground reflex game, rebuilt for the web.
  Author: Shabab Ahmad
*/

(() => {
  "use strict";

  // ---------- Word bank ----------
  // flies:true  -> player should tap
  // flies:false -> player should NOT tap
  const WORDS = [
    { word: "चिड़िया", emoji: "🐦", flies: true },
    { word: "तोता", emoji: "🦜", flies: true },
    { word: "कौआ", emoji: "🐦‍⬛", flies: true },
    { word: "उल्लू", emoji: "🦉", flies: true },
    { word: "मोर", emoji: "🦚", flies: true },
    { word: "मधुमक्खी", emoji: "🐝", flies: true },
    { word: "तितली", emoji: "🦋", flies: true },
    { word: "पतंग", emoji: "🪁", flies: true },
    { word: "हवाई जहाज़", emoji: "✈️", flies: true },
    { word: "गुब्बारा", emoji: "🎈", flies: true },
    { word: "बादल", emoji: "☁️", flies: true },
    { word: "चमगादड़", emoji: "🦇", flies: true },

    { word: "हाथी", emoji: "🐘", flies: false },
    { word: "गाय", emoji: "🐄", flies: false },
    { word: "बकरी", emoji: "🐐", flies: false },
    { word: "कुर्सी", emoji: "🪑", flies: false },
    { word: "मेज़", emoji: "🗄️", flies: false },
    { word: "साइकिल", emoji: "🚲", flies: false },
    { word: "कार", emoji: "🚗", flies: false },
    { word: "मछली", emoji: "🐟", flies: false },
    { word: "कुत्ता", emoji: "🐕", flies: false },
    { word: "बिल्ली", emoji: "🐈", flies: false },
    { word: "किताब", emoji: "📖", flies: false },
    { word: "पहाड़", emoji: "⛰️", flies: false },
  ];

  // ---------- State ----------
  const state = {
    score: 0,
    lives: 3,
    streak: 0,
    roundTime: 2200,   // ms, shrinks as player succeeds
    minRoundTime: 700,
    current: null,
    roundStart: 0,
    timerId: null,
    rafId: null,
    answered: false,
    playing: false,
  };

  const HIGH_SCORE_KEY = "chidiya_udd_high_score";

  // ---------- DOM refs ----------
  const el = {
    startScreen: document.getElementById("start-screen"),
    gameScreen: document.getElementById("game-screen"),
    endScreen: document.getElementById("end-screen"),
    startBtn: document.getElementById("start-btn"),
    tapBtn: document.getElementById("tap-btn"),
    restartBtn: document.getElementById("restart-btn"),
    score: document.getElementById("score"),
    lives: document.getElementById("lives"),
    streak: document.getElementById("streak"),
    timerFill: document.getElementById("timer-fill"),
    kiteCard: document.getElementById("kite-card"),
    wordText: document.getElementById("word-text"),
    wordEmoji: document.getElementById("word-emoji"),
    feedbackBurst: document.getElementById("feedback-burst"),
    startHighScore: document.getElementById("start-high-score"),
    finalScore: document.getElementById("final-score"),
    finalHighScore: document.getElementById("final-high-score"),
    newRecord: document.getElementById("new-record"),
  };

  function getHighScore() {
    return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  }
  function setHighScore(value) {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  }

  // ---------- Audio (tiny beeps, no external files needed) ----------
  let audioCtx = null;
  function beep(freq, duration, type = "sine") {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) { /* audio not critical */ }
  }

  // ---------- Screen switching ----------
  function showScreen(name) {
    [el.startScreen, el.gameScreen, el.endScreen].forEach(s => s.classList.add("screen--hidden"));
    if (name === "start") el.startScreen.classList.remove("screen--hidden");
    if (name === "game") el.gameScreen.classList.remove("screen--hidden");
    if (name === "end") el.endScreen.classList.remove("screen--hidden");
  }

  // ---------- Game flow ----------
  function startGame() {
    state.score = 0;
    state.lives = 3;
    state.streak = 0;
    state.roundTime = 2200;
    state.playing = true;
    updateHud();
    showScreen("game");
    nextRound();
  }

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function nextRound() {
    if (!state.playing) return;
    state.answered = false;
    state.current = pickWord();
    el.wordText.textContent = state.current.word;
    el.wordEmoji.textContent = state.current.emoji;
    el.kiteCard.classList.remove("is-correct", "is-wrong");

    state.roundStart = performance.now();
    el.timerFill.style.width = "100%";
    el.timerFill.classList.remove("is-danger");

    cancelAnimationFrame(state.rafId);
    clearTimeout(state.timerId);

    const tick = (now) => {
      const elapsed = now - state.roundStart;
      const pct = Math.max(0, 1 - elapsed / state.roundTime);
      el.timerFill.style.width = `${pct * 100}%`;
      if (pct < 0.25) el.timerFill.classList.add("is-danger");
      if (pct > 0 && !state.answered) {
        state.rafId = requestAnimationFrame(tick);
      }
    };
    state.rafId = requestAnimationFrame(tick);

    state.timerId = setTimeout(() => {
      if (!state.answered) handleTimeout();
    }, state.roundTime);
  }

  function handleTimeout() {
    state.answered = true;
    if (state.current.flies) {
      // Missed a flying word -> penalty
      registerWrong();
    } else {
      // Correctly withheld tap on a non-flying word
      registerCorrect(false);
    }
  }

  function handleTap() {
    if (!state.playing || state.answered) return;
    state.answered = true;
    clearTimeout(state.timerId);
    cancelAnimationFrame(state.rafId);

    if (state.current.flies) {
      registerCorrect(true);
    } else {
      registerWrong();
    }
  }

  function registerCorrect(wasTapped) {
    state.streak += 1;
    const streakBonus = Math.min(Math.floor(state.streak / 5) * 5, 20);
    state.score += 10 + streakBonus;
    state.roundTime = Math.max(state.minRoundTime, state.roundTime - 45);

    el.kiteCard.classList.add("is-correct");
    flashFeedback(wasTapped ? "सही! ✅" : "बढ़िया! ✅", "good");
    beep(880, 0.12, "triangle");

    updateHud();
    setTimeout(nextRound, 380);
  }

  function registerWrong() {
    state.streak = 0;
    state.lives -= 1;
    el.kiteCard.classList.add("is-wrong");
    flashFeedback("गलत! ❌", "bad");
    beep(180, 0.25, "sawtooth");

    updateHud();

    if (state.lives <= 0) {
      state.playing = false;
      setTimeout(endGame, 500);
    } else {
      setTimeout(nextRound, 500);
    }
  }

  function flashFeedback(text, kind) {
    el.feedbackBurst.textContent = text;
    el.feedbackBurst.classList.remove("show-good", "show-bad");
    void el.feedbackBurst.offsetWidth; // restart animation
    el.feedbackBurst.classList.add(kind === "good" ? "show-good" : "show-bad");
  }

  function updateHud() {
    el.score.textContent = state.score;
    el.streak.textContent = state.streak;
    el.lives.textContent = "❤️".repeat(Math.max(0, state.lives)) + "🖤".repeat(3 - state.lives);
  }

  function endGame() {
    clearTimeout(state.timerId);
    cancelAnimationFrame(state.rafId);

    const highScore = getHighScore();
    const isNewRecord = state.score > highScore;
    if (isNewRecord) setHighScore(state.score);

    el.finalScore.textContent = state.score;
    el.finalHighScore.textContent = isNewRecord ? state.score : highScore;
    el.newRecord.classList.toggle("screen--hidden", !isNewRecord);

    showScreen("end");
  }

  // ---------- Events ----------
  el.startBtn.addEventListener("click", startGame);
  el.restartBtn.addEventListener("click", startGame);
  el.tapBtn.addEventListener("click", handleTap);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && state.playing) {
      e.preventDefault();
      handleTap();
    }
  });

  // Init high score display
  el.startHighScore.textContent = getHighScore();
})();

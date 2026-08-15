# 🐦 Chidiya Udd — Bird Fly

A nostalgic **Indian playground reflex game** rebuilt for the web using pure **HTML, CSS, and JavaScript**.

The rule is simple:

> 🐦 If it can fly → **TAP!**
> 🐘 If it cannot fly → **DON'T TAP!**

As the player answers correctly, the game becomes faster and more challenging, testing **reaction speed, concentration, accuracy, and decision-making under time pressure**.

## 🎮 Live Demo

### 👉 [Play Chidiya Udd Online](https://shabab991.github.io/chidiya-udd/)

> No installation required — play directly in your browser.

---

## 🖥️ Application Preview

<img width="1194" height="874" alt="Chidiya Udd Bird Fly Game" src="https://github.com/user-attachments/assets/74319cce-c00a-4672-8e91-105764c9f403" />

---

## 📖 About the Game

**Chidiya Udd (चिड़िया उड़)** is a classic Indian playground reflex game recreated as an interactive browser experience.

A word and emoji appear on the screen. The player must quickly decide whether the displayed object can fly.

### 🐦 Flying Objects

* 🐦 चिड़िया
* 🦜 तोता
* 🐦‍⬛ कौआ
* 🦉 उल्लू
* 🦚 मोर
* 🐝 मधुमक्खी
* 🦋 तितली
* 🪁 पतंग
* ✈️ हवाई जहाज़
* 🎈 गुब्बारा
* ☁️ बादल
* 🦇 चमगादड़

### 🐘 Non-Flying Objects

* 🐘 हाथी
* 🐄 गाय
* 🐐 बकरी
* 🪑 कुर्सी
* 🗄️ मेज़
* 🚲 साइकिल
* 🚗 कार
* 🐟 मछली
* 🐕 कुत्ता
* 🐈 बिल्ली
* 📖 किताब
* ⛰️ पहाड़

The challenge becomes harder as the available response time decreases.

---

## ✨ Features

* 🐦 Flying and non-flying object challenges
* ⚡ Progressive difficulty
* ❤️ 3-life system
* 🔥 Streak-based scoring
* ⏱️ Dynamic countdown timer
* 🏆 Persistent high score
* 💾 Browser `localStorage` support
* ⌨️ Spacebar keyboard support
* 🔊 Web Audio API sound effects
* 🎨 Colorful animated game interface
* ☁️ Animated sky and clouds
* 🪁 Interactive kite-inspired game card
* 📱 Responsive design
* ♿ Reduced-motion support
* 🌐 Fully client-side — no backend required

---

## ⚡ Increasing Difficulty

The game progressively becomes faster as the player succeeds.

### Initial Round Time

```text
2200 ms
```

### Minimum Round Time

```text
700 ms
```

Every correct response reduces the available reaction time until the minimum limit is reached.

This creates a progressively harder reflex challenge where players must balance:

```text
Speed + Accuracy + Concentration
```

---

## ❤️ Lives System

Each game starts with:

```text
❤️ ❤️ ❤️
```

The player loses one life after an incorrect response.

### Correct Actions

```text
Flying object + TAP
        ↓
      Correct

Non-flying object + DON'T TAP
        ↓
      Correct
```

### Incorrect Actions

```text
Flying object + DON'T TAP
        ↓
       Wrong

Non-flying object + TAP
        ↓
       Wrong
```

When all three lives are lost, the game ends and the final score is displayed.

---

## 🔥 Streak & Scoring

Correct answers increase the player's streak.

The scoring system rewards successful responses and provides additional bonuses for maintaining a streak.

The gameplay therefore encourages players to maintain:

* ⚡ Fast reactions
* 🎯 High accuracy
* 🔥 Long streaks

The objective is to achieve the highest possible score without losing all three lives.

---

## ⏱️ Dynamic Timer

Each round includes a visual countdown timer.

The timer gradually decreases while the player makes a decision.

When the remaining time becomes low, the timer enters a visual danger state.

If the timer expires:

* 🐦 A missed flying object counts as incorrect.
* 🐘 Correctly ignoring a non-flying object counts as correct.

---

## ⌨️ Keyboard Support

The game supports keyboard interaction for desktop users.

### Spacebar

```text
SPACE → Same action as "उड़! 🪁"
```

This allows the game to be played without relying entirely on mouse or touch interaction.

---

## 🔊 Sound Effects

Lightweight sound effects are generated using the browser's **Web Audio API**.

No external audio files are required.

Different audio feedback is provided for:

* ✅ Correct responses
* ❌ Incorrect responses

The audio implementation remains lightweight and dependency-free.

---

## 🏆 High Score

The game uses the browser's **localStorage API** to save the player's high score.

This means the best score can remain available when the player returns to the game using the same browser.

When a player beats the previous high score, the game displays a new-record notification.

---

## 🎨 User Interface

The game uses a colorful **dusk-sky inspired interface** designed around the nostalgic playground theme.

The UI includes:

* 🌅 Gradient sky background
* ☀️ Sun
* ☁️ Animated clouds
* 🪁 Kite-inspired game card
* 🎨 Interactive controls
* ❤️ Lives indicator
* 🔥 Streak indicator
* ⏱️ Countdown timer
* ✅ Correct-answer feedback
* ❌ Wrong-answer feedback
* 🏆 Game-over/result screen

---

## 📱 Responsive Design

The interface adapts to different screen sizes using responsive CSS.

The layout adjusts:

* Game card dimensions
* Button sizes
* Typography
* Spacing
* Overall game layout

The application also respects the browser's **`prefers-reduced-motion`** setting for users who prefer less animation.

---

## 🧠 Game Logic

The game maintains an internal state containing:

```text
Current Score
Current Lives
Current Streak
Current Round Time
Minimum Round Time
Current Object
Timer State
Animation State
Answer State
Playing State
```

Each round randomly selects an object from the game's word bank.

Objects are represented using a simple JavaScript structure:

```javascript
{
    word: "चिड़िया",
    emoji: "🐦",
    flies: true
}
```

The `flies` property determines whether the player should tap the **उड़! 🪁** button.

---

## 🔄 Game Flow

```text
Start Game
    │
    ▼
Select Random Object
    │
    ▼
Display Word + Emoji
    │
    ▼
Player Decision
    │
    ├───────────────┐
    │               │
    ▼               ▼
   TAP          DON'T TAP
    │               │
    └───────┬───────┘
            ▼
       Check Answer
            │
       ┌────┴────┐
       │         │
     Correct    Wrong
       │         │
       ▼         ▼
  Increase      Lose Life
  Score/Streak     │
       │            │
       ▼            ▼
 Reduce Timer   Check Lives
       │            │
       └──────┬─────┘
              ▼
        Next Round
```

---

## 🛠️ Technologies Used

### Frontend

| Technology      | Purpose                             |
| --------------- | ----------------------------------- |
| HTML5           | Game structure                      |
| CSS3            | UI, animation and responsive design |
| JavaScript ES6+ | Game logic and interactions         |

### Browser APIs

| API                     | Purpose                       |
| ----------------------- | ----------------------------- |
| LocalStorage API        | High-score persistence        |
| Web Audio API           | Sound effects                 |
| `requestAnimationFrame` | Animation and timer rendering |
| Performance API         | Timing calculations           |
| Keyboard Events         | Spacebar controls             |

### Fonts

* Baloo 2
* Poppins

---

## 📁 Project Structure

```text
chidiya-udd/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Shabab991/chidiya-udd.git
```

### 2. Enter the project directory

```bash
cd chidiya-udd
```

### 3. Start a local server

```bash
python -m http.server 8000
```

### 4. Open the game

```text
http://localhost:8000
```

You can also open `index.html` directly in a modern browser.

---

## 🌐 Deployment

The game is deployed using **GitHub Pages**.

### Live Application

**https://shabab991.github.io/chidiya-udd/**

The entire game runs directly in the browser.

No backend, database, or external server is required for gameplay.

---

## 🎯 Project Objective

The goal of this project was to recreate a familiar Indian playground game as an interactive web experience while implementing:

* Real-time game state management
* Progressive difficulty
* Timer-based gameplay
* Score and streak systems
* Persistent high scores
* Keyboard interaction
* Browser audio
* Responsive design
* Client-side game logic

The project combines **nostalgia, interaction design, browser APIs, and JavaScript game development** into a lightweight web application.

---

## 🧠 Concepts Demonstrated

This project demonstrates practical understanding of:

* JavaScript game development
* State management
* Event-driven programming
* Timer management
* Randomized game elements
* Score calculation
* Progressive difficulty systems
* DOM manipulation
* Browser storage
* Web Audio API
* Keyboard events
* Animation loops
* Responsive web design
* Client-side application development

---

## 🔮 Future Improvements

Potential future enhancements:

* 🏆 Global online leaderboard
* 👥 Multiplayer mode
* 🎚️ Difficulty selection
* 📊 Detailed game statistics
* 🌍 More Indian playground games
* 🎵 Background music
* 🎨 Additional themes
* 📱 Progressive Web App support
* 🥇 Achievement system
* 📈 Reaction-time analytics

---

## 👨‍💻 Developer

**Shabab Ahmad**

MCA Student | Aspiring Data Engineer | Data Analytics | ML/AI

GitHub: **https://github.com/Shabab991**

---

## ⭐ Support

If you enjoyed playing **Chidiya Udd**, consider giving the repository a ⭐ on GitHub.

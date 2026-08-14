# 🐦 Chidiya Udd — Bird Fly

A nostalgic Indian playground reflex game rebuilt for the web using pure HTML, CSS, and JavaScript.

The rule is simple:

> 🐦 If it can fly → TAP!
>
> 🐘 If it cannot fly → DON'T TAP!

As you answer correctly, the game becomes faster and more challenging. Test your reaction speed, concentration, and ability to avoid impulsive clicks.

---

## 🎮 Live Demo

🌐 **Play Chidiya Udd Online:**

https://shabab991.github.io/chidiya-udd/

---

## 📖 About the Game

**Chidiya Udd (चिड़िया उड़)** is a classic Indian playground reflex game recreated as an interactive browser game.

A word and emoji appear on the screen. The player has to decide whether the displayed object can fly.

For example:

- 🐦 चिड़िया → Fly → TAP
- 🦜 तोता → Fly → TAP
- 🐦‍⬛ कौआ → Fly → TAP
- 🦉 उल्लू → Fly → TAP
- 🦚 मोर → Fly → TAP
- 🪁 पतंग → Fly → TAP
- ✈️ हवाई जहाज़ → Fly → TAP
- 🎈 गुब्बारा → Fly → TAP
- 🐘 हाथी → Cannot fly → DON'T TAP
- 🐄 गाय → Cannot fly → DON'T TAP
- 🐐 बकरी → Cannot fly → DON'T TAP
- 🪑 कुर्सी → Cannot fly → DON'T TAP
- 🚲 साइकिल → Cannot fly → DON'T TAP
- 🚗 कार → Cannot fly → DON'T TAP
- 🐟 मछली → Cannot fly → DON'T TAP
- 🐕 कुत्ता → Cannot fly → DON'T TAP

The challenge becomes harder because the available response time gradually decreases as the player succeeds.

---

## ✨ Features

### 🐦 Flying & Non-Flying Challenges

The game contains a collection of flying and non-flying objects.

Flying objects include:

- 🐦 चिड़िया
- 🦜 तोता
- 🐦‍⬛ कौआ
- 🦉 उल्लू
- 🦚 मोर
- 🐝 मधुमक्खी
- 🦋 तितली
- 🪁 पतंग
- ✈️ हवाई जहाज़
- 🎈 गुब्बारा
- ☁️ बादल
- 🦇 चमगादड़

Non-flying objects include:

- 🐘 हाथी
- 🐄 गाय
- 🐐 बकरी
- 🪑 कुर्सी
- 🗄️ मेज़
- 🚲 साइकिल
- 🚗 कार
- 🐟 मछली
- 🐕 कुत्ता
- 🐈 बिल्ली
- 📖 किताब
- ⛰️ पहाड़

---

## ⚡ Increasing Difficulty

The game starts with a limited amount of time for every round.

Every correct response makes the game faster.

The initial round time is:

**2200 milliseconds**

The minimum round time is:

**700 milliseconds**

This creates a progressively harder reflex challenge.

---

## ❤️ Lives System

The player starts with:

**3 Lives ❤️❤️❤️**

A wrong answer removes one life.

Examples:

- Tapping a flying object → ✅ Correct
- Not tapping a non-flying object → ✅ Correct
- Tapping a non-flying object → ❌ Wrong
- Missing a flying object → ❌ Wrong

When all lives are lost, the game ends.

---

## 🔥 Streak & Scoring

Correct answers increase the player's streak.

The scoring system provides points for correct answers and additional bonuses for maintaining a streak.

This encourages the player to maintain both:

- Speed
- Accuracy

The goal is to achieve the highest possible score without losing all three lives.

---

## ⏱️ Dynamic Timer

Each round has a visual countdown timer.

The timer gradually decreases while the player is deciding what to do.

When the remaining time becomes low, the timer enters a danger state.

If the timer expires:

- A missed flying object counts as a wrong answer.
- A non-flying object that was correctly ignored counts as a correct answer.

---

## ⌨️ Keyboard Support

The game supports keyboard interaction.

During gameplay:

**Spacebar** → performs the same action as pressing the **उड़! 🪁** button.

This makes the game easy to play on desktop computers and laptops.

---

## 🔊 Sound Effects

The game includes lightweight sound effects generated using the browser's Web Audio API.

No external audio files are required.

Different sounds are used for:

- ✅ Correct answers
- ❌ Wrong answers

The audio system is intentionally lightweight and dependency-free.

---

## 🏆 High Score

The game saves the player's high score using browser **localStorage**.

This allows the best score to remain available when the player returns to the game in the same browser.

A new record notification is displayed when the current score beats the previous high score.

---

## 🎨 User Interface

The game uses a colorful dusk-sky inspired visual design.

The interface includes:

- 🌅 Gradient sky background
- ☀️ Sun
- ☁️ Animated clouds
- 🪁 Kite-shaped game card
- 🎨 Interactive buttons
- ❤️ Lives indicator
- 🔥 Streak indicator
- ⏱️ Countdown timer
- ✅ Correct feedback
- ❌ Wrong feedback
- 🏆 Game result screen

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes.

Responsive styling adjusts the game layout for smaller screens, including:

- Game card size
- Button size
- Typography
- Spacing

The project also supports the browser's reduced-motion preference.

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript ES6+

### Browser APIs

- LocalStorage API
- Web Audio API
- requestAnimationFrame
- Performance API
- Keyboard Events

### Fonts

- Baloo 2
- Poppins

---

## 🧠 Game Logic

The game maintains an internal state containing:

- Current score
- Number of lives
- Current streak
- Current round time
- Minimum round time
- Current word
- Timer state
- Animation state
- Answer state
- Playing state

Each round randomly selects an object from the game's word bank.

Each object contains:

```javascript
{
    word: "चिड़िया",
    emoji: "🐦",
    flies: true
}

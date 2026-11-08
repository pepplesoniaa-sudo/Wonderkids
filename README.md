# 🧩 WonderKids Puzzle Playground

An interactive, colorful, and child-friendly web puzzle playground built for young learners and kids! Featuring three distinct puzzle game modes, engaging Web Audio sound effects, and celebration mini-games.

---

## 🌟 Game Modes

### 1. 🖼️ Picture Jigsaw Puzzle

- **Themes**: Safari Fun 🦁, Dino Space 🚀, Ocean Splash 🐬, Happy Farm 🚜
- **Difficulty Settings**:
  - 🐣 **2 × 2** (4 pieces - Easy / Toddlers)
  - ⭐ **3 × 3** (9 pieces - Fun / Preschool)
  - 🏆 **4 × 4** (16 pieces - Super / Kids)
- **Features**:
  - Procedural high-definition canvas artwork generator.
  - Peek / Ghost Hint overlay to guide placement.
  - Supports both **drag-and-drop** and **tap-to-select & tap-to-place** for touchscreens and tablets.

### 2. 🦁 Wooden Animal Peg Puzzle

- **Themes**: Jungle Friends 🌴, Sweet Treats 🧁, Vehicles 🚗
- **Features**:
  - Realistic wooden board cutouts and peg handles.
  - Silhouette recognition and tactile snap-in-place mechanics.
  - Perfect for fine motor skill development.

### 3. 🃏 Animal Memory Flip

- **Card Counts**: 8 Cards (4 pairs), 12 Cards (6 pairs), 16 Cards (8 pairs)
- **Features**:
  - Smooth 3D card flip animations.
  - Move counter and match tracker.
  - Encourages visual memory and concentration.

---

## 🎉 Interactive Rewards & Sound

- **Celebration Modal**: Confetti bursts, star ratings, and an interactive **balloon-popping mini-game** when completing any puzzle.
- **Built-in Sound Effects**: Powered entirely by the **Web Audio API** synthesizer (zero external audio files required!). Includes click sounds, snap chimes, match jingles, and balloon pop effects.
- **Audio Toggle**: Easy sound ON/OFF toggle in the header.

---

## 🚀 How to Run Locally

Because the project is built with standard web technologies and has **zero external runtime dependencies**, you can run it right away:

### Option 1: Direct File Open

Double-click [`index.html`](index.html) or open it directly in any modern browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local HTTP Server (Recommended)

Using Python:

```bash
python -m http.server 8000
```

Or using Node.js:

```bash
npx serve
```

Then open `http://localhost:8000` or `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```text
Wonderkids/
├── index.html       # Semantic HTML5 layout, game containers & modals
├── style.css        # Responsive styling, animations & wooden board aesthetics
├── app.js           # Game engines, Web Audio synth, touch & drag-and-drop handlers
├── .gitignore       # Standard git ignore rules
└── README.md        # Project documentation
```

---

## 📱 Browser & Device Support

- **Desktop**: Mouse drag-and-drop or point-and-click.
- **Tablets & Mobile**: Full touch support with tap-to-select and touch drag.
- Modern browser compatibility with HTML5 Canvas, Web Audio API, and CSS Grid/Flexbox.

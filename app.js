/**
 * WonderKids Puzzle Playground
 * HTML5, Vanilla CSS, Vanilla JavaScript (No React, No TypeScript, No CSS Variables)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. SOUND MANAGER (Web Audio API - Procedural Audio, Zero Dependencies)
  // ==========================================================================
  const Sound = {
    ctx: null,
    enabled: true,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    },

    playPop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    },

    playSnap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    },

    playChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5 cheerful triad

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.28, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    },

    playFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      melody.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + i * 0.11;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.3, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.5);
      });
    },

    playBalloonPop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    }
  };

  // ==========================================================================
  // 2. CANVAS ART GENERATOR (Vibrant, high-resolution original art)
  // ==========================================================================
  const ArtGenerator = {
    canvas: null,
    ctx: null,

    init() {
      this.canvas = document.getElementById('art-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }
    },

    generateArt(theme) {
      if (!this.canvas || !this.ctx) this.init();
      const w = this.canvas.width;
      const h = this.canvas.height;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, w, h);

      if (theme === 'safari') {
        this.drawSafari(ctx, w, h);
      } else if (theme === 'space') {
        this.drawSpace(ctx, w, h);
      } else if (theme === 'ocean') {
        this.drawOcean(ctx, w, h);
      } else if (theme === 'farm') {
        this.drawFarm(ctx, w, h);
      } else {
        this.drawSafari(ctx, w, h);
      }

      return this.canvas.toDataURL('image/png');
    },

    drawSafari(ctx, w, h) {
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      sky.addColorStop(0, '#FFE8A3');
      sky.addColorStop(0.5, '#FFD166');
      sky.addColorStop(1, '#FFB703');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Smiling Sun
      ctx.fillStyle = '#FB8500';
      ctx.beginPath();
      ctx.arc(w * 0.82, h * 0.22, 65, 0, Math.PI * 2);
      ctx.fill();

      // Sun rays
      ctx.strokeStyle = '#FB8500';
      ctx.lineWidth = 6;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x1 = w * 0.82 + Math.cos(angle) * 75;
        const y1 = h * 0.22 + Math.sin(angle) * 75;
        const x2 = w * 0.82 + Math.cos(angle) * 95;
        const y2 = h * 0.22 + Math.sin(angle) * 95;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Sunglasses on sun
      ctx.fillStyle = '#212529';
      ctx.fillRect(w * 0.75, h * 0.19, 26, 16);
      ctx.fillRect(w * 0.83, h * 0.19, 26, 16);
      ctx.strokeStyle = '#212529';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w * 0.74, h * 0.23);
      ctx.lineTo(w * 0.89, h * 0.23);
      ctx.stroke();

      // Sun smile
      ctx.beginPath();
      ctx.arc(w * 0.82, h * 0.26, 12, 0, Math.PI);
      ctx.stroke();

      // Distant Safari Hills
      ctx.fillStyle = '#8CB369';
      ctx.beginPath();
      ctx.arc(w * 0.2, h * 0.85, 260, Math.PI, 0, false);
      ctx.fill();

      ctx.fillStyle = '#588157';
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.9, 320, Math.PI, 0, false);
      ctx.fill();

      // Foreground Savannah grass
      ctx.fillStyle = '#3A5A40';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);

      // Acacia Tree
      ctx.fillStyle = '#6F4E37';
      ctx.beginPath();
      ctx.moveTo(w * 0.14, h * 0.76);
      ctx.lineTo(w * 0.18, h * 0.44);
      ctx.lineTo(w * 0.24, h * 0.44);
      ctx.lineTo(w * 0.22, h * 0.76);
      ctx.fill();

      ctx.fillStyle = '#2D6A4F';
      ctx.beginPath();
      ctx.ellipse(w * 0.22, h * 0.42, 90, 34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.16, h * 0.38, 70, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cute Big Lion
      const lx = w * 0.52;
      const ly = h * 0.62;

      // Mane
      ctx.fillStyle = '#D97706';
      ctx.beginPath();
      ctx.arc(lx, ly, 95, 0, Math.PI * 2);
      ctx.fill();

      // Face
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(lx, ly, 65, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.fillStyle = '#D97706';
      ctx.beginPath();
      ctx.arc(lx - 50, ly - 50, 20, 0, Math.PI * 2);
      ctx.arc(lx + 50, ly - 50, 20, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#1F2937';
      ctx.beginPath();
      ctx.arc(lx - 24, ly - 12, 10, 0, Math.PI * 2);
      ctx.arc(lx + 24, ly - 12, 10, 0, Math.PI * 2);
      ctx.fill();

      // Eye sparkles
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(lx - 26, ly - 15, 3.5, 0, Math.PI * 2);
      ctx.arc(lx + 22, ly - 15, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Cheeks
      ctx.fillStyle = '#FDA4AF';
      ctx.beginPath();
      ctx.arc(lx - 38, ly + 14, 12, 0, Math.PI * 2);
      ctx.arc(lx + 38, ly + 14, 12, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#78350F';
      ctx.beginPath();
      ctx.moveTo(lx - 12, ly + 8);
      ctx.lineTo(lx + 12, ly + 8);
      ctx.lineTo(lx, ly + 20);
      ctx.closePath();
      ctx.fill();

      // Big Smile
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(lx - 10, ly + 24, 10, 0, Math.PI * 0.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(lx + 10, ly + 24, 10, Math.PI * 0.15, Math.PI);
      ctx.stroke();

      // Little Birds in sky
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 3;
      [[w * 0.35, h * 0.18], [w * 0.44, h * 0.22], [w * 0.52, h * 0.16]].forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.arc(bx - 8, by, 8, Math.PI, 0);
        ctx.arc(bx + 8, by, 8, Math.PI, 0);
        ctx.stroke();
      });
    },

    drawSpace(ctx, w, h) {
      const space = ctx.createLinearGradient(0, 0, 0, h);
      space.addColorStop(0, '#0F172A');
      space.addColorStop(0.5, '#1E1B4B');
      space.addColorStop(1, '#312E81');
      ctx.fillStyle = space;
      ctx.fillRect(0, 0, w, h);

      // Stars
      ctx.fillStyle = '#FFFFFF';
      const starPos = [
        [50, 40], [120, 80], [240, 50], [350, 70], [480, 40], [550, 110],
        [80, 200], [210, 180], [450, 220], [530, 290], [70, 360], [160, 420],
        [490, 420], [90, 520], [310, 530], [530, 510]
      ];
      starPos.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, (sx % 3) + 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ringed Planet
      const px = w * 0.22;
      const py = h * 0.28;
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(px, py, 60, 0, Math.PI * 2);
      ctx.fill();

      // Planet rings
      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.ellipse(px, py, 110, 28, Math.PI / -6, 0, Math.PI * 2);
      ctx.stroke();

      // Rocket
      const rx = w * 0.65;
      const ry = h * 0.55;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(-Math.PI / 4);

      // Exhaust flame
      ctx.fillStyle = '#F97316';
      ctx.beginPath();
      ctx.moveTo(-20, 75);
      ctx.lineTo(20, 75);
      ctx.lineTo(0, 130);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.moveTo(-10, 75);
      ctx.lineTo(10, 75);
      ctx.lineTo(0, 110);
      ctx.closePath();
      ctx.fill();

      // Body
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.ellipse(0, 0, 45, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.moveTo(-40, 30);
      ctx.lineTo(-75, 70);
      ctx.lineTo(-35, 65);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(40, 30);
      ctx.lineTo(75, 70);
      ctx.lineTo(35, 65);
      ctx.fill();

      // Porthole
      ctx.fillStyle = '#93C5FD';
      ctx.beginPath();
      ctx.arc(0, -15, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Friendly Alien
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(0, -15, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-6, -16, 3, 0, Math.PI * 2);
      ctx.arc(6, -16, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -12, 5, 0, Math.PI);
      ctx.stroke();

      ctx.restore();
    },

    drawOcean(ctx, w, h) {
      const ocean = ctx.createLinearGradient(0, 0, 0, h);
      ocean.addColorStop(0, '#38BDF8');
      ocean.addColorStop(0.4, '#0284C7');
      ocean.addColorStop(1, '#0C4A6E');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, w, h);

      // Light Rays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(w * 0.15 + i * 110, 0);
        ctx.lineTo(w * 0.28 + i * 110, 0);
        ctx.lineTo(w * 0.05 + i * 120, h);
        ctx.lineTo(w * -0.05 + i * 120, h);
        ctx.fill();
      }

      // Sea Floor
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.88);
      ctx.quadraticCurveTo(w * 0.3, h * 0.82, w * 0.6, h * 0.87);
      ctx.quadraticCurveTo(w * 0.85, h * 0.92, w, h * 0.86);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Corals
      ctx.fillStyle = '#F43F5E';
      ctx.beginPath();
      ctx.arc(70, h * 0.86, 35, 0, Math.PI * 2);
      ctx.arc(105, h * 0.82, 45, 0, Math.PI * 2);
      ctx.arc(140, h * 0.87, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#A855F7';
      ctx.beginPath();
      ctx.arc(w - 90, h * 0.84, 40, 0, Math.PI * 2);
      ctx.arc(w - 130, h * 0.86, 35, 0, Math.PI * 2);
      ctx.fill();

      // Happy Blue Whale
      const wx = w * 0.52;
      const wy = h * 0.44;

      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.ellipse(wx, wy, 140, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Whale Belly
      ctx.fillStyle = '#E0F2FE';
      ctx.beginPath();
      ctx.ellipse(wx + 10, wy + 40, 110, 45, 0, 0, Math.PI);
      ctx.fill();

      // Whale Tail
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.moveTo(wx - 130, wy);
      ctx.lineTo(wx - 190, wy - 45);
      ctx.lineTo(wx - 170, wy);
      ctx.lineTo(wx - 190, wy + 45);
      ctx.closePath();
      ctx.fill();

      // Whale Eye
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(wx + 80, wy - 15, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(wx + 84, wy - 18, 4, 0, Math.PI * 2);
      ctx.fill();

      // Whale Smile
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(wx + 75, wy + 15, 20, 0, Math.PI * 0.7);
      ctx.stroke();

      // Water Spout
      ctx.strokeStyle = '#BAE6FD';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(wx + 30, wy - 85);
      ctx.quadraticCurveTo(wx + 30, wy - 150, wx - 10, wy - 160);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(wx + 30, wy - 85);
      ctx.quadraticCurveTo(wx + 40, wy - 150, wx + 70, wy - 155);
      ctx.stroke();

      // Bubbles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeStyle = '#BAE6FD';
      ctx.lineWidth = 2;
      [[180, 150, 14], [210, 110, 8], [420, 320, 16], [480, 280, 10], [100, 380, 20]].forEach(([bx, by, br]) => {
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    },

    drawFarm(ctx, w, h) {
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
      sky.addColorStop(0, '#7DD3FC');
      sky.addColorStop(1, '#BAE6FD');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Rainbow
      const rx = w * 0.5;
      const ry = h * 0.65;
      const colors = ['#EF4444', '#F97316', '#FACC15', '#10B981', '#3B82F6', '#8B5CF6'];
      colors.forEach((col, i) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(rx, ry, 260 - i * 8, Math.PI, 0);
        ctx.stroke();
      });

      // Rolling Pastures
      ctx.fillStyle = '#84CC16';
      ctx.beginPath();
      ctx.arc(w * 0.15, h * 0.85, 280, Math.PI, 0, false);
      ctx.fill();

      ctx.fillStyle = '#65A30D';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.88, 300, Math.PI, 0, false);
      ctx.fill();

      // Red Barn
      const bx = w * 0.28;
      const by = h * 0.45;
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(bx, by, 160, 130);

      // Roof
      ctx.fillStyle = '#991B1B';
      ctx.beginPath();
      ctx.moveTo(bx - 15, by);
      ctx.lineTo(bx + 80, by - 65);
      ctx.lineTo(bx + 175, by);
      ctx.closePath();
      ctx.fill();

      // Barn Door
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(bx + 50, by + 45, 60, 85);
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 5;
      ctx.strokeRect(bx + 50, by + 45, 60, 85);
      ctx.beginPath();
      ctx.moveTo(bx + 50, by + 45);
      ctx.lineTo(bx + 110, by + 130);
      ctx.moveTo(bx + 110, by + 45);
      ctx.lineTo(bx + 50, by + 130);
      ctx.stroke();

      // Smiling Cow
      const cx = w * 0.72;
      const cy = h * 0.64;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 75, 55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Spots
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 15, 25, 20, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 25, cy + 10, 20, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx - 55, cy - 35, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Muzzle
      ctx.fillStyle = '#F472B6';
      ctx.beginPath();
      ctx.ellipse(cx - 65, cy - 25, 24, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nostrils
      ctx.fillStyle = '#831843';
      ctx.beginPath();
      ctx.arc(cx - 72, cy - 25, 4, 0, Math.PI * 2);
      ctx.arc(cx - 58, cy - 25, 4, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.arc(cx - 60, cy - 45, 5, 0, Math.PI * 2);
      ctx.arc(cx - 45, cy - 45, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // ==========================================================================
  // 3. MODE 1: PICTURE JIGSAW PUZZLE CONTROLLER
  // ==========================================================================
  const JigsawPuzzle = {
    gridSize: 2, // 2x2 = 4, 3x3 = 9, 4x4 = 16
    theme: 'safari',
    imageUrl: '',
    boardEl: null,
    trayEl: null,
    ghostEl: null,
    progressEl: null,
    placedCount: 0,
    selectedPieceEl: null,
    showHint: false,

    init() {
      this.boardEl = document.getElementById('jigsaw-board');
      this.trayEl = document.getElementById('jigsaw-tray');
      this.ghostEl = document.getElementById('jigsaw-ghost');
      this.progressEl = document.getElementById('jigsaw-progress');

      // Theme selector buttons
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.theme = btn.getAttribute('data-theme');
          this.reset();
        });
      });

      // Difficulty buttons
      document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.gridSize = parseInt(btn.getAttribute('data-grid'), 10);
          this.reset();
        });
      });

      // Hint Peek Button
      const hintBtn = document.getElementById('jigsaw-hint-btn');
      if (hintBtn) {
        hintBtn.addEventListener('click', () => {
          this.showHint = !this.showHint;
          if (this.ghostEl) {
            this.ghostEl.classList.toggle('visible', this.showHint);
          }
          hintBtn.innerHTML = this.showHint ? '<span>🙈</span> Hide Hint' : '<span>👁️</span> Show Hint';
          Sound.playPop();
        });
      }

      // Reset / Shuffle Button
      const resetBtn = document.getElementById('jigsaw-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          Sound.playPop();
          this.reset();
        });
      }

      this.reset();
    },

    reset() {
      this.placedCount = 0;
      this.selectedPieceEl = null;
      this.imageUrl = ArtGenerator.generateArt(this.theme);

      if (this.ghostEl) {
        this.ghostEl.style.backgroundImage = `url(${this.imageUrl})`;
      }

      this.updateProgress();
      this.buildBoard();
      this.buildPieces();
    },

    updateProgress() {
      const total = this.gridSize * this.gridSize;
      if (this.progressEl) {
        this.progressEl.textContent = `${this.placedCount} of ${total} placed`;
      }
    },

    buildBoard() {
      if (!this.boardEl) return;
      this.boardEl.innerHTML = '';
      this.boardEl.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
      this.boardEl.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;

      const total = this.gridSize * this.gridSize;
      for (let i = 0; i < total; i++) {
        const slot = document.createElement('div');
        slot.className = 'jigsaw-slot';
        slot.setAttribute('data-slot-index', i.toString());

        const num = document.createElement('span');
        num.className = 'jigsaw-slot-num';
        num.textContent = (i + 1).toString();
        slot.appendChild(num);

        // Drag & Drop events
        slot.addEventListener('dragover', (e) => {
          e.preventDefault();
          slot.classList.add('drag-over');
        });

        slot.addEventListener('dragleave', () => {
          slot.classList.remove('drag-over');
        });

        slot.addEventListener('drop', (e) => {
          e.preventDefault();
          slot.classList.remove('drag-over');
          const pieceIdx = e.dataTransfer.getData('text/plain');
          if (pieceIdx !== '') {
            this.handlePiecePlacement(parseInt(pieceIdx, 10), slot);
          }
        });

        // Click / Tap-to-Place support
        slot.addEventListener('click', () => {
          if (this.selectedPieceEl) {
            const pieceIdx = parseInt(this.selectedPieceEl.getAttribute('data-piece-index'), 10);
            this.handlePiecePlacement(pieceIdx, slot);
          }
        });

        this.boardEl.appendChild(slot);
      }
    },

    buildPieces() {
      if (!this.trayEl) return;
      this.trayEl.innerHTML = '';

      const total = this.gridSize * this.gridSize;
      const frameEl = document.querySelector('.jigsaw-frame');
      const frameWidth = frameEl ? (frameEl.clientWidth - 20) : 440;
      const pieceSize = frameWidth / this.gridSize;

      // Scramble piece indices
      const indices = [];
      for (let i = 0; i < total; i++) indices.push(i);
      indices.sort(() => Math.random() - 0.5);

      indices.forEach((index) => {
        const piece = document.createElement('div');
        piece.className = 'jigsaw-piece';
        piece.setAttribute('draggable', 'true');
        piece.setAttribute('data-piece-index', index.toString());
        piece.id = `piece-${index}`;

        piece.style.width = `${pieceSize}px`;
        piece.style.height = `${pieceSize}px`;
        piece.style.backgroundImage = `url(${this.imageUrl})`;
        piece.style.backgroundSize = `${frameWidth}px ${frameWidth}px`;

        const row = Math.floor(index / this.gridSize);
        const col = index % this.gridSize;
        const posX = -(col * pieceSize);
        const posY = -(row * pieceSize);
        piece.style.backgroundPosition = `${posX}px ${posY}px`;

        // HTML5 Drag
        piece.addEventListener('dragstart', (e) => {
          Sound.playPop();
          e.dataTransfer.setData('text/plain', index.toString());
          piece.classList.add('dragging');
          this.selectPiece(piece);
        });

        piece.addEventListener('dragend', () => {
          piece.classList.remove('dragging');
        });

        // Tap to select / deselect
        piece.addEventListener('click', (e) => {
          e.stopPropagation();
          Sound.playPop();
          if (this.selectedPieceEl === piece) {
            this.deselectPiece();
          } else {
            this.selectPiece(piece);
          }
        });

        this.trayEl.appendChild(piece);
      });
    },

    selectPiece(pieceEl) {
      if (this.selectedPieceEl) {
        this.selectedPieceEl.classList.remove('selected-piece');
      }
      this.selectedPieceEl = pieceEl;
      pieceEl.classList.add('selected-piece');

      const pieceIdx = parseInt(pieceEl.getAttribute('data-piece-index'), 10);

      // Child-friendly matching beacon: highlight target slot so kids know where it goes!
      document.querySelectorAll('.jigsaw-slot').forEach(slot => {
        const slotIdx = parseInt(slot.getAttribute('data-slot-index'), 10);
        if (slotIdx === pieceIdx && !slot.querySelector('.jigsaw-piece')) {
          slot.classList.add('selected-target');
        } else {
          slot.classList.remove('selected-target');
        }
      });
    },

    deselectPiece() {
      if (this.selectedPieceEl) {
        this.selectedPieceEl.classList.remove('selected-piece');
        this.selectedPieceEl = null;
      }
      document.querySelectorAll('.jigsaw-slot').forEach(slot => {
        slot.classList.remove('selected-target');
      });
    },

    handlePiecePlacement(pieceIndex, targetSlot) {
      const targetSlotIndex = parseInt(targetSlot.getAttribute('data-slot-index'), 10);
      const pieceEl = document.getElementById(`piece-${pieceIndex}`);

      if (!pieceEl) return;

      // Correct slot snap!
      if (pieceIndex === targetSlotIndex) {
        targetSlot.innerHTML = '';
        pieceEl.classList.remove('selected-piece');
        pieceEl.classList.add('placed');
        pieceEl.setAttribute('draggable', 'false');
        pieceEl.style.width = '100%';
        pieceEl.style.height = '100%';
        targetSlot.appendChild(pieceEl);

        Sound.playSnap();
        Sound.playChime();

        this.placedCount++;
        this.updateProgress();
        this.deselectPiece();

        const total = this.gridSize * this.gridSize;
        if (this.placedCount === total) {
          setTimeout(() => {
            Celebration.show(
              'Jigsaw Master! 🌟',
              `You completed the ${this.gridSize}×${this.gridSize} puzzle! Fantastic job!`,
              () => JigsawPuzzle.reset(),
              () => {
                if (JigsawPuzzle.gridSize < 4) {
                  JigsawPuzzle.gridSize++;
                } else {
                  JigsawPuzzle.gridSize = 2;
                }
                document.querySelectorAll('.diff-btn').forEach(btn => {
                  btn.classList.toggle('active', parseInt(btn.getAttribute('data-grid'), 10) === JigsawPuzzle.gridSize);
                });
                JigsawPuzzle.reset();
              }
            );
          }, 350);
        }
      } else {
        // Helpful feedback on wrong slot
        Sound.playPop();
        targetSlot.style.borderColor = '#EF4444';
        setTimeout(() => {
          targetSlot.style.borderColor = '';
        }, 400);
      }
    }
  };

  // ==========================================================================
  // 4. MODE 2: WOODEN ANIMAL PEG PUZZLE CONTROLLER
  // ==========================================================================
  const PegsPuzzle = {
    currentSet: 'jungle',
    sets: {
      jungle: [
        { id: 'lion', name: 'Lion', emoji: '🦁' },
        { id: 'elephant', name: 'Elephant', emoji: '🐘' },
        { id: 'giraffe', name: 'Giraffe', emoji: '🦒' },
        { id: 'monkey', name: 'Monkey', emoji: '🐒' },
        { id: 'zebra', name: 'Zebra', emoji: '🦓' }
      ],
      sweets: [
        { id: 'icecream', name: 'Ice Cream', emoji: '🍦' },
        { id: 'cupcake', name: 'Cupcake', emoji: '🧁' },
        { id: 'donut', name: 'Donut', emoji: '🍩' },
        { id: 'strawberry', name: 'Strawberry', emoji: '🍓' },
        { id: 'lollipop', name: 'Lollipop', emoji: '🍭' }
      ],
      vehicles: [
        { id: 'car', name: 'Red Car', emoji: '🚗' },
        { id: 'rocket', name: 'Rocket', emoji: '🚀' },
        { id: 'sailboat', name: 'Sailboat', emoji: '⛵' },
        { id: 'plane', name: 'Airplane', emoji: '✈️' },
        { id: 'train', name: 'Train', emoji: '🚂' }
      ]
    },
    matchedCount: 0,
    selectedPegEl: null,

    init() {
      // Theme buttons for pegs
      document.querySelectorAll('.peg-theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.peg-theme-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentSet = btn.getAttribute('data-peg-set');
          this.reset();
        });
      });

      const resetBtn = document.getElementById('pegs-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          Sound.playPop();
          this.reset();
        });
      }

      this.reset();
    },

    reset() {
      this.matchedCount = 0;
      this.selectedPegEl = null;
      this.updateProgress();

      const items = this.sets[this.currentSet] || this.sets.jungle;
      const boardEl = document.getElementById('pegs-slots-board');
      const trayEl = document.getElementById('pegs-tray');

      if (!boardEl || !trayEl) return;

      boardEl.innerHTML = '';
      trayEl.innerHTML = '';

      // Build Cutout Slots
      items.forEach(item => {
        const slot = document.createElement('div');
        slot.className = 'peg-slot';
        slot.setAttribute('data-peg-id', item.id);

        const sil = document.createElement('span');
        sil.className = 'peg-slot-silhouette';
        sil.style.fontSize = '60px';
        sil.style.lineHeight = '1';
        sil.textContent = item.emoji;

        const label = document.createElement('span');
        label.className = 'peg-slot-label';
        label.textContent = item.name;

        slot.appendChild(sil);
        slot.appendChild(label);

        // Drag & drop
        slot.addEventListener('dragover', (e) => {
          e.preventDefault();
          slot.classList.add('drag-over');
        });

        slot.addEventListener('dragleave', () => {
          slot.classList.remove('drag-over');
        });

        slot.addEventListener('drop', (e) => {
          e.preventDefault();
          slot.classList.remove('drag-over');
          const pegId = e.dataTransfer.getData('text/plain');
          this.handlePegMatch(pegId, slot);
        });

        // Click / Tap placement
        slot.addEventListener('click', () => {
          if (this.selectedPegEl) {
            const pegId = this.selectedPegEl.getAttribute('data-peg-id');
            this.handlePegMatch(pegId, slot);
          }
        });

        boardEl.appendChild(slot);
      });

      // Build Loose Pieces in Scrambled order
      const scrambled = [...items].sort(() => Math.random() - 0.5);

      scrambled.forEach(item => {
        const piece = document.createElement('div');
        piece.className = 'peg-piece';
        piece.setAttribute('draggable', 'true');
        piece.setAttribute('data-peg-id', item.id);
        piece.id = `peg-piece-${item.id}`;

        // Wooden knob
        const knob = document.createElement('div');
        knob.className = 'peg-knob';
        piece.appendChild(knob);

        // Emoji Icon
        const icon = document.createElement('span');
        icon.className = 'peg-piece-icon';
        icon.style.fontSize = '54px';
        icon.style.lineHeight = '1';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.textContent = item.emoji;
        piece.appendChild(icon);

        // Label
        const name = document.createElement('span');
        name.className = 'peg-piece-name';
        name.textContent = item.name;
        piece.appendChild(name);

        // Drag events
        piece.addEventListener('dragstart', (e) => {
          Sound.playPop();
          e.dataTransfer.setData('text/plain', item.id);
          piece.classList.add('dragging');
          this.selectPeg(piece);
        });

        piece.addEventListener('dragend', () => {
          piece.classList.remove('dragging');
        });

        // Click / Tap select
        piece.addEventListener('click', (e) => {
          e.stopPropagation();
          Sound.playPop();
          if (this.selectedPegEl === piece) {
            this.deselectPeg();
          } else {
            this.selectPeg(piece);
          }
        });

        trayEl.appendChild(piece);
      });
    },

    selectPeg(pieceEl) {
      if (this.selectedPegEl) {
        this.selectedPegEl.classList.remove('selected-peg');
      }
      this.selectedPegEl = pieceEl;
      pieceEl.classList.add('selected-peg');
      const pegId = pieceEl.getAttribute('data-peg-id');

      // Beacon highlight matching slot
      document.querySelectorAll('.peg-slot').forEach(slot => {
        const slotId = slot.getAttribute('data-peg-id');
        if (slotId === pegId && !slot.classList.contains('solved')) {
          slot.classList.add('selected-target');
        } else {
          slot.classList.remove('selected-target');
        }
      });
    },

    deselectPeg() {
      if (this.selectedPegEl) {
        this.selectedPegEl.classList.remove('selected-peg');
        this.selectedPegEl = null;
      }
      document.querySelectorAll('.peg-slot').forEach(slot => {
        slot.classList.remove('selected-target');
      });
    },

    updateProgress() {
      const items = this.sets[this.currentSet] || this.sets.jungle;
      const progressEl = document.getElementById('pegs-progress');
      if (progressEl) {
        progressEl.textContent = `${this.matchedCount} of ${items.length} matched`;
      }
    },

    handlePegMatch(pegId, slotEl) {
      const targetId = slotEl.getAttribute('data-peg-id');
      const pieceEl = document.getElementById(`peg-piece-${pegId}`);

      if (!pieceEl || slotEl.classList.contains('solved')) return;

      if (pegId === targetId) {
        // Correct snap!
        slotEl.classList.add('solved');
        pieceEl.setAttribute('draggable', 'false');
        pieceEl.classList.remove('selected-peg');
        slotEl.appendChild(pieceEl);

        Sound.playSnap();
        Sound.playChime();

        this.matchedCount++;
        this.updateProgress();
        this.deselectPeg();

        const items = this.sets[this.currentSet] || this.sets.jungle;
        if (this.matchedCount === items.length) {
          setTimeout(() => {
            Celebration.show(
              'Pegs Completed! 🎉',
              'You matched all the wooden shapes perfectly!',
              () => PegsPuzzle.reset(),
              () => {
                const sets = ['jungle', 'sweets', 'vehicles'];
                let nextIdx = (sets.indexOf(PegsPuzzle.currentSet) + 1) % sets.length;
                PegsPuzzle.currentSet = sets[nextIdx];
                document.querySelectorAll('.peg-theme-btn').forEach(b => {
                  b.classList.toggle('active', b.getAttribute('data-peg-set') === PegsPuzzle.currentSet);
                });
                PegsPuzzle.reset();
              }
            );
          }, 400);
        }
      } else {
        Sound.playPop();
        slotEl.style.transform = 'scale(0.95)';
        setTimeout(() => {
          slotEl.style.transform = '';
        }, 200);
      }
    }
  };

  // ==========================================================================
  // 5. MODE 3: ANIMAL MEMORY FLIP CONTROLLER
  // ==========================================================================
  const MemoryPuzzle = {
    pairsCount: 4, // 4 pairs = 8 cards, 6 pairs = 12 cards, 8 pairs = 16 cards
    cards: [],
    flippedCards: [],
    isLocked: false,
    moves: 0,
    matches: 0,

    allAnimals: [
      { id: 'pup', name: 'Puppy', emoji: '🐶' },
      { id: 'kit', name: 'Kitty', emoji: '🐱' },
      { id: 'bun', name: 'Bunny', emoji: '🐰' },
      { id: 'pan', name: 'Panda', emoji: '🐼' },
      { id: 'fox', name: 'Fox', emoji: '🦊' },
      { id: 'fro', name: 'Froggy', emoji: '🐸' },
      { id: 'pen', name: 'Penguin', emoji: '🐧' },
      { id: 'lio', name: 'Lion', emoji: '🦁' }
    ],

    init() {
      // Memory size buttons
      document.querySelectorAll('.memory-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.memory-size-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.pairsCount = parseInt(btn.getAttribute('data-pairs'), 10);
          this.reset();
        });
      });

      const resetBtn = document.getElementById('memory-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          Sound.playPop();
          this.reset();
        });
      }

      this.reset();
    },

    reset() {
      this.moves = 0;
      this.matches = 0;
      this.flippedCards = [];
      this.isLocked = false;
      this.updateStats();

      const gridEl = document.getElementById('memory-grid');
      if (!gridEl) return;

      const totalCards = this.pairsCount * 2;
      gridEl.className = `memory-grid cards-${totalCards}`;
      gridEl.innerHTML = '';

      // Pick chosen pairs
      const selected = this.allAnimals.slice(0, this.pairsCount);
      const deck = [...selected, ...selected];
      deck.sort(() => Math.random() - 0.5);

      deck.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-id', item.id);
        card.setAttribute('data-index', index.toString());

        // Card Back
        const back = document.createElement('div');
        back.className = 'card-face card-back';

        // Card Front
        const front = document.createElement('div');
        front.className = 'card-face card-front';

        const emoji = document.createElement('span');
        emoji.className = 'card-emoji';
        emoji.textContent = item.emoji;

        const name = document.createElement('span');
        name.className = 'card-name';
        name.textContent = item.name;

        front.appendChild(emoji);
        front.appendChild(name);

        card.appendChild(back);
        card.appendChild(front);

        card.addEventListener('click', () => this.handleCardClick(card));
        gridEl.appendChild(card);
      });
    },

    updateStats() {
      const movesEl = document.getElementById('memory-moves');
      const matchesEl = document.getElementById('memory-matches');
      if (movesEl) movesEl.textContent = this.moves.toString();
      if (matchesEl) matchesEl.textContent = `${this.matches} / ${this.pairsCount}`;
    },

    handleCardClick(card) {
      if (this.isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
      }

      Sound.playPop();
      card.classList.add('flipped');
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.updateStats();
        this.checkMatch();
      }
    },

    checkMatch() {
      const [c1, c2] = this.flippedCards;
      const match = c1.getAttribute('data-id') === c2.getAttribute('data-id');

      if (match) {
        Sound.playChime();
        c1.classList.add('matched');
        c2.classList.add('matched');
        this.matches++;
        this.flippedCards = [];
        this.updateStats();

        if (this.matches === this.pairsCount) {
          setTimeout(() => {
            Celebration.show(
              'Memory Star! 🌟',
              `You found all pairs in just ${this.moves} moves! Great memory!`,
              () => MemoryPuzzle.reset(),
              () => {
                if (MemoryPuzzle.pairsCount < 8) {
                  MemoryPuzzle.pairsCount = MemoryPuzzle.pairsCount === 4 ? 6 : 8;
                } else {
                  MemoryPuzzle.pairsCount = 4;
                }
                document.querySelectorAll('.memory-size-btn').forEach(b => {
                  b.classList.toggle('active', parseInt(b.getAttribute('data-pairs'), 10) === MemoryPuzzle.pairsCount);
                });
                MemoryPuzzle.reset();
              }
            );
          }, 450);
        }
      } else {
        this.isLocked = true;
        setTimeout(() => {
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
          this.flippedCards = [];
          this.isLocked = false;
        }, 900);
      }
    }
  };

  // ==========================================================================
  // 6. CELEBRATION MODAL & BALLOON POPPING MINI-GAME
  // ==========================================================================
  const Celebration = {
    modalEl: null,
    titleEl: null,
    msgEl: null,
    balloonContainer: null,
    replayBtn: null,
    nextBtn: null,
    onReplayCallback: null,
    onNextCallback: null,

    init() {
      this.modalEl = document.getElementById('win-modal');
      this.titleEl = document.getElementById('win-title');
      this.msgEl = document.getElementById('win-message');
      this.balloonContainer = document.getElementById('balloon-container');
      this.replayBtn = document.getElementById('win-replay-btn');
      this.nextBtn = document.getElementById('win-next-btn');

      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => {
          Sound.playPop();
          this.hide();
          if (this.onReplayCallback) this.onReplayCallback();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          Sound.playPop();
          this.hide();
          if (this.onNextCallback) this.onNextCallback();
        });
      }
    },

    show(title, message, onReplay, onNext) {
      if (!this.modalEl) this.init();
      Sound.playFanfare();

      this.onReplayCallback = onReplay;
      this.onNextCallback = onNext;

      if (this.titleEl) this.titleEl.textContent = title;
      if (this.msgEl) this.msgEl.textContent = message;

      this.spawnBalloons();
      this.modalEl.classList.add('show');
      this.modalEl.setAttribute('aria-hidden', 'false');
    },

    hide() {
      if (this.modalEl) {
        this.modalEl.classList.remove('show');
        this.modalEl.setAttribute('aria-hidden', 'true');
      }
      if (this.balloonContainer) {
        this.balloonContainer.innerHTML = '';
      }
    },

    spawnBalloons() {
      if (!this.balloonContainer) return;
      this.balloonContainer.innerHTML = '';

      const colors = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#FF923C', '#9B5DE5'];
      const count = 7;

      for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        const color = colors[i % colors.length];
        balloon.style.backgroundColor = color;
        balloon.style.left = `${10 + (i * 12)}%`;
        balloon.style.animationDelay = `${(i * 0.45)}s`;
        balloon.style.animationDuration = `${2.8 + (i % 3) * 0.4}s`;

        balloon.addEventListener('click', (e) => {
          e.stopPropagation();
          Sound.playBalloonPop();
          balloon.classList.add('popping');
          setTimeout(() => {
            balloon.remove();
          }, 240);
        });

        this.balloonContainer.appendChild(balloon);
      }
    }
  };

  // ==========================================================================
  // 7. MAIN APP ROUTER & INITIALIZATION
  // ==========================================================================
  function initApp() {
    ArtGenerator.init();
    Celebration.init();

    // Mode Switcher Buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    const views = {
      jigsaw: document.getElementById('jigsaw-section'),
      pegs: document.getElementById('pegs-section'),
      memory: document.getElementById('memory-section')
    };

    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.playPop();
        const targetMode = btn.getAttribute('data-mode');

        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Object.keys(views).forEach(mode => {
          if (views[mode]) {
            views[mode].classList.toggle('active-view', mode === targetMode);
          }
        });
      });
    });

    // Sound Toggle Button
    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = soundBtn ? soundBtn.querySelector('.tool-text') : null;

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = Sound.toggle();
        if (isEnabled) {
          Sound.playPop();
          soundBtn.classList.remove('muted');
          if (soundIcon) soundIcon.textContent = '🔊';
          if (soundText) soundText.textContent = 'Sound: ON';
        } else {
          soundBtn.classList.add('muted');
          if (soundIcon) soundIcon.textContent = '🔇';
          if (soundText) soundText.textContent = 'Sound: OFF';
        }
      });
    }

    // Initialize all 3 puzzle sub-systems
    JigsawPuzzle.init();
    PegsPuzzle.init();
    MemoryPuzzle.init();

    // Unlock audio context on initial touch/click
    const unlockAudio = () => {
      Sound.init();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();

  import React, { useEffect, useRef } from 'react';

  const RobotDance = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const ctx = canvas.getContext('2d');
      let ts = 1;
      let lastTime = 0;
      let ground = 1.0;
      const dancers = [];

      const struct = {
        points: [
          { x: 0, y: -4, f(s, d) { this.y -= 0.01 * s * ts; } },
          { x: 0, y: -16, f(s, d) { this.y -= 0.02 * s * d * ts; } },
          { x: 0, y: 12, f(s, d) { this.y += 0.02 * s * d * ts; } },
          { x: -12, y: 0 }, { x: 12, y: 0 },
          { x: -3, y: 34, f(s, d) { if (d > 0) { this.x += 0.01 * s * ts; this.y -= 0.015 * s * ts; } else { this.y += 0.02 * s * ts; } } },
          { x: 3, y: 34, f(s, d) { if (d > 0) { this.y += 0.02 * s * ts; } else { this.x -= 0.01 * s * ts; this.y -= 0.015 * s * ts; } } },
          { x: -28, y: 0, f(s, d) { this.x += this.vx * 0.025 * ts; this.y -= 0.001 * s * ts; } },
          { x: 28, y: 0, f(s, d) { this.x += this.vx * 0.025 * ts; this.y -= 0.001 * s * ts; } },
          { x: -3, y: 64, f(s, d) { this.y += 0.015 * s * ts; if (d > 0) this.y -= 0.01 * s * ts; else this.y += 0.05 * s * ts; } },
          { x: 3, y: 64, f(s, d) { this.y += 0.015 * s * ts; if (d > 0) this.y += 0.05 * s * ts; else this.y -= 0.01 * s * ts; } }
        ],
        links: [
          { p0: 3, p1: 7, size: 12, lum: 0.5 }, { p0: 1, p1: 3, size: 24, lum: 0.5 },
          { p0: 1, p1: 0, size: 60, lum: 0.5, disk: 1 }, { p0: 5, p1: 9, size: 16, lum: 0.5 },
          { p0: 2, p1: 5, size: 32, lum: 0.5 }, { p0: 1, p1: 2, size: 50, lum: 1 },
          { p0: 6, p1: 10, size: 16, lum: 1.5 }, { p0: 2, p1: 6, size: 32, lum: 1.5 },
          { p0: 4, p1: 8, size: 12, lum: 1.5 }, { p0: 1, p1: 4, size: 24, lum: 1.5 }
        ]
      };

      class Robot {
        constructor(color, light, size, x, y, struct) {
          this.x = x; this.points = []; this.links = []; this.frame = 0; this.dir = 1;
          this.size = size; this.color = Math.round(color); this.light = light;
          for (const p of struct.points) this.points.push(new Point(size * p.x + x, size * p.y + y, p.f));
          for (const link of struct.links) {
            const p0 = this.points[link.p0], p1 = this.points[link.p1];
            const dx = p0.x - p1.x, dy = p0.y - p1.y;
            this.links.push(new Link(this, p0, p1, Math.sqrt(dx * dx + dy * dy), link.size * size / 3, link.lum, link.force, link.disk));
          }
        }
        update() {
          if (++this.frame % Math.round(20 / ts) === 0) this.dir = -this.dir;
          for (const link of this.links) link.update();
          for (const point of this.points) point.update(this);
          for (const link of this.links) {
            const p1 = link.p1;
            if (p1.y > canvas.height * ground - link.size * 0.5) {
              p1.y = canvas.height * ground - link.size * 0.5;
              p1.x -= p1.vx; p1.vx = 0; p1.vy = 0;
            }
          }
          this.points[3].x += (this.x - this.points[3].x) * 0.001;
        }
        draw() {
          for (const link of this.links) {
            if (link.size) {
              const dx = link.p1.x - link.p0.x, dy = link.p1.y - link.p0.y;
              const a = Math.atan2(dy, dx);
              ctx.save();
              ctx.translate(link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25);
              ctx.rotate(a);
              ctx.drawImage(link.shadow, -link.size * 0.5, -link.size * 0.5);
              ctx.restore();
              ctx.save();
              ctx.translate(link.p0.x, link.p0.y);
              ctx.rotate(a);
              ctx.drawImage(link.image, -link.size * 0.5, -link.size * 0.5);
              ctx.restore();
            }
          }
        }
      }

      class Link {
        constructor(parent, p0, p1, dist, size, light, force, disk) {
          this.p0 = p0; this.p1 = p1; this.distance = dist; this.size = size;
          this.light = light || 1.0; this.force = force || 0.5;
          this.image = this.stroke("hsl(" + parent.color + " ,30%, " + parent.light * this.light + "%)", true, disk, dist, size);
          this.shadow = this.stroke("rgba(0,0,0,0.5)", false, disk, dist, size);
        }
        update() {
          const dx = this.p1.x - this.p0.x, dy = this.p1.y - this.p0.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.0) {
            const tw = this.p0.w + this.p1.w, r1 = this.p1.w / tw, r0 = this.p0.w / tw;
            const dz = (this.distance - dist) * this.force;
            const sx = dx / dist * dz, sy = dy / dist * dz;
            this.p1.x += sx * r0; this.p1.y += sy * r0;
            this.p0.x -= sx * r1; this.p0.y -= sy * r1;
          }
        }
        stroke(color, axis, disk, dist, size) {
          const img = document.createElement("canvas");
          img.width = dist + size; img.height = size;
          const ict = img.getContext("2d");
          ict.beginPath(); ict.lineCap = "round"; ict.lineWidth = size; ict.strokeStyle = color;
          if (disk) { ict.arc(size * 0.5 + dist, size * 0.5, size * 0.5, 0, 2 * Math.PI); ict.fillStyle = color; ict.fill(); }
          else { ict.moveTo(size * 0.5, size * 0.5); ict.lineTo(size * 0.5 + dist, size * 0.5); ict.stroke(); }
          if (axis) {
            const s = size / 10; ict.fillStyle = "#000";
            ict.fillRect(size * 0.5 - s, size * 0.5 - s, s * 2, s * 2);
            ict.fillRect(size * 0.5 - s + dist, size * 0.5 - s, s * 2, s * 2);
          }
          return img;
        }
      }

      class Point {
        constructor(x, y, fn, w) {
          this.x = x; this.y = y; this.w = w || 0.5; this.fn = fn || null;
          this.px = x; this.py = y; this.vx = 0.0; this.vy = 0.0;
        }
        update(robot) {
          if (robot === pointer.dancerDrag && this === pointer.pointDrag) {
            this.x += (pointer.x - this.x) * 0.1;
            this.y += (pointer.y - this.y) * 0.1;
          }
          if (robot !== pointer.dancerDrag) {
            this.fn && this.fn(16 * Math.sqrt(robot.size), robot.dir);
          }
          this.vx = this.x - this.px; this.vy = this.y - this.py;
          this.px = this.x; this.py = this.y;
          this.vx *= 0.995; this.vy *= 0.995;
          this.x += this.vx; this.y += this.vy + 0.01 * ts;
        }
      }

      const pointer = { x: 0, y: 0, dancerDrag: null, pointDrag: null };

      const initRobots = () => {
        dancers.length = 0;
        ground = canvas.height > 500 ? 0.85 : 1.0;
        for (let i = 0; i < 6; i++) {
          dancers.push(new Robot(i * 360 / 7, 80, Math.sqrt(Math.min(canvas.width, canvas.height)) / 6, (i + 2) * canvas.width / 9, canvas.height * 0.5 - 100, struct));
        }
      };

      const run = (time) => {
        if (lastTime !== 0) {
          const t = (time - lastTime) / 16;
          ts += (t - ts) * 0.1;
          if (ts > 1) ts = 1;
        }
        lastTime = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = "#222";
        // ctx.fillRect(0, 0, canvas.width, canvas.height * 0.15);
        // ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);

        for (const dancer of dancers) {
          dancer.update();
          dancer.draw();
        }
        requestAnimationFrame(run);
      };

      const handlePointer = (e, type) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        pointer.x = clientX - rect.left;
        pointer.y = clientY - rect.top;

        if (type === 'down') {
          for (const dancer of dancers) {
            for (const point of dancer.points) {
              const dx = pointer.x - point.x, dy = pointer.y - point.y;
              if (Math.sqrt(dx * dx + dy * dy) < 60) {
                pointer.dancerDrag = dancer;
                pointer.pointDrag = point;
                dancer.frame = 0;
              }
            }
          }
        } else if (type === 'up') {
          pointer.dancerDrag = null;
        }
      };

      canvas.addEventListener('mousedown', (e) => handlePointer(e, 'down'));
      canvas.addEventListener('mousemove', (e) => handlePointer(e, 'move'));
      window.addEventListener('mouseup', (e) => handlePointer(e, 'up'));
      canvas.addEventListener('touchstart', (e) => handlePointer(e, 'down'));
      canvas.addEventListener('touchmove', (e) => handlePointer(e, 'move'));
      window.addEventListener('touchend', (e) => handlePointer(e, 'up'));

      initRobots();
      requestAnimationFrame(run);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, []);

    return (
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100vw', 
          height: '100vh', 
          cursor: 'pointer' 
        }} 
      />
    );
  };

  export default RobotDance;
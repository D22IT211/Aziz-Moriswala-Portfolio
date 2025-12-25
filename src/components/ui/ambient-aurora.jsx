import React, { useRef, useEffect } from 'react';

const colors = [
    { r: 45, g: 212, b: 191 }, // Teal
    { r: 168, g: 85, b: 247 }, // Purple
    { r: 59, g: 130, b: 246 }, // Blue
    { r: 236, g: 72, b: 153 }  // Pink
];

class Orb {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 400 + 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(time) {
        this.x += this.vx + Math.sin(time * 0.001) * 0.5;
        this.y += this.vy + Math.cos(time * 0.001) * 0.5;

        if (this.x < -this.radius || this.x > this.canvas.width + this.radius || this.y < -this.radius || this.y > this.canvas.height + this.radius) {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        }
    }
}

const AuroraCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let time = 0;
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        let orbs = [];
        for (let i = 0; i < 10; i++) {
            orbs.push(new Orb(canvas));
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            orbs.forEach(orb => {
                orb.update(time);
                orb.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default AuroraCanvas;

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const MathBackground = () => {
    const { theme } = useTheme();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const symbols = ['\u03C0', '\u2211', '\u222B', '\u221E', '\u221A', '\u0394', '\u03B8', '\u03A9', '\u2260', '\u2248'];
        const particles = [];
        const numParticles = 40;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
                this.size = Math.random() * 20 + 10;
                this.velocity = {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                };
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.rotation += this.rotationSpeed;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.font = `${this.size}px serif`;
                ctx.fillStyle = theme === 'dark'
                    ? `rgba(255, 255, 255, ${this.opacity})`
                    : `rgba(30, 64, 175, ${this.opacity + 0.2})`; // Darker blue + higher opacity for light mode
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.text, 0, 0);

                ctx.restore();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default MathBackground;

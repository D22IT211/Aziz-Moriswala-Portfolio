import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const OrbitalPaths = () => {
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

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.005;

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const maxRadius = Math.max(canvas.width, canvas.height) * 0.7;
            const numOrbits = 6;

            ctx.lineWidth = 1;

            for (let i = 1; i <= numOrbits; i++) {
                const radius = (maxRadius / numOrbits) * i;

                // Draw Orbit Path
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.strokeStyle = theme === 'dark'
                    ? `rgba(255, 255, 255, 0.05)`
                    : `rgba(0, 0, 0, 0.05)`;
                ctx.stroke();

                // Draw Orbiting Particles
                const speed = 1 / i; // Outer orbits slower
                const angle = time * speed + (i * 10); // Offset particles

                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = theme === 'dark'
                    ? `rgba(56, 189, 248, ${0.8 - i / 10})` // Cyan fading out
                    : `rgba(37, 99, 235, ${0.8 - i / 10})`; // Blue fading out
                ctx.fill();

                // Trailing effect for particles (simple line segment)
                ctx.beginPath();
                ctx.arc(cx, cy, radius, angle, angle - 0.2, true); // Short arc tail
                ctx.strokeStyle = theme === 'dark'
                    ? `rgba(56, 189, 248, 0.2)`
                    : `rgba(37, 99, 235, 0.2)`;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default OrbitalPaths;

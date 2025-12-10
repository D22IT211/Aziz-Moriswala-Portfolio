import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const GridWaves = () => {
    const { theme } = useTheme();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let step = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const lines = [];
        const gap = 40; // Distance between horizontal lines

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            step += 0.02; // Speed of animation

            const cols = Math.floor(canvas.width / gap) + 1;
            const rows = Math.floor(canvas.height / gap) + 1;

            for (let y = 0; y < rows; y++) {
                ctx.beginPath();
                for (let x = 0; x < cols; x++) {
                    const xPos = x * gap;
                    const yPos = y * gap;

                    // 3D/Wave effect calculation
                    // Distort 'y' based on sine waves of 'x' and 'y' and time 'step'
                    const distortion = Math.sin(x * 0.1 + step) * Math.cos(y * 0.1 + step) * 20;

                    if (x === 0) {
                        ctx.moveTo(xPos, yPos + distortion);
                    } else {
                        // Creating smooth curves
                        ctx.lineTo(xPos, yPos + distortion);
                    }
                }

                // Styling
                ctx.strokeStyle = theme === 'dark'
                    ? `rgba(6, 182, 212, 0.15)` // Cyan-ish in dark mode
                    : `rgba(37, 99, 235, 0.1)`; // Blue-ish in light mode

                // Fade out at edges
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                const color = theme === 'dark' ? '6, 182, 212' : '37, 99, 235';
                gradient.addColorStop(0, `rgba(${color}, 0)`);
                gradient.addColorStop(0.5, `rgba(${color}, 0.2)`);
                gradient.addColorStop(1, `rgba(${color}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Draw points at intersections for "Grid" feel
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    if ((x + y) % 2 === 0) continue; // Skip some for cleaner look

                    const xPos = x * gap;
                    const yPos = y * gap;
                    const distortion = Math.sin(x * 0.1 + step) * Math.cos(y * 0.1 + step) * 20;

                    ctx.fillStyle = theme === 'dark'
                        ? `rgba(255, 255, 255, 0.1)`
                        : `rgba(0, 0, 0, 0.1)`;

                    ctx.beginPath();
                    ctx.arc(xPos, yPos + distortion, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
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
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default GridWaves;

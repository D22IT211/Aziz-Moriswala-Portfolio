import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CyberGrid = () => {
    const { theme } = useTheme();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let offset = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grid settings
            const gridSize = 50;
            const perspective = 300;
            const horizon = canvas.height * 0.4;

            ctx.strokeStyle = theme === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(37, 99, 235, 0.15)';
            ctx.lineWidth = 1;

            // Vertical lines with perspective
            for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, canvas.height);
                // Converge towards center at horizon
                const xPerspective = (x - canvas.width / 2) * (horizon / canvas.height) + canvas.width / 2;
                ctx.lineTo(xPerspective, horizon);
                ctx.stroke();
            }

            // Horizontal moving lines
            offset = (offset + 0.5) % gridSize;

            for (let y = canvas.height; y > horizon; y -= gridSize * (y / canvas.height)) {
                const yPos = y + offset;
                if (yPos > canvas.height) continue;

                ctx.beginPath();
                ctx.moveTo(0, yPos);
                ctx.lineTo(canvas.width, yPos);
                ctx.stroke();
            }

            // Glow effect at horizon
            const gradient = ctx.createLinearGradient(0, horizon, 0, canvas.height);
            gradient.addColorStop(0, theme === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.05)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, horizon, canvas.width, canvas.height - horizon);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default CyberGrid;

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaCloud, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql, SiKubernetes, SiTailwindcss } from 'react-icons/si';

const icons = [
    { Icon: FaReact, color: '#61DAFB', x: '10%', y: '20%', delay: 0, duration: 8 + Math.random() * 4 },
    { Icon: FaNodeJs, color: '#339933', x: '80%', y: '15%', delay: 2, duration: 8 + Math.random() * 4 },
    { Icon: FaPython, color: '#3776AB', x: '20%', y: '80%', delay: 1, duration: 8 + Math.random() * 4 },
    { Icon: FaDatabase, color: '#f29111', x: '90%', y: '70%', delay: 3, duration: 8 + Math.random() * 4 },
    { Icon: FaCloud, color: '#4285F4', x: '50%', y: '50%', delay: 4, duration: 8 + Math.random() * 4 },
    { Icon: FaDocker, color: '#2496ED', x: '15%', y: '40%', delay: 1.5, duration: 8 + Math.random() * 4 },
    { Icon: FaGitAlt, color: '#F05032', x: '85%', y: '35%', delay: 2.5, duration: 8 + Math.random() * 4 },
    { Icon: SiTypescript, color: '#3178C6', x: '30%', y: '10%', delay: 0.5, duration: 8 + Math.random() * 4 },
    { Icon: SiMongodb, color: '#47A248', x: '70%', y: '85%', delay: 3.5, duration: 8 + Math.random() * 4 },
    { Icon: SiKubernetes, color: '#326CE5', x: '40%', y: '90%', delay: 4.5, duration: 8 + Math.random() * 4 },
];

const TechIcons = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute text-4xl opacity-60 dark:opacity-20"
                    style={{
                        left: item.x,
                        top: item.y,
                        color: item.color,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 30, 0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                    }}
                >
                    <item.Icon />
                </motion.div>
            ))}
        </div>
    );
};

export default TechIcons;

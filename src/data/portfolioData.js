import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaJava, FaPython, FaDocker, FaAws, FaGitAlt, FaLinux, FaDatabase, FaChartBar, FaGithub, FaInfinity, FaServer, FaBug, FaClipboardList, FaCheckSquare, FaUserCheck, FaSearch, FaPencilRuler, FaObjectGroup, FaMobileAlt, FaFileCode, FaProjectDiagram, FaLayerGroup, FaCode, FaCloud, FaVial, FaPalette, FaChartPie } from 'react-icons/fa';
import { SiMongodb, SiFirebase, SiMysql, SiGooglecloud, SiTableau, SiPandas, SiNumpy, SiSelenium, SiFigma, SiAdobexd, SiFlutter, SiDart, SiBootstrap, SiExpress, SiC, SiCplusplus, SiLooker, SiCanva, SiGnubash } from 'react-icons/si';

export const personalInfo = {
    name: "Aziz Moriswala",
    roles: [
        "Cloud Engineer",
        "DevOps Enthusiast",
        "Full-Stack Developer",
        "Data Engineer",
        "UI/UX Designer",
        "QA Tester"
    ],
    summary: "I am a passionate IT graduate and versatile technologist with a strong foundation in Cloud Engineering, DevOps, and Full-Stack Development. My journey is defined by a relentless curiosity and a drive to build scalable, efficient, and user-centric solutions. With hands-on experience across the entire software development lifecycle—from designing intuitive UIs with Figma to deploying robust microservices on AWS and GCP—I thrive in dynamic environments where innovation meets practicality. My technical expertise spans a wide array of modern technologies including React, Node.js, Docker, and Kubernetes, complemented by a deep understanding of data engineering and cybersecurity principles. Whether it's optimizing cloud infrastructure, crafting pixel-perfect interfaces, or securing digital assets, I approach every challenge with a problem-solving mindset and a commitment to excellence. I am eager to leverage my diverse skillset to contribute to impactful projects and drive technological advancement.",
    email: "azizmoriswala94@gmail.com", // Placeholder, user didn't provide specific email in prompt text but mentioned "Include email"
    phone: "+91 95108 50552", // Placeholder
    linkedin: "https://www.linkedin.com/in/aziz-moriswala-90a618271/", // Placeholder
    github: "https://github.com/D22IT211?tab=repositories", // Placeholder
    instagram: "https://www.instagram.com/azizmoriswala_21/",
    resumePdf: "https://drive.google.com/file/d/1JNJGUvgsmQ9DSguHXs9OkLFa9yECi8vZ/view?usp=sharing"
};

export const education = [
    {
        degree: "B.Tech IT",
        institution: "CHARUSAT University",
        score: "CGPA: 7.62",
        year: "2022 - 2025" // Assumed based on internships
    },
    {
        degree: "Diploma in Computer Engineering",
        institution: "Parul Polytechnic Institute (GTU)",
        score: "CGPA: 8.26",
        year: "2019 - 2022"
    },
    {
        degree: "SSC",
        institution: "Jay Ambe Vidyalaya",
        score: "50%",
        year: "2018 - 2019"
    }
];

export const skills = [
    {
        category: "Full Stack Web Development",
        icon: FaLayerGroup,
        subcategories: [
            {
                name: "Frontend",
                items: [
                    { name: "HTML", icon: FaHtml5 },
                    { name: "CSS", icon: FaCss3Alt },
                    { name: "Bootstrap", icon: SiBootstrap },
                    { name: "JavaScript", icon: FaJs },
                    { name: "ReactJS", icon: FaReact }
                ]
            },
            {
                name: "Backend",
                items: [
                    { name: "NodeJS", icon: FaNodeJs },
                    { name: "ExpressJS", icon: SiExpress },
                    { name: "PHP", icon: FaPhp }
                ]
            },
            {
                name: "Database",
                items: [
                    { name: "MySQL", icon: SiMysql },
                    { name: "SQL Server", icon: FaDatabase },
                    { name: "Firebase", icon: SiFirebase },
                    { name: "MongoDB", icon: SiMongodb }
                ]
            }
        ]
    },
    {
        category: "Programming Languages",
        icon: FaCode,
        items: [
            { name: "C", icon: SiC },
            { name: "C++", icon: SiCplusplus },
            { name: "Java", icon: FaJava },
            { name: "Python", icon: FaPython }
        ]
    },
    {
        category: "Cloud & DevOps",
        icon: FaCloud,
        subcategories: [
            {
                name: "Cloud Platforms",
                items: [
                    { name: "GCP", icon: SiGooglecloud },
                    { name: "AWS", icon: FaAws }
                ]
            },
            {
                name: "DevOps & Tools",
                items: [
                    { name: "Docker", icon: FaDocker },
                    { name: "Git", icon: FaGitAlt },
                    { name: "GitHub", icon: FaGithub },
                    { name: "CI/CD", icon: FaInfinity }
                ]
            },
            {
                name: "System & Scripting",
                items: [
                    { name: "Linux", icon: FaLinux },
                    { name: "Bash", icon: SiGnubash },
                    { name: "Python Scripting", icon: FaPython }
                ]
            }
        ]
    },
    {
        category: "Data Engineering & Analysis",
        icon: FaChartPie,
        subcategories: [
            {
                name: "Engineering",
                items: [
                    { name: "ETL Pipelines", icon: FaProjectDiagram },
                    { name: "Data Warehousing", icon: FaServer },
                    { name: "JSON/CSV Handling", icon: FaFileCode }
                ]
            },
            {
                name: "Analysis & Visualization",
                items: [
                    { name: "Pandas", icon: SiPandas },
                    { name: "NumPy", icon: SiNumpy },
                    { name: "Power BI", icon: FaChartBar },
                    { name: "Tableau", icon: SiTableau },
                    { name: "Looker Studio", icon: SiLooker }
                ]
            }
        ]
    },
    {
        category: "QA & Testing",
        icon: FaVial,
        subcategories: [
            {
                name: "Manual",
                items: [
                    { name: "Manual Testing", icon: FaCheckSquare },
                    { name: "Test Cases", icon: FaClipboardList },
                    { name: "Bug Reporting", icon: FaBug },
                    { name: "UAT", icon: FaUserCheck }
                ]
            },
            {
                name: "Automation",
                items: [
                    { name: "Basic Selenium", icon: SiSelenium }
                ]
            }
        ]
    },
    {
        category: "UI/UX & Designing",
        icon: FaPalette,
        subcategories: [
            {
                name: "Tools",
                items: [
                    { name: "Canva", icon: SiCanva },
                    { name: "Figma", icon: SiFigma },
                    { name: "Adobe XD", icon: SiAdobexd }
                ]
            },
            {
                name: "Processes",
                items: [
                    { name: "Wireframing", icon: FaPencilRuler },
                    { name: "Prototyping", icon: FaObjectGroup },
                    { name: "Responsive UI", icon: FaMobileAlt },
                    { name: "User Research", icon: FaSearch }
                ]
            }
        ]
    }
];

export const softSkills = [
    "Observation",
    "Communication",
    "Documentation",
    "Teamwork"
];

export const experience = [
    {
        company: "CAREERNAKSHA",
        role: "UI/UX Designer Intern",
        duration: "Jan 2025 – May 2025",
        description: [
            "Designed UI with Figma & Adobe XD",
            "Conducted user research, wireframing, and prototyping",
            "Collaborated with developers"
        ]
    },
    {
        company: "PRODIGY INFOTECH",
        role: "Cyber Security Intern",
        duration: "May 2024 – Jun 2024",
        description: [
            "Encryption techniques",
            "Python encryption/decryption",
            "Steganography"
        ]
    },
    {
        company: "ARTH TECHNOLOGY",
        role: "WordPress Developer Intern",
        duration: "May 2023 – Jun 2023",
        description: [
            "Developed front-end of WordPress website",
            "Improved UX",
            "Explored plugins & tools"
        ]
    }
];

export const projects = [
    {
        id: "attendance-system",
        title: "Attendance Management System",
        tech: "React + Node + MongoDB",
        description: "A comprehensive and automated Attendance Management System designed to streamline the process of tracking student and employee attendance. Built with the MERN stack, this application replaces traditional paper-based methods with a digital solution. It features a robust backend for secure data storage and a user-friendly frontend for easy interaction. The system supports role-based access control, allowing admins to manage users, teachers to mark attendance, and students to view their records in real-time. Automated reports and analytics provide valuable insights into attendance patterns.",
        features: [
            "Real-time attendance tracking with instant updates",
            "Role-based access control (Admin, Teacher, Student)",
            "Automated report generation and analytics",
            "Leave management and approval workflow",
            "Secure authentication and data protection"
        ],
        tools: ["React", "Node.js", "Express", "MongoDB", "Material UI", "GitHub Actions"],
        image: "/images/projects/attendance-system.png",
        github: "https://github.com/Chavdawala/Attendance"
    },
    {
        id: "hopelift-quiz",
        title: "Hopelift Quiz Application",
        tech: "Dart + Firebase + Android Studio",
        description: "Hopelift Quiz is an engaging and interactive mobile application developed using Flutter and Dart. It offers a seamless user experience with a clean material design interface. The app integrates with Firebase for real-time data synchronization, ensuring that user scores and leaderboards are always up-to-date. It features multiple quiz categories, timed challenges, and a user profile system. The project demonstrates proficiency in mobile app development, state management, and cloud backend integration.",
        features: [
            "Secure user authentication via Firebase",
            "Real-time database updates for live scoring",
            "Dynamic leaderboard and score tracking",
            "Multiple quiz categories with varying difficulty",
            "Responsive material design UI"
        ],
        tools: ["Flutter", "Dart", "Firebase", "Android Studio", "GitHub Actions"],
        image: "/images/projects/hopelift-quiz.png",
        github: "https://github.com/D22IT211/HopeLift"
    },
    {
        id: "charusat-medicare",
        title: "CHARUSAT Medicare WebApp",
        tech: "HTML/CSS/JS/PHP",
        description: "The CHARUSAT Medicare WebApp is a digital solution tailored for university medical centers. It simplifies the management of patient records, appointments, and medical inventory. Developed using core web technologies (HTML, CSS, JavaScript, PHP) and MySQL, it ensures reliability and speed. The system allows students and staff to book appointments online, while doctors can manage schedules and view patient history. It also includes an inventory module to track medicine stocks and alert administrators when supplies are low.",
        features: [
            "Online appointment booking system",
            "Comprehensive patient history management",
            "Real-time medical inventory tracking",
            "Doctor schedule and availability management",
            "Admin dashboard for clinic analytics"
        ],
        tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "GitHub Actions"],
        image: "/images/projects/medicare-webapp.png",
        github: "https://github.com/D22IT211/Charusat-Medicare."
    },
    {
        id: "global-cart",
        title: "Global Cart WebApp",
        tech: "Grocery E-Commerce",
        description: "Global Cart is a full-featured e-commerce platform designed for the modern grocery shopping experience. It provides a seamless interface for users to browse products, manage their cart, and securely checkout. The application handles complex state management for the shopping cart and integrates with payment gateways for processing transactions. It also features a user profile section for order history and address management, making it a complete solution for online retail.",
        features: [
            "Extensive product catalog with search and filter",
            "Dynamic shopping cart with persistent state",
            "User profile management and order history",
            "Secure checkout process",
            "Responsive design for mobile and desktop"
        ],
        tools: ["React", "Redux", "Node.js", "Stripe API", "GitHub Actions"],
        image: "/images/projects/global-cart.png",
        github: "https://github.com/D22IT211/Global_Cart"
    },
    {
        id: "intouch-social",
        title: "Intouch Social Media WebApp",
        tech: "MERN Stack",
        description: "Intouch is a dynamic social networking platform built with the MERN stack, designed to connect people. It features real-time interactions including live chat, notifications, and feed updates. Users can create posts, like and comment on content, and manage their friend connections. The application utilizes Socket.io for instant messaging and real-time updates, providing an immersive social experience. It demonstrates advanced full-stack development skills including authentication, database design, and websocket implementation.",
        features: [
            "Post creation, sharing, and interaction (likes/comments)",
            "Real-time chat messaging using Socket.io",
            "Friend request and connection management",
            "Instant notifications for user activities",
            "Secure JWT authentication"
        ],
        tools: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "GitHub Actions"],
        image: "/images/projects/intouch-social.png",
        github: "https://github.com/D22IT211/InTouch"
    },
    {
        id: "notes-app",
        title: "Notes Management WebApp",
        tech: "MERN Stack",
        description: "Comprehensive note-taking application with full CRUD operations, user authentication, and cloud synchronization. Built with the MERN stack, it offers a seamless experience for organizing thoughts, ideas, and tasks. Users can create, edit, delete, and categorize notes with ease. The application features a clean, responsive interface and ensures data security through JWT authentication.",
        features: [
            "Full CRUD operations for notes",
            "Secure user authentication (JWT)",
            "Cloud synchronization for data persistence",
            "Rich text editing capabilities",
            "Responsive and intuitive user interface"
        ],
        tools: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "GitHub Actions"],
        image: "/images/projects/notes-app.png",
        github: "https://github.com/D22IT211/Notes-Management-App/tree/master"
    },
    {
        id: "portfolio-pro",
        title: "Ultimate Portfolio Website",
        tech: "React + Tailwind + Motion",
        description: "A high-performance, interactive portfolio featuring advanced animations, dark mode, and a custom design system. Built with React and Vite for speed, it showcases responsive UI patterns and seamless page transitions. This project represents a culmination of modern frontend practices, including component-driven architecture and accessible design.",
        features: [
            "Advanced animations with Framer Motion",
            "Dark mode support with system preference detection",
            "Responsive design for all devices",
            "Interactive UI components (Code Frame, Showcase)",
            "Optimized performance and SEO"
        ],
        tools: ["React", "Tailwind CSS", "Framer Motion", "Vite", "Shadcn UI"],
        image: "https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2070&auto=format&fit=crop",
        github: "https://github.com/D22IT211/Portfolio"
    }
];

export const certifications = [
    {
        name: "Google Cloud Associate Cloud Engineer",
        issuer: "Google Cloud",
        link: "#"
    },
    {
        name: "AWS Academy Graduate - Cloud Foundations",
        issuer: "AWS Academy",
        link: "#"
    },
    {
        name: "Google Cybersecurity Professional Certificate",
        issuer: "Coursera",
        link: "#"
    },
    {
        name: "JPMorgan Chase & Co. Software Engineering Lite",
        issuer: "Forage",
        link: "#"
    },
    {
        name: "Kubernetes for the Absolute Beginners",
        issuer: "KodeKloud",
        link: "#"
    },
    {
        name: "NPTEL - Cloud Computing",
        issuer: "NPTEL",
        link: "#"
    },
    {
        name: "Belkasoft Evidence Center X",
        issuer: "Belkasoft",
        link: "#"
    },
    {
        name: "Data Analyst Associate",
        issuer: "DataCamp",
        link: "#"
    }
];

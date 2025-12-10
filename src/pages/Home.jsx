import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';

const Home = () => {
    // Hash scrolling is handled by ScrollToTop component

    return (
        <>
            <Helmet>
                <title>Aziz Moriswala | Cloud Engineer & Full Stack Developer</title>
                <meta name="description" content="Portfolio of Aziz Moriswala - Cloud Engineer, DevOps Enthusiast, Full-Stack Developer, and UI/UX Designer." />
            </Helmet>

            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                {/* Projects Preview (Limit 4) */}
                <Projects limit={4} />
                <Certifications />
                <Contact />
            </main>
        </>
    );
};

export default Home;

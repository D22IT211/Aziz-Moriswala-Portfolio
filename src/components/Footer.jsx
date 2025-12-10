import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
    return (
        <footer className="relative pt-20 pb-10 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0 opacity-50 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <Link
                            to="/"
                            className="text-4xl font-bold font-signature bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Aziz
                        </Link>
                        <p className="text-lg leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                            Building digital experiences that merge creativity with technical excellence. Let's create something amazing together.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href={personalInfo.github} icon={<FaGithub />} label="GitHub" />
                            <SocialLink href={personalInfo.linkedin} icon={<FaLinkedin />} label="LinkedIn" />
                            <SocialLink href={personalInfo.instagram} icon={<FaInstagram />} label="Instagram" />
                            <SocialLink href="https://wa.me/919510850552" icon={<FaWhatsapp />} label="WhatsApp" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                                        className="hover:text-blue-500 transition-colors flex items-center gap-2 group"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Contact</h4>
                        <div className="space-y-4">
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 group" style={{ color: 'var(--text-secondary)' }}>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <FaEnvelope />
                                </div>
                                <span className="group-hover:text-blue-500 transition-colors">{personalInfo.email}</span>
                            </a>
                            <a href="tel:+919510850552" className="flex items-center gap-3 group" style={{ color: 'var(--text-secondary)' }}>
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                                    <FaPhone />
                                </div>
                                <span className="group-hover:text-green-500 transition-colors">+91 95108 50552</span>
                            </a>
                            <div className="flex items-center gap-3 group" style={{ color: 'var(--text-secondary)' }}>
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                    <FaMapMarkerAlt />
                                </div>
                                <span>Vadodara, Gujarat, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        &copy; {new Date().getFullYear()} Aziz Moriswala. All rights reserved.
                    </p>
                    <div className="flex flex-col items-center md:items-end gap-1">
                        <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Designed & Developed by Aziz Moriswala
                        </p>
                        <p className="flex items-center gap-2 text-xs font-medium opacity-80" style={{ color: 'var(--text-primary)' }}>
                            Proud to be Indian <span className="text-base">🇮🇳</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        data-magnetic
        className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-gradient-to-tr hover:from-blue-600 hover:to-purple-600 hover:text-white text-[var(--text-secondary)]"
    >
        {icon}
    </a>
);

export default Footer;

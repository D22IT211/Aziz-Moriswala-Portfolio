import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { FaEnvelope, FaPhone, FaLinkedin, FaPaperPlane, FaCheckCircle, FaTimes, FaShieldAlt, FaChevronDown } from 'react-icons/fa';
import { FloatingPaths } from '../ui/background-paths';
import { countryCodes } from '../../data/countryCodes';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

    // Default to India or finding from list
    const [selectedCountry, setSelectedCountry] = useState(countryCodes.find(c => c.code === 'IN') || countryCodes[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = true;
        if (!formData.email.trim()) newErrors.email = true;
        if (!formData.phone.trim()) newErrors.phone = true;
        if (!formData.subject.trim()) newErrors.subject = true;
        if (!formData.message.trim()) newErrors.message = true;
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Custom Validation
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: "b6a5911e-9e47-490b-b805-1571905944ec",
                    ...formData,
                    phone: `${selectedCountry.dial_code} ${formData.phone}`, // Send full number
                    subject: `New Portfolio Contact: ${formData.subject}`,
                    from_name: formData.name,
                })
            });

            const result = await response.json();

            if (result.success) {
                setShowPopup(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setShowPopup(false), 5000);
            } else {
                console.error("Web3Forms Error:", result);
                alert(`Failed to send: ${result.message || "Unknown error"}. Please check console.`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Network error. Please check your connection or try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants for shake effect
    const inputVariants = {
        idle: { x: 0 },
        error: {
            x: [0, -10, 10, -10, 10, 0],
            borderColor: "#ef4444",
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Get In Touch</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/3 space-y-8"
                    >
                        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Let's Talk</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            I'm currently available for freelance projects and full-time opportunities.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full shadow-md flex items-center justify-center" style={{ background: 'var(--bg-card)', color: 'var(--primary)' }}>
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</p>
                                    <a href={`mailto:${personalInfo.email}`} className="font-medium hover:text-blue-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{personalInfo.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full shadow-md flex items-center justify-center" style={{ background: 'var(--bg-card)', color: 'var(--secondary)' }}>
                                    <FaPhone />
                                </div>
                                <div>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Phone</p>
                                    <a href={`tel:${personalInfo.phone}`} className="font-medium hover:text-blue-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{personalInfo.phone}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full shadow-md flex items-center justify-center" style={{ background: 'var(--bg-card)', color: '#0077b5' }}>
                                    <FaLinkedin />
                                </div>
                                <div>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>LinkedIn</p>
                                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-600 transition-colors" style={{ color: 'var(--text-primary)' }}>Aziz Moriswala</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:w-2/3"
                    >
                        <form className="glass-card p-5 md:p-8 space-y-6" style={{ background: 'var(--bg-card)' }} onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Name</label>
                                    <motion.input
                                        type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                        style={{ background: 'var(--bg-base)', borderColor: errors.name ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                        placeholder="John Doe"
                                        variants={inputVariants}
                                        animate={errors.name ? "error" : "idle"}
                                    />
                                    {errors.name && <span className="text-xs text-red-500 ml-1">Name is required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email</label>
                                    <motion.input
                                        type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                        style={{ background: 'var(--bg-base)', borderColor: errors.email ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                        placeholder="john@example.com"
                                        variants={inputVariants}
                                        animate={errors.email ? "error" : "idle"}
                                    />
                                    {errors.email && <span className="text-xs text-red-500 ml-1">Email is required</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 relative z-20">
                                    <label htmlFor="phone" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                                    <div className="relative">
                                        <div className="flex gap-2">
                                            {/* Country Dropdown Trigger */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                    className={`h-full px-3 py-3 rounded-lg border outline-none transition-all focus:ring-2 flex items-center gap-2 min-w-[90px] sm:min-w-[120px] justify-between cursor-pointer ${errors.phone ? 'border-red-500' : ''}`}
                                                    style={{ background: 'var(--bg-base)', borderColor: errors.phone ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                                                            alt={selectedCountry.code}
                                                            className="w-6 h-4 object-cover rounded-sm"
                                                        />
                                                        <span className="text-sm font-medium">{selectedCountry.dial_code}</span>
                                                    </div>
                                                    <FaChevronDown className={`text-xs transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                <AnimatePresence>
                                                    {showDropdown && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-3rem)] max-h-60 overflow-y-auto rounded-xl border shadow-xl z-50 glass-card"
                                                            style={{
                                                                background: 'var(--bg-card)',
                                                                borderColor: 'var(--border-color)',
                                                                scrollbarWidth: 'thin'
                                                            }}
                                                        >
                                                            {countryCodes.map((country) => (
                                                                <button
                                                                    key={country.code}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSelectedCountry(country);
                                                                        setShowDropdown(false);
                                                                    }}
                                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                                                                >
                                                                    <img
                                                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                                                        alt={country.code}
                                                                        className="w-6 h-4 object-cover rounded-sm flex-shrink-0"
                                                                    />
                                                                    <span className="text-sm font-medium w-12 flex-shrink-0 text-right" style={{ color: 'var(--text-secondary)' }}>
                                                                        {country.dial_code}
                                                                    </span>
                                                                    <span className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                                                        {country.name}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Phone Input */}
                                            <motion.input
                                                type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                                                className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                                style={{ background: 'var(--bg-base)', borderColor: errors.phone ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                                placeholder="98765 43210"
                                                variants={inputVariants}
                                                animate={errors.phone ? "error" : "idle"}
                                            />
                                        </div>
                                    </div>
                                    {errors.phone && <span className="text-xs text-red-500 ml-1">Phone is required</span>}
                                </div>
                                <div className="space-y-2 relative z-10">
                                    <label htmlFor="subject" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                                    <motion.input
                                        type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 ${errors.subject ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                        style={{ background: 'var(--bg-base)', borderColor: errors.subject ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                        placeholder="Project Inquiry"
                                        variants={inputVariants}
                                        animate={errors.subject ? "error" : "idle"}
                                    />
                                    {errors.subject && <span className="text-xs text-red-500 ml-1">Subject is required</span>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Message</label>
                                <motion.textarea
                                    id="message" name="message" value={formData.message} onChange={handleChange} rows="4"
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                    style={{ background: 'var(--bg-base)', borderColor: errors.message ? '#ef4444' : 'var(--border-color)', color: 'var(--text-primary)' }}
                                    placeholder="Tell me about your project..."
                                    variants={inputVariants}
                                    animate={errors.message ? "error" : "idle"}
                                ></motion.textarea>
                                {errors.message && <span className="text-xs text-red-500 ml-1">Message is required</span>}
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Sending...' : (
                                    <>Send Message <FaPaperPlane className="ml-2" /></>
                                )}
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs opacity-60 mt-4" style={{ color: 'var(--text-secondary)' }}>
                                <FaShieldAlt className="text-sm" />
                                <span>This form is secure & encrypted.</span>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div >

            {/* Success Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setShowPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="relative rounded-2xl p-8 max-w-sm w-full shadow-2xl overflow-hidden glass-card border border-white/20 dark:border-slate-700/50"
                            style={{
                                background: 'var(--bg-card)',
                                backdropFilter: 'blur(16px)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient background glow */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500" />
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />

                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-70 hover:opacity-100"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <FaTimes />
                            </button>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                                    className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
                                >
                                    <FaCheckCircle className="text-4xl text-white" />
                                </motion.div>

                                <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                                    Message Sent!
                                </h3>

                                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    Thanks for reaching out, <strong>{formData.name || 'Friend'}</strong>! <br /> I'll get back to you shortly.
                                </p>

                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default Contact;

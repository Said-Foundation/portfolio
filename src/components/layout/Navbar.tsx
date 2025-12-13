import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../../data/portfolio'
import { NAV_ITEMS } from '../../config/navigation'

interface NavbarProps {
    activeSection: string
    scrollToSection: (sectionId: string) => void
}

const Navbar = ({ activeSection, scrollToSection }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
        if (item.type === 'external' && item.href) {
            window.location.href = item.href
            return
        }
        scrollToSection(item.id)
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Glass Container */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <div className="relative flex h-16 items-center justify-between rounded-full border border-white/10 bg-black/60 shadow-lg backdrop-blur-md px-6">

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => scrollToSection('home')}
                    >
                        <img
                            src={portfolioData.images.logo}
                            alt="Logo"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="font-semibold text-white tracking-tight">{portfolioData.name}</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 rounded-full bg-white/10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-4 right-4 z-40"
                    >
                        <div className="rounded-2xl border border-white/10 bg-black/90 shadow-xl backdrop-blur-xl p-4 flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${activeSection === item.id
                                            ? 'bg-white/10 text-white font-medium'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    onClick={() => handleNavClick(item)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar

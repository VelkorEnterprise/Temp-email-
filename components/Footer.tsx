import React, { useState } from 'react';
import { keywords } from '../data/keywords.ts';
import { useTranslation, languages } from '../contexts/LanguageContext.tsx';
import { Icons } from './icons/Icons.tsx';

const shuffledKeywords = keywords.sort(() => 0.5 - Math.random()).slice(0, 30);

interface FooterProps {
    onNavigateBlog?: () => void;
    onGoHome?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateBlog, onGoHome }) => {
    const { language, setLanguage, t } = useTranslation();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const linkClasses = "hover:text-indigo-400 transition-colors uppercase font-black tracking-widest text-[10px] cursor-pointer text-left";

    const handleLanguageChange = (langKey: string) => {
        setLanguage(langKey);
        setIsLangMenuOpen(false);
    };

    const handleActionLink = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#0f172a] border-t border-white/5">
            <div className="bg-black/50 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-black text-indigo-400 uppercase tracking-[0.2em] text-xs mb-8">Popular Searches</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {shuffledKeywords.map((keyword, index) => (
                            <span 
                                key={index} 
                                onClick={handleActionLink}
                                className="bg-white/5 border border-white/5 text-gray-500 text-[10px] font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-600/20 hover:text-indigo-400 hover:border-indigo-500/20 transition-all uppercase tracking-widest"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="py-12 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 text-gray-500">
                        <button onClick={handleActionLink} className={linkClasses}>PREMIUM</button>
                        <button onClick={handleActionLink} className={linkClasses}>API</button>
                        <button onClick={onNavigateBlog} className={linkClasses}>Privacy Hub</button>
                        <button onClick={handleActionLink} className={linkClasses}>10 MINUTE MAIL</button>
                        <button onClick={handleActionLink} className={linkClasses}>Email Generator</button>
                        <button onClick={handleActionLink} className={linkClasses}>Privacy</button>
                        <button onClick={handleActionLink} className={linkClasses}>Terms</button>
                        <button onClick={handleActionLink} className={linkClasses}>FAQ</button>
                        <button onClick={handleActionLink} className={linkClasses}>Contacts</button>
                        <button onClick={handleActionLink} className={linkClasses}>Advertising</button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-6 text-xs font-black text-gray-600 uppercase tracking-widest">
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors uppercase">Temp Number</button>
                            <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors uppercase">10MinuteMail</button>
                            <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                            <button onClick={handleActionLink} className="hover:text-teal-400 transition-colors uppercase">My Phone Number</button>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-2 hover:bg-white/10 text-white flex items-center gap-3 uppercase text-xs font-black tracking-widest transition-all"
                            >
                                {language}
                                <Icons.ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute bottom-full mb-3 right-0 w-48 bg-[#1a1c23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
                                    <div className="max-h-60 overflow-y-auto no-scrollbar">
                                        {Object.entries(languages).map(([key, name]) => (
                                            <button 
                                                key={key}
                                                onClick={() => handleLanguageChange(key)}
                                                className="block w-full text-left px-5 py-3 text-xs font-bold text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors"
                                            >
                                                {name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center text-[10px] font-black text-gray-700 uppercase tracking-[0.3em]">
                        &copy; 2026 Temp Mail Pro — The No.1 Privacy Service
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
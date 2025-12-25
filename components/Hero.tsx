
import React, { useState } from 'react';
import { EmailAccount } from '../types.ts';
import { Icons } from './icons/Icons.tsx';
import { useTranslation } from '../contexts/LanguageContext.tsx';

interface HeroProps {
    emailAccount: EmailAccount | null;
    onDeleteEmail: () => void;
    onNewEmail?: () => void;
    onNavigateBlog?: () => void;
    isCreating: boolean;
    isDeleting: boolean;
    loadingMessage: string;
}

const Hero: React.FC<HeroProps> = ({ emailAccount, onDeleteEmail, onNewEmail, onNavigateBlog, isCreating, isDeleting, loadingMessage }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const { t } = useTranslation();

    const handleCopyEmail = () => {
        if (emailAccount) {
            navigator.clipboard.writeText(emailAccount.address);
            setCopySuccess(t('copied'));
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    return (
        <div className="relative overflow-hidden pt-16 pb-12 px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {t('liveAnonymitySystem')}
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
                    {t('yourTemporary')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-indigo-600 block mt-2">
                        {t('emailAddress')}
                    </span>
                </h1>

                <div className="glass-panel rounded-[2.5rem] p-6 md:p-12 glow-shadow mb-10 relative group border border-white/10">
                    <div className="relative bg-[#0f172a]/80 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-8 border border-white/5">
                        <div className="text-center w-full">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-indigo-400/80 font-black mb-5 block">{t('activeBurnerId')}</label>
                            <div className="flex items-center justify-center min-h-[4rem]">
                                <span className={`text-2xl md:text-4xl font-mono font-medium break-all tracking-tighter transition-all duration-300 ${isCreating ? 'text-indigo-400/50 animate-pulse' : 'text-white'}`}>
                                    {isCreating ? (loadingMessage || t('loading')) : (emailAccount?.address || t('loading'))}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 w-full max-w-sm">
                            <button 
                                onClick={handleCopyEmail} 
                                disabled={!emailAccount || isCreating}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-4 transform active:scale-95 disabled:opacity-30 shadow-xl shadow-indigo-600/30 border border-white/10"
                            >
                                <Icons.Copy className="w-5 h-5"/>
                                <span className="uppercase tracking-widest text-xs">{copySuccess || t('copy')}</span>
                            </button>
                            {onNewEmail && (
                                <button 
                                    onClick={onNewEmail} 
                                    disabled={isCreating || isDeleting}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 disabled:opacity-50 border border-white/10 backdrop-blur-sm"
                                >
                                    {isCreating ? <Icons.Spinner className="w-5 h-5 animate-spin"/> : <Icons.Change className="w-5 h-5"/>}
                                    <span className="uppercase tracking-widest text-xs">{t('change')}</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-10 text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic font-medium opacity-70 px-4">
                        "{t('heroQuote')}"
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-3 bg-teal-500/5 border border-teal-500/10 px-5 py-2.5 rounded-full">
                        <span className="text-teal-400 text-sm">📲</span>
                        <span className="text-[10px] font-black text-teal-400/80 uppercase tracking-widest">{t('tempNumberPlus')}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-2.5 rounded-full">
                        <span className="text-indigo-400 text-sm">✓</span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('noSignupRequired')}</span>
                    </div>
                </div>

                <button 
                    onClick={onNavigateBlog}
                    className="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600/5 hover:bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] transition-all group"
                >
                    <Icons.Inbox className="w-5 h-5" />
                    {t('explorePrivacyHub')}
                    <Icons.Back className="w-4 h-4 rotate-180 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Hero;

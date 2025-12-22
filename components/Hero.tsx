import React, { useState } from 'react';
import { EmailAccount } from '../types';
import { Icons } from './icons/Icons';
import { useTranslation } from '../contexts/LanguageContext';

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
        <div className="relative overflow-hidden pt-12 pb-8 px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {t('liveAnonymitySystem')}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    {t('yourTemporary')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-indigo-500">
                        {t('emailAddress')}
                    </span>
                </h1>

                <div className="glass-panel rounded-3xl p-6 md:p-10 glow-shadow mb-8 relative group">
                    <div className="relative bg-[#0f172a]/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
                        <div className="flex-1 text-left w-full">
                            <label className="text-[10px] uppercase tracking-widest text-indigo-400/80 font-black mb-3 block">{t('activeBurnerId')}</label>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-2xl md:text-3xl font-mono font-medium text-white break-all tracking-tighter">
                                    {emailAccount?.address || (isCreating ? loadingMessage : t('loading'))}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 w-full md:w-64">
                            <button 
                                onClick={handleCopyEmail} 
                                disabled={!emailAccount}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                            >
                                <Icons.Copy className="w-5 h-5"/>
                                <span>{copySuccess || t('copy')}</span>
                            </button>
                            {onNewEmail && (
                                <button 
                                    onClick={onNewEmail} 
                                    disabled={isCreating || isDeleting}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 border border-white/10"
                                >
                                    {isCreating ? <Icons.Spinner className="w-5 h-5 animate-spin"/> : <Icons.Change className="w-5 h-5"/>}
                                    <span>{t('change')}</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto italic font-medium opacity-80">
                        "{t('heroQuote')}"
                    </div>

                    <div className="mt-10">
                         <button 
                            onClick={onNavigateBlog}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-500 hover:text-white transition-all group"
                        >
                            <Icons.Inbox className="w-4 h-4" />
                            {t('explorePrivacyHub')}
                            <Icons.Back className="w-4 h-4 rotate-180 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full">
                        <span className="text-teal-400">📲</span>
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{t('tempNumberPlus')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-white">✓</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('noSignupRequired')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-white">✓</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('100Free')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
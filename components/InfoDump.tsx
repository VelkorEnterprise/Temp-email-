import React, { useState } from 'react';
import { articles } from '../hooks/articles.tsx';
import { Article } from '../types.ts';
import { Icons } from './Icons.tsx';
import { useTranslation } from '../contexts/LanguageContext.tsx';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tighter leading-tight">{children}</h2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-bold text-indigo-400 mb-4 mt-12 tracking-tight">{children}</h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-gray-400 mb-6 leading-relaxed text-lg font-normal">{children}</p>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start mb-6 group">
        <div className="mr-5 mt-1 bg-indigo-500/20 text-indigo-400 p-2 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <Icons.Logo className="w-4 h-4" />
        </div>
        <span className="text-gray-300 flex-1 text-lg leading-relaxed">{children}</span>
    </li>
);

interface InfoDumpProps {
    onSelectArticle: (article: Article) => void;
    onNavigateBlog: () => void;
}

const InfoDump: React.FC<InfoDumpProps> = ({ onSelectArticle, onNavigateBlog }) => {
    const { t } = useTranslation();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqItems = [
        { q: t('faqQ1'), a: t('faqA1') },
        { q: t('faqQ2'), a: t('faqA2') },
        { q: t('faqQ3'), a: t('faqA3') },
        { q: t('faqQ4'), a: t('faqA4') },
    ];

    return (
        <div className="bg-[#0f172a] text-gray-400 py-24 border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Introduction Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-8">
                        <SectionTitle>{t('whatIsDisposableEmail')}</SectionTitle>
                        <Paragraph>
                            {t('disposableEmailDefinition')}
                        </Paragraph>
                        <Paragraph>
                            {t('advancedService')}
                        </Paragraph>

                        <SubTitle>{t('techBehindTitle')}</SubTitle>
                        <Paragraph>{t('techBehindP1')}</Paragraph>
                        <Paragraph>{t('techBehindP2')}</Paragraph>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {[
                                t('noSignupRequired'),
                                "Full anonymity guaranteed",
                                "Offer more than one domain",
                                "Functional and clean design",
                                "Random account generation",
                                "Click-to-copy functionality"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-gray-300">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="glass-panel p-8 rounded-3xl border border-white/10 glow-shadow bg-gradient-to-br from-indigo-600/10 to-transparent">
                                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">{t('expertVerdict')}</h4>
                                <Paragraph>
                                    "Have a disposable mail address system set up in a fantastic way to make sure when you participate in online services your real identity is never disclosed."
                                </Paragraph>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h5 className="text-white font-bold mb-2">{t('conclusion')}</h5>
                                    <p className="text-sm text-gray-500">{t('conclusionText')}</p>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                                <h4 className="text-teal-400 font-bold mb-4">{t('trendingNow')}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["#BurnerEmail", "#AntiSpam", "#DevTools", "#PrivacyFirst"].map(tag => (
                                        <span key={tag} className="text-[10px] font-black text-teal-400/60 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Articles Grid */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight mb-2">{t('popularArticles')}</h2>
                            <p className="text-gray-500">Master your digital privacy with our deep-dive guides.</p>
                        </div>
                        <button onClick={onNavigateBlog} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2">
                            {t('viewAllKnowledgeBase')} <Icons.Logo className="w-4 h-4 rotate-90" />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 6).map((article) => (
                            <div
                                key={article.slug}
                                onClick={() => onSelectArticle(article)}
                                className="group glass-panel rounded-3xl overflow-hidden cursor-pointer flex flex-col hover:scale-[1.02] transition-transform duration-500"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={article.thumbnail} 
                                        alt={article.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90"></div>
                                    <span className="absolute bottom-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        Privacy
                                    </span>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{article.description}</p>
                                    <div className="flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest gap-4 mt-auto">
                                        <span>{article.date}</span>
                                        <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                                        <span>{article.author}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Extended Information Section (Added after articles as requested) */}
                <div className="max-w-4xl mx-auto space-y-16 mb-24 border-t border-white/5 pt-16">
                    <section>
                        <SectionTitle>{t('whatIsDeaTitle')}</SectionTitle>
                        <Paragraph>{t('whatIsDeaP1')}</Paragraph>
                        <Paragraph>{t('whatIsDeaP2')}</Paragraph>
                        <Paragraph>{t('whatIsDeaP3')}</Paragraph>
                    </section>

                    <section>
                        <SubTitle>{t('whyFakeEmailTitle')}</SubTitle>
                        <Paragraph>{t('whyFakeEmailP1')}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP2')}</Paragraph>
                        <Paragraph>{t('whyFakeEmailP3')}</Paragraph>
                        
                        <div className="mt-8">
                            <h4 className="text-xl font-bold text-teal-400 mb-6">{t('legitimateReasonsTitle')}</h4>
                            <ul className="space-y-4">
                                <ListItem><strong>{t('reason1Title')}</strong> {t('reason1Body')}</ListItem>
                                <ListItem><strong>{t('reason2Title')}</strong> {t('reason2Body')}</ListItem>
                                <ListItem><strong>{t('reason3Title')}</strong> {t('reason3Body')}</ListItem>
                                <ListItem><strong>{t('reason4Title')}</strong> {t('reason4Body')}</ListItem>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <SubTitle>{t('howToChooseTitle')}</SubTitle>
                        <Paragraph>{t('howToChooseIntro')}</Paragraph>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[t('howToChooseL1'), t('howToChooseL2'), t('howToChooseL3'), t('howToChooseL4'), t('howToChooseL5'), t('howToChooseL6'), t('howToChooseL7')].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-indigo-400 font-black">#0{i+1}</span>
                                    <span className="text-sm text-gray-400">{item}</span>
                                </div>
                            ))}
                        </ul>
                        <Paragraph>{t('howToChooseOutro')}</Paragraph>
                    </section>

                    <section>
                        <SubTitle>{t('howToUseTitle')}</SubTitle>
                        <Paragraph>{t('howToUseP1')}</Paragraph>
                        <Paragraph>{t('howToUseP2')}</Paragraph>
                    </section>

                    <section className="bg-indigo-600/10 p-10 rounded-[3rem] border border-indigo-500/20">
                        <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{t('conclusionTitle')}</h3>
                        <Paragraph>{t('conclusionBody')}</Paragraph>
                    </section>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <SectionTitle>{t('faqTitle')}</SectionTitle>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="glass-panel rounded-2xl overflow-hidden transition-all">
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left p-6 md:p-8 focus:outline-none"
                                >
                                    <h3 className="font-black text-lg text-white pr-8 tracking-tight">{item.q}</h3>
                                    <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${openFaqIndex === index ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : 'text-gray-500'}`}>
                                        <Icons.ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-8 pb-8 text-gray-400 leading-relaxed text-lg">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDump;
import React, { useMemo } from 'react';
import { Message } from '../types.ts';
import { Icons } from './icons/Icons.tsx';
import { keywords } from '../data/keywords.ts';
import { useTranslation } from '../contexts/LanguageContext.tsx';

interface EmailListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
}

const EmailList: React.FC<EmailListProps> = ({ messages, onSelectMessage }) => {
  const { t, language } = useTranslation();
  
  const emptyInboxTip = useMemo(() => getRandomItem(keywords), [language]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-gray-500 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 relative overflow-hidden group">
        {/* Decorative scanning animation background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500 to-transparent h-1/2 w-full animate-scan-slow"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
                <Icons.Inbox className="w-16 h-16 text-indigo-500" />
            </div>
            
            <h3 className="font-black text-2xl text-gray-900 mb-2 tracking-tight">{t('inboxEmpty')}</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-xs">{t('waitingForEmails')}</p>
            
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-xs font-bold text-gray-400">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                LIVE TRAFFIC MONITORING
            </div>

            {emptyInboxTip && (
                <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl max-w-sm">
                    <p className="text-xs text-gray-400 italic leading-relaxed">
                        <span className="font-black text-indigo-600 uppercase tracking-widest mr-2">{t('inboxTip')}</span> 
                        "{emptyInboxTip}"? <button className="text-indigo-600 font-bold hover:underline">{t('checkArticles')}</button>
                    </p>
                </div>
            )}
        </div>
        
        <style>{`
            @keyframes scan-slow {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(200%); }
            }
            .animate-scan-slow {
                animation: scan-slow 4s linear infinite;
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className="group p-5 cursor-pointer rounded-2xl border border-gray-100 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/5"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {message.from.name ? message.from.name[0].toUpperCase() : (message.from.address[0].toUpperCase())}
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-black text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{message.from.name || message.from.address}</p>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-shrink-0">{formatDate(message.createdAt)}</span>
                </div>
                <p className="text-gray-800 font-bold truncate text-sm mb-1">{message.subject || '(no subject)'}</p>
                <p className="text-gray-500 text-xs truncate leading-relaxed">{message.intro}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;

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
      <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 p-4 border border-solid border-gray-200 rounded-lg bg-gray-50">
        <Icons.Inbox className="w-16 h-16 mb-4 text-gray-400" />
        <p className="font-semibold text-gray-700">{t('inboxEmpty')}</p>
        <p className="text-sm">{t('waitingForEmails')}</p>
         {emptyInboxTip && (
            <p className="text-xs text-gray-400 mt-4 italic">
                {t('inboxTip')} "{emptyInboxTip}"? {t('checkArticles')}
            </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className="p-3 cursor-pointer rounded-lg border border-gray-200 hover:border-indigo-300 bg-white hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.99] shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow overflow-hidden pr-4">
                <p className="font-bold text-gray-800 truncate">{message.from.name || message.from.address}</p>
                <p className="text-gray-600 truncate text-sm">{message.subject || '(no subject)'}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0 mt-1">{formatDate(message.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;

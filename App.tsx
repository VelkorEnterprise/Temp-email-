import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import Footer from './components/Footer';
import InfoDump from './components/InfoDump';
import ArticleView from './components/ArticleView';
import BlogList from './components/BlogList';
import BlogDetailView from './components/BlogDetailView';
import { Icons } from './components/icons/Icons';
import { useInterval } from './hooks/useInterval';
import { useTranslation } from './contexts/LanguageContext';
import { 
    generateNewEmail, 
    fetchInbox, 
    fetchMessageDetail,
    refreshMailTmToken,
    deleteMailTmAccount
} from './services/emailService';
import { EmailAccount, Message, MessageDetail, Article } from './types';
import { blogArticles } from './data/blogArticles';

const POLLING_INTERVAL = 10000;

const App: React.FC = () => {
    const [emailAccount, setEmailAccount] = useState<EmailAccount | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<typeof blogArticles[0] | null>(null);
    const [view, setView] = useState<'main' | 'emailDetail' | 'articleDetail' | 'blogList' | 'blogDetail'>('main');
    
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    
    const tokenRefreshAttempted = useRef(false);
    const isRequestLocked = useRef(false);
    const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { t } = useTranslation();

    const clearLoadingInterval = () => {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
            loadingIntervalRef.current = null;
        }
    };

    const handleGetNewEmail = useCallback(async () => {
        if (isRequestLocked.current) return;
        isRequestLocked.current = true;
        
        clearLoadingInterval();
        setIsCreating(true);
        setLoading(true);
        setError(null);
        setSelectedMessage(null);
        setMessages([]);
        setEmailAccount(null);

        const messagesList = [
            t('loadingMsg1'),
            t('loadingMsg2'),
            t('loadingMsg3'),
            t('loadingMsg4')
        ];
        let messageIndex = 0;
        setLoadingMessage(messagesList[messageIndex]);
        
        loadingIntervalRef.current = setInterval(() => {
            messageIndex = (messageIndex + 1) % messagesList.length;
            setLoadingMessage(messagesList[messageIndex]);
        }, 1500);

        try {
            const newAccount = await generateNewEmail();
            setEmailAccount(newAccount);
            setError(null); 
        } catch (err: any) {
            setError(err.message || 'Failed to generate a new email address.');
        } finally {
            clearLoadingInterval();
            setLoadingMessage('');
            setLoading(false);
            setIsCreating(false);
            setTimeout(() => { isRequestLocked.current = false; }, 500);
        }
    }, [t]);

    useEffect(() => {
        handleGetNewEmail();
        return () => clearLoadingInterval();
    }, [handleGetNewEmail]);

    const handleApiCall = useCallback(async <T,>(apiCall: (account: EmailAccount) => Promise<T>, options: { isLoadInbox?: boolean } = {}): Promise<T | undefined> => {
        if (!emailAccount) return;
        try {
            return await apiCall(emailAccount);
        } catch (error: any) {
            const isAuthError = emailAccount.apiSource === 'mail.tm' && (error.message.includes('401') || error.message.includes('expired')) && emailAccount.refreshToken;
            if (isAuthError && !tokenRefreshAttempted.current) {
                tokenRefreshAttempted.current = true;
                try {
                    const { token, refreshToken } = await refreshMailTmToken(emailAccount.refreshToken!);
                    setEmailAccount(prev => prev ? { ...prev, token, refreshToken } : null);
                    return await apiCall({ ...emailAccount, token, refreshToken });
                } catch {
                    if (options.isLoadInbox) handleGetNewEmail();
                    else setError('Your session expired.');
                } finally {
                    setTimeout(() => { tokenRefreshAttempted.current = false; }, 2000);
                }
            } else if (!isAuthError) setError(error.message || 'Error occurred.');
        }
    }, [emailAccount, handleGetNewEmail]);
    
    const loadInbox = useCallback(async () => {
        if (!emailAccount || isRefreshing) return;
        setIsRefreshing(true);
        const inboxMessages = await handleApiCall((account) => fetchInbox(account.token, account.apiSource), { isLoadInbox: true });
        if (inboxMessages) setMessages(inboxMessages);
        setIsRefreshing(false);
    }, [handleApiCall, emailAccount, isRefreshing]);

    useInterval(loadInbox, emailAccount ? POLLING_INTERVAL : null);

    const handleSelectMessage = useCallback(async (message: Message) => {
        setLoading(true);
        setView('emailDetail');
        setSelectedMessage(null);
        const detail = await handleApiCall((account) => fetchMessageDetail(account.token, message.id, account.apiSource));
        if (detail) setSelectedMessage({...detail, address: emailAccount?.address});
        setLoading(false);
    }, [handleApiCall, emailAccount]);
    
    const handleSelectArticle = (article: Article) => {
        setSelectedArticle(article);
        setView('articleDetail');
        window.scrollTo(0, 0);
    };

    const handleSelectBlog = (blog: typeof blogArticles[0]) => {
        setSelectedBlog(blog);
        setView('blogDetail');
        window.scrollTo(0, 0);
    };

    const handleBackToMain = () => {
        setView('main');
        setSelectedMessage(null);
        setSelectedArticle(null);
        setSelectedBlog(null);
        window.scrollTo(0, 0);
    };

    const navigateToBlog = () => {
        setView('blogList');
        window.scrollTo(0, 0);
    };

    const handleDeleteEmail = useCallback(async () => {
        if (!emailAccount || emailAccount.apiSource !== 'mail.tm' || isDeleting || isCreating) return;
        setIsDeleting(true);
        try {
            const success = await handleApiCall((account) => deleteMailTmAccount(account.token, account.id));
            if (success) handleGetNewEmail();
        } finally {
            setIsDeleting(false);
        }
    }, [emailAccount, handleApiCall, handleGetNewEmail, isDeleting, isCreating]);

    return (
        <div className="flex flex-col min-h-screen bg-[#0f172a]">
            <Header onNavigateBlog={navigateToBlog} onGoHome={handleBackToMain} />
            <main className="flex-grow">
                {view === 'main' && (
                    <>
                        <Hero 
                            emailAccount={emailAccount}
                            onDeleteEmail={handleDeleteEmail}
                            onNewEmail={handleGetNewEmail}
                            onNavigateBlog={navigateToBlog}
                            isCreating={isCreating}
                            isDeleting={isDeleting}
                            loadingMessage={loadingMessage}
                        />
                        <div className="bg-[#f8f9fa] py-12">
                            <div className="max-w-4xl mx-auto px-4 w-full">
                                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                                    <button onClick={loadInbox} disabled={isRefreshing || loading} className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all">
                                        {isRefreshing ? <Icons.Spinner className="w-4 h-4 animate-spin" /> : <Icons.Refresh className="w-4 h-4" />}
                                        <span>{t('refresh')}</span>
                                    </button>
                                </div>
                                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                                    <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">{t('inbox')}</h2>
                                    <div className="min-h-[400px]">
                                        {loading && !emailAccount ? (
                                            <div className="flex flex-col items-center justify-center h-48 text-center">
                                                <Icons.Spinner className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                                                <p className="text-gray-500 font-bold">{loadingMessage}</p>
                                            </div>
                                        ) : (
                                            <EmailList messages={messages} onSelectMessage={handleSelectMessage} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <InfoDump onSelectArticle={handleSelectArticle} onNavigateBlog={navigateToBlog} />
                    </>
                )}

                {view === 'emailDetail' && selectedMessage && (
                    <EmailDetail message={selectedMessage} onClose={handleBackToMain} />
                )}

                {view === 'articleDetail' && selectedArticle && (
                    <ArticleView article={selectedArticle} onBack={handleBackToMain} />
                )}

                {view === 'blogList' && (
                    <BlogList onSelectBlog={handleSelectBlog} onBack={handleBackToMain} />
                )}

                {view === 'blogDetail' && selectedBlog && (
                    <BlogDetailView blog={selectedBlog} onBack={navigateToBlog} onGoHome={handleBackToMain} />
                )}
            </main>
            <Footer onNavigateBlog={navigateToBlog} onGoHome={handleBackToMain} />
        </div>
    );
};

export default App;
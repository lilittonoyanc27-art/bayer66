import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smile,
  Heart,
  MessageCircle,
  MapPin,
  Bus,
  Home,
  Coffee,
  ShoppingBag,
  Activity,
  Briefcase,
  User,
  Award,
  HelpCircle,
  FileText,
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Trophy,
  RotateCcw,
  Shuffle,
  Star,
  Globe,
  Info,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { PHRASES_DATA, CATEGORIES, Phrase, CategoryInfo } from './phrases';

export default function App() {
  // Navigation & Interactive states
  const [activeTab, setActiveTab] = useState<'dictionary' | 'flashcards' | 'quiz'>('dictionary');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupFilter, setGroupFilter] = useState<'all' | 'general' | 'work'>('all');
  
  // Local persistence for bookmark status and learned phrases
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('arm_esp_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [learnedList, setLearnedList] = useState<number[]>(() => {
    const saved = localStorage.getItem('arm_esp_learned');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('arm_esp_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('arm_esp_learned', JSON.stringify(learnedList));
  }, [learnedList]);

  // Audio Status
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [speechesAvailable, setSpeechesAvailable] = useState<boolean>(true);

  // Feedback Notifications (Toast system)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Flashcards indicators
  const [fcIndex, setFcIndex] = useState<number>(0);
  const [fcFlipped, setFcFlipped] = useState<boolean>(false);
  const [fcShuffleMode, setFcShuffleMode] = useState<boolean>(false);

  // Quiz structure and scores
  interface QuizQuestion {
    phraseId: number;
    armenianPhrase: string;
    correctAnswer: string;
    choices: string[];
  }
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSelectedChoice, setQuizSelectedChoice] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizInteractiveCategory, setQuizInteractiveCategory] = useState<string>('all');

  // Trigger temporary feedback toast banner
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Speaks spanish translations out loud using official Web Speech API synthesis
  const speakSpanish = (text: string, id: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const cleaned = text
        .replace(/\/a\b/g, '') // strip optional feminine pronouns (e.g. ocupado/a -> ocupado)
        .replace(/\(.*?\)/g, '') // remove description annotations
        .replace("Vale. / Está bien.", "Vale, está bien.")
        .replace("...", "");

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'es-ES';
      
      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      // Attempt assigning Spanish native voice lines
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es'));
      if (esVoice) {
        utterance.voice = esVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeechesAvailable(false);
      showToast("Արտասանության համակարգը անհասանելի է", "info");
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    } else {
      setSpeechesAvailable(false);
    }
  }, []);

  // Copy spanish text directly
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      showToast("Արտահայտությունը պատճենվեց!", "success");
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      showToast("Պատճենումը ձախողվեց", "info");
    });
  };

  // Toggle bookmark listing
  const toggleBookmark = (id: number) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
      showToast("Հեռացվեց ընտրվածներից", "info");
    } else {
      setBookmarks([...bookmarks, id]);
      showToast("Ավելացվեց ընտրվածների մեջ!", "success");
    }
  };

  // Toggle words learned
  const toggleLearned = (id: number) => {
    if (learnedList.includes(id)) {
      setLearnedList(learnedList.filter(lId => lId !== id));
      showToast("Նշվեց որպես չսովորած", "info");
    } else {
      setLearnedList([...learnedList, id]);
      showToast("Նշվեց որպես սովորած:", "success");
    }
  };

  // Filter phrases in real-time according to category, search text, and job search context
  const filteredPhrases = useMemo(() => {
    return PHRASES_DATA.filter((phrase) => {
      // 1. Category check
      if (selectedCategory !== 'all' && selectedCategory !== 'bookmarks') {
        if (phrase.category !== selectedCategory) return false;
      }

      // 2. Bookmarked specialized list checkbox
      if (selectedCategory === 'bookmarks') {
        if (!bookmarks.includes(phrase.id)) return false;
      }

      // 3. Work context filter
      if (groupFilter !== 'all') {
        if (phrase.group !== groupFilter) return false;
      }

      // 4. Input text query matches
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const armMatch = phrase.armenian.toLowerCase().includes(query);
        const espMatch = phrase.spanish.toLowerCase().includes(query);
        const phonMatch = phrase.phoneticDescription && phrase.phoneticDescription.toLowerCase().includes(query);
        
        const categoryInfo = CATEGORIES.find(c => c.id === phrase.category);
        const catMatch = categoryInfo 
          ? categoryInfo.nameArm.toLowerCase().includes(query) || categoryInfo.nameEsp.toLowerCase().includes(query)
          : false;

        return armMatch || espMatch || phonMatch || catMatch;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, groupFilter, bookmarks]);

  // Group filtered phrases by category for topic headers
  const phrasesByCategory = useMemo(() => {
    const groups: { [key: string]: typeof PHRASES_DATA } = {};
    
    // Maintain the order of categories as defined in CATEGORIES
    CATEGORIES.forEach(cat => {
      groups[cat.id] = [];
    });
    
    // Add phrases to their respective categories
    filteredPhrases.forEach(phrase => {
      if (!groups[phrase.category]) {
        groups[phrase.category] = [];
      }
      groups[phrase.category].push(phrase);
    });

    // Remove empty categories to prevent empty headers
    const filteredGroups: { [key: string]: typeof PHRASES_DATA } = {};
    Object.keys(groups).forEach(key => {
      if (groups[key].length > 0) {
        filteredGroups[key] = groups[key];
      }
    });

    return filteredGroups;
  }, [filteredPhrases]);

  // Overall statistics
  const stats = useMemo(() => {
    const total = PHRASES_DATA.length;
    const bookmarkedCount = bookmarks.length;
    const learnedCount = learnedList.length;
    const percentLearned = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

    return {
      total,
      bookmarkedCount,
      learnedCount,
      percentLearned
    };
  }, [bookmarks, learnedList]);

  // Flashcards collection
  const flashcardsList = useMemo(() => {
    let list = PHRASES_DATA;
    if (selectedCategory !== 'all' && selectedCategory !== 'bookmarks') {
      list = PHRASES_DATA.filter(p => p.category === selectedCategory);
    } else if (selectedCategory === 'bookmarks') {
      list = PHRASES_DATA.filter(p => bookmarks.includes(p.id));
    }

    if (groupFilter !== 'all') {
      list = list.filter(p => p.group === groupFilter);
    }

    if (fcShuffleMode) {
      return [...list].sort(() => 0.5 - Math.random());
    }

    return list;
  }, [selectedCategory, groupFilter, bookmarks, fcShuffleMode]);

  // Reset indices on bounds modification
  useEffect(() => {
    setFcIndex(0);
    setFcFlipped(false);
  }, [selectedCategory, groupFilter, fcShuffleMode]);

  // Flashcard controls
  const nextFlashcard = () => {
    if (flashcardsList.length === 0) return;
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev + 1) % flashcardsList.length);
    }, 120);
  };

  const prevFlashcard = () => {
    if (flashcardsList.length === 0) return;
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev - 1 + flashcardsList.length) % flashcardsList.length);
    }, 120);
  };

  // Generate dynamic Multiple Choice Quiz
  const startNewQuiz = (catIdFilter: string = 'all') => {
    let pool = PHRASES_DATA;
    if (catIdFilter !== 'all') {
      pool = PHRASES_DATA.filter(p => p.category === catIdFilter);
    }
    
    if (pool.length < 4) {
      pool = PHRASES_DATA; // fallback to prevent blank games
    }

    const shuffledPool = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    const constructed: QuizQuestion[] = shuffledPool.map(target => {
      const otherPhrases = PHRASES_DATA
        .filter(p => p.id !== target.id)
        .map(p => p.spanish);
      
      const uniqueOthers = Array.from(new Set(otherPhrases));
      const chosenDistractors = [...uniqueOthers].sort(() => 0.5 - Math.random()).slice(0, 3);
      const choices = [...chosenDistractors, target.spanish].sort(() => 0.5 - Math.random());
      
      return {
        phraseId: target.id,
        armenianPhrase: target.armenian,
        correctAnswer: target.spanish,
        choices
      };
    });

    setQuizQuestions(constructed);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelectedChoice(null);
    setQuizAnswered(false);
    setQuizFinished(false);
    showToast("Նոր վիկտորինան պատրաստ է", "success");
  };

  useEffect(() => {
    if (activeTab === 'quiz' && quizQuestions.length === 0) {
      startNewQuiz(quizInteractiveCategory);
    }
  }, [activeTab]);

  const handleQuizChoiceSelect = (choice: string) => {
    if (quizAnswered) return;
    setQuizSelectedChoice(choice);
  };

  const submitQuizAnswer = () => {
    if (quizSelectedChoice === null || quizAnswered) return;
    
    const currentQ = quizQuestions[quizIndex];
    const isCorrect = quizSelectedChoice === currentQ.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    setQuizAnswered(true);
    speakSpanish(currentQ.correctAnswer, currentQ.phraseId);
  };

  const advanceQuiz = () => {
    setQuizSelectedChoice(null);
    setQuizAnswered(false);
    
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      showToast("Վիկտորինան ավարտվեց!", "success");
    }
  };

  // Category Icon mappings using standard lucide-react instances
  const renderCategoryIcon = (category: string, className: string = "text-brand-accent") => {
    const info = CATEGORIES.find(c => c.id === category);
    const iconName = info ? info.iconName : 'BookOpen';
    
    switch (iconName) {
      case 'Smile': return <Smile className={className} size={15} />;
      case 'Heart': return <Heart className={className} size={15} />;
      case 'MessageCircle': return <MessageCircle className={className} size={15} />;
      case 'MapPin': return <MapPin className={className} size={15} />;
      case 'Bus': return <Bus className={className} size={15} />;
      case 'Home': return <Home className={className} size={15} />;
      case 'Coffee': return <Coffee className={className} size={15} />;
      case 'ShoppingBag': return <ShoppingBag className={className} size={15} />;
      case 'Activity': return <Activity className={className} size={15} />;
      case 'Briefcase': return <Briefcase className={className} size={15} />;
      case 'User': return <User className={className} size={15} />;
      case 'Award': return <Award className={className} size={15} />;
      case 'HelpCircle': return <HelpCircle className={className} size={15} />;
      case 'FileText': return <FileText className={className} size={15} />;
      default: return <BookOpen className={className} size={15} />;
    }
  };

  // Jumps straight to a random card
  const selectRandomPhrase = () => {
    const randomIdx = Math.floor(Math.random() * PHRASES_DATA.length);
    const target = PHRASES_DATA[randomIdx];
    setSelectedCategory('all');
    setSearchQuery(target.armenian);
    setActiveTab('dictionary');
    showToast(`Գտնվեց պատահական արտահայտություն`, "success");
  };

  // Render App Structure with Desktop High-Density Layout Wrapper
  return (
    <div id="app_root" className="h-screen flex flex-col bg-brand-bg font-sans text-brand-ink selection:bg-blue-100 selection:text-blue-900 overflow-hidden antialiased">
      
      {/* Dynamic Notification Systems */}
      <AnimatePresence>
        {toast && (
          <motion.div
            id="toast_banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-md shadow-md border text-xs font-medium ${
              toast.type === 'success' 
                ? 'bg-emerald-55 bg-white border-emerald-300 text-emerald-950' 
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}
          >
            <Sparkles size={13} className="text-brand-accent" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR BRAND BAR (High Density bordered top) */}
      <header id="top_bar" className="h-14 bg-white border-b-2 border-brand-ink px-4 lg:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="logo font-black text-sm lg:text-base tracking-tight uppercase flex items-center gap-2 text-brand-ink">
            <span>ARM <span className="opacity-30">→</span> ESP</span>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-brand-line"></span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 font-mono tracking-normal">Phrasebook Utility v1.0</span>
          </div>
          <div className="flex -space-x-1 items-center pl-1">
            <span className="inline-flex items-center justify-center text-base" title="ARM">🇦🇲</span>
            <span className="inline-flex items-center justify-center text-base" title="ESP">🇪🇸</span>
          </div>
        </div>

        {/* High Density Synced Status Information */}
        <div className="flex items-center gap-4 text-xs font-mono font-bold">
          <span className="hidden md:inline-block text-slate-500">LEXICON: {PHRASES_DATA.length} PHRASES</span>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-brand-accent tracking-wide uppercase">SYNCED</span>
        </div>
      </header>

      {/* MAIN TWO COLUMN VIEWPORT SPLIT */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row relative">
        
        {/* SIDEBAR NAVIGATION COLUMN */}
        <aside className="hidden lg:flex lg:w-[260px] shrink-0 lg:border-r border-brand-line bg-white flex-col overflow-hidden">
          
          {/* Quick segment switcher filters */}
          <div className="p-3 border-b border-brand-line bg-brand-bg/60">
            <span className="block text-[11px] font-mono font-extrabold text-slate-400 mb-1.5 uppercase tracking-wider">
              ԲԱԺԻՆՆԵՐ (CATEGORIES)
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                id="filter_all"
                onClick={() => { setGroupFilter('all'); setSelectedCategory('all'); setIsSidebarOpen(false); }}
                className={`py-1 text-[11px] font-bold rounded-sm border transition ${
                  groupFilter === 'all' 
                    ? 'bg-brand-ink text-white border-brand-ink' 
                    : 'bg-white text-slate-600 border-brand-line hover:bg-slate-50'
                }`}
              >
                Բոլորը
              </button>
              <button
                id="filter_general"
                onClick={() => { setGroupFilter('general'); setSelectedCategory('all'); setIsSidebarOpen(false); }}
                className={`py-1 text-[11px] font-bold rounded-sm border transition ${
                  groupFilter === 'general' 
                    ? 'bg-brand-ink text-white border-brand-ink' 
                    : 'bg-white text-slate-600 border-brand-line hover:bg-slate-50'
                }`}
              >
                Կենցաղային
              </button>
              <button
                id="filter_work"
                onClick={() => { setGroupFilter('work'); setSelectedCategory('all'); setIsSidebarOpen(false); }}
                className={`py-1 text-[11px] font-bold rounded-sm border transition ${
                  groupFilter === 'work' 
                    ? 'bg-brand-ink text-white border-brand-ink' 
                    : 'bg-white text-slate-600 border-brand-line hover:bg-slate-50'
                }`}
              >
                Աշխատանք
              </button>
            </div>
          </div>

          {/* List navigation categories */}
          <nav id="category_nav" className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            
            {/* Bookmarks navigation card row */}
            <button
              onClick={() => { setSelectedCategory('bookmarks'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between text-left px-2.5 py-2 rounded-sm transition ${
                selectedCategory === 'bookmarks'
                  ? 'bg-brand-ink text-white border-b border-brand-ink font-bold'
                  : 'hover:bg-brand-bg text-slate-700 font-medium'
              }`}
            >
              <div className="flex items-center gap-2 text-[12.5px] sm:text-[13px] truncate">
                <Star size={13} className={selectedCategory === 'bookmarks' ? "fill-amber-400 text-amber-400" : "text-amber-500"} />
                <span className="truncate">Իմ Ընտրվածները (⭐)</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-sm ${
                selectedCategory === 'bookmarks' ? 'bg-white/20 text-white' : 'bg-brand-line text-slate-600'
              }`}>
                {bookmarks.length}
              </span>
            </button>

            {/* Loop categories */}
            {CATEGORIES.filter(c => groupFilter === 'all' || c.group === groupFilter).map((cat) => {
              const isActive = selectedCategory === cat.id;
              const matchingPhrases = PHRASES_DATA.filter(p => p.category === cat.id);
              const matchingLearned = matchingPhrases.filter(p => learnedList.includes(p.id)).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setIsSidebarOpen(false); }}
                  className={`sidebar-item w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-sm transition-all border-b border-brand-line/40 last:border-0 ${
                    isActive 
                      ? 'active bg-brand-ink text-white font-bold' 
                      : 'hover:bg-brand-bg text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {renderCategoryIcon(cat.id, isActive ? "text-white shrink-0" : "text-slate-400 shrink-0")}
                    <div className="truncate text-[12.5px] sm:text-[13px] leading-tight">
                      <span className="block truncate font-extrabold">{cat.nameArm}</span>
                      <span className={`block text-[10px] sm:text-[10.5px] font-mono truncate italic ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                        {cat.nameEsp}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1 shrink-0 ml-1.5">
                    {matchingLearned > 0 && (
                      <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1 rounded-sm">
                        {matchingLearned}✓
                      </span>
                    )}
                    <span className={`text-[10px] font-mono font-bold px-1 rounded-sm ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-bg text-slate-500 border border-brand-line'
                    }`}>
                      {matchingPhrases.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

        </aside>

        {/* MAIN WORKING ZONE */}
        <main className="flex-1 flex flex-col overflow-hidden bg-brand-bg">
          
          {/* META DIRECTORY SUMMARY AND NAVIGATION TABS */}
          <div className="meta-header shrink-0 flex flex-col md:flex-row md:items-center justify-between border-b border-brand-line bg-white p-3 px-4 lg:px-6 gap-3">
            
            {/* Status indicators */}
            <div className="flex items-center gap-3">
              <div className="status-pill inline-block shrink-0" />
              <div className="leading-tight">
                <span className="block text-xs sm:text-sm font-black text-brand-ink uppercase font-mono tracking-tight">
                  {selectedCategory === 'all' 
                    ? 'Բոլոր արտահայտությունները' 
                    : selectedCategory === 'bookmarks' 
                      ? 'Իմ Ընտրվածները (⭐)'
                      : CATEGORIES.find(c => c.id === selectedCategory)?.nameArm
                  }
                </span>
                <span className="block text-[10px] text-slate-500 font-normal truncate italic max-w-[120px] sm:max-w-sm">
                  {selectedCategory === 'all' 
                    ? 'Phrases lexicon overview' 
                    : selectedCategory === 'bookmarks' 
                      ? 'Your marked learning bookmarks list'
                      : CATEGORIES.find(c => c.id === selectedCategory)?.nameEsp
                  }
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tab Selectors with slightly larger touch target sizes */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                id="tab_dictionary"
                onClick={() => { setActiveTab('dictionary'); setIsSidebarOpen(false); }}
                className={`px-3 py-2 rounded-sm text-xs sm:text-[13px] font-black transition flex items-center gap-1 ${
                  activeTab === 'dictionary'
                    ? 'bg-brand-ink text-white'
                    : 'bg-slate-50 text-slate-500 border border-brand-line hover:bg-slate-100'
                }`}
              >
                <BookOpen size={13} />
                <span>Բառարան</span>
              </button>

              <button
                id="tab_flashcards"
                onClick={() => { setActiveTab('flashcards'); setIsSidebarOpen(false); }}
                className={`px-3 py-2 rounded-sm text-xs sm:text-[13px] font-black transition flex items-center gap-1 ${
                  activeTab === 'flashcards'
                    ? 'bg-brand-ink text-white'
                    : 'bg-slate-50 text-slate-500 border border-brand-line hover:bg-slate-100'
                }`}
              >
                <GraduationCap size={13} />
                <span>Ֆլեշ քարտեր</span>
              </button>

              <button
                id="tab_quiz"
                onClick={() => {
                  setActiveTab('quiz');
                  startNewQuiz(quizInteractiveCategory);
                  setIsSidebarOpen(false);
                }}
                className={`px-3 py-2 rounded-sm text-xs sm:text-[13px] font-black transition flex items-center gap-1 ${
                  activeTab === 'quiz'
                    ? 'bg-brand-ink text-white'
                    : 'bg-slate-50 text-slate-500 border border-brand-line hover:bg-slate-100'
                }`}
              >
                <Trophy size={13} />
                <span>Վիկտորինա</span>
              </button>
            </div>

          </div>

          {/* ACTIVE CONTENT WORKSPACE (with native scroll bar bounds) */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            
            {/* VIEW 1: CLASSIC HIGH-DENSITY DICTIONARY */}
            {activeTab === 'dictionary' && (
              <div className="space-y-4">
                
                {/* Horizontal Category Scroller for Mobile Devices */}
                <div className="lg:hidden bg-white p-3 rounded-sm border border-brand-line space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="block text-[11px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">
                      ԲԱԺԻՆՆԵՐ (CATEGORIES)
                    </span>
                    {/* Quick filter segment tag toggler for mobile */}
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xs border border-brand-line/40">
                      <button
                        onClick={() => { setGroupFilter('all'); setSelectedCategory('all'); }}
                        className={`px-1.5 py-0.5 text-[9.5px] font-bold rounded-xs transition ${
                          groupFilter === 'all' ? 'bg-brand-ink text-white' : 'text-slate-500 hover:text-slate-800 font-medium'
                        }`}
                      >
                        Բոլորը
                      </button>
                      <button
                        onClick={() => { setGroupFilter('general'); setSelectedCategory('all'); }}
                        className={`px-1.5 py-0.5 text-[9.5px] font-bold rounded-xs transition ${
                          groupFilter === 'general' ? 'bg-brand-ink text-white' : 'text-slate-500 hover:text-slate-800 font-medium'
                        }`}
                      >
                        Կենցաղ
                      </button>
                      <button
                        onClick={() => { setGroupFilter('work'); setSelectedCategory('all'); }}
                        className={`px-1.5 py-0.5 text-[9.5px] font-bold rounded-xs transition ${
                          groupFilter === 'work' ? 'bg-brand-ink text-white' : 'text-slate-500 hover:text-slate-800 font-medium'
                        }`}
                      >
                        Աշխատանք
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-none snap-x">
                    <button
                      onClick={() => { setSelectedCategory('all'); }}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-sm border transition shrink-0 ${
                        selectedCategory === 'all'
                          ? 'bg-brand-ink text-white border-brand-ink' 
                          : 'bg-slate-50 text-slate-600 border-brand-line hover:bg-slate-100'
                      }`}
                    >
                      🗣️ Բոլոր խմբերը ({PHRASES_DATA.length})
                    </button>
                    
                    <button
                      onClick={() => { setSelectedCategory('bookmarks'); }}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-sm border transition shrink-0 flex items-center gap-1 ${
                        selectedCategory === 'bookmarks'
                          ? 'bg-brand-ink text-white border-brand-ink' 
                          : 'bg-slate-50 text-slate-600 border-brand-line hover:bg-slate-100'
                      }`}
                    >
                      ⭐ Ընտրվածներ ({bookmarks.length})
                    </button>

                    {CATEGORIES.filter(cat => groupFilter === 'all' || cat.group === groupFilter).map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      const matchingPhrases = PHRASES_DATA.filter(p => p.category === cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); }}
                          className={`px-3 py-1.5 text-xs rounded-sm border transition shrink-0 flex items-center gap-1.5 ${
                            isActive 
                              ? 'bg-brand-ink text-white border-brand-ink font-bold' 
                              : 'bg-slate-50 text-slate-700 border-brand-line hover:bg-slate-100'
                          }`}
                        >
                          {renderCategoryIcon(cat.id, isActive ? "text-white" : "text-slate-400")}
                          <span>{cat.nameArm}</span>
                          <span className={`text-[9.5px] font-mono font-bold px-1.5 rounded-sm ${
                            isActive ? 'bg-white/20 text-white' : 'bg-brand-bg text-slate-500 border border-brand-line/40'
                          }`}>
                            {matchingPhrases.length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search Bar header card */}
                <div className="bg-white p-3 rounded-sm border border-brand-line flex flex-col md:flex-row gap-2 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold" size={14} />
                    <input
                      id="search_box"
                      type="text"
                      placeholder="Որոնել բառեր, տեքստեր կամ տառադարձում..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-brand-line focus:border-brand-accent focus:bg-white text-xs pl-8 pr-8 py-2 rounded-sm focus:outline-none transition leading-tight"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-mono text-xs font-semibold px-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 w-full md:w-auto shrink-0 justify-end">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                      FOUND: <strong className="text-slate-800">{filteredPhrases.length}</strong> / {PHRASES_DATA.length}
                    </span>
                    <button
                      onClick={selectRandomPhrase}
                      className="px-2.5 py-1.5 bg-brand-bg text-brand-ink border border-brand-line hover:bg-slate-100 rounded-sm text-[11px] font-bold transition flex items-center gap-1"
                    >
                      <Shuffle size={12} />
                      Պատահական բառ
                    </button>
                  </div>
                </div>

                {/* Empty check fallback with pristine aesthetics */}
                {filteredPhrases.length === 0 && (
                  <div className="bg-white rounded-sm border border-brand-line p-10 text-center max-w-lg mx-auto space-y-3">
                    <BookOpen size={36} className="mx-auto text-slate-300" />
                    <div>
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Արդյունքներ չեն գտնվել</h3>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed font-normal">
                        {selectedCategory === 'bookmarks' 
                          ? "Դուք դեռևս չունեք ընտրված արտահայտություններ այս բաժնից։ Սեղմեք աստղիկին (⭐) ցանկացած բառի վրա այն արագ պահելու համար:" 
                          : "Խնդրում ենք փոխել որոնման բանալին, չեղարկել ֆիլտրերը կամ ընտրել այլ թեմատիկ բաժին:"}
                      </p>
                    </div>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setGroupFilter('all'); }}
                      className="px-3 py-1.5 bg-brand-ink text-white rounded-sm text-[11px] font-bold"
                    >
                      Մաքրել ֆիլտրերը
                    </button>
                  </div>
                )}

                {/* Grouped by Topic High Contrast Layout */}
                <div id="phrases_grouped_container" className="space-y-6">
                  {Object.entries(phrasesByCategory).map(([catId, rawPhrases]) => {
                    const phrases = rawPhrases as typeof PHRASES_DATA;
                    const groupCatInfo = CATEGORIES.find(c => c.id === catId);
                    return (
                      <div key={catId} className="space-y-3">
                        {/* Interactive Section Topic Header */}
                        <div className="flex items-center gap-2 border-b-2 border-brand-ink pb-1.5 pt-1.5">
                          <span className="p-1 px-1.5 bg-brand-ink text-white rounded-xs">
                            {renderCategoryIcon(catId, "text-white")}
                          </span>
                          <h2 className="text-xs sm:text-sm font-black text-brand-ink uppercase tracking-tight">
                            {groupCatInfo?.nameArm || catId}
                          </h2>
                          <span className="text-[10px] sm:text-[11px] font-mono font-black text-slate-400 italic">
                            — {groupCatInfo?.nameEsp} ({phrases.length})
                          </span>
                        </div>

                        {/* Highly structured cards grid for this Category */}
                        <div id={`phrases_grid_${catId}`} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                          {phrases.map((phrase) => {
                            const isBookmarked = bookmarks.includes(phrase.id);
                            const isLearned = learnedList.includes(phrase.id);
                            const isSpeaking = speakingId === phrase.id;
                            const isCopied = copiedId === phrase.id;
                            
                            return (
                              <div
                                key={phrase.id}
                                id={`phrase_card_${phrase.id}`}
                                className={`phrase-row bg-white border rounded-sm p-3 flex flex-col justify-between transition-all relative ${
                                  isLearned 
                                    ? 'border-emerald-200 bg-emerald-50/10' 
                                    : 'border-brand-line hover:border-brand-accent/50'
                                }`}
                              >
                                {/* Compact side-bar indicator if active audio */}
                                {isSpeaking && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent animate-pulse" />
                                )}

                                <div>
                                  {/* Compact meta header */}
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                                    <span className="uppercase tracking-tight font-bold flex items-center gap-1 bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-xs">
                                      {renderCategoryIcon(phrase.category, "text-slate-500 shrink-0")}
                                      {groupCatInfo ? groupCatInfo.nameArm : phrase.category}
                                    </span>
                                    
                                    <div className="flex items-center gap-1 font-mono">
                                      <span>#{phrase.id}</span>
                                      <span className={`px-1 rounded-xs font-bold ${
                                        phrase.group === 'work' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-500'
                                      }`}>
                                        {phrase.group === 'work' ? 'Աշխատանք' : 'Կենցաղ'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Armenian Phrase */}
                                  <h3 className="hy-text font-black text-brand-ink leading-tight tracking-tight select-all">
                                    {phrase.armenian}
                                  </h3>

                                  {/* Spanish Phrase Translation Row */}
                                  <div className="mt-2 bg-brand-bg/80 p-2 rounded-xs border border-brand-line/60">
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="es-text block font-black text-brand-accent tracking-tighter leading-none select-all text-sm">
                                        {phrase.spanish}
                                      </span>
                                    </div>

                                    {/* Phonetics */}
                                    {phrase.phoneticDescription && (
                                      <div className="mt-1 pt-1 border-t border-brand-line/40 text-[10px] text-slate-500 flex items-center gap-1">
                                        <span className="font-mono text-slate-400 font-bold">FONETICA:</span>
                                        <span className="font-bold text-slate-600 italic bg-white px-1.5 py-0.2 border border-brand-line/30 rounded-xs phonetic-text">
                                          {phrase.phoneticDescription}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Action buttons (density design optimization) */}
                                <div className="mt-3 pt-2.5 border-t border-brand-line/40 flex items-center justify-between text-[11px]">
                                  <div className="flex items-center gap-1">
                                    <button
                                      title="Արտասանել"
                                      onClick={() => speakSpanish(phrase.spanish, phrase.id)}
                                      className={`p-1 px-2 rounded-xs transition flex items-center gap-1 border border-brand-line text-[10px] font-black uppercase ${
                                        isSpeaking 
                                          ? 'bg-brand-accent text-white border-brand-accent' 
                                          : 'bg-white text-slate-700 hover:bg-slate-50'
                                      }`}
                                    >
                                      <Volume2 size={11.5} />
                                      <span>Լսել</span>
                                    </button>

                                    <button
                                      title="Պատճենել"
                                      onClick={() => copyToClipboard(phrase.spanish, phrase.id)}
                                      className="p-1 rounded-xs bg-white text-slate-500 border border-brand-line hover:text-slate-800 transition"
                                    >
                                      {isCopied ? <Check size={11.5} className="text-emerald-700 font-bold" /> : <Copy size={11.5} />}
                                    </button>
                                    
                                    <button
                                      onClick={() => toggleLearned(phrase.id)}
                                      className={`p-1 px-1.5 rounded-xs transition text-[10px] font-bold border ${
                                        isLearned 
                                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-black' 
                                          : 'bg-white border-brand-line text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/40'
                                      }`}
                                    >
                                      {isLearned ? "✓ Սովորած" : "Գիտեմ"}
                                    </button>
                                  </div>

                                  <button
                                    title="⭐"
                                    onClick={() => toggleBookmark(phrase.id)}
                                    className={`p-1 rounded-xs border transition ${
                                      isBookmarked 
                                        ? 'bg-amber-50 border-amber-300 text-amber-700' 
                                        : 'bg-white border-brand-line text-slate-400 hover:text-amber-500'
                                    }`}
                                  >
                                    <Star size={11.5} className={isBookmarked ? 'fill-amber-500 text-amber-500' : ''} />
                                  </button>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* VIEW 2: STUDY CARDS VIEW */}
            {activeTab === 'flashcards' && (
              <div id="view_flashcards" className="bg-white p-4 lg:p-6 rounded-sm border border-brand-line space-y-4 max-w-xl mx-auto">
                <div className="flex items-center justify-between border-b border-brand-line pb-3">
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-brand-ink flex items-center gap-1.5">
                      <GraduationCap className="text-brand-accent" size={14} />
                      Հիշողության Քարտեր
                    </h2>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">
                      Կտտացրեք քարտի վրա թարգմանությունը և արտասանությունը բացահայտելու համար։
                    </p>
                  </div>

                  <button
                    onClick={() => setFcShuffleMode(!fcShuffleMode)}
                    className={`px-2 py-1 rounded-sm text-[10px] font-bold border transition flex items-center gap-1 ${
                      fcShuffleMode 
                        ? 'bg-brand-accent border-brand-accent text-white' 
                        : 'bg-white border-brand-line text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Shuffle size={11} />
                    Խառնել
                  </button>
                </div>

                {flashcardsList.length === 0 ? (
                  <div className="p-8 text-center space-y-3">
                    <GraduationCap size={32} className="mx-auto text-slate-300" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-700 uppercase">Քարտեր չկան</h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Ձեր ընտրած թեմատիկ ֆիլտրի տակ քարտեր չկան։ Փոխեք ձախ սյունակի բաժինը։
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="px-3 py-1 bg-brand-ink text-white rounded-sm text-xs font-bold"
                    >
                      Ցուցադրել բոլորը
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    
                    {/* Progression tracking indicators */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>CARD: {fcIndex + 1} / {flashcardsList.length}</span>
                        <span>PROGRESS: {Math.round(((fcIndex + 1) / flashcardsList.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-brand-bg h-1 rounded-full overflow-hidden border border-brand-line/55">
                        <div 
                          className="bg-brand-accent h-full transition-all duration-300" 
                          style={{ width: `${((fcIndex + 1) / flashcardsList.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Flippable Card Base */}
                    <div 
                      id="study_card"
                      onClick={() => {
                        const flipped = !fcFlipped;
                        setFcFlipped(flipped);
                        if (flipped) {
                          speakSpanish(flashcardsList[fcIndex].spanish, flashcardsList[fcIndex].id);
                        }
                      }}
                      className="w-full h-56 perspective-1000 cursor-pointer"
                    >
                      <div 
                        className={`w-full h-full relative transition-transform duration-500 preserve-3d rounded-sm border ${
                          fcFlipped ? 'rotate-y-180 border-brand-accent' : 'border-brand-line'
                        }`}
                      >
                        
                        {/* FRONT (Armenian prompt) */}
                        <div className="absolute inset-0 w-full h-full bg-white rounded-sm p-5 flex flex-col justify-between backface-hidden">
                          <div className="flex items-center justify-between border-b border-brand-line/60 pb-1.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                              {CATEGORIES.find(c => c.id === flashcardsList[fcIndex].category)?.nameArm}
                            </span>
                            <span className="text-[9px] text-brand-accent font-bold uppercase tracking-wider">
                              Հայերեն
                            </span>
                          </div>

                          <div className="text-center py-2">
                            <h2 className="text-lg lg:text-xl font-black text-brand-ink tracking-tight">
                              {flashcardsList[fcIndex].armenian}
                            </h2>
                            <p className="text-[10px] text-slate-400 mt-2 font-normal animate-pulse">
                              👇 Կտտացրու քարտին թարգմանության համար
                            </p>
                          </div>

                          <div className="text-center text-[9px] text-slate-400 font-mono font-semibold">
                            Քարտ #{flashcardsList[fcIndex].id}
                          </div>
                        </div>

                        {/* BACK (Spanish revelation) */}
                        <div className="absolute inset-0 w-full h-full bg-brand-ink rounded-sm p-5 flex flex-col justify-between rotate-y-180 backface-hidden text-white">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">
                              {CATEGORIES.find(c => c.id === flashcardsList[fcIndex].category)?.nameEsp}
                            </span>
                            <span className="text-[9px] text-brand-accent font-bold uppercase tracking-wider">
                              Իսպաներեն
                            </span>
                          </div>

                          <div className="text-center py-2 space-y-2">
                            <h2 className="text-xl lg:text-2xl font-black text-yellow-300 tracking-tight select-all leading-normal">
                              {flashcardsList[fcIndex].spanish}
                            </h2>
                            
                            {flashcardsList[fcIndex].phoneticDescription && (
                              <div className="inline-block bg-white/10 border border-white/10 text-white/80 px-2 py-0.5 rounded-xs text-[10px] font-sans">
                                Phonetic: <strong>{flashcardsList[fcIndex].phoneticDescription}</strong>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-center gap-1 text-[9px] text-white/50 uppercase font-mono">
                            <Volume2 size={11} className="animate-pulse" />
                            <span>Voice synthesized</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Navigation toolbar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-brand-bg p-3 border border-brand-line rounded-sm">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={prevFlashcard}
                          className="px-2.5 py-1.5 bg-white text-slate-700 border border-brand-line hover:bg-slate-50 rounded-sm text-xs font-bold transition"
                        >
                          ◀ Նախորդը
                        </button>
                        <button
                          onClick={nextFlashcard}
                          className="px-2.5 py-1.5 bg-white text-slate-700 border border-brand-line hover:bg-slate-50 rounded-sm text-xs font-bold transition"
                        >
                          Հաջորդը ▶
                        </button>
                      </div>

                      <div className="flex items-center gap-1 w-full sm:w-auto shrink-0 justify-end">
                        <button
                          onClick={() => toggleLearned(flashcardsList[fcIndex].id)}
                          className={`px-2.5 py-1.5 text-[10px] font-bold uppercase rounded-sm transition border flex items-center gap-1 ${
                            learnedList.includes(flashcardsList[fcIndex].id)
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-extrabold'
                              : 'bg-white border-brand-line text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          <span>{learnedList.includes(flashcardsList[fcIndex].id) ? "✓ Գիտեմ" : "✔ Նշել Սովորած"}</span>
                        </button>

                        <button
                          onClick={() => toggleBookmark(flashcardsList[fcIndex].id)}
                          className={`p-2 rounded-sm border transition flex items-center justify-center ${
                            bookmarks.includes(flashcardsList[fcIndex].id)
                              ? 'bg-amber-100 border-amber-300 text-amber-700'
                              : 'bg-white border-brand-line text-slate-400 hover:text-amber-500'
                          }`}
                        >
                          <Star size={13} className={bookmarks.includes(flashcardsList[fcIndex].id) ? "fill-amber-500 text-amber-500" : ""} />
                        </button>

                        <button
                          onClick={() => speakSpanish(flashcardsList[fcIndex].spanish, flashcardsList[fcIndex].id)}
                          className="p-2 rounded-sm border border-brand-line bg-white text-slate-700 hover:bg-slate-100 transition"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: INTERACTIVE MULTIPLE CHOICE QUIZ */}
            {activeTab === 'quiz' && (
              <div id="view_quiz" className="bg-white p-4 lg:p-6 rounded-sm border border-brand-line space-y-4 max-w-xl mx-auto col-span-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-brand-line pb-3">
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-brand-ink flex items-center gap-1.5">
                      <Trophy className="text-amber-500 animate-bounce" size={14} />
                      Ինտերակտիվ Վիկտորինա
                    </h2>
                    <p className="text-[11px] text-slate-500 leading-none mt-1">
                      Ստուգեք ձեր իմացությունը: Ընտրեք իսպաներեն ճիշտ թարգմանությունը:
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-black">Թեման՝</span>
                    <select
                      id="quiz_category_select"
                      value={quizInteractiveCategory}
                      onChange={(e) => {
                        const targetCat = e.target.value;
                        setQuizInteractiveCategory(targetCat);
                        startNewQuiz(targetCat);
                      }}
                      className="bg-brand-bg border border-brand-line rounded-sm text-[10px] px-2 py-1 font-bold focus:outline-none text-slate-700"
                    >
                      <option value="all">Բոլորը միասին</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.nameArm}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!quizFinished && quizQuestions.length > 0 && (
                  <div className="space-y-4">
                    
                    {/* Progression Indicators */}
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 bg-brand-bg p-1.5 px-2.5 rounded-sm border border-brand-line">
                      <span>QUESTION: {quizIndex + 1} / {quizQuestions.length}</span>
                      <span className="text-brand-accent">TOTAL SCORE: {quizScore} / {quizIndex}</span>
                    </div>

                    <div className="w-full bg-brand-bg h-1 rounded-full overflow-hidden border border-brand-line/40">
                      <div 
                        className="bg-brand-ink h-full transition-all duration-300"
                        style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>

                    {/* Question representation box */}
                    <div className="bg-brand-bg/80 border border-brand-line rounded-sm p-4 text-center space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                        Գտեք իսպաներեն ճիշտ թարգմանությունը՝
                      </span>
                      <h3 className="text-base font-black text-brand-ink">
                        {quizQuestions[quizIndex].armenianPhrase}
                      </h3>
                    </div>

                    {/* Choice cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quizQuestions[quizIndex].choices.map((choice, index) => {
                        const isSelected = quizSelectedChoice === choice;
                        const isCorrect = choice === quizQuestions[quizIndex].correctAnswer;
                        
                        let cardClass = "bg-white text-slate-800 border-brand-line hover:bg-slate-50";
                        if (isSelected && !quizAnswered) {
                          cardClass = "bg-blue-50 border-brand-accent text-brand-accent font-bold ring-1 ring-brand-accent";
                        } else if (quizAnswered) {
                          if (isCorrect) {
                            cardClass = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-none ring-1 ring-emerald-500";
                          } else if (isSelected && !isCorrect) {
                            cardClass = "bg-red-50 border-red-500 text-red-950 line-through opacity-70";
                          } else {
                            cardClass = "opacity-50 bg-white border-brand-line/60 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleQuizChoiceSelect(choice)}
                            disabled={quizAnswered}
                            className={`p-3.5 rounded-sm text-xs border text-left transition flex items-center justify-between ${cardClass}`}
                          >
                            <span className="font-mono font-bold tracking-tight">{choice}</span>
                            
                            {quizAnswered && isCorrect && (
                              <span className="text-emerald-700 font-black font-mono text-[9px] uppercase">✓ CORRECT</span>
                            )}
                            {quizAnswered && isSelected && !isCorrect && (
                              <span className="text-red-700 font-bold font-mono text-[9px] uppercase">✕ FALSE</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom controls */}
                    <div className="pt-3 border-t border-brand-line flex items-center justify-between text-xs">
                      <div>
                        {quizAnswered && (
                          <h4 className="text-[10px] text-slate-500 font-medium font-mono">
                            CORRECT VALUE: <strong className="text-brand-accent select-all font-bold">{quizQuestions[quizIndex].correctAnswer}</strong>
                          </h4>
                        )}
                      </div>

                      <div className="flex gap-1">
                        {!quizAnswered ? (
                          <button
                            onClick={submitQuizAnswer}
                            disabled={quizSelectedChoice === null}
                            className={`px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase transition ${
                              quizSelectedChoice === null
                                ? 'bg-slate-100 text-slate-400 border border-brand-line cursor-not-allowed'
                                : 'bg-brand-ink text-white border border-brand-ink'
                            }`}
                          >
                            Պատասխանել
                          </button>
                        ) : (
                          <button
                            onClick={advanceQuiz}
                            className="px-3 py-1.5 bg-brand-accent text-white border border-brand-accent rounded-sm text-[11px] font-bold uppercase transition flex items-center gap-1"
                          >
                            <span>{quizIndex + 1 === quizQuestions.length ? "Ավարտել ➔" : "Հաջորդ հարցը ➔"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {quizFinished && (
                  <div className="text-center p-6 border border-brand-line bg-brand-bg rounded-sm max-w-sm mx-auto space-y-4">
                    <Trophy className="mx-auto text-amber-500" size={36} />
                    
                    <div className="space-y-1">
                      <h2 className="text-sm font-black uppercase text-brand-ink">
                        {quizScore >= 8 ? "Գերազա՛նց արդյունք:" : quizScore >= 5 ? "Լա՛վ է, շարունակի՛ր:" : "Պետք է մի փոքր էլ սովորել:"}
                      </h2>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Դուք ավարտեցիք իսպաներեն թարգմանությունների թեստը։
                      </p>
                    </div>

                    <div className="py-2.5 border-y border-brand-line flex items-center justify-around font-mono">
                      <div>
                        <span className="block text-xl font-bold text-brand-accent">{quizScore} / {quizQuestions.length}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">ՃԻՇՏ</span>
                      </div>
                      <div>
                        <span className="block text-xl font-bold text-slate-800">
                          {Math.round((quizScore / quizQuestions.length) * 100)} %
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">ՄԻԱՎՈՐ</span>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => startNewQuiz(quizInteractiveCategory)}
                        className="px-3 py-1.5 bg-brand-ink text-white rounded-sm text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <RotateCcw size={12} />
                        Կրկնել
                      </button>
                      <button
                        onClick={() => setActiveTab('dictionary')}
                        className="px-3 py-1.5 bg-white border border-brand-line text-slate-700 rounded-sm text-xs font-bold transition"
                      >
                        Բառարան
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* HIGH-DENSITY BANNER (JOB FOCUS PROMOTION) */}
            {selectedCategory === 'all' && searchQuery === '' && (
              <div className="bg-brand-ink p-4 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-3 shadow-none border border-brand-ink">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xs font-black tracking-tight text-yellow-300 flex items-center justify-center md:justify-start gap-1.5 uppercase font-mono">
                    <Briefcase size={14} className="text-yellow-300 text-xs shrink-0" />
                    Աշխատանք փնտրելու բաժին
                  </h3>
                  <p className="text-[11px] text-slate-300 max-w-2xl font-light leading-relaxed">
                    Զտեք աշխատանքի տեղավորմանը վերաբերող բոլոր արտահայտությունները՝ CV թողնելու, աշխատանքի մասին հարցեր տալու, ինքնակենսագրական ներկայացնելու և աշխատանքային հարցազրույց անցնելու համար։
                  </p>
                </div>

                <button
                  onClick={() => {
                    setGroupFilter('work');
                    setSelectedCategory('job_search');
                    showToast("Զտվեց աշխատանքի բաժինը", "success");
                  }}
                  className="px-3 py-1.5 bg-brand-accent text-white rounded-sm text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 transition shrink-0 border border-brand-accent"
                >
                  Դեպի աշխատանքի բաժին ➔
                </button>
              </div>
            )}

          </div>

          {/* HIGH-DENSITY STATUS BAR FOOTER */}
          <footer className="footer-bar h-8 bg-white border-t border-brand-line px-4 flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0">
            <div className="flex gap-4">
              <span>SYSTEM_OS: v4.2.0</span>
              <span className="hidden sm:inline-block">/</span>
              <span className="hidden sm:inline-block">LAST_UPDATE: 2026-06-17</span>
            </div>
            <div className="flex gap-4">
              <span>ENCODING: UTF-8</span>
              <span className="hidden sm:inline-block">/</span>
              <span className="text-brand-accent font-bold">TOTAL LEARNED: {stats.learnedCount} ({stats.percentLearned}%)</span>
            </div>
          </footer>

        </main>
      </div>

    </div>
  );
}

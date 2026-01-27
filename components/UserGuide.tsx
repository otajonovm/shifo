
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Search, Stethoscope, ChevronDown, ChevronUp, BookOpen,
  LayoutDashboard, Users as UsersIcon, Calendar, CreditCard, Box,
  Settings, Zap, MessageSquare, Send, Sparkles, X, Layers, Shield, 
  ListChecks, HeartPulse, Wallet, Receipt, Package, PieChart, UserCog, Languages,
  UserCircle, CheckCircle2, FileText, Bell, LogOut, TrendingUp, AlertCircle
} from 'lucide-react';
import { UserRole, GuideSection } from '../types';
import { GoogleGenAI } from "@google/genai";

interface UserGuideProps {
  onBackToLanding: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ onBackToLanding }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.ADMIN);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['intro']));
  
  // AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const guideSections: GuideSection[] = [
    {
      id: 'intro',
      icon: <BookOpen className="h-5 w-5" />,
      title: "Kirish",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "ShifoCRM loyihasi kitobchasi (foydalanuvchi qo'llanma). Ushbu hujjat ShifoCRM tizimidagi barcha asosiy bo'limlar va rollar bo'yicha qanday ishlash kerakligini aniq va tushunarli tarzda tushuntiradi.",
    },
    {
      id: 'roles',
      icon: <Shield className="h-5 w-5" />,
      title: "1. Rollar va kirish huquqlari",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Tizimda 2 ta rol mavjud: Admin va Doctor.",
      subsections: [
        { 
          title: "Admin", 
          content: "Barcha modullarga kirish huquqi bor. Admin menyu bo'limlari: Dashboard, Bemorlar, Doktorlar, Uchrashuvlar, To'lovlar, Xizmatlar, Ombor, Hisobotlar, Sozlamalar." 
        },
        { 
          title: "Doctor", 
          content: "Faqat shaxsiy bemorlar, uchrashuvlar, davolash rejasi va profil. Doctor menyu bo'limlari: Dashboard, Mening bemorlarim, Mening uchrashuvlarim, Davolash rejalari, Profil (doktor profili)." 
        }
      ]
    },
    {
      id: 'login',
      icon: <UserCircle className="h-5 w-5" />,
      title: "2. Tizimga kirish (Login)",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Login sahifasida ikki taba mavjud: Admin va Doctor.",
      subsections: [
        { 
          title: "Admin login", 
          content: "1) Login sahifasida Admin tabini tanlang. 2) Login va parolni kiriting. 3) Kirish tugmasini bosing. Admin uchun login ma'lumotlari db.json faylida saqlanadi. Amaliyotda bu ma'lumotlar faqat adminlarda bo'lishi kerak." 
        },
        { 
          title: "Doctor login", 
          content: "1) Login sahifasida Doctor tabini tanlang. 2) Email va parolni kiriting. 3) Kirish tugmasini bosing. Doctor akkaunti Admin tomonidan Doktorlar bo'limida yaratiladi." 
        },
        { 
          title: "Tizimdan chiqish (Logout)", 
          content: "O'ng yuqori menyudan chiqish tugmasini bosing yoki sidebar pastidagi chiqish ikonkasini bosing." 
        }
      ]
    },
    {
      id: 'layout',
      icon: <Layers className="h-5 w-5" />,
      title: "3. Asosiy interfeys (Layout)",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Tizimning intuitiv tuzilishi foydalanuvchiga ishlashda qulaylik yaratadi.",
      subsections: [
        { 
          title: "Sidebar", 
          content: "Chap tomonda rolga mos menyular ko'rsatiladi." 
        },
        { 
          title: "Header", 
          content: "Qidiruv: faqat adminlarda. Bildirishnomalar: belgi orqali ko'rinadi. Profil menyusi: profil, sozlamalar va chiqish." 
        }
      ]
    },
    {
      id: 'dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "4. Dashboard",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Asosiy statistik va tezkor amallar paneli.",
      subsections: activeRole === UserRole.ADMIN ? [
        { 
          title: "Admin Dashboard - Asosiy bloklar", 
          content: "Tushum (Revenue): kun/hafta/oy kesimida. Qarzdorlik: umumiy qarz va top 3 qarzdor. Bugungi uchrashuvlar: jadval va statuslar. Tezkor tugmalar: yangi bemor, uchrashuv va to'lov." 
        }
      ] : [
        { 
          title: "Doctor Dashboard - Asosiy bloklar", 
          content: "Xush kelibsiz banneri va vaqt. Keyingi bemor: tezkor boshlash. Quick Actions: uchrashuv, rejalar, qabulni boshlash. Bugungi jadval: timeline ko'rinishida. Bugungi rejalar: reja -> tashrifga aylantirish, bajarilgan belgilash. Mening bemorlarim: statistik ko'rsatkich." 
        }
      ]
    },
    {
      id: 'patients',
      icon: <UsersIcon className="h-5 w-5" />,
      title: "5. Bemorlar bo'limi",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Klinika bemorlarining to'liq ma'lumotlar bazasi.",
      subsections: [
        { 
          title: "Admin (Barcha bemorlar) - Funksiyalar", 
          content: "Qidirish, status bo'yicha filtrlash, doktor bo'yicha filtrlash. Eksport qilish. Yangi bemor qo'shish, tahrirlash va o'chirish." 
        },
        { 
          title: "Doctor (Mening bemorlarim)", 
          content: "Doctor faqat o'z bemorlarini ko'radi va ular bo'yicha ishlaydi." 
        },
        { 
          title: "Bemor profili (Patient Detail)", 
          content: "Bemor kartasi tarkibi: Ism, ID, telefon, balans, doktor, oxirgi tashrif. Qarzdorlik banneri (agar qarz bo'lsa). Tablar: Tashriflar (bemorning tashriflari), Odontogramma (tishlar holati), To'lovlar (to'lovlar ko'rinishi), Davolash rejasi (bemor rejalari), Hujjatlar (hujjatlar bo'limi). Adminlar bemor statusini o'zgartira oladi." 
        }
      ]
    },
    {
      id: 'doctors',
      icon: <HeartPulse className="h-5 w-5" />,
      title: "6. Doktorlar bo'limi (Admin)",
      roles: [UserRole.ADMIN],
      content: "Shifokorlarni tizimga qo'shish va boshqarish.",
      subsections: [
        { 
          title: "Doktor qo'shish formasi", 
          content: "Quyidagilar kiritiladi: F.I.O., Telefon, Email, Parol, Mutaxassislik, Faollik (active). Cheklov: maksimal 4 ta doktor." 
        },
        { 
          title: "Boshqarish", 
          content: "Doktorlar jadvalida tahrirlash va o'chirish mavjud." 
        }
      ]
    },
    {
      id: 'appointments',
      icon: <Calendar className="h-5 w-5" />,
      title: "7. Uchrashuvlar bo'limi",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Qabullarni rejalashtirish va monitoring qilish.",
      subsections: [
        { 
          title: "Ko'rinishlar va funksiyalar", 
          content: "Admin va doctor uchun bir xil ko'rinish: Kun/hafta/oy ko'rinishi. Sana bo'yicha tez o'tish. Qidiruv va filtrlash (doktor, status, xizmat, to'lov holati). Bulk actions: status o'zgartirish, reschedule, doktor almashtirish (admin)." 
        },
        { 
          title: "Uchrashuv statuslari", 
          content: "pending: Yozildi, arrived: Keldi, in_progress: Davolanish boshlandi, completed_debt: Qarzdor, completed_paid: Yakunlandi, cancelled: Bekor qilingan, no_show: Kelmagan, archived: Arxivlangan." 
        },
        { 
          title: "Muhim qoida", 
          content: "completed_debt -> completed_paid faqat qarzdorlik 0 bo'lsa." 
        }
      ]
    },
    {
      id: 'payments',
      icon: <Wallet className="h-5 w-5" />,
      title: "8. To'lovlar bo'limi (Admin)",
      roles: [UserRole.ADMIN],
      content: "Klinika moliyaviy oqimlarini boshqarish.",
      subsections: [
        { 
          title: "Asosiy imkoniyatlar", 
          content: "Umumiy to'lovlar, refund va sof daromad ko'rsatkichlari. Filtrlar: sana, bemor, doktor, to'lov turi, to'lov usuli. To'lovlar ro'yxati va CRUD (qo'shish, tahrirlash, o'chirish)." 
        },
        { 
          title: "To'lov turlari va usullari", 
          content: "To'lov turlari: payment, refund, adjustment. To'lov usullari: cash, card, transfer." 
        }
      ]
    },
    {
      id: 'services',
      icon: <Receipt className="h-5 w-5" />,
      title: "9. Xizmatlar bo'limi (Admin)",
      roles: [UserRole.ADMIN],
      content: "Xizmatlar va narxlar siyosati.",
      subsections: [
        { 
          title: "Bo'limlar", 
          content: "Xizmatlar: xizmatlar ro'yxati, narx, status. Paketlar: paket xizmatlar. Chegirmalar: chegirma qoidalari. Audit: narx o'zgarishi loglari. Statistika: top xizmatlar va daromad." 
        }
      ]
    },
    {
      id: 'warehouse',
      icon: <Package className="h-5 w-5" />,
      title: "10. Ombor bo'limi (Admin)",
      roles: [UserRole.ADMIN],
      content: "Materiallar hisobi va sarf-xarajatlar.",
      subsections: [
        { 
          title: "Tablar", 
          content: "Materiallar: materiallar ro'yxati va qoldiq. Kirim/Chiqim: ombor harakati (in/out). Harajatlar: ombor xarajatlari. CRUD amallari modallar orqali bajariladi." 
        }
      ]
    },
    {
      id: 'reports',
      icon: <PieChart className="h-5 w-5" />,
      title: "11. Hisobotlar bo'limi (Admin)",
      roles: [UserRole.ADMIN],
      content: "Klinika faoliyatining to'liq tahlili.",
      subsections: [
        { 
          title: "Filtrlar va ko'rsatkichlar", 
          content: "Filtrlar: Sana oralig'i. Ko'rsatkichlar: Umumiy to'lovlar, refund, sof daromad, umumiy qarz. To'lov usullari bo'yicha statistikalar. Doktorlar bo'yicha daromad. Qarzdorlar ro'yxati. Eng ko'p tushumli xizmatlar. Oylik xizmat daromadi. Kunlik daromad grafigi." 
        }
      ]
    },
    {
      id: 'treatment',
      icon: <ListChecks className="h-5 w-5" />,
      title: "12. Davolash rejalari (Doctor)",
      roles: [UserRole.DOCTOR],
      content: "Bemorlarga davolash strategiyasini tuzish.",
      subsections: [
        { 
          title: "Funksiyalar", 
          content: "Reja yaratish (bemor, sana, status, prioritet, tish, narx). Rejalarni filtrlash. Rejani tashrifga aylantirish. Rejani bajarilgan/deferred/cancel holatlariga o'tkazish." 
        }
      ]
    },
    {
      id: 'profile',
      icon: <UserCog className="h-5 w-5" />,
      title: "13. Doktor profili (Doctor)",
      roles: [UserRole.DOCTOR],
      content: "Shaxsiy ish ma'lumotlarini sozlash.",
      subsections: [
        { 
          title: "Bo'limlar", 
          content: "Shaxsiy ma'lumotlar: F.I.O, telefon, mutaxassislik. Ish jadvali: haftalik ish vaqti, tanaffus. Parolni o'zgartirish." 
        }
      ]
    },
    {
      id: 'settings',
      icon: <Languages className="h-5 w-5" />,
      title: "14. Sozlamalar",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Tizimning umumiy sozlamalari.",
      subsections: [
        { 
          title: "Til sozlamalari", 
          content: "Hozircha faqat til sozlamalari mavjud: O'zbekcha, Русский." 
        }
      ]
    },
    {
      id: 'tips',
      icon: <Zap className="h-5 w-5" />,
      title: "15. Tezkor maslahatlar",
      roles: [UserRole.ADMIN, UserRole.DOCTOR],
      content: "Samaradorlikni oshirish uchun kichik tavsiyalar.",
      subsections: [
        { 
          title: "Foydali maslahatlar", 
          content: "Har bir jadvalda filtrlardan foydalanib ma'lumotlarni tez toping. Adminlar qarzdorlar bo'limini kuzatib boring. Doctorlar davolash rejasini vaqtida yangilab boring. Uchrashuv statuslarini to'g'ri yuritish hisobotlarga bevosita ta'sir qiladi." 
        }
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Siz ShifoCRM tizimining texnik qo'llanmasisiz. 
          Sizda barcha 15 ta bo'lim haqida to'liq ma'lumot bor. 
          Foydalanuvchilarga tizimdan qanday foydalanishni, menyularni va amallarni professional darajada tushuntiring.
          Javoblar o'zbek tilida bo'lsin.`
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Xatolik yuz berdi.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Hozircha javob bera olmayman. Iltimos keyinroq urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const filteredSections = guideSections.filter(s => 
    s.roles.includes(activeRole) && 
    (s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (s.subsections && s.subsections.some(sub => 
       sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       sub.content.toLowerCase().includes(searchQuery.toLowerCase())
     )))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-shifo-primary to-shifo-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center py-2 px-5 rounded-full bg-white/20 text-white text-xs font-black tracking-widest uppercase mb-6 border border-white/30">
              <BookOpen className="h-4 w-4 mr-2" /> Qo'llanma
            </div>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">
              ShifoCRM loyihasi kitobchasi
            </h1>
            <p className="text-xl text-white/90 font-medium leading-relaxed">
              Ushbu hujjat ShifoCRM tizimidagi barcha asosiy bo'limlar va rollar bo'yicha qanday ishlash kerakligini aniq va tushunarli tarzda tushuntiradi.
            </p>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToLanding}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-shifo-primary p-2 rounded-xl">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-none">Foydalanuvchi Qo'llanmasi</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">15 ta bo'lim</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-shifo-primary/20 w-64 transition-all placeholder:text-slate-400" 
              />
            </div>
            <button 
              onClick={() => setChatOpen(!chatOpen)} 
              className="bg-shifo-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-shifo-accent transition-all flex items-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Yordamchi</span>
            </button>
          </div>
        </div>
      </header>

      {/* Role Filter */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-slate-600">Rol tanlash:</p>
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
            <button 
              onClick={() => setActiveRole(UserRole.ADMIN)} 
              className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${
                activeRole === UserRole.ADMIN 
                  ? 'bg-shifo-primary text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
            <button 
              onClick={() => setActiveRole(UserRole.DOCTOR)} 
              className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${
                activeRole === UserRole.DOCTOR 
                  ? 'bg-shifo-primary text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Card Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const IconComponent = section.icon;
            
            return (
              <div
                key={section.id}
                className={`bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-shifo-primary/30 ${
                  isExpanded ? 'ring-2 ring-shifo-primary/20' : ''
                }`}
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 flex items-start justify-between text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-shifo-light p-3 rounded-xl text-shifo-primary shrink-0">
                      {IconComponent}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">
                        {section.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium line-clamp-2">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && section.subsections && (
                  <div className="px-6 pb-6 space-y-4 border-t border-slate-100 pt-6">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-shifo-primary/10 text-shifo-primary rounded-lg p-1.5 shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-slate-900 text-sm mb-1.5">
                              {sub.title}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                              {sub.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-bold text-lg">Hech narsa topilmadi</p>
            <p className="text-sm text-slate-400 mt-2">Qidiruv so'zini o'zgartiring</p>
          </div>
        )}
      </main>

      {/* AI Chat Overlay */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-[95%] sm:w-[420px] h-[600px] bg-white rounded-3xl border border-slate-200 flex flex-col z-[100] overflow-hidden">
          <div className="shifo-gradient p-6 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6" />
              <div>
                <p className="font-black text-lg tracking-tight">Shifo-AI</p>
                <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Yordamchi</p>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-4">
                <div className="h-16 w-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-shifo-primary">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-lg mb-1">Savolingiz bormi?</h5>
                  <p className="text-slate-500 font-bold text-sm">Tizim bo'yicha yordam bera olaman</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-bold leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-shifo-primary text-white' 
                    : 'bg-white border border-slate-100 text-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-slate-400 text-xs font-bold animate-pulse px-2">
                Yozmoqda...
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()} 
                placeholder="Savol yozing..." 
                className="flex-1 bg-slate-100 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-shifo-primary/20 placeholder:text-slate-400" 
              />
              <button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isTyping} 
                className="bg-shifo-primary text-white p-3 rounded-xl hover:bg-shifo-accent transition-all disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGuide;

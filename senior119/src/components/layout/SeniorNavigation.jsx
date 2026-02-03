import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, Home, MapPin, Calculator, AlertCircle, FileQuestion, HeartHandshake } from 'lucide-react';

const SeniorNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
        window.scrollTo(0, 0); // 페이지 이동 시 상단으로 스크롤
    }, [location.pathname]);

    // ESC 키로 메뉴 닫기 (접근성)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    const menuItems = [
        { title: '홈으로', path: '/', icon: <Home size={24} />, color: 'text-blue-600' },
        { title: '실업급여 확인', path: '/guide/unemployment', icon: <FileQuestion size={24} />, color: 'text-emerald-600' },
        { title: '퇴직금 계산', path: '/guide/severance', icon: <Calculator size={24} />, color: 'text-purple-600' },
        { title: '억울한 일 신고', path: '/guide/violation', icon: <AlertCircle size={24} />, color: 'text-red-600' },
        { title: '최저임금/주휴수당', path: '/guide/minimum-wage', icon: <Calculator size={24} />, color: 'text-blue-500' },
        { title: '연차수당 계산', path: '/guide/annual-leave', icon: <Calculator size={24} />, color: 'text-teal-600' },
        { title: '4대보험 확인', path: '/guide/insurance', icon: <AlertCircle size={24} />, color: 'text-indigo-600' },
        { title: '부당해고 진단', path: '/guide/unfair-dismissal', icon: <AlertCircle size={24} />, color: 'text-rose-600' },
        { title: '가까운 센터 찾기', path: '/location', icon: <MapPin size={24} />, color: 'text-orange-600' },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Left: Back Button or Logo */}
                    <div className="flex items-center gap-2">
                        {!isHome ? (
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                aria-label="뒤로가기"
                            >
                                <ArrowLeft size={28} className="text-gray-700" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.location.href = '/'}>
                                <div className="relative flex items-center justify-center size-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-md">
                                    <span className="material-symbols-outlined text-[24px]" aria-hidden="true">medical_services</span>
                                </div>
                                <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none hidden sm:block">Senior 119</h1>
                            </div>
                        )}
                    </div>

                    {/* Center: Title (Optional, showed on subpages if needed) */}
                    {!isHome && (
                        <h1 className="text-lg font-bold text-gray-800 truncate max-w-[200px] hidden md:block">
                            {location.pathname.includes('unemployment') && '실업급여 진단'}
                            {location.pathname.includes('severance') && '퇴직금 계산'}
                            {location.pathname.includes('violation') && '위반 사항 체크'}
                            {location.pathname.includes('location') && '신고센터 찾기'}
                        </h1>
                    )}

                    {/* Right: Hamburger Menu */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors group"
                        aria-label="전체 메뉴 열기"
                    >
                        {/* Custom "Samsung/Three-line" styled icon if requested, but Lucide Menu is standard hamburger */}
                        <Menu size={32} className="text-gray-800 group-hover:text-blue-600 transition-colors" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={toggleMenu}
                    ></div>

                    {/* Sidebar/Drawer */}
                    <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="p-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">전체 메뉴</h2>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                                aria-label="메뉴 닫기"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all border border-transparent ${location.pathname === item.path
                                        ? 'bg-blue-50 border-blue-200 text-blue-800 font-bold shadow-sm'
                                        : 'hover:bg-gray-50 text-gray-700 font-medium'
                                        }`}
                                >
                                    <div className={`${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-lg">{item.title}</span>
                                </button>
                            ))}

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-sm font-bold text-gray-400 mb-4 px-4">긴급 도움</p>
                                <button
                                    onClick={() => window.open('tel:1350')}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 transition-colors"
                                >
                                    <div className="bg-orange-200 p-2 rounded-full">
                                        <span className="material-symbols-outlined text-orange-700">call</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold">고용노동부 1350</p>
                                        <p className="text-xs text-orange-700/80">무료 법률 상담 전화</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400">© 2026 Senior 119</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SeniorNavigation;

import React from 'react';

const SeniorLayout = ({ children }) => {
    return (
        <div className="min-h-dvh font-display text-slate-800 flex flex-col safe-area-pt safe-area-pb relative overflow-hidden">

            {/* Background Blobs (Decoration) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000"></div>

            {/* Accessibility: Skip to Content */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-kakao-yellow text-black font-bold p-4 z-50 rounded-lg shadow-xl ring-4 ring-black/50">
                본문으로 바로가기
            </a>

            {/* Top Navbar - Glass Effect */}
            <header role="banner" className="sticky top-0 z-50 w-full glass-panel border-b border-indigo-50/50">
                <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 select-none cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="relative flex items-center justify-center size-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[32px] drop-shadow-md" aria-hidden="true">medical_services</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black tracking-tight text-slate-800 leading-none">Senior 119</h1>
                            <p className="text-xs font-bold text-slate-400 tracking-wide uppercase mt-1">Legal Emergency Room</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Centered Card */}
            <main id="main-content" role="main" className="flex-grow flex flex-col items-center justify-start px-4 md:px-6 py-8 w-full max-w-[1280px] mx-auto z-0">
                {children}
            </main>

            {/* Footer */}
            <footer role="contentinfo" className="w-full bg-white/50 backdrop-blur-sm border-t border-slate-200 py-8 px-6 mt-auto">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-slate-600 text-sm font-semibold">도움이 필요하신가요?</p>
                        <p className="text-xs text-slate-400 mt-1">© 2025 Senior 119. Designed for Accessibility.</p>
                    </div>
                    <button className="group w-full md:w-auto flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] font-bold text-lg py-3 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95">
                        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" aria-hidden="true">chat_bubble</span>
                        <span>자녀에게 공유하기</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default SeniorLayout;

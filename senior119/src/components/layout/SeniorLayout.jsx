import React from 'react';
import SeniorNavigation from './SeniorNavigation';

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

            {/* New Navigation Bar (Replaces old header) */}
            <SeniorNavigation />

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
                </div>
            </footer>
        </div>
    );
};

export default SeniorLayout;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero Text */}
            <div className="text-center max-w-4xl mx-auto mb-10 animate-fadeIn">
                <h2 className="text-[#0d141c] dark:text-white text-[32px] md:text-[40px] font-bold leading-tight break-keep">
                    어르신! 억울하게 돈을 못 받으셨나요?<br />
                    <span className="text-primary block mt-2">지금 바로 확인해 드릴게요.</span>
                </h2>
            </div>

            {/* Action Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 flex-1 min-h-[500px]">

                {/* Card 1: Red - Unfair Dismissal / Violation */}
                <button
                    onClick={() => navigate('/guide/violation')}
                    className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200 overflow-hidden"
                >
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>

                    <div className="bg-white/20 p-6 rounded-full group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[80px] md:text-[90px]" aria-hidden="true">person_cancel</span>
                    </div>
                    <h3 className="text-[28px] md:text-[34px] font-bold leading-tight drop-shadow-sm break-keep">
                        억울한 일을<br />당했어요!
                    </h3>
                    <div className="absolute bottom-8 right-8 opacity-60 group-hover:translate-x-2 transition-transform">
                        <span className="material-symbols-outlined text-4xl" aria-hidden="true">arrow_forward</span>
                    </div>
                </button>

                {/* Card 2: Orange - Severance Pay */}
                <button
                    onClick={() => navigate('/guide/severance')}
                    className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200 overflow-hidden"
                >
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>

                    <div className="bg-white/20 p-6 rounded-full group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[80px] md:text-[90px]" aria-hidden="true">sentiment_dissatisfied</span>
                    </div>
                    <h3 className="text-[28px] md:text-[34px] font-bold leading-tight drop-shadow-sm break-keep">
                        퇴직금 계산<br />해볼래요!
                    </h3>
                    <div className="absolute bottom-8 right-8 opacity-60 group-hover:translate-x-2 transition-transform">
                        <span className="material-symbols-outlined text-4xl" aria-hidden="true">arrow_forward</span>
                    </div>
                </button>

                {/* Card 3: Green - Unemployment Benefits (Active) */}
                <button
                    onClick={() => navigate('/guide/unemployment')}
                    className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-200 ring-4 ring-offset-4 ring-emerald-100 overflow-hidden"
                >
                    {/* Shine Effect */}
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine"></div>

                    <div className="bg-white/20 p-6 rounded-full group-hover:bg-white/30 transition-colors backdrop-blur-md">
                        <span className="material-symbols-outlined text-[80px] md:text-[100px]" aria-hidden="true">account_balance_wallet</span>
                    </div>
                    <h3 className="text-[32px] md:text-[40px] font-extrabold leading-tight drop-shadow-md break-keep">
                        실업급여<br />받을 수 있나요?
                    </h3>
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="text-sm font-bold uppercase tracking-widest">분석하기</span>
                        <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_forward</span>
                    </div>
                </button>

            </div>

            {/* Location Finder Banner */}
            <div className="w-full mt-12 animate-fadeIn delay-300">
                <button
                    onClick={() => navigate('/location')}
                    className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center justify-between hover:shadow-xl hover:border-blue-200 transition-all group"
                >
                    <div className="flex items-center gap-4 text-left">
                        <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <span className="material-symbols-outlined text-3xl">location_on</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">가까운 노동청/고용센터 찾기</h3>
                            <p className="text-gray-500">내 위치에서 가장 가까운 신고 기관을 알려드립니다.</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-500 transition-colors text-3xl">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default Home;

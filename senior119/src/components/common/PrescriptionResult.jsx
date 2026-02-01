import React from 'react';
import { motion } from 'framer-motion';

const PrescriptionResult = ({ diagnosis }) => {
    const { canReceive, reason, reasonDetail, referLaw } = diagnosis;

    return (
        <div className="w-full max-w-3xl glass-panel rounded-xl overflow-hidden relative group animate-slideUp">
            {/* Card Top Border (Theme Primary) */}
            <div className="h-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Card Content Wrapper */}
            <div className="p-8 sm:p-12 flex flex-col items-center text-center">

                {/* Diagnosis Header */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">clinical_notes</span>
                        <span>공식 진단 결과</span>
                    </div>
                    <h1 className="text-[#0d141c] dark:text-white tracking-tight text-[32px] sm:text-[40px] font-extrabold leading-tight break-keep">
                        진단 보고서
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">
                        발급일: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Status Icon & Message */}
                <div className="flex flex-col items-center gap-6 mb-10 w-full">
                    <div className={`rounded - full p - 6 ring - 8 shadow - inner ${ canReceive ? 'bg-green-50 ring-green-50/50' : 'bg-red-50 ring-red-50/50' } `}>
                        <span
                            className={`material - symbols - outlined text - [80px] sm: text - [100px] leading - none drop - shadow - sm ${ canReceive ? 'text-success' : 'text-emergency-red' } `}
                            aria-hidden="true"
                        >
                            {canReceive ? 'check_circle' : 'cancel'}
                        </span>
                    </div>
                    <h2 className="text-[#0d141c] dark:text-white text-2xl sm:text-3xl font-extrabold leading-snug max-w-[500px] break-keep">
                        {canReceive
                            ? "실업급여를 받을 수 있습니다!"
                            : "수급 자격이 부족해 보입니다."}
                    </h2>
                </div>

                {/* Prescription Divider (Dashed) */}
                <div className="w-full h-[2px] mb-10 opacity-30" style={{ backgroundImage: "linear-gradient(to right, #000 50%, rgba(255,255,255,0) 0%)", backgroundSize: "20px 2px", backgroundRepeat: "repeat-x" }}></div>

                {/* Detailed Description */}
                <div className="flex flex-col items-center gap-4 mb-10 max-w-2xl">
                    <span className={`px - 3 py - 1 rounded - full text - sm font - bold border ${ canReceive ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-red-100/50 text-red-700 border-red-200' } `}>
                        {canReceive ? "수급 자격 확인됨" : "수급 제한 사유 발견"}
                    </span>
                    <p className="text-[#0d141c] dark:text-slate-100 text-xl sm:text-2xl font-bold leading-relaxed break-keep">
                        "{reason}"
                    </p>
                    {reasonDetail && (
                        <div className="bg-slate-50/50 backdrop-blur-sm p-4 rounded-lg text-slate-600 text-sm mt-2 font-mono text-left w-full border border-slate-200/50">
                            <strong>참고 조항:</strong> {reasonDetail}<br />
                            {referLaw && <span className="text-xs text-slate-400">({referLaw})</span>}
                        </div>
                    )}
                </div>

                {/* Action Box (Rx) */}
                <div className="w-full bg-slate-50/50 rounded-xl border-2 border-dashed border-primary/30 p-6 sm:p-8 mb-10 relative overflow-hidden text-left backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-8xl text-primary" aria-hidden="true">prescriptions</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-lg">
                            <span className="material-symbols-outlined" aria-hidden="true">medication</span>
                            <span>처방전 (Action Plan)</span>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <p className="text-[#0d141c] dark:text-white text-2xl font-extrabold leading-tight">
                                {canReceive ? "즉시 신청하세요" : "전문가 상담 권장"}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-lg">
                                {canReceive
                                    ? "고용센터 방문 또는 1350 전화 상담"
                                    : "아래 버튼을 눌러 노무사와 상담해보세요."}
                            </p>
                        </div>

                        {canReceive && (
                            <button
                                onClick={() => window.location.href = "tel:1350"}
                                className="mt-4 flex shrink-0 min-w-[140px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-gradient-to-r from-blue-500 to-primary text-white text-lg font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined mr-2" aria-hidden="true">call</span>
                                1350 전화걸기
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Kakao Button */}
                    <button
                        onClick={() => alert("카카오톡 공유 기능은 준비 중입니다.")}
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg h-16 px-4 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] text-base sm:text-lg font-bold transition-colors shadow-sm hover:shadow-md"
                    >
                        <span className="material-symbols-outlined mr-3 text-2xl" aria-hidden="true">chat_bubble</span>
                        가족에게 공유하기
                    </button>

                    {/* Attorney Button */}
                    <button
                        onClick={() => alert("노무사 찾기 기능은 준비 중입니다.")}
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg h-16 px-4 bg-slate-800 hover:bg-slate-900 text-white text-base sm:text-lg font-bold transition-colors shadow-lg hover:shadow-xl"
                    >
                        <span className="material-symbols-outlined mr-3 text-2xl" aria-hidden="true">gavel</span>
                        노무사 찾기
                    </button>
                </div>

            </div>

            {/* Decorative Bottom Bar */}
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 flex">
                <div className="w-1/4 h-full bg-primary/20"></div>
                <div className="w-1/4 h-full bg-primary/40"></div>
                <div className="w-1/4 h-full bg-primary/60"></div>
                <div className="w-1/4 h-full bg-primary/80"></div>
            </div>
        </div>
    );
};

export default PrescriptionResult;

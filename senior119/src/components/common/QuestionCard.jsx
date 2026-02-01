import React from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ question, onYes, onNo, currentStep, totalSteps }) => {
    // Generate caterpillar segments
    const segments = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-12 animate-fadeIn">

            {/* Progress Section: The Caterpillar */}
            <section aria-label="Progress" className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-end px-1">
                    <p className="text-slate-900 dark:text-white text-xl font-bold leading-normal">
                        질문 {currentStep} <span className="text-slate-500 font-medium text-lg">/ {totalSteps}</span>
                    </p>
                    <p className="text-primary text-sm font-semibold uppercase tracking-wider">진단 진행 중</p>
                </div>

                {/* Caterpillar Bar Container */}
                <div
                    role="progressbar"
                    aria-valuemin="1"
                    aria-valuemax={totalSteps}
                    aria-valuenow={currentStep}
                    className="flex gap-2 h-6 md:h-8 w-full"
                >
                    {segments.map((step) => (
                        <div
                            key={step}
                            className={`flex-1 rounded-full shadow-sm transition-all duration-300 ${step <= currentStep
                                ? 'bg-primary'
                                : 'bg-slate-200 dark:bg-slate-700'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Question Card - Glass Effect */}
            <section className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                {/* Question Text - Announced automatically */}
                <div
                    aria-live="polite"
                    className="flex-1 flex flex-col gap-6"
                >
                    <h1
                        tabIndex="-1"
                        className="text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-[40px] font-black leading-tight tracking-tight text-center md:text-left focus:outline-none break-keep"
                    >
                        {question}
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed text-center md:text-left">
                        정확한 진단을 위해 솔직하게 답변해 주세요.
                    </p>
                </div>

                {/* Audio Button */}
                <div className="flex-shrink-0">
                    <button
                        onClick={() => alert("음성 안내 기능은 준비 중입니다.")}
                        aria-label="질문 듣기"
                        className="group flex flex-col items-center justify-center size-24 md:size-32 rounded-2xl bg-white/50 hover:bg-white border-2 border-white/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                    >
                        <span className="material-symbols-outlined !text-6xl text-primary group-hover:scale-110 transition-transform drop-shadow-sm">volume_up</span>
                        <span className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">듣기</span>
                    </button>
                </div>
            </section>

            {/* Action Buttons Area */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                {/* YES Button */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onYes}
                    className="relative group flex items-center justify-center w-full h-32 md:h-40 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 border border-white/20 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 md:gap-6 pointer-events-none relative z-10">
                        <span className="material-symbols-outlined !text-[48px] md:!text-[64px] font-bold drop-shadow-md">check_circle</span>
                        <span className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">네</span>
                    </div>
                    <span className="sr-only">네, 맞습니다</span>
                </motion.button>

                {/* NO Button */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onNo}
                    className="relative group flex items-center justify-center w-full h-32 md:h-40 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 border border-white/20 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 md:gap-6 pointer-events-none relative z-10">
                        <span className="material-symbols-outlined !text-[48px] md:!text-[64px] font-bold drop-shadow-md">cancel</span>
                        <span className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">아니요</span>
                    </div>
                    <span className="sr-only">아니요, 아닙니다</span>
                </motion.button>
            </section>

            {/* Helper Links */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => alert("잘 모르겠음 기능은 준비 중입니다.")}
                    className="text-slate-500 hover:text-primary underline text-lg font-medium transition-colors p-2"
                >
                    잘 모르겠어요 (Skip)
                </button>
            </div>

        </div>
    );
};

export default QuestionCard;

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { unemploymentSteps, getResultContent } from '../../data/unemploymentLogic';
import { useNavigate } from 'react-router-dom';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const Unemployment = () => {
    const navigate = useNavigate();
    const [currentStepId, setCurrentStepId] = useState('age'); // Start with the first step
    const [history, setHistory] = useState([]); // To track path for "Back" button
    const [resultId, setResultId] = useState(null);

    const currentStep = unemploymentSteps.find(s => s.id === currentStepId);
    const result = resultId ? getResultContent(resultId) : null;

    const handleOptionClick = (option) => {
        if (option.result) {
            // Reached a result
            setHistory([...history, currentStepId]);
            setResultId(option.result);
            setCurrentStepId(null);
        } else if (option.next) {
            // Go to next step
            setHistory([...history, currentStepId]);
            setCurrentStepId(option.next);
        }
    };

    const handleBack = () => {
        if (resultId) {
            // Back from result to last question
            const lastStep = history[history.length - 1];
            setResultId(null);
            setCurrentStepId(lastStep);
            setHistory(history.slice(0, -1));
        } else if (history.length > 0) {
            // Back to previous question
            const lastStep = history[history.length - 1];
            setCurrentStepId(lastStep);
            setHistory(history.slice(0, -1));
        } else {
            // Back to home
            navigate('/');
        }
    };

    const handleRestart = () => {
        setCurrentStepId('age');
        setResultId(null);
        setHistory([]);
    };

    // Progress Bar Calculation
    const totalSteps = unemploymentSteps.length; // Approximate
    const progress = Math.min((history.length / totalSteps) * 100, 100);

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex items-center justify-between">
                {(history.length > 0 || resultId) ? (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                    >
                        <ChevronLeft size={24} />
                        <span>이전 질문</span>
                    </button>
                ) : <div></div>}

                <h2 className="text-xl font-bold text-gray-800">실업급여 자격 진단</h2>
            </div>

            {/* Progress Bar */}
            {
                !resultId && (
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress + 20}%` }}
                        ></div>
                    </div>
                )
            }

            {/* Question Card */}
            {
                currentStep && !resultId && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-50 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0 mt-1">
                                <HelpCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                                    {currentStep.question}
                                </h3>
                                {currentStep.description && (
                                    <p className="mt-3 text-lg text-gray-600 bg-gray-50 p-4 rounded-xl">
                                        💡 {currentStep.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            {currentStep.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="w-full p-6 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center justify-between shadow-sm hover:shadow-md"
                                >
                                    <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700">
                                        {option.label}
                                    </span>
                                    <ArrowRight className="text-gray-300 group-hover:text-blue-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Result Card */}
            {
                resultId && result && (
                    <div className={`rounded-2xl p-8 shadow-lg border-2 animate-in zoom-in-95 duration-500 ${result.status === 'success' ? 'bg-green-50 border-green-200' :
                        result.status === 'error' ? 'bg-red-50 border-red-200' :
                            'bg-blue-50 border-blue-200'
                        }`}>
                        <div className="flex flex-col items-center text-center">
                            {result.status === 'success' ? (
                                <CheckCircle2 size={64} className="text-green-600 mb-4" />
                            ) : result.status === 'error' ? (
                                <XCircle size={64} className="text-red-600 mb-4" />
                            ) : (
                                <HelpCircle size={64} className="text-blue-600 mb-4" />
                            )}

                            <h3 className={`text-3xl font-bold mb-4 ${result.status === 'success' ? 'text-green-800' :
                                result.status === 'error' ? 'text-red-800' :
                                    'text-blue-800'
                                }`}>
                                {result.title}
                            </h3>

                            <p className="text-xl text-gray-700 leading-relaxed mb-8 bg-white/60 p-6 rounded-xl">
                                {result.description}
                            </p>

                            <div className="flex flex-col w-full gap-3 sm:flex-row sm:justify-center">
                                <button
                                    onClick={handleRestart}
                                    className="py-4 px-8 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                                >
                                    처음부터 다시하기
                                </button>

                                {result.status === 'success' && (
                                    <button
                                        onClick={() => navigate('/location')}
                                        className="py-4 px-8 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        가까운 고용센터 찾기
                                        <ArrowRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <LegalDisclaimer />
                    </div>
                )
            }
        </div >
    );
};

export default Unemployment;

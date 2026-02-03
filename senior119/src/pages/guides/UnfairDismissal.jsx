import React, { useState } from 'react';
import { Scale, FileText, Phone, Clock, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const UnfairDismissal = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 'dismissType',
            question: '어떤 상황으로 해고되었나요?',
            options: [
                { label: '갑자기 아무 이유 없이', value: 'sudden', score: 3 },
                { label: '실수를 했다며 해고', value: 'mistake', score: 2 },
                { label: '경영상 이유 (구조조정)', value: 'financial', score: 1 },
                { label: '계약 만료', value: 'contract', score: 0 }
            ]
        },
        {
            id: 'writtenNotice',
            question: '서면(문서)으로 해고 통지를 받으셨나요?',
            description: '카카오톡, 문자도 문서에 포함됩니다',
            options: [
                { label: '네, 서면으로 받았어요', value: 'yes', score: 0 },
                { label: '아니오, 말로만 들었어요', value: 'no', score: 2 }
            ]
        },
        {
            id: 'notice30days',
            question: '해고 30일 전에 미리 알려주었나요?',
            options: [
                { label: '네, 30일 전에 알려줬어요', value: 'yes', score: 0 },
                { label: '아니오, 갑작스럽게 해고됐어요', value: 'no', score: 2 }
            ]
        },
        {
            id: 'workPeriod',
            question: '이 직장에서 얼마나 일하셨나요?',
            options: [
                { label: '3개월 미만', value: 'under3m', score: 0 },
                { label: '3개월 ~ 1년', value: 'under1y', score: 1 },
                { label: '1년 이상', value: 'over1y', score: 2 }
            ]
        },
        {
            id: 'companySize',
            question: '직원이 총 몇 명인 회사인가요?',
            description: '본인 포함, 사장님 제외',
            options: [
                { label: '5명 미만', value: 'under5', score: 0, note: '5인 미만은 일부 보호 제외' },
                { label: '5명 이상', value: 'over5', score: 1 }
            ]
        }
    ];

    const handleAnswer = (questionId, value, score) => {
        const newAnswers = { ...answers, [questionId]: { value, score } };
        setAnswers(newAnswers);

        const currentIndex = questions.findIndex(q => q.id === questionId);
        if (currentIndex < questions.length - 1) {
            setStep(currentIndex + 2);
        } else {
            setShowResult(true);
        }
    };

    const calculateResult = () => {
        const totalScore = Object.values(answers).reduce((sum, a) => sum + (a.score || 0), 0);

        if (totalScore >= 7) {
            return {
                level: 'high',
                title: '부당해고 가능성이 높습니다',
                description: '정당한 사유 없이 해고되었을 가능성이 큽니다. 즉시 조치를 취하세요.',
                color: 'red'
            };
        } else if (totalScore >= 4) {
            return {
                level: 'medium',
                title: '부당해고 가능성이 있습니다',
                description: '몇 가지 문제가 있어 보입니다. 전문가 상담을 권장합니다.',
                color: 'orange'
            };
        } else {
            return {
                level: 'low',
                title: '부당해고로 보기 어려울 수 있습니다',
                description: '정당한 절차로 진행된 것 같습니다. 그래도 확인이 필요하시면 상담받으세요.',
                color: 'green'
            };
        }
    };

    const currentQuestion = questions[step - 1];
    const result = showResult ? calculateResult() : null;

    const steps = [
        { title: '서면 증거 확보', desc: '해고 통지서, 문자, 이메일 모두 저장' },
        { title: '출퇴근 기록 확보', desc: '출퇴근 기록, 급여명세서 보관' },
        { title: '노동위원회 구제신청', desc: '해고일로부터 3개월 이내에 신청' },
        { title: '무료 법률상담', desc: '대한법률구조공단 (132) 이용' }
    ];

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full text-red-600">
                        <Scale size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    부당해고 진단
                </h2>
                <p className="text-gray-600 text-lg">
                    갑자기 해고되셨나요? 억울하면 싸워야 합니다
                </p>
            </div>

            {/* Progress */}
            {!showResult && (
                <div className="flex gap-2">
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 flex-1 rounded-full ${idx < step ? 'bg-red-500' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
            )}

            {/* Question */}
            {!showResult && currentQuestion && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-50 animate-in fade-in slide-in-from-right-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {currentQuestion.question}
                    </h3>
                    {currentQuestion.description && (
                        <p className="text-gray-500 mb-6">{currentQuestion.description}</p>
                    )}
                    <div className="space-y-3">
                        {currentQuestion.options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleAnswer(currentQuestion.id, opt.value, opt.score)}
                                className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all font-medium text-gray-800"
                            >
                                {opt.label}
                                {opt.note && <span className="block text-sm text-gray-500 mt-1">{opt.note}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Result */}
            {showResult && result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className={`rounded-2xl p-6 ${result.color === 'red' ? 'bg-red-50 border-2 border-red-200' :
                            result.color === 'orange' ? 'bg-orange-50 border-2 border-orange-200' :
                                'bg-green-50 border-2 border-green-200'
                        }`}>
                        <div className="flex items-start gap-4">
                            {result.color === 'red' || result.color === 'orange' ? (
                                <AlertTriangle size={32} className={result.color === 'red' ? 'text-red-600' : 'text-orange-600'} />
                            ) : (
                                <CheckCircle size={32} className="text-green-600" />
                            )}
                            <div>
                                <h3 className={`text-xl font-bold ${result.color === 'red' ? 'text-red-800' :
                                        result.color === 'orange' ? 'text-orange-800' :
                                            'text-green-800'
                                    }`}>
                                    {result.title}
                                </h3>
                                <p className={`mt-2 ${result.color === 'red' ? 'text-red-700' :
                                        result.color === 'orange' ? 'text-orange-700' :
                                            'text-green-700'
                                    }`}>
                                    {result.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 대응 절차 */}
                    {(result.level === 'high' || result.level === 'medium') && (
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Clock size={24} className="text-blue-600" />
                                지금 바로 해야 할 4단계
                            </h3>
                            <div className="space-y-4">
                                {steps.map((s, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{s.title}</p>
                                            <p className="text-gray-600 text-sm">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 연락처 */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-4">📞 도움받을 곳</h3>
                        <div className="space-y-3">
                            <a href="tel:1350" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-blue-100 transition-colors">
                                <div>
                                    <p className="font-bold text-gray-800">고용노동부</p>
                                    <p className="text-sm text-gray-500">부당해고 신고 및 상담</p>
                                </div>
                                <span className="text-blue-600 font-bold">1350</span>
                            </a>
                            <a href="tel:132" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-blue-100 transition-colors">
                                <div>
                                    <p className="font-bold text-gray-800">대한법률구조공단</p>
                                    <p className="text-sm text-gray-500">무료 법률 상담</p>
                                </div>
                                <span className="text-blue-600 font-bold">132</span>
                            </a>
                            <a href="https://www.nlrc.go.kr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-blue-100 transition-colors">
                                <div>
                                    <p className="font-bold text-gray-800">노동위원회</p>
                                    <p className="text-sm text-gray-500">구제신청 (해고일로부터 3개월 이내)</p>
                                </div>
                                <ChevronRight className="text-blue-600" />
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => { setStep(1); setAnswers({}); setShowResult(false); }}
                        className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        다시 진단하기
                    </button>

                    <LegalDisclaimer />
                </div>
            )}
        </div>
    );
};

export default UnfairDismissal;

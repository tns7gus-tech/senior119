import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle, Phone, Building2 } from 'lucide-react';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const Insurance = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 'workType',
            question: '어떤 형태로 일하고 계세요?',
            options: [
                { label: '정규직/계약직 (월급)', value: 'regular' },
                { label: '일용직 (날마다 일당)', value: 'daily' },
                { label: '시간제 아르바이트', value: 'parttime' },
                { label: '프리랜서/개인사업', value: 'freelance' }
            ]
        },
        {
            id: 'weeklyHours',
            question: '일주일에 몇 시간 일하세요?',
            options: [
                { label: '15시간 미만', value: 'under15' },
                { label: '15시간 ~ 40시간', value: 'normal' },
                { label: '40시간 이상', value: 'over40' }
            ]
        },
        {
            id: 'companySize',
            question: '직원이 몇 명인 회사인가요?',
            description: '사장님 제외, 본인 포함',
            options: [
                { label: '1~4명 (소규모)', value: 'small' },
                { label: '5명 이상', value: 'medium' }
            ]
        },
        {
            id: 'payslip',
            question: '급여명세서에서 4대보험 공제를 확인하셨나요?',
            description: '국민연금, 건강보험, 고용보험, 산재보험',
            options: [
                { label: '네, 공제되고 있어요', value: 'yes' },
                { label: '아니오, 공제 안 돼요', value: 'no' },
                { label: '급여명세서가 없어요', value: 'none' }
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);

        const currentIndex = questions.findIndex(q => q.id === questionId);
        if (currentIndex < questions.length - 1) {
            setStep(currentIndex + 2);
        } else {
            analyzeResult(newAnswers);
        }
    };

    const analyzeResult = (ans) => {
        const problems = [];
        const eligible = [];

        // 4대보험 의무 분석
        if (ans.workType === 'freelance') {
            eligible.push('프리랜서/개인사업자는 4대보험 의무 가입 대상이 아닙니다.');
        } else {
            // 고용보험
            if (ans.weeklyHours !== 'under15') {
                if (ans.payslip === 'no' || ans.payslip === 'none') {
                    problems.push({
                        name: '고용보험',
                        issue: '주 15시간 이상 근무 시 반드시 가입해야 합니다.',
                        impact: '실업급여를 받을 수 없게 됩니다.'
                    });
                } else {
                    eligible.push('고용보험 정상 가입');
                }
            }

            // 국민연금
            if (ans.payslip === 'no' || ans.payslip === 'none') {
                problems.push({
                    name: '국민연금',
                    issue: '18세 이상 60세 미만 근로자는 의무 가입입니다.',
                    impact: '노후 연금을 못 받을 수 있습니다.'
                });
            } else {
                eligible.push('국민연금 정상 가입');
            }

            // 건강보험
            if (ans.payslip === 'no' || ans.payslip === 'none') {
                problems.push({
                    name: '건강보험',
                    issue: '직장 건강보험에 가입되어야 합니다.',
                    impact: '병원비 혜택을 못 받을 수 있습니다.'
                });
            } else {
                eligible.push('건강보험 정상 가입');
            }

            // 산재보험
            if (ans.payslip === 'none') {
                problems.push({
                    name: '산재보험',
                    issue: '모든 근로자는 산재보험 대상입니다.',
                    impact: '업무상 재해 시 보상을 못 받습니다.'
                });
            } else {
                eligible.push('산재보험 (사업주 부담)');
            }
        }

        // 소규모 사업장 특이사항
        if (ans.companySize === 'small' && problems.length > 0) {
            problems.forEach(p => {
                p.note = '5인 미만 사업장도 4대보험 가입은 의무입니다.';
            });
        }

        setResult({ problems, eligible, answers: ans });
        setStep('result');
    };

    const currentQuestion = questions[step - 1];

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-indigo-100 rounded-full text-indigo-600">
                        <Shield size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    4대보험 가입 확인
                </h2>
                <p className="text-gray-600 text-lg">
                    내가 제대로 보험에 들어있는지 체크해보세요
                </p>
            </div>

            {/* Progress */}
            {step !== 'result' && (
                <div className="flex gap-2">
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 flex-1 rounded-full ${idx < step ? 'bg-indigo-500' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
            )}

            {/* Question */}
            {step !== 'result' && currentQuestion && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-indigo-50 animate-in fade-in slide-in-from-right-4">
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
                                onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                                className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all font-medium text-gray-800"
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Result */}
            {step === 'result' && result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {result.problems.length > 0 ? (
                        <>
                            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle size={32} className="text-red-600" />
                                    <h3 className="text-xl font-bold text-red-800">
                                        ⚠️ 문제가 발견되었습니다
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {result.problems.map((problem, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl">
                                            <p className="font-bold text-red-800">{problem.name} 미가입</p>
                                            <p className="text-red-700 text-sm mt-1">{problem.issue}</p>
                                            <p className="text-red-600 text-sm">→ {problem.impact}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                                <h3 className="text-lg font-bold text-amber-800 mb-3">📞 어떻게 하면 되나요?</h3>
                                <ol className="list-decimal list-inside space-y-2 text-amber-900">
                                    <li>사업주에게 4대보험 가입을 요청하세요</li>
                                    <li>거부 시 <strong>국민연금공단 1355</strong>에 신고</li>
                                    <li>건강보험은 <strong>건강보험공단 1577-1000</strong></li>
                                    <li>고용/산재보험은 <strong>근로복지공단 1588-0075</strong></li>
                                </ol>
                            </div>
                        </>
                    ) : (
                        <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle size={32} className="text-green-600" />
                                <h3 className="text-xl font-bold text-green-800">
                                    ✅ 4대보험이 정상적으로 가입된 것 같습니다
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {result.eligible.map((item, idx) => (
                                    <li key={idx} className="text-green-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-3">🔍 정확히 확인하려면</h3>
                        <div className="space-y-3">
                            <a
                                href="https://www.4insure.or.kr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 bg-white rounded-xl text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                                <Building2 size={20} className="inline mr-2" />
                                4대보험 가입확인 (정부24 연동)
                            </a>
                            <a
                                href="tel:1350"
                                className="block p-4 bg-white rounded-xl text-orange-600 hover:bg-orange-100 transition-colors"
                            >
                                <Phone size={20} className="inline mr-2" />
                                고용노동부 1350 전화상담
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => { setStep(1); setAnswers({}); setResult(null); }}
                        className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        다시 확인하기
                    </button>

                    <LegalDisclaimer />
                </div>
            )}
        </div>
    );
};

export default Insurance;

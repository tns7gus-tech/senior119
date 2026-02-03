import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const AnnualLeave = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [inputs, setInputs] = useState({
        workMonths: '',
        usedDays: '',
        dailyWage: ''
    });
    const [result, setResult] = useState(null);

    const calculateLeave = () => {
        const months = parseInt(inputs.workMonths);
        const usedDays = parseInt(inputs.usedDays) || 0;
        const dailyWage = parseFloat(inputs.dailyWage.replace(/,/g, '')) || 0;

        if (isNaN(months) || months < 0) {
            alert('근무 기간을 정확히 입력해주세요.');
            return;
        }

        let totalDays = 0;
        let explanation = '';

        if (months < 12) {
            // 1년 미만: 1개월 개근 시 1일씩 (최대 11일)
            totalDays = Math.min(months, 11);
            explanation = `입사 후 ${months}개월 근무 → ${totalDays}일 발생 (1개월 개근 시 1일)`;
        } else {
            // 1년 이상: 기본 15일 + 2년마다 1일 추가 (최대 25일)
            const years = Math.floor(months / 12);
            const additionalDays = Math.floor((years - 1) / 2);
            totalDays = Math.min(15 + additionalDays, 25);
            explanation = `${years}년 근무 → 기본 15일 + 추가 ${additionalDays}일 = ${totalDays}일`;
        }

        const remainingDays = Math.max(0, totalDays - usedDays);
        const unusedPayment = remainingDays * dailyWage;

        setResult({
            totalDays,
            usedDays,
            remainingDays,
            dailyWage,
            unusedPayment,
            explanation
        });
        setStep(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-teal-100 rounded-full text-teal-600">
                        <Calendar size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    연차휴가 & 수당 계산
                </h2>
                <p className="text-gray-600 text-lg">
                    못 쓴 연차, 돈으로 받을 수 있어요!
                </p>
            </div>

            {step === 1 ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-50">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                📅 총 근무 기간 (개월)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="workMonths"
                                value={inputs.workMonths}
                                onChange={handleInputChange}
                                placeholder="예: 18"
                                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                ✈️ 이미 사용한 연차 (일)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="usedDays"
                                value={inputs.usedDays}
                                onChange={handleInputChange}
                                placeholder="예: 5"
                                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                💵 하루 일당 (원)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="dailyWage"
                                value={inputs.dailyWage}
                                onChange={handleInputChange}
                                placeholder="예: 80000"
                                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                💡 일당 = 월급 ÷ 30일 (대략)
                            </p>
                        </div>

                        <button
                            onClick={calculateLeave}
                            className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-teal-700 transition-colors"
                        >
                            계산하기
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* 연차 발생 */}
                    <div className="bg-teal-50 rounded-2xl p-6 border-2 border-teal-200">
                        <h3 className="text-xl font-bold text-teal-800 mb-2">📊 연차휴가 발생</h3>
                        <p className="text-teal-700">{result.explanation}</p>
                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            <div className="bg-white p-3 rounded-xl">
                                <p className="text-sm text-gray-500">총 발생</p>
                                <p className="text-2xl font-bold text-teal-700">{result.totalDays}일</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl">
                                <p className="text-sm text-gray-500">사용</p>
                                <p className="text-2xl font-bold text-gray-600">{result.usedDays}일</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl">
                                <p className="text-sm text-gray-500">남은 연차</p>
                                <p className="text-2xl font-bold text-orange-600">{result.remainingDays}일</p>
                            </div>
                        </div>
                    </div>

                    {/* 연차수당 */}
                    {result.remainingDays > 0 && result.dailyWage > 0 && (
                        <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                            <h3 className="text-xl font-bold text-orange-800 mb-2">💰 미사용 연차수당</h3>
                            <p className="text-orange-700 mb-4">
                                퇴직 시 남은 연차는 돈으로 받을 수 있어요!
                            </p>
                            <div className="bg-white p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500">받아야 할 연차수당</p>
                                <p className="text-3xl font-bold text-orange-700">
                                    {result.unusedPayment.toLocaleString()}원
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    = {result.remainingDays}일 × {result.dailyWage.toLocaleString()}원
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 안내 */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-3">📌 알아두세요</h3>
                        <ul className="space-y-2 text-blue-900">
                            <li>• 퇴사 시 남은 연차는 <strong>연차수당</strong>으로 지급받아야 합니다</li>
                            <li>• 회사가 연차를 안 주면 <strong>근로기준법 위반</strong>입니다</li>
                            <li>• 1년 미만 근무자도 <strong>월 1일씩</strong> 연차가 발생해요</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => { setStep(1); setResult(null); }}
                        className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        다시 계산하기
                    </button>

                    <LegalDisclaimer />
                </div>
            )}
        </div>
    );
};

export default AnnualLeave;

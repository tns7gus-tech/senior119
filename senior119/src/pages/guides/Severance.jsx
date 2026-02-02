import React, { useState } from 'react';
import { Calculator, ChevronsRight, RefreshCw, DollarSign } from 'lucide-react';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const Severance = () => {
    const [step, setStep] = useState(1);
    const [inputs, setInputs] = useState({
        joinDate: '',
        quitDate: '',
        baseSalary: '', // 3개월 급여 총액
        bonus: '',      // 연간 상여금
        allowance: ''   // 연차 수당
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateSeverance = () => {
        const start = new Date(inputs.joinDate);
        const end = new Date(inputs.quitDate);

        if (isNaN(start) || isNaN(end) || start >= end) {
            alert("입사일과 퇴사일을 정확히 입력해주세요.");
            return;
        }

        // 근무 일수 계산
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // 1년 미만 체크
        if (diffDays < 365) {
            alert("근무 기간이 1년(365일) 미만이면 퇴직금이 발생하지 않습니다.");
            return;
        }

        // 평균 임금 계산
        // (3개월 급여 + (상여금+연차수당)/12 * 3) / 3개월 일수(약 90일)
        // 약식 계산: 3개월 급여 총액 / 90일 -> 일 평균 임금
        // 정확한 계산보다는 '예상 금액'을 제공하는 것이 목적

        const salary3Months = parseFloat(inputs.baseSalary.replace(/,/g, '')) || 0;
        const annualBonus = parseFloat(inputs.bonus.replace(/,/g, '')) || 0;
        const annualAllowance = parseFloat(inputs.allowance.replace(/,/g, '')) || 0;

        const total3MonthWage = salary3Months + ((annualBonus + annualAllowance) * 3 / 12);
        const averageDailyWage = total3MonthWage / 91; // 대략 3개월 = 91일 잡음

        // 퇴직금 = 일 평균 임금 * 30일 * (재직일수/365)
        const severancePay = averageDailyWage * 30 * (diffDays / 365);

        setResult({
            days: diffDays,
            amount: Math.floor(severancePay)
        });
        setStep(2);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="text-purple-600" />
                    퇴직금 예상 계산기
                </h2>
            </div>

            {step === 1 ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-50 animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">입사한 날짜</label>
                            <input
                                type="date"
                                name="joinDate"
                                value={inputs.joinDate}
                                onChange={handleInputChange}
                                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">퇴사한 날짜 (마지막 근무일 다음날)</label>
                            <input
                                type="date"
                                name="quitDate"
                                value={inputs.quitDate}
                                onChange={handleInputChange}
                                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                최근 3개월간 받은 월급 총액 (세전)
                            </label>
                            <p className="text-gray-500 text-sm mb-2">예: 매달 200만원씩 받았다면 600만원 입력</p>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="baseSalary"
                                    placeholder="0"
                                    value={inputs.baseSalary}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">연간 상여금</label>
                                <input
                                    type="text"
                                    name="bonus"
                                    placeholder="0"
                                    value={inputs.bonus}
                                    onChange={handleInputChange}
                                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-right"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">연차 수당</label>
                                <input
                                    type="text"
                                    name="allowance"
                                    placeholder="0"
                                    value={inputs.allowance}
                                    onChange={handleInputChange}
                                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-right"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateSeverance}
                            className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 mt-4"
                        >
                            계산하기 <ChevronsRight />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100 animate-in zoom-in-95">
                    <div className="text-center space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">예상 퇴직금 결과</h3>

                        <div className="bg-purple-50 p-6 rounded-2xl">
                            <p className="text-gray-600 mb-2">총 근무일수: {result.days}일</p>
                            <p className="text-4xl font-extrabold text-purple-700">
                                {result.amount.toLocaleString()} 원
                            </p>
                            <p className="text-sm text-gray-500 mt-2">* 실제 지급액은 세금 공제 등에 따라 달라질 수 있습니다.</p>
                        </div>

                        <div className="text-left bg-gray-50 p-6 rounded-xl space-y-4">
                            <h4 className="font-bold text-lg border-b border-gray-200 pb-2">💡 퇴직금 수령 방식 선택</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-sm shrink-0">일시금</div>
                                    <p className="text-gray-700">한 번에 목돈으로 받습니다. 급한 자금이 필요할 때 유리합니다.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-sm shrink-0">연금</div>
                                    <p className="text-gray-700">IRP 계좌로 받아 만 55세 이후 나누어 받습니다. 퇴직소득세를 30~40% 감면받을 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(1)}
                            className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} />
                            다시 계산하기
                        </button>
                        <LegalDisclaimer />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Severance;

import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

const MinimumWage = () => {
    const [hourlyWage, setHourlyWage] = useState('');
    const [weeklyHours, setWeeklyHours] = useState('');
    const [result, setResult] = useState(null);

    // 2025년 최저임금
    const MINIMUM_WAGE_2025 = 10030; // 시급
    const WEEKLY_HOLIDAY_THRESHOLD = 15; // 주휴수당 발생 기준

    const calculateWage = () => {
        const wage = parseFloat(hourlyWage.replace(/,/g, ''));
        const hours = parseFloat(weeklyHours);

        if (isNaN(wage) || isNaN(hours) || wage <= 0 || hours <= 0) {
            alert('시급과 주당 근무시간을 정확히 입력해주세요.');
            return;
        }

        // 최저임금 미달 체크
        const isUnderMinimum = wage < MINIMUM_WAGE_2025;
        const shortage = isUnderMinimum ? MINIMUM_WAGE_2025 - wage : 0;

        // 주휴수당 계산 (주 15시간 이상 근무 시)
        const weeklyHolidayPay = hours >= WEEKLY_HOLIDAY_THRESHOLD
            ? Math.floor((hours / 40) * 8 * wage) // 주휴시간 = (주당근무시간/40) * 8
            : 0;

        // 월급 계산 (주휴수당 포함)
        const weeklyBasePay = wage * hours;
        const totalWeeklyPay = weeklyBasePay + weeklyHolidayPay;
        const monthlyPay = Math.floor(totalWeeklyPay * 4.345); // 월 평균 주수

        // 최저임금 기준 정상 월급
        const correctWeeklyPay = MINIMUM_WAGE_2025 * hours;
        const correctWeeklyHolidayPay = hours >= WEEKLY_HOLIDAY_THRESHOLD
            ? Math.floor((hours / 40) * 8 * MINIMUM_WAGE_2025)
            : 0;
        const correctMonthlyPay = Math.floor((correctWeeklyPay + correctWeeklyHolidayPay) * 4.345);

        setResult({
            isUnderMinimum,
            shortage,
            currentWage: wage,
            weeklyHours: hours,
            weeklyHolidayPay,
            hasWeeklyHoliday: hours >= WEEKLY_HOLIDAY_THRESHOLD,
            monthlyPay,
            correctMonthlyPay,
            difference: correctMonthlyPay - monthlyPay
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <DollarSign size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    최저임금 & 주휴수당 체크
                </h2>
                <p className="text-gray-600 text-lg">
                    내 시급이 제대로 된 건지 확인해보세요.
                </p>
                <div className="mt-4 inline-block bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-800 font-bold">2025년 최저시급: {MINIMUM_WAGE_2025.toLocaleString()}원</span>
                </div>
            </div>

            {/* Input Form */}
            {!result ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-50">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                💰 현재 받는 시급 (원)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={hourlyWage}
                                onChange={(e) => setHourlyWage(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="예: 9500"
                                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-2">
                                ⏰ 일주일에 몇 시간 일하세요?
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={weeklyHours}
                                onChange={(e) => setWeeklyHours(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="예: 25"
                                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                💡 주 15시간 이상이면 주휴수당을 받을 수 있어요!
                            </p>
                        </div>

                        <button
                            onClick={calculateWage}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Calculator size={24} />
                            확인하기
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* 최저임금 결과 */}
                    <div className={`rounded-2xl p-6 ${result.isUnderMinimum ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
                        <div className="flex items-start gap-4">
                            {result.isUnderMinimum ? (
                                <AlertTriangle size={32} className="text-red-600 shrink-0" />
                            ) : (
                                <CheckCircle size={32} className="text-green-600 shrink-0" />
                            )}
                            <div>
                                <h3 className={`text-xl font-bold ${result.isUnderMinimum ? 'text-red-800' : 'text-green-800'}`}>
                                    {result.isUnderMinimum
                                        ? '⚠️ 최저임금보다 적게 받고 계세요!'
                                        : '✅ 최저임금은 충족하고 있어요'}
                                </h3>
                                {result.isUnderMinimum && (
                                    <p className="text-red-700 mt-2 text-lg">
                                        시급 <strong>{result.shortage.toLocaleString()}원</strong>이 부족합니다.<br />
                                        최저시급 {MINIMUM_WAGE_2025.toLocaleString()}원을 받아야 합니다.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 주휴수당 결과 */}
                    <div className={`rounded-2xl p-6 ${result.hasWeeklyHoliday ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 border-2 border-gray-200'}`}>
                        <div className="flex items-start gap-4">
                            <Clock size={32} className={result.hasWeeklyHoliday ? 'text-purple-600' : 'text-gray-400'} />
                            <div>
                                <h3 className={`text-xl font-bold ${result.hasWeeklyHoliday ? 'text-purple-800' : 'text-gray-600'}`}>
                                    {result.hasWeeklyHoliday
                                        ? `💜 주휴수당도 받으셔야 해요!`
                                        : '주휴수당 대상이 아닙니다'}
                                </h3>
                                {result.hasWeeklyHoliday ? (
                                    <p className="text-purple-700 mt-2 text-lg">
                                        주 {result.weeklyHours}시간 근무 시<br />
                                        <strong>주휴수당 약 {result.weeklyHolidayPay.toLocaleString()}원/주</strong>를 더 받아야 합니다.
                                    </p>
                                ) : (
                                    <p className="text-gray-600 mt-2">
                                        주 15시간 이상 근무해야 주휴수당이 발생합니다.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 월급 비교 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 월급 비교</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500">현재 받는 월급 (예상)</p>
                                <p className="text-2xl font-bold text-gray-800">{result.monthlyPay.toLocaleString()}원</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl text-center">
                                <p className="text-sm text-blue-600">받아야 하는 월급</p>
                                <p className="text-2xl font-bold text-blue-800">{result.correctMonthlyPay.toLocaleString()}원</p>
                            </div>
                        </div>
                        {result.difference > 0 && (
                            <div className="mt-4 p-4 bg-red-50 rounded-xl text-center">
                                <p className="text-red-800 font-bold text-xl">
                                    매달 약 {result.difference.toLocaleString()}원을 덜 받고 계세요!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 도움말 */}
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                        <h3 className="text-lg font-bold text-amber-800 mb-3">📞 어떻게 해야 하나요?</h3>
                        <ol className="list-decimal list-inside space-y-2 text-amber-900">
                            <li>먼저 사업주에게 정정을 요청하세요</li>
                            <li>거부하면 <strong>고용노동부 1350</strong>에 신고</li>
                            <li>임금체불 진정서를 작성하면 됩니다</li>
                        </ol>
                    </div>

                    <button
                        onClick={() => setResult(null)}
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

export default MinimumWage;

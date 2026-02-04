import React, { useState } from 'react';
import { AlertTriangle, CheckSquare, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Violation = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState({});

    const violations = [
        { id: 'contract', label: '근로계약서를 쓰지 않았거나, 받지 못했습니다.' },
        { id: 'wages', label: '월급날에 임금이 들어오지 않았습니다.' },
        { id: 'overtime', label: '일한 시간만큼 수당(연장/야간/휴일)을 못 받았습니다.' },
        { id: 'break', label: '4시간 일할 때마다 30분씩 쉬는 시간이 없었습니다.' },
        { id: 'dismissal', label: '해고 예고 없이 갑자기 그만두라고 했습니다.' },
        { id: 'severance', label: '퇴직금을 주지 않거나, 14일이 지나도 안 줍니다.' }
    ];

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const hasViolation = Object.values(checkedItems).some(val => val);

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full text-red-600">
                        <AlertTriangle size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    억울한 일을 당하셨나요?
                </h2>
                <p className="text-gray-600 text-lg">
                    해당되는 내용이 있는지 체크해보세요.<br />
                    노동법 위반 여부를 알려드립니다.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-50">
                <div className="space-y-4">
                    {violations.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            className={`w-full p-5 text-left rounded-xl transition-all flex items-start gap-4 border-2 ${checkedItems[item.id]
                                ? 'bg-red-50 border-red-500 text-red-900'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50/50'
                                }`}
                        >
                            <div className={`shrink-0 mt-1 ${checkedItems[item.id] ? 'text-red-600' : 'text-gray-300'}`}>
                                <CheckSquare size={28} />
                            </div>
                            <span className="text-xl font-bold leading-snug">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {hasViolation && (
                <div className="rounded-2xl p-8 shadow-lg bg-red-600 text-white animate-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-300" />
                        법 위반이 의심됩니다!
                    </h3>
                    <p className="text-lg opacity-90 mb-6 leading-relaxed">
                        체크하신 내용은 근로기준법 위반 소지가 큽니다.<br />
                        증거(계약서, 월급명세서, 통장내역 등)를 모아서 신고할 수 있습니다.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/location')}
                            className="py-4 px-6 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            신고처 찾기
                            <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate('/guide/evidence')}
                            className="py-4 px-6 bg-red-700 text-white rounded-xl font-bold text-lg hover:bg-red-800 transition-colors shadow-sm flex items-center justify-center gap-2 border border-red-500"
                        >
                            <FileText size={20} />
                            증거 수집 방법
                        </button>
                    </div>
                </div>
            )}

            {!hasViolation && (
                <div className="bg-blue-50 rounded-2xl p-6 text-center text-blue-800">
                    <p className="font-bold flex items-center justify-center gap-2">
                        <HelpCircle size={20} />
                        궁금한 점이 더 있으신가요?
                    </p>
                    <p className="mt-2 text-sm">
                        위 항목에 없더라도 부당하다고 느껴지면<br />
                        무료 노무 상담을 받아보시는 것이 좋습니다.
                    </p>
                    <button
                        onClick={() => navigate('/location')}
                        className="mt-4 py-2 px-4 bg-white text-blue-600 rounded-lg text-sm font-bold border border-blue-200 hover:bg-blue-50"
                    >
                        가까운 노동청/센터 보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default Violation;

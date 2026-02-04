import React, { useState } from 'react';
import { FileText, Camera, MessageSquare, Building, Clock, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalDisclaimer from '../../components/common/LegalDisclaimer';

/**
 * Evidence - 근로기준법 위반 증거 수집 방법 가이드
 */
const Evidence = () => {
    const navigate = useNavigate();
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    const evidenceTypes = [
        {
            id: 'contract',
            icon: <FileText className="text-blue-600" size={32} />,
            title: '📄 근로계약서',
            importance: '필수',
            description: '가장 중요한 증거입니다. 없으면 회사에 요청하세요.',
            howToGet: [
                '회사에 "근로계약서 사본 주세요" 요청 (카톡/문자로!)',
                '요청 기록을 스크린샷으로 저장',
                '못 받은 경우, "못 받았다"는 사실도 증거됨',
                '계약서 없이 일했다면 근로기준법 위반!'
            ]
        },
        {
            id: 'payslip',
            icon: <Building className="text-green-600" size={32} />,
            title: '💰 급여명세서 / 통장내역',
            importance: '필수',
            description: '임금 지급 증거. 없으면 통장 내역으로 대체 가능합니다.',
            howToGet: [
                '카카오뱅크/토스뱅크 앱 → 거래내역 → 캡처',
                '일반 은행 앱 → 거래내역 조회 → PDF/캡처',
                '급여명세서: 회사에 "급여명세서 보내주세요" 요청',
                '급여가 현금이면 받을 때 영수증이나 녹음'
            ]
        },
        {
            id: 'attendance',
            icon: <Clock className="text-orange-600" size={32} />,
            title: '⏰ 출퇴근 기록',
            importance: '있으면 유리',
            description: '연장근무, 야간근무 증거로 중요합니다.',
            howToGet: [
                '출퇴근 앱(알밤 등) 스크린샷',
                '직접 기록한 메모/달력 사진',
                '카카오톡 "출근합니다" 메시지도 증거!',
                'CCTV 기록 요청 (회사가 거부해도 기록)'
            ]
        },
        {
            id: 'message',
            icon: <MessageSquare className="text-purple-600" size={32} />,
            title: '💬 대화 기록 (카톡/문자)',
            importance: '매우 중요',
            description: '사장님과 나눈 모든 대화를 저장하세요!',
            howToGet: [
                '카카오톡 → 대화방 → 우상단 메뉴 → "대화 내보내기"',
                '문자 메시지 스크린샷',
                '카카오톡 그룹방에서 업무 지시 받았으면 그것도 증거!',
                '통화는 녹음 가능 (본인 통화 녹음 합법)'
            ]
        },
        {
            id: 'photo',
            icon: <Camera className="text-red-600" size={32} />,
            title: '📸 사진 / 영상',
            importance: '보조 증거',
            description: '근무 장소, 업무 모습 등을 찍어두세요.',
            howToGet: [
                '근무 장소 사진 (간판, 내부)',
                '업무복/명찰 착용 모습',
                '동료와 함께 찍은 사진',
                '시간이 나오는 스크린샷 (날짜, 장소 확인용)'
            ]
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* 헤더 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="text-blue-600" />
                    증거 수집 방법
                </h2>
                <p className="text-gray-600 mt-2">
                    노동청 신고 시 필요한 증거들을 모아두세요.
                </p>
            </div>

            {/* 핵심 안내 */}
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={24} />
                    <div>
                        <p className="font-bold text-yellow-800 text-lg">💡 중요한 원칙</p>
                        <ul className="mt-2 text-yellow-900 space-y-1">
                            <li>✅ <strong>일단 모아두세요!</strong> 증거는 많을수록 좋습니다.</li>
                            <li>✅ <strong>카톡/문자로 요청하세요!</strong> 기록이 남습니다.</li>
                            <li>✅ <strong>거부당해도 괜찮아요!</strong> 거부도 증거가 됩니다.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 증거 종류별 가이드 - 아코디언 */}
            <div className="space-y-3">
                {evidenceTypes.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleSection(item.id)}
                            className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-gray-800">{item.title}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.importance === '필수'
                                                ? 'bg-red-100 text-red-600'
                                                : item.importance === '매우 중요'
                                                    ? 'bg-orange-100 text-orange-600'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {item.importance}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                                </div>
                            </div>
                            {openSection === item.id ? (
                                <ChevronUp className="text-gray-400 shrink-0" size={24} />
                            ) : (
                                <ChevronDown className="text-gray-400 shrink-0" size={24} />
                            )}
                        </button>

                        {openSection === item.id && (
                            <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                                <p className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <CheckCircle className="text-green-600" size={18} />
                                    이렇게 하세요:
                                </p>
                                <ul className="space-y-2">
                                    {item.howToGet.map((step, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg"
                                        >
                                            <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 준비 완료 시 */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
                <p className="font-bold text-xl mb-2">📦 증거를 모았다면?</p>
                <p className="opacity-90 mb-4">가까운 신고처를 찾아 방문하세요!</p>
                <button
                    onClick={() => navigate('/location')}
                    className="py-3 px-6 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                    🏛️ 가까운 신고처 찾기
                </button>
            </div>

            <LegalDisclaimer />
        </div>
    );
};

export default Evidence;

import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <Shield size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">개인정보 처리방침</h2>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">1. 수집하는 정보</h3>
                    <p className="text-gray-700 leading-relaxed">
                        시니어 119은 <strong>최소한의 정보</strong>만 수집합니다:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                        <li><strong>위치 정보</strong>: "가까운 센터 찾기" 기능 사용 시, 가장 가까운 신고 기관을 찾기 위해 일시적으로 사용됩니다.</li>
                        <li><strong>입력 정보</strong>: 퇴직금 계산, 실업급여 진단 등에 입력하신 정보는 계산 목적으로만 사용됩니다.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">2. 정보의 저장</h3>
                    <p className="text-gray-700 leading-relaxed">
                        ⚠️ <strong>이 서비스는 사용자의 개인정보를 서버에 저장하지 않습니다.</strong>
                    </p>
                    <p className="text-gray-600 mt-2">
                        모든 계산 및 진단은 사용자의 기기(브라우저) 내에서 처리되며,
                        페이지를 벗어나면 입력된 정보는 자동으로 삭제됩니다.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">3. 제3자 제공</h3>
                    <p className="text-gray-700 leading-relaxed">
                        수집된 정보는 어떠한 제3자에게도 제공되지 않습니다.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">4. 문의처</h3>
                    <p className="text-gray-600">
                        개인정보 처리와 관련하여 문의사항이 있으시면 아래로 연락해 주세요.
                    </p>
                    <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                        <p className="font-medium text-gray-800">이메일: support@senior119.kr</p>
                    </div>
                </section>

                <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-400">
                    마지막 업데이트: 2026년 2월
                </div>
            </div>
        </div>
    );
};

export default Privacy;

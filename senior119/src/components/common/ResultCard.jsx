import React from 'react';

const ResultCard = ({ result, onRestart }) => {
    const isPositive = result.canReceive || result.isSuspected;

    return (
        <div className="flex flex-col h-full py-4 animate-fadeIn">
            <div className="flex-grow">
                {/* Icon & Main Message */}
                <div className="text-center mb-8">
                    <div className="text-8xl mb-4">
                        {isPositive ? '✅' : '⚠️'}
                    </div>
                    <h2 className={`text-4xl font-bold mb-4 whitespace-pre-wrap ${isPositive ? 'text-green-600' : 'text-orange-600'}`}>
                        {result.benefit || result.reason || "결과 확인"}
                    </h2>
                    {result.warning && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 text-lg">
                            <p className="font-bold">주의</p>
                            <p>{result.warning}</p>
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 mb-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">진단 상세</h3>
                    <p className="text-xl text-gray-700 mb-2 leading-relaxed">
                        {result.reasonDetail || result.details || "상세 내용이 없습니다."}
                    </p>
                    {result.referLaw && (
                        <p className="text-sm text-gray-500 mt-4 border-t pt-2 border-gray-300">
                            근거 법령: {result.referLaw}
                        </p>
                    )}
                </div>

                {/* Action Steps */}
                {result.nextStep && (
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
                        <h3 className="text-2xl font-bold mb-3 text-blue-800">추천 행동</h3>
                        <p className="text-xl font-bold text-blue-900">
                            👉 {result.nextStep}
                        </p>
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mt-4">
                <button
                    onClick={() => {
                        // Simple Kakao Share Simulation or actual implementation placeholder
                        alert("카카오톡 공유 기능은 도메인 연결 후 설정 가능합니다.\n(현재 주소를 복사했습니다)");
                        navigator.clipboard.writeText(window.location.href);
                    }}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-3xl p-6 rounded-xl shadow-md font-bold"
                >
                    카카오톡 공유하기
                </button>

                <button
                    onClick={onRestart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-2xl p-4 rounded-xl font-bold"
                >
                    처음으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default ResultCard;

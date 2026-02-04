import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

/**
 * LegalDisclaimer - 법적 면책 조항 컴포넌트
 * 모든 계산 결과 페이지 하단에 표시
 */
const LegalDisclaimer = () => {
    return (
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                    <p className="font-bold mb-1">⚠️ 안내 사항</p>
                    <p className="leading-relaxed">
                        이 결과는 <strong>참고용</strong>이며 법적 효력이 없습니다.
                        정확한 판단은 <strong>고용노동부</strong> 또는
                        <strong>공인노무사</strong> 상담을 받으세요.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <a
                            href="https://www.kcplaa.or.kr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1.5 rounded-lg border border-amber-300 hover:bg-amber-100 transition-colors font-medium"
                        >
                            공인노무사회 <ExternalLink size={12} />
                        </a>
                        <a
                            href="https://www.klac.or.kr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1.5 rounded-lg border border-amber-300 hover:bg-amber-100 transition-colors font-medium"
                        >
                            대한법률구조공단 (무료상담) <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalDisclaimer;

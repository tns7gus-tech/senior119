import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';

const ExpertBadge = ({ lastUpdated = '2025년 1월' }) => {
    return (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                    <ShieldCheck size={24} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            ✓ 검증됨
                        </span>
                        <span className="text-sm font-medium text-emerald-800">
                            노동법 전문 검토
                        </span>
                    </div>
                    <p className="text-xs text-emerald-700 mt-2">
                        본 정보는 한국 노동 관계 법령을 바탕으로 작성되었습니다.
                        정확한 법적 판단은 전문가 상담을 권장합니다.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                        <Clock size={12} />
                        <span>마지막 업데이트: {lastUpdated}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertBadge;

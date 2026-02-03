import React from 'react';
import { BookOpen, ExternalLink, Scale } from 'lucide-react';

const LegalSources = ({ sources = [] }) => {
    // 기본 법령 출처들
    const defaultSources = [
        {
            name: '근로기준법',
            url: 'https://www.law.go.kr/법령/근로기준법',
            icon: '📜'
        },
        {
            name: '고용보험법',
            url: 'https://www.law.go.kr/법령/고용보험법',
            icon: '📋'
        },
        {
            name: '고용노동부',
            url: 'https://www.moel.go.kr',
            icon: '🏛️'
        }
    ];

    const allSources = sources.length > 0 ? sources : defaultSources;

    return (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
                <Scale size={18} className="text-gray-600" />
                <h4 className="font-bold text-gray-700 text-sm">법령 및 참고 자료</h4>
            </div>
            <div className="space-y-2">
                {allSources.map((source, idx) => (
                    <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 group"
                    >
                        <div className="flex items-center gap-2">
                            <span>{source.icon}</span>
                            <span className="text-sm text-gray-700 group-hover:text-blue-700">{source.name}</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
                    </a>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
                2025년 법령 기준 · 정확한 정보는 고용노동부 1350 확인
            </p>
        </div>
    );
};

export default LegalSources;

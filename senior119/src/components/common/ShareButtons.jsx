import React from 'react';
import { Share2, MessageCircle, Link2, CheckCircle } from 'lucide-react';

const ShareButtons = ({ title = '시니어119 - 노동법 도우미', url = window.location.href }) => {
    const [copied, setCopied] = React.useState(false);

    // 카카오 공유 (Web Share API 사용 - 카카오톡 앱 열림)
    const shareKakao = async () => {
        const shareData = {
            title: title,
            text: '어르신! 실업급여, 퇴직금, 임금체불 문제를 쉽게 해결하세요.',
            url: url
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: 카카오톡 공유 URL (웹)
                const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;
                window.open(kakaoUrl, '_blank', 'width=600,height=400');
            }
        } catch (err) {
            console.log('Share failed:', err);
        }
    };

    // URL 복사
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
                <Share2 size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-800">이 정보 공유하기</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                도움이 필요한 가족, 친구에게 알려주세요 💙
            </p>
            <div className="flex gap-3">
                {/* 카카오톡 공유 */}
                <button
                    onClick={shareKakao}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-bold hover:bg-[#F5DC00] transition-colors shadow-sm"
                >
                    <MessageCircle size={20} />
                    <span>카카오톡</span>
                </button>

                {/* 링크 복사 */}
                <button
                    onClick={copyLink}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all shadow-sm ${copied
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    {copied ? (
                        <>
                            <CheckCircle size={20} />
                            <span>복사됨!</span>
                        </>
                    ) : (
                        <>
                            <Link2 size={20} />
                            <span>링크 복사</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full py-10 text-center animate-fadeIn">
            <div className="text-8xl mb-6">❓</div>
            <h2 className="text-3xl font-bold mb-4">길을 잃으셨나요?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                찾으시는 페이지가 없습니다.<br />
                아래 버튼을 눌러 홈으로 이동하세요.
            </p>

            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-transform"
            >
                홈으로 가기
            </button>
        </div>
    );
};

export default NotFound;

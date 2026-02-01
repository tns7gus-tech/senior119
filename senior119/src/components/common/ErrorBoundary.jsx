import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
            <div className="text-6xl mb-4">🚑</div>
            <h2 className="text-2xl font-bold mb-2">어쿠! 잠시 문제가 생겼어요.</h2>
            <p className="text-lg text-gray-600 mb-6">
                일시적인 오류일 수 있습니다.<br />
                아래 버튼을 눌러 다시 시도해 주세요.
            </p>

            <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm mb-6 max-w-sm text-left overflow-auto">
                <p className="font-bold">오류 내용 (개발자용):</p>
                <pre className="mt-1">{error.message}</pre>
            </div>

            <button
                onClick={resetErrorBoundary}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-transform"
            >
                다시 시도하기
            </button>

            <button
                onClick={() => window.location.href = '/'}
                className="mt-4 text-gray-500 underline text-lg"
            >
                홈으로 돌아가기
            </button>
        </div>
    );
};

export const GlobalErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
};

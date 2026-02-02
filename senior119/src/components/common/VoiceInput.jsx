import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

/**
 * VoiceInput - 음성 입력 컴포넌트 (Web Speech API)
 * 
 * @param {function} onResult - 음성 인식 결과 콜백 (텍스트)
 * @param {string} placeholder - 안내 문구
 */
const VoiceInput = ({ onResult, placeholder = "마이크를 누르고 말씀하세요" }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check for Web Speech API support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const text = result[0].transcript;

            setTranscript(text);

            if (result.isFinal) {
                onResult?.(text);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                alert('마이크 권한을 허용해주세요.');
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.abort();
        };
    }, [onResult]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setTranscript('');
            recognitionRef.current.start();
        }
    };

    if (!isSupported) {
        return (
            <div className="bg-gray-100 p-4 rounded-xl text-center text-gray-500">
                <MicOff size={24} className="inline mr-2" />
                <span className="text-sm">이 브라우저는 음성 인식을 지원하지 않습니다.</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={toggleListening}
                className={`relative p-6 rounded-full transition-all shadow-lg active:scale-95 ${isListening
                        ? 'bg-red-500 text-white animate-pulse shadow-red-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-300'
                    }`}
                aria-label={isListening ? '음성 인식 중지' : '음성 인식 시작'}
            >
                {isListening ? (
                    <div className="relative">
                        <Mic size={40} />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                        </span>
                    </div>
                ) : (
                    <Mic size={40} />
                )}
            </button>

            <p className={`text-lg font-medium ${isListening ? 'text-red-600' : 'text-gray-600'}`}>
                {isListening ? '듣고 있습니다... 말씀해주세요' : placeholder}
            </p>

            {transcript && (
                <div className="w-full bg-blue-50 p-4 rounded-xl border-2 border-blue-200 animate-in fade-in">
                    <p className="text-sm text-blue-500 font-medium mb-1">인식된 내용:</p>
                    <p className="text-lg text-gray-800 font-bold">"{transcript}"</p>
                </div>
            )}
        </div>
    );
};

export default VoiceInput;

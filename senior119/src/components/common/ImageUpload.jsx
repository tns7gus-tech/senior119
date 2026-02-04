import React, { useState, useRef } from 'react';
import { Camera, Image, FolderOpen, Loader2, X, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * ImageUpload - AI 문서 스캐너 컴포넌트
 * 이미지를 업로드하면 Gemini API로 분석하여 데이터 추출
 * 
 * @param {function} onResult - 추출된 데이터 콜백 ({ startDate, endDate, workplace, salary })
 * @param {function} onError - 에러 콜백
 */
const ImageUpload = ({ onResult, onError }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showOptions, setShowOptions] = useState(true); // 바로 드롭다운 표시
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const handleFileSelect = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type (이미지만 허용)
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            setError('📸 이미지 파일만 업로드할 수 있습니다. 문서를 사진으로 찍어주세요.');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('파일 크기는 10MB 이하여야 합니다.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result);
        };
        reader.readAsDataURL(file);

        // Reset states
        setError(null);
        setResult(null);
        setIsUploading(true);
        setShowOptions(false);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`${API_URL}/api/ocr`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || '분석 중 오류가 발생했습니다.');
            }

            setResult(data.data);
            onResult?.(data.data);

        } catch (err) {
            console.error('Upload error:', err);
            const errorMsg = err.message || '파일 분석에 실패했습니다.';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setPreview(null);
        setResult(null);
        setError(null);
        setShowOptions(false);
        [cameraInputRef, galleryInputRef, fileInputRef].forEach(ref => {
            if (ref.current) ref.current.value = '';
        });
    };

    const handleOptionClick = (type) => {
        setShowOptions(false);
        if (type === 'camera') {
            cameraInputRef.current?.click();
        } else if (type === 'gallery') {
            galleryInputRef.current?.click();
        } else if (type === 'file') {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Hidden inputs for different capture modes */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
            />
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* 옵션 선택 UI - 단일 버튼으로 OS 기본 선택창 활용 */}
            {!preview && (
                <div className="space-y-3">
                    <p className="text-center text-lg font-bold text-gray-800 mb-4">
                        📄 사진으로 자동 입력
                    </p>

                    {/* 단일 버튼 - OS 기본 선택창 사용 */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-4 transition-all active:scale-98"
                    >
                        <Camera size={28} />
                        📷 사진 선택하기
                    </button>

                    <p className="text-center text-sm text-blue-600 font-medium mt-2">
                        AI가 자동으로 날짜와 금액을 읽어옵니다
                    </p>
                </div>
            )}

            {/* Preview & Processing */}
            {preview && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
                    <img
                        src={preview}
                        alt="업로드된 이미지"
                        className="w-full max-h-64 object-contain bg-gray-100"
                    />

                    {/* Reset button */}
                    <button
                        onClick={handleReset}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <X size={20} />
                    </button>

                    {/* Loading overlay */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-6 text-center">
                                <Loader2 size={48} className="text-blue-500 animate-spin mx-auto" />
                                <p className="mt-4 text-lg font-bold text-gray-800">AI가 분석 중입니다...</p>
                                <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={24} className="text-red-500 shrink-0" />
                    <div>
                        <p className="font-bold text-red-800">분석 실패</p>
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={handleReset}
                            className="mt-2 text-sm text-red-700 underline"
                        >
                            다시 시도하기
                        </button>
                    </div>
                </div>
            )}

            {/* Success Result */}
            {result && !isUploading && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle size={24} className="text-green-600" />
                        <p className="font-bold text-green-800">분석 완료!</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {result.startDate && (
                            <div className="bg-white p-3 rounded-lg">
                                <p className="text-gray-500">입사일</p>
                                <p className="font-bold text-gray-800">{result.startDate}</p>
                            </div>
                        )}
                        {result.endDate && (
                            <div className="bg-white p-3 rounded-lg">
                                <p className="text-gray-500">퇴사일</p>
                                <p className="font-bold text-gray-800">{result.endDate}</p>
                            </div>
                        )}
                        {result.workplace && (
                            <div className="bg-white p-3 rounded-lg col-span-2">
                                <p className="text-gray-500">직장명</p>
                                <p className="font-bold text-gray-800">{result.workplace}</p>
                            </div>
                        )}
                        {result.salary && (
                            <div className="bg-white p-3 rounded-lg col-span-2">
                                <p className="text-gray-500">급여</p>
                                <p className="font-bold text-gray-800">{Number(result.salary).toLocaleString()}원</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

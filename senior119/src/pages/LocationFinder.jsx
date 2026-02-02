import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { useUserLocation } from '../hooks/useUserLocation';
import { reportingCenters } from '../data/reportingCenters';
import { calculateDistance } from '../lib/distance';

const LocationFinder = () => {
    const { location, error, isLoading, getLocation } = useUserLocation();
    const [nearestCenter, setNearestCenter] = useState(null);
    const [sortedCenters, setSortedCenters] = useState([]);

    useEffect(() => {
        if (location) {
            const centersWithDistance = reportingCenters.map(center => {
                const dist = calculateDistance(
                    location.lat,
                    location.lng,
                    center.lat,
                    center.lng
                );
                return { ...center, distance: dist };
            });

            centersWithDistance.sort((a, b) => a.distance - b.distance);

            setNearestCenter(centersWithDistance[0]);
            setSortedCenters(centersWithDistance);
        }
    }, [location]);

    const handleFindLocation = () => {
        getLocation();
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-orange-100 rounded-full text-orange-600">
                        <MapPin size={48} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    가장 가까운 신고센터 찾기
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                    고객님의 현재 위치를 기반으로<br />
                    가장 가까운 고용노동청을 찾아드립니다.
                </p>

                <button
                    onClick={handleFindLocation}
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            위치 확인 중...
                        </>
                    ) : (
                        <>
                            <Navigation />
                            지금 내 위치에서 찾기
                        </>
                    )}
                </button>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-left">
                        <AlertTriangle className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold">위치 정보를 가져올 수 없습니다.</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            {nearestCenter && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold text-gray-900 px-2">
                        가장 가까운 곳은 여기입니다!
                    </h3>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-xl font-bold">
                            약 {nearestCenter.distance.toFixed(1)}km
                        </div>

                        <h4 className="text-2xl font-bold text-gray-900 mb-4 mt-2">
                            {nearestCenter.name}
                        </h4>

                        <div className="space-y-4 text-gray-600 text-lg">
                            <div className="flex items-start gap-3">
                                <MapPin className="shrink-0 mt-1 text-gray-400" />
                                <p>{nearestCenter.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="shrink-0 text-gray-400" />
                                <p>{nearestCenter.phone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <a
                                href={`tel:${nearestCenter.phone}`}
                                className="py-3 px-4 bg-green-50 text-green-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
                            >
                                <Phone size={20} />
                                전화걸기
                            </a>
                            <a
                                href={`https://map.naver.com/v5/search/${encodeURIComponent(nearestCenter.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-3 px-4 bg-blue-50 text-blue-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                            >
                                <Navigation size={20} />
                                길찾기
                            </a>
                        </div>
                    </div>

                    {sortedCenters.length > 1 && (
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 px-2">다른 가까운 센터들</h4>
                            <div className="space-y-3">
                                {sortedCenters.slice(1, 4).map(center => (
                                    <div key={center.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-gray-900">{center.name}</p>
                                            <p className="text-sm text-gray-500">{center.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-orange-600 block">
                                                {center.distance.toFixed(1)}km
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationFinder;

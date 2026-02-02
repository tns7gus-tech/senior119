import { useState, useEffect } from 'react';

export const useUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError("브라우저가 위치 정보를 지원하지 않습니다.");
            return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLoading(false);
            },
            (err) => {
                setError("위치 정보를 가져올 수 없습니다. 설정에서 위치 권한을 허용해주세요.");
                setIsLoading(false);
            }
        );
    };

    return { location, error, isLoading, getLocation };
};

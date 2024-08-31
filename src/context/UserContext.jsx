import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UseProvider = {{children}} => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // TODO: 유저 정보 가져와서 전역상태로 사용하기
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};



import React from 'react';
import { useContext, useEffect, useState, createContext } from 'react';

const Context = createContext({});

export function useUser() {
    return useContext(Context);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/user', { method: 'get' })
            .then((res) => res.json())
            .then((user) => {
                console.log("USE EFFECT SIĘ WYKONAŁ")
                setUser(user);
            })
            .catch((err) => {
                console.warn('User fetch error', err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        console.log('USER', user);
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <Context.Provider value={user}>{children}</Context.Provider>;
}

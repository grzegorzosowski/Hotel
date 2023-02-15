import React from 'react';

const Context = React.createContext({});

export function useUser() {
    return React.useContext(Context);
}

export function UserProvider({ children }) {
    const [user, setUser] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('/user', { method: 'get' })
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
            })
            .catch((err) => {
                console.warn('User fetch error', err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    React.useEffect(() => {
        console.log('USER', user);
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <Context.Provider value={user}>{children}</Context.Provider>;
}

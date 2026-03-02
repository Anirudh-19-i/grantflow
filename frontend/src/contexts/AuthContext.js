import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(false);
    const [isSetting, setIsSetting] = React.useState(false);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLogin(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('wallet');
        setUser(null);
        setIsLogin(false);
    };

    const restoreSession = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLogin(true);
        }
    };

    React.useEffect(() => {
        restoreSession();
    }, []);

    return React.createElement(
        AuthContext.Provider, { value: { user, isLogin, login, logout, isSetting, setIsSetting } },
        children
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
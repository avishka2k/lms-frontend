import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInService, refreshTokenService } from './CognitoService'; // Assume refreshTokenService is implemented

interface AuthContextType {
    user: any;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);

        // Set up token refresh interval
        const interval = setInterval(() => {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                refreshTokenService(parsedUser.refreshToken)
                    .then(newTokens => {
                        setUser(newTokens);
                        localStorage.setItem('user', JSON.stringify(newTokens));
                    })
                    .catch(err => {
                        console.error('Token refresh failed:', err);
                        signOut();
                    });
            }
        }, 55 * 60 * 1000); // 55 minutes

        return () => clearInterval(interval);
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const { authResponse, user } = await signInService(username, password);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('authResponse', JSON.stringify(authResponse));
            navigate('/admin');
        } catch (error) {
            throw new Error('Sign-in failed. Please check your credentials.');
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

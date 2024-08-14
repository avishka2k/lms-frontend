import React, { createContext, ReactNode } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

interface AuthContextType {
    user: any;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Authenticator.Provider>
            <AuthProviderContent>{children}</AuthProviderContent>
        </Authenticator.Provider>
    );
};

const AuthProviderContent: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
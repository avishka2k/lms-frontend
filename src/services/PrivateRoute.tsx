import React from 'react';
import {Authenticator, Image, Text, useTheme, View} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {Navigate} from "react-router-dom";

Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_COGNITO_REGION,
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    },
});

interface PrivateRouteProps {
    element: React.ReactElement;
    allowedGroups: string[];
}

const components = {
    Header() {
        const {tokens} = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image alt="logo" src="/dist/img/main-logo.png" className="w-25">
                </Image>
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; All Rights Reserved
                </Text>
            </View>
        );
    },
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedGroups }) => {
    return (
        <div className="">
            <Authenticator hideSignUp initialState="signIn" components={components}>
                {({ user }) => {
                    if (!user) {
                        console.log('User not signed in');
                    }

                    const userGroups = user?.getSignInUserSession()?.getIdToken().payload['cognito:groups'] || [];

                    if (window.location.pathname === '/') {
                        if (userGroups.includes('ADMIN')) {
                            return <Navigate to="/admin/index" />;
                        } else if (userGroups.includes('STUDENT')) {
                            return <Navigate to="/student" />;
                        } else if (userGroups.includes('LECTURER')) {
                            return <Navigate to="/lecturer" />;
                        }
                    }

                    if (!allowedGroups.some(group => userGroups.includes(group))) {
                        console.log('User does not have the required permissions');
                        return <Navigate to="/unauthorized" />;
                    }

                    return element;
                }}
            </Authenticator>
        </div>
    );
};

export default PrivateRoute;

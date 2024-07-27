import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import CryptoJS from "crypto-js";

const REGION = process.env.REACT_APP_COGNITO_REGION || "ap-southeast-1";
const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID || "";
const CLIENT_SECRET = process.env.REACT_APP_COGNITO_CLIENT_SECRET || "";

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

const getSecretHash = (username: string): string => {
  return CryptoJS.HmacSHA256(username + CLIENT_ID, CLIENT_SECRET).toString(
    CryptoJS.enc.Base64
  );
};

export const signInService = async (username: string, password: string) => {
  try {
    const params: any = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: getSecretHash(username),
      },
      Scope: "openid aws.cognito.signin.user.admin",
    };

    const authCommand = new InitiateAuthCommand(params);
    const authResponse = await cognitoClient.send(authCommand);

    const userParams = {
      AccessToken: authResponse.AuthenticationResult?.AccessToken || "",
    };

    const userCommand = new GetUserCommand(userParams);
    const userResponse = await cognitoClient.send(userCommand);

    return { authResponse, user: userResponse };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const params: any = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: getSecretHash("username"), // Use the actual username if required
      },
    };

    const authCommand = new InitiateAuthCommand(params);
    const authResponse = await cognitoClient.send(authCommand);

    const userParams = {
      AccessToken: authResponse.AuthenticationResult?.AccessToken || "",
    };

    const userCommand = new GetUserCommand(userParams);
    const userResponse = await cognitoClient.send(userCommand);

    return { authResponse, user: userResponse };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

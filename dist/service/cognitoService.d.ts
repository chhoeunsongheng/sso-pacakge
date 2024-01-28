export declare class CognitoService {
    config: any;
    constructor(config: any);
    loginWithHostedUI(): void;
    logoutWithHostedUI(): void;
    login(username: string, password: string): Promise<import("aws-amplify/auth").SignInOutput>;
    logout(): Promise<void>;
    verifyToken(token: string): Promise<boolean | void>;
}

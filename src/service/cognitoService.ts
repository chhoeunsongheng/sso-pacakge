import { signIn, signOut } from 'aws-amplify/auth';
import { configureAuth } from './authConfig';
import { KEYUTIL, KJUR, hextoutf8, b64utohex } from 'jsrsasign';

export class CognitoService {
    config: any;
    constructor(config: any) {
        this.config = config;
        configureAuth(config);
    }

    loginWithHostedUI() {
        const url = '';
        window.location.assign(url);
    }

    logoutWithHostedUI() {
        const url = '';
        window.location.assign(url);
    }

    async login(username: string, password: string) {
        try {
            const user = await signIn({
                username,
                password,
            });
            return user;
        } catch (error) {
            console.error('Error signing in', error);
        }
    }

    async logout() {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    }

    async verifyToken(token: string): Promise<boolean | void> {
        // Fetch the JSON Web Key Set (JWKS) from AWS Cognito
        const response = await fetch(`https://cognito-idp.${this.config.region}.amazonaws.com/${this.config.userPoolId}/.well-known/jwks.json`);
        const { keys } = await response.json();

        // Decode the JWT without verifying it to get its header
        const decodedHeader = KJUR.jws.JWS.readSafeJSONString(hextoutf8(b64utohex(token.split(".")[0])));

        // Find the key from the JWKS that matches the key ID of the JWT
        const key = keys.find((key: any) => key.kid === decodedHeader.kid);

        if (!key) {
            throw new Error('Key not found in JWKS');
        }

        // Convert the key to a RSAKey object
        const rsaKey = KEYUTIL.getKey(key);

        // Verify the JWT
        const isValid = KJUR.jws.JWS.verifyJWT(token, rsaKey, { alg: ['RS256'] });
        return isValid;
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const auth_1 = require("aws-amplify/auth");
const authConfig_1 = require("./authConfig");
const jsrsasign_1 = require("jsrsasign");
class CognitoService {
    constructor(config) {
        this.config = config;
        (0, authConfig_1.configureAuth)(config);
    }
    loginWithHostedUI() {
        const url = '';
        window.location.assign(url);
    }
    logoutWithHostedUI() {
        const url = '';
        window.location.assign(url);
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, auth_1.signIn)({
                    username,
                    password,
                });
                return user;
            }
            catch (error) {
                console.error('Error signing in', error);
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.signOut)();
            }
            catch (error) {
                console.error('Error signing out: ', error);
            }
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the JSON Web Key Set (JWKS) from AWS Cognito
            const response = yield fetch(`https://cognito-idp.${this.config.region}.amazonaws.com/${this.config.userPoolId}/.well-known/jwks.json`);
            const { keys } = yield response.json();
            // Decode the JWT without verifying it to get its header
            const decodedHeader = jsrsasign_1.KJUR.jws.JWS.readSafeJSONString((0, jsrsasign_1.hextoutf8)((0, jsrsasign_1.b64utohex)(token.split(".")[0])));
            // Find the key from the JWKS that matches the key ID of the JWT
            const key = keys.find((key) => key.kid === decodedHeader.kid);
            if (!key) {
                throw new Error('Key not found in JWKS');
            }
            // Convert the key to a RSAKey object
            const rsaKey = jsrsasign_1.KEYUTIL.getKey(key);
            // Verify the JWT
            const isValid = jsrsasign_1.KJUR.jws.JWS.verifyJWT(token, rsaKey, { alg: ['RS256'] });
            return isValid;
        });
    }
}
exports.CognitoService = CognitoService;

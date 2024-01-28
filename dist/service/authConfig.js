"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuth = void 0;
const aws_amplify_1 = require("aws-amplify");
function configureAuth(config) {
    aws_amplify_1.Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: config.userPoolAppClientId,
                userPoolId: config.userPoolId,
                loginWith: {
                    oauth: {
                        domain: config.domain,
                        redirectSignIn: config.redirectSignIn,
                        redirectSignOut: config.redirectSignOut,
                        responseType: 'code',
                        scopes: ['openid email phone profile aws.cognito.signin.user.admin '],
                    },
                    username: true,
                    email: false, // Optional
                    phone: false, // Optional
                }
            }
        }
    });
}
exports.configureAuth = configureAuth;

import { Amplify } from 'aws-amplify';

export function configureAuth(config: any) {
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: config.userPoolAppClientId,
                userPoolId: config.userPoolId,
                loginWith: { // Optional
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
    })
}
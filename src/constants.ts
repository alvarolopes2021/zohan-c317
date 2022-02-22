export class Constants{

    static HttpEndpoints = class {

        static LOGIN: string = "http://192.168.0.3:3000/auth/login";
        
        static SIGN_UP: string = "http://192.168.0.3:3000/auth/signup";
                
    }

    static Errors = class {

        static USERNAME_EMPTY = 'USERNAME_EMPTY';

        static USER_PHONE_EMPTY = 'USER_PHONE_EMPTY';

        static PASSWORD_EMPTY = 'PASSWORD_EMPTY';

        static PHONE_EXISTS = 'PHONE_EXISTS';

        static PASSWORD_DONT_MATCH = 'PASSWORD_DONT_MATCH';
        
    }

    static Roles = class {
        static USER = "USER";
    }

}
export class Constants{

    static HttpEndpoints = class {

        static IP: string = "https://localhost:8443/";

        static LOGIN: string = this.IP + "auth/login";
        
        static SIGN_UP: string = this.IP + "auth/signup";
                
    }

    static Errors = class {
        static ERROR = "ERROR";

        static USERNAME_EMPTY = 'USERNAME_EMPTY';

        static USER_PHONE_EMPTY = 'USER_PHONE_EMPTY';

        static PASSWORD_EMPTY = 'PASSWORD_EMPTY';

        static PHONE_EXISTS = 'PHONE_EXISTS';

        static PASSWORD_DONT_MATCH = 'PASSWORD_DONT_MATCH';
        
    }

    static Roles = class {
        static USER = "USER";
        static ADMIN = "ADMIN";
        static BARBER = "BARBER";
    }

}
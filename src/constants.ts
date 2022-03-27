export class Constants {

    static HttpEndpoints = class {

        static Login = class {

            static IP: string = "http://192.168.0.3:3000/";

            static LOGIN: string = this.IP + "auth/login";

            static SIGN_UP: string = this.IP + "auth/signup";
        }

        static Schedules = class {

            static IP: string = "http://192.168.0.3:3000/";
            static CREATE_SCHEDULE: string = this.IP + "schedule/create-schedule";
            static GET_SCHEDULES: string = this.IP + "schedule/get-schedules";
            static UPDATE_SCHEDULES: string = this.IP + "schedule/update-schedules";
        }

        static Users = class {
            static IP: string = "http://192.168.0.3:3000/";
            static GET_ALL_USERS: string = this.IP + "user/get-all-users";
        }

        static Ads = class {
            static IP: string = "http://192.168.0.3:3000/";
            static CREATE_AD: string = this.IP + "ads/insert-ad";
            static GET_ADD: string = this.IP + "ads/get-ads";
        }

        static Services = class {
            static IP: string = "http://192.168.0.3:3000/";
            static ADD_SERVICES = this.IP + "services/add-services";
            static GET_SERVICES = this.IP + "services/get-services";
        }
    }

    static HttpResponseTags = class {
        static CONTENT: string = "CONTENT";
        static AUTH: string = "AUTH";
    }

    static Errors = class {
        static ERROR = "ERROR";

        static USERNAME_EMPTY = 'USERNAME_EMPTY';

        static USER_PHONE_EMPTY = 'USER_PHONE_EMPTY';

        static PASSWORD_EMPTY = 'PASSWORD_EMPTY';

        static PHONE_EXISTS = 'PHONE_EXISTS';

        static PASSWORD_DONT_MATCH = 'PASSWORD_DONT_MATCH';

    }

    static Auth = class {
        static TOKEN = "TOKEN";
        static EXPIRES_IN = "EXPIRES_IN";
    }

    static Roles = class {
        static USER = "USER";
        static ADMIN = "ADMIN";
        static BARBER = "BARBER";
    }

    static Keys = class {
        static USERNAME: string = "USERNAME";
        static ROLE: string = "ROLE";
        static DATE: string = "DATE";
        static SCHEDULE_LIST: string = "SCHEDULE_LIST";
        static USER_PHONE: string = "USER_PHONE";
    }

}
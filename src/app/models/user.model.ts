export interface UserModel{
    userId?: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    userPsw?: string;
    userType?: string;
    userToken?: {
        token: string,
        expires: number
    }
}
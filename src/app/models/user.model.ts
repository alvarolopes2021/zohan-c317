export interface UserModel{
    userId?: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    userPsw?: string | null;
    newPsw?: string | null;
    userType?: string;
    userToken?: {
        token: string,
        expires: number
    }
}
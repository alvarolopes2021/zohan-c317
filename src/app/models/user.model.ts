export interface UserModel{
    userid?: string;
    username?: string;
    useremail?: string;
    userphone?: string;
    userpsw?: string | null;
    newpsw?: string | null;
    usertype?: string;
    usertoken?: {
        token: string,
        expires: number
    }
}
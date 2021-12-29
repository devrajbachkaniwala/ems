export interface IRegisterUser {
    username: string;
    userPhoto?: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}
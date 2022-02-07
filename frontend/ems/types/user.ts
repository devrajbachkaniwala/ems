export type TRegisterUser = {
    username: string;
    fullName: string;
    email: string;
    password: string;
    userPhoto?: File | string | ArrayBuffer | null;
}

export type TUser = TRegisterUser & {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
}
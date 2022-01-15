export interface ICreateUser {
    username: string;
    userPhoto?: string;
    fullName: string;
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    userPhoto: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt: Date;
    modifiedAt: Date;
}
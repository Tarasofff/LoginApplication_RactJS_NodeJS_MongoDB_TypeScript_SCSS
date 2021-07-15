import {IUser} from "../IUser";

export interface IAuthRes {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
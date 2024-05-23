export type userIdT = number | string;

export interface UserDataT {
    name: string; gender: string;
};

export interface UserT extends UserDataT {
    id: userIdT;
}
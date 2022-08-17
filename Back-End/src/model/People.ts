export class People{
    constructor(
        private id:string,
        private email:string,
        private fullName:string,
        private cityId:string
    ){}
}
export interface PeopleDTO{
    id:string;
    email:string;
    fullName:string;
    cityId:string;
}
export interface InputsPeople{
    email: string;
    fullName: string;
    cityId: string;
}
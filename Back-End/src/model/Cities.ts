export class Cities{
    constructor(
        private id: string,
        private state:string,
        private city:string
    ){}
}
export interface CitiesDTO {
    id:string;
    state: string;
    city: string;
}
export interface InputsCities{
    state:string;
    city:string;
}
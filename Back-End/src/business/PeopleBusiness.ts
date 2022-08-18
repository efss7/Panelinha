import { PeopleData } from "../data/PeopleData";
import { InputsPeople, PeopleDTO } from "../model/People";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class PeopleBusiness {
    constructor(
        private peopleData: PeopleData,
        private idGenerator: IdGenerator
    ) { }
    insert = async (inputs: InputsPeople): Promise<void> => {
        try {
            const { email, fullName, cityId } = inputs
            if (!inputs.email) {
                throw new CustomError(422, "E-mail não foi passado")
            }
            if (!inputs.fullName) {
                throw new CustomError(422, "Nome completo não foi passado")
            }
            if (!inputs.cityId) {
                throw new CustomError(422, "Cidade não foi passada")
            }
            const id = this.idGenerator.generateId();
            const dicesOfPeople: PeopleDTO = {
                id,
                email,
                fullName,
                cityId
            }
            await this.peopleData.insert(dicesOfPeople)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    select = async (): Promise<PeopleDTO[]> => {
        try {
            return this.peopleData.select()
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    update = async (inputs: PeopleDTO): Promise<void> => {
        try {
            if (!inputs.id) {
                throw new CustomError(422, "ID inválido")
            }
            if (!inputs.email) {
                throw new CustomError(422, "E-mail não foi passado")
            }
            if (!inputs.fullName) {
                throw new CustomError(422, "Nome completo não foi passada")
            }
            if (!inputs.cityId) {
                throw new CustomError(422, "Cidade não foi passada")
            }
            await this.peopleData.update(inputs)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    delete = async (id:string): Promise<void> =>{
        try {
            if(!id){
                throw new CustomError(422, "ID inválido")
            }
            await this.peopleData.delete(id)
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}
export default new PeopleBusiness(
    new PeopleData(),
    new IdGenerator()
)
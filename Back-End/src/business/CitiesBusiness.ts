import { CitiesData } from "../data/CitiesData";
import { CitiesDTO, InputsCities } from "../model/Cities";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class CitiesBusiness {
    constructor(
        private citiesData: CitiesData,
        private idGenerator: IdGenerator
    ) { }

    insert = async (inputs: InputsCities): Promise<void> => {
        try {
            const { state, city } = inputs
            if (!inputs.state) {
                throw new CustomError(422, "Estado não foi passado")
            }
            if (!inputs.city) {
                throw new CustomError(422, "Cidade não foi passada")
            }
            const id = this.idGenerator.generateId();
            const dicesOfCity: CitiesDTO = {
                id,
                state,
                city
            }
            await this.citiesData.insert(dicesOfCity)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    select = async (): Promise<CitiesDTO[] > => {
        try {
            return this.citiesData.select()
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    update = async (inputs: CitiesDTO): Promise<void> => {
        try {
            if (!inputs.id) {
                throw new CustomError(422, "ID inválido")
            }
            if (!inputs.state) {
                throw new CustomError(422, "Estado não foi passado")
            }
            if (!inputs.city) {
                throw new CustomError(422, "Cidade não foi passada")
            }
            await this.citiesData.update(inputs)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    delete = async (id: string): Promise<void> => {
        try {
            if (!id) {
                throw new CustomError(422, "ID inválido");
            }
            await this.citiesData.delete(id);
        } catch (error:any) {
             throw new CustomError(error.statusCode, error.message);
        }
    }
}
export default new CitiesBusiness(
new CitiesData(),
new IdGenerator()
)
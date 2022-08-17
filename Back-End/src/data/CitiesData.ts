import { CustomError } from "../business/errors/CustomError";
import { CitiesDTO, InputsCities } from "../model/Cities";
import BaseDatabase from "./BaseDatabase";

const TABLE = "teppa_cities"

export class CitiesData extends BaseDatabase {
    insert = async (inputs: InputsCities): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .insert(inputs)
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    select = async (): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .select("*")
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    update = async (input: CitiesDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .update({
                    state: input.state,
                    city: input.city
                })
                .where({id:input.id})
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    delete = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
            .where({id})
            .delete()
        } catch (error:any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
}
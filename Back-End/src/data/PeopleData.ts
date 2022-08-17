import { CustomError } from "../business/errors/CustomError";
import { InputsPeople, PeopleDTO } from "../model/People";
import BaseDatabase from "./BaseDatabase";

const TABLE = "teppa_people"

export class PeopleData extends BaseDatabase {
    insert = async (inputs: InputsPeople): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .insert(inputs)
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    select = async (): Promise<PeopleDTO[]> => {
        try {
            return BaseDatabase.connection(TABLE)
                .select("*")
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    update = async (inputs: PeopleDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .update({
                    email: inputs.email,
                    fullName: inputs.fullName,
                    cityId: inputs.cityId
                })
                .where({ id: inputs.id })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    delete = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(TABLE)
                .where({ id })
                .delete()
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
}
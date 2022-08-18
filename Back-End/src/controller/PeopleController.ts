import { Request, Response } from "express";
import peopleBusiness , { PeopleBusiness } from "../business/PeopleBusiness";
import { PeopleData } from "../data/PeopleData";
import { InputsPeople, PeopleDTO } from "../model/People";

export class PeopleController {
    constructor(private peopleBusiness: PeopleBusiness) { }
    insert = async (req:Request, res:Response):Promise<void> => {
        const { email, fullName, cityId } = req.body
        try {
            const inputs: InputsPeople = {email, fullName, cityId}
            await this.peopleBusiness.insert(inputs)
            res.status(201).send("Pessoa registrada com sucesso")
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }

    }
    select = async (req:Request, res:Response): Promise<void> =>{
        try {
            const result = await this.peopleBusiness.select()
            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    update = async (req:Request, res:Response):Promise<void> =>{
        const { email, fullName, cityId } = req.body
        const id = req.params.id
        try {
            const inputs: PeopleDTO = {id, email, fullName, cityId }
            await this.peopleBusiness.update(inputs)
            res.status(201).send("Pessoa atualizada com sucesso");
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    delete = async (req:Request, res:Response):Promise<void> =>{
        const id = req.params.id as string
        try {
            await this.peopleBusiness.delete(id)
            res.status(200).send("Pessoa excluída com sucesso")
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}
export default new PeopleController(peopleBusiness)
import { Request, Response } from "express";
import citiesBusiness, { CitiesBusiness } from "../business/CitiesBusiness";
import { CitiesDTO, InputsCities } from "../model/Cities";

export class CitiesController {
    constructor(private citiesBusiness: CitiesBusiness) { }
    insert = async (req: Request, res: Response): Promise<void> => {
        const { state, city } = req.body
        try {
            const inputs: InputsCities = { state, city }
            await this.citiesBusiness.insert(inputs)
            res.status(201).send("Cidade registrada com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    select = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.citiesBusiness.select()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    update = async (req: Request, res: Response): Promise<void> => {
        const { state, city } = req.body
        const id = req.params.id
        try {
            const inputs: CitiesDTO = { id, state, city }
            await this.citiesBusiness.update(inputs)
            res.status(201).send("Cidade alterada com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    delete = async(req:Request, res:Response):Promise<void> => {
        const id = req.params.id as string
        try {
            await this.citiesBusiness.delete(id)
            res.status(200).send("Cidade excluída com sucesso")
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }
}
export default new CitiesController(citiesBusiness)
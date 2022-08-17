import { Router } from "express";
import citiesBusiness from "../../controller/CitiesController";

export const citiesRouter = Router();

citiesRouter.post("/insert", citiesBusiness.insert);
citiesRouter.get("/select", citiesBusiness.select)
citiesRouter.put("/update/:id", citiesBusiness.update)
citiesRouter.delete("/delete/:id", citiesBusiness.delete)
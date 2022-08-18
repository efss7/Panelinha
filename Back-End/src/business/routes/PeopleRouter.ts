import { Router } from "express";
import peopleBusiness from "../../controller/PeopleController";

export const peopleRouter = Router();

peopleRouter.post("/insert", peopleBusiness.insert);
peopleRouter.get("/select", peopleBusiness.select)
peopleRouter.put("/update/:id", peopleBusiness.update)
peopleRouter.delete("/delete/:id", peopleBusiness.delete)
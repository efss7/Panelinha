import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { citiesRouter } from "./business/routes/CitiesRouter";



app.use(express.json());
app.use(cors());

app.use("/cities", citiesRouter)



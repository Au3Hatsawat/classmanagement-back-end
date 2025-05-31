import { getHomework, insertHomeworks } from "../controllers/homework.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router:express.Router) => {
    router.post("/homeworks/" , isAuthenticated , insertHomeworks);
    router.get("/homeworks/" , isAuthenticated , getHomework); 
};
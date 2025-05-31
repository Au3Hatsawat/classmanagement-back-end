import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getClass, insertClasses } from "../controllers/classes.controller";

export default (router:express.Router) => {
    router.post("/classes/" , isAuthenticated , insertClasses);
    router.get("/classes/", isAuthenticated , getClass );
};
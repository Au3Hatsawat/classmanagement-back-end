import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getClassroom, insertClassrooms } from "../controllers/classrooms.controller";

export default (router:express.Router) => {
    router.post("/classrooms/" , isAuthenticated , insertClassrooms);
    router.get("/classrooms/" , isAuthenticated , getClassroom);
};
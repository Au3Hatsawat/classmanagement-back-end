import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getStudent, insertStudents, updateStudent } from "../controllers/students.controller";

export default (router:express.Router) => {
    router.post("/students/" , isAuthenticated , insertStudents);
    router.get("/students/" , isAuthenticated , getStudent);
    router.put("/students/:_id" , isAuthenticated , updateStudent);
};
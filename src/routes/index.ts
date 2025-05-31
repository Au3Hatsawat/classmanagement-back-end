import express from "express";
import authentication from "./authentication.routes";
import homeworks from "./homeworks.routes";
import classrooms from "./classrooms.routes";
import classes from "./classes.routes";
import students from "./students.routes";
import users from "./users.routes";


const router = express.Router();

export default () => {
    authentication(router);
    homeworks(router);
    classes(router);
    classrooms(router);
    students(router);
    users(router);
    
    return router;
}
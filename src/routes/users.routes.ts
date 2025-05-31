import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getUser } from "../controllers/users.controller";

export default (router:express.Router) => {
    router.get("/users/" , isAuthenticated , getUser);
};
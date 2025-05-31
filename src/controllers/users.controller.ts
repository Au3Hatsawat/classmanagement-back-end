import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";

export const getUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);
        if(!user){
            return res.sendStatus(401);
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}
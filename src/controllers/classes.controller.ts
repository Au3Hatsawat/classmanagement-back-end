import express from "express";
import { createClasses, getClasses } from "../models/classes";
import { getUserById } from "../models/users";
import { get } from "lodash";
import mongoose from "mongoose";

export const insertClasses = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { name, classCode, status, students } = req.body;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (!name || !classCode) {
            return res.sendStatus(400);
        }

        if (!mongoose.Types.ObjectId.isValid(user._id)) {
            return res.status(400).json({ error: 'Invalid classRoom ID' });
        }

        const now = new Date();
        const classes = await createClasses({
            name: name,
            classCode: classCode,
            status: status,
            dateCreate: now,
            teacher: new mongoose.Types.ObjectId(user._id),
            students: students
        });

        return res.status(201).json(classes);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getClass = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const classes = await getClasses();

        return res.status(200).json(classes);
    } catch (error) {
        console.log("error" , error);
        return res.sendStatus(400); 
    }
}
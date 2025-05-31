import express from "express";
import { createHomework, getHomeworks } from "../models/homeworks";
import mongoose from "mongoose";

export const insertHomeworks = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { name, status, dueDate, classId, submit } = req.body;

        if (!name || !dueDate || !classId) {
            return res.sendStatus(400);
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: 'Invalid classRoom ID' });
        }

        const now = new Date();
        const homework = await createHomework({
            name: name,
            status: status,
            dateCreate: now,
            dueDate: dueDate,
            class: new mongoose.Types.ObjectId(classId),
            submit: submit
        });

        return res.status(201).json(homework);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getHomework = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const homeworks = await getHomeworks();

        return res.status(200).json(homeworks);
    } catch (error) {
        console.log("error" , error);
        return res.sendStatus(400); 
    }
}
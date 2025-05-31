import express from "express";
import { createClassRoom, getClassRooms } from "../models/classrooms";

export const insertClassrooms = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { classRoomsCode, status } = req.body;

        if (!classRoomsCode) {
            return res.sendStatus(400);
        }

        const now = new Date();
        const classRoom = await createClassRoom({
            classRoomsCode: classRoomsCode,
            status: status,
            dateCreate: now,
        });

        return res.status(201).json(classRoom);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getClassroom = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const classroom = await getClassRooms();

        return res.status(200).json(classroom);
    } catch (error) {
        console.log("error" , error);
        return res.sendStatus(400); 
    }
}


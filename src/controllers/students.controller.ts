import express from "express";
import { createStudent, getStudents, updateStudentById } from "../models/students";
import mongoose from "mongoose";

export const insertStudents = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { studentCode, firstName, lastName, status, classRoom } = req.body;

        if ( !studentCode || !firstName || !lastName || !classRoom) {
            return res.sendStatus(400);
        }

        if (!mongoose.Types.ObjectId.isValid(req.body.classRoom)) {
            return res.status(400).json({ error: 'Invalid classRoom ID' });
        }

        const now = new Date();
        const student = await createStudent({
            studentCode: studentCode,
            firstName: firstName,
            lastName: lastName,
            status: status || "ปกติ",
            dateCreate: now,
            classRoom: new mongoose.Types.ObjectId(classRoom)
        });

        return res.status(201).json(student);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getStudent = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const student = await getStudents();

        return res.status(200).json(student);
    } catch (error) {
        console.log("error" , error);
        return res.sendStatus(400); 
    }
}

export const updateStudent = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const { firstName, lastName, status, classRoom } = req.body;
        const { _id } = req.params;

        if ( !firstName || !lastName || !classRoom ) {
            return res.sendStatus(400);
        }

        if (!mongoose.Types.ObjectId.isValid(req.body.classRoom)) {
            return res.status(400).json({ error: 'Invalid classRoom ID' });
        }

        const student = await updateStudentById(_id , {
            firstName : firstName,
            lastName : lastName, 
            status : status, 
            classRoom : new mongoose.Types.ObjectId(classRoom)
        });

        return res.status(200).json(student);
    } catch (error) {
        console.log("error" , error);
        return res.sendStatus(400); 
    }
}
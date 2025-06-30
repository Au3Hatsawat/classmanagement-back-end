import express from "express";
import { createHomework, findHomeworkById, getHomeworks } from "../models/homeworks";
import mongoose from "mongoose";
import { getStudentByClassroomId } from "../models/students";
import { SubmissionStatus } from "../types/homeworks";

export const insertHomeworks = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { name, status, dueDate, classId, score, classroomId } = req.body;
        const submit: Array<{
                students: mongoose.Types.ObjectId;
                score: number;
                status: string;
                submissionDate: string;
                description: string;
            }> = [];
        if (!name || !dueDate || !classId || !score) {
            return res.sendStatus(400);
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: 'Invalid classRoom ID' });
        }

        if (classroomId) {
            await Promise.all(
                classroomId.map(async (classroom: string) => {
                    const students = await getStudentByClassroomId(classroom);
                    students.map((student) => {
                        submit.push({
                            students : student._id,
                            score : 0 ,
                            status : SubmissionStatus.NotSubmitted,
                            submissionDate : "",
                            description : ""
                        })
                    })
                })
            )
        }

        const now = new Date();
        const homework = await createHomework({
            name: name,
            status: status,
            dateCreate: now,
            dueDate: new Date(dueDate),
            score: score,
            class: new mongoose.Types.ObjectId(classId),
            submit: submit
        });

        return res.status(201).json(homework);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getHomework = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const homeworks = await getHomeworks();

        return res.status(200).json(homeworks);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}

export const getHomeworkById = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { _id } = req.params;
        const homeworks = await findHomeworkById(_id);

        if(!homeworks){
            return res.sendStatus(400);
        }

        return res.status(200).json(homeworks);
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(400);
    }
}
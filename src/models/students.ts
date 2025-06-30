import mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema({
    studentCode: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    status: { type: String, require: true },
    dateCreate: { type: Date, require: true },
    classRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassRooms',
        required: true,
    }
});

export const StudentsModel = mongoose.model("Students", StudentsSchema);

export const getStudents = () => StudentsModel.find().populate('classRoom');
export const getStudentById = (id: string) => StudentsModel.findById(id).populate('classRoom');
export const getStudentByClassroomId = (id: string) => StudentsModel.find({classRoom : id}).populate('classRoom');
export const createStudent = (values: Record<string, any>) => new StudentsModel(values).save().then((student) => student.toObject());
export const deleteStudentById = (id: string) => StudentsModel.findOneAndDelete({ _id: id });
export const updateStudentById = (id: string, values: Record<string, any>) => StudentsModel.findByIdAndUpdate(id, values);

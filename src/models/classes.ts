import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
    name: { type: String, require: true },
    classCode : {type : String , require: true},
    status: {type: String, require: true},
    dateCreate: {type: Date, require: true},
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Students',
            require: true
        }
    ],
});

export const ClassesModel = mongoose.model("Classes", ClassesSchema);

export const getClasses = () => ClassesModel.find().populate('teacher').populate('students');
export const getClassesById = (id: string) => ClassesModel.findById(id);
export const createClasses = (values: Record<string, any>) => new ClassesModel(values).save().then((classes) => classes.toObject());
export const deleteClassesById = (id: string) => ClassesModel.findOneAndDelete({ _id: id });
export const updateClassesById = (id: string, values: Record<string, any>) => ClassesModel.findByIdAndUpdate(id, values);

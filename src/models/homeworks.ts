import mongoose from "mongoose";

const HomeworksSchema = new mongoose.Schema({
    name: { type: String, require: true },
    status: { type: String, require: true },
    dateCreate: { type: Date, require: true },
    dueDate: { type: Date, require: true },
    score: {type: Number , require: true},
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes',
        required: true,
    },
    submit: [
        {
            students: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Students',
                required: true,
            },
            score: {type: Number , require: true},
            status: {type: String , require: true},
            submissionDate: {type: Date , require: true},
            description: {type: String , require: true}
        }
    ]
});

export const HomeworksModel = mongoose.model("Homeworks", HomeworksSchema);

export const getHomeworks = () => HomeworksModel.find().populate('class').populate('submit.students');
export const findHomeworkById = (id: string) => 
  HomeworksModel.findById(id)
    .populate('class')
    .populate({
      path: 'submit.students',
      populate: {
        path: 'classRoom',
        model: 'ClassRooms' // ชื่อ model ที่ใช้ตอน export
      }
    });
export const createHomework = (values: Record<string, any>) => new HomeworksModel(values).save().then((homework) => homework.toObject());
export const deleteHomeworkById = (id: string) => HomeworksModel.findOneAndDelete({ _id: id });
export const updateHomeworkById = (id: string, values: Record<string, any>) => HomeworksModel.findByIdAndUpdate(id, values);

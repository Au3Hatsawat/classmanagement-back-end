import mongoose from "mongoose";

const ClassRoomsSchema = new mongoose.Schema({
    classRoomsCode: {type: String, require: true},
    status: { type: String, require: true },
    dateCreate: { type: Date, require: true },
});

export const ClassRoomsModel = mongoose.model("ClassRooms", ClassRoomsSchema);

export const getClassRooms = () => ClassRoomsModel.find();
export const getClassRoomsById = (id: string) => ClassRoomsModel.findById(id);
export const createClassRoom = (values: Record<string, any>) => new ClassRoomsModel(values).save().then((classRoom) => classRoom.toObject());
export const deleteClassRoomById = (id: string) => ClassRoomsModel.findOneAndDelete({ _id: id });
export const updateClassRoomById = (id: string, values: Record<string, any>) => ClassRoomsModel.findByIdAndUpdate(id, values);

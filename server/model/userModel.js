import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    idNumber: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    isDeveloper: { type: Boolean, default: false },
    description: { type: String, default: "" },
    area: { type: String, default: "" },
});

const User = mongoose.model("Employee", userSchema);

export default User;

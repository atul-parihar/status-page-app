import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organization: { type: String, required: true },
    role: { type: String, enum: ['admin', 'incident_adder', 'viewer'], default: 'viewer' },
  }, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
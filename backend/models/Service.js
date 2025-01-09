import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Operational', 'Degraded Performance', 'Partial Outage', 'Major Outage'], default: 'Operational', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);
export default Service;
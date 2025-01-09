import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Open', 'Resolved', 'Investigating', 'Monitoring'], 
    default: 'Open',
    required: true
  },
  associatedService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Incident = mongoose.model('Incident', IncidentSchema);
export default Incident;

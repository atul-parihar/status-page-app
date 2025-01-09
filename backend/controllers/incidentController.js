import Incident from '../models/Incident.js';

const createIncident = async (req, res) => {
    const { title, description, status, associatedService } = req.body;
    const { id: userId } = req.user;
    try {
        const incident = await Incident.create({ title, description, status, associatedService, createdBy: userId });
        res.status(201).json({ message: 'Incident created successfully', incident });
    } catch (err) {
        res.status(500).json({ message: 'Incident creation failed', error: err.message });
    }
};

const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find({ createdBy: req.user.id })
            .populate('associatedService')
            .populate('createdBy');
        res.status(200).json(incidents);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch incidents', error: err.message });
    }
};

const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find()
            .populate('associatedService')
            .populate('createdBy');
        res.status(200).json(incidents);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch incidents', error: err.message });
    }
};

const updateIncident = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const incident = await Incident.findOneAndUpdate(
            { _id: id },
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found or unauthorized' });
        }

        res.status(200).json({ message: 'Incident updated successfully', incident });
    } catch (err) {
        res.status(500).json({ message: 'Incident update failed', error: err.message });
    }
};

const deleteIncident = async (req, res) => {
    const { id } = req.params;

    try {
        const incident = await Incident.findOneAndDelete({ _id: id });

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found or unauthorized' });
        }

        res.status(200).json({ message: 'Incident deleted successfully', incident });
    } catch (err) {
        res.status(500).json({ message: 'Incident deletion failed', error: err.message });
    }
};

export { createIncident, getIncidents, getAllIncidents, updateIncident, deleteIncident };

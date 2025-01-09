import Service from '../models/Service.js';
import Incident from '../models/Incident.js';

const createService = async (req, res) => {
    const { name, status } = req.body;
    const { id: userId } = req.user;

    try {
        const service = await Service.create({ name, status, createdBy: userId });
        res.status(201).json({ message: 'Service created successfully', service });
    } catch (err) {
        res.status(500).json({ message: 'Service creation failed', error: err.message });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await Service.find({ createdBy: req.user.id }).populate('createdBy');
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch services', error: err.message });
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('createdBy');
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch services', error: err.message });
    }
};

const updateService = async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const service = await Service.findOneAndUpdate(
            { _id: id },
            { name, status },
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found or unauthorized' });
        }

        res.status(200).json({ message: 'Service updated successfully', service });
    } catch (err) {
        res.status(500).json({ message: 'Service update failed', error: err.message });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        // First, delete the related incidents
        await Incident.deleteMany({ associatedService: id });

        // Now, delete the service
        const service = await Service.findOneAndDelete({ _id: id });

        if (!service) {
            return res.status(404).json({ message: 'Service not found or unauthorized' });
        }

        // Return a success response
        res.status(200).json({ message: 'Service and related incidents deleted successfully', service });
    } catch (err) {
        res.status(500).json({ message: 'Service deletion failed', error: err.message });
    }
};


export { createService, getServices, getAllServices, updateService, deleteService };

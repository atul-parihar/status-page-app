import express from 'express';
import { 
    createIncident, 
    getAllIncidents, 
    getIncidents, 
    updateIncident, 
    deleteIncident 
} from '../controllers/incidentController.js';
import authMiddleware from '../utils/authMiddleware.js';
import authorizeRoles from '../utils/roleAuthMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, authorizeRoles(['admin', 'incident_adder']), createIncident);
router.get('/', authMiddleware, authorizeRoles(['admin', 'incident_adder']), getIncidents);
router.get('/public', getAllIncidents);
router.put('/:id', updateIncident);
router.delete('/:id', deleteIncident);

export default router;

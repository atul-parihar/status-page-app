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
router.put('/:id', authMiddleware, authorizeRoles(['admin', 'incident_editor']), updateIncident);
router.delete('/:id', authMiddleware, authorizeRoles(['admin', 'incident_editor']), deleteIncident);

export default router;

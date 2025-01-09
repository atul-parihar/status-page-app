import express from 'express';
import { 
    createService, 
    getAllServices, 
    getServices, 
    updateService, 
    deleteService 
} from '../controllers/serviceController.js';
import authMiddleware from '../utils/authMiddleware.js';
import authorizeRoles from '../utils/roleAuthMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, authorizeRoles(['admin']), createService);
router.get('/', authMiddleware, authorizeRoles(['admin', 'incident_adder']), getServices);
router.get('/public', getAllServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;

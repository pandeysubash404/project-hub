//routes

import express from 'express';
import { getOrganizationById, getAllOrganizations } from '../controllers/organizations';

const router = express.Router();

//import organizationsController from 'controllers/organizations';
//const router = express.Router();
// // GET /api/organizations/:orgId
//router.get('/:orgId', organizationsController.getOrganizationById);

// GET /api/organizations/:orgId
router.get('/:orgId', getOrganizationById);

// GET /api/organizations
router.get('/', getAllOrganizations);

export default router;

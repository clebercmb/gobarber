import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// SoC: Separation of Concerns
// Route: It must concerns only in receiving the request, calls another file and return a response

// POST http://localhost:3333/sessions
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;

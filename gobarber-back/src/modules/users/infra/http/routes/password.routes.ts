// SoC: Separation of Concerns
// Route: It must concerns only in receiving the request, calls another file and return a response

// POST http://localhost:3333/forgot

import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('forgot', forgotPasswordController.create);

passwordRouter.post('reset', resetPasswordController.create);

export default passwordRouter;

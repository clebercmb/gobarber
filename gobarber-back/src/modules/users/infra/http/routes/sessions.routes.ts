import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';
import { Router } from 'express';

const sessionsRouter = Router();

// SoC: Separation of Concerns
// Rota: It must concerns only in receives the request, calls another file and return a response

// POST http://localhost:3333/sessions
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUser = new AuthenticatedUserService();

  const { user, token } = await authenticationUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;

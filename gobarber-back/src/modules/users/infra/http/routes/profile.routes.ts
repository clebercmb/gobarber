import { celebrate, Joi, Segments } from 'celebrate';
import Router from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

// from this moment on, all profile routes will not be accessible if the user is no logged in.
// and the accessible routes will have access to the logged user
profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRoutes;

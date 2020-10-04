import Router from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

// from this moment on, all profile routes will not be accessible if the user is no logged in.
// and the accessible routes will have access to the logged user
profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;

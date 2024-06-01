import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = express.Router();

routes.post('/api/register', User_Controller.register);
routes.post('/api/login', User_Controller.login);

routes.get('/api/users', authentication, User_Controller.getAllUser);
routes.get('/api/user/:id', authentication, User_Controller.getuserById);
routes.put('/api/edit/user', authentication, User_Controller.updateUser);

routes.delete('/api/delete/:id', authentication, userAuthorization, User_Controller.deleteUser);

routes.get('/api/movies/title', Movies_Controller.getMoviesByTitle);
routes.get('api/movies?', Movies_Controller.getAllMovies);
routes.get('api/movies/:id', Movies_Controller.getMoviesById); 

routes.post('api/movies/post', adminAuthorization, multerMiddleware, Movies_Controller.createMovies);
routes.put('api/movies/update/:id', adminAuthorization, multerMiddleware, Movies_Controller.updateMovies);
routes.delete('api/movies/delete/:id', adminAuthorization, Movies_Controller.deleteMovies);

export {    routes,
}
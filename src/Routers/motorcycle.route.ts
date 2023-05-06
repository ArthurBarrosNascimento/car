import { Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const motRoutes = Router();

motRoutes.post('/', (req, res, next) => new MotorcycleController(req, res, next).createMot());
motRoutes.get('/', (req, res, next) => new MotorcycleController(req, res, next).findAll());
motRoutes.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).findById());
motRoutes.put('/:id', (req, res, next) => new MotorcycleController(req, res, next).updateMotById());

export default motRoutes;
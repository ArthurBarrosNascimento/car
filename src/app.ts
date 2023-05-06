import express from 'express';
import carRoutes from './Routers/car.route';
import motRoutes from './Routers/motorcycle.route';

const app = express();

app.use(express.json());

app.use('/cars', carRoutes);
app.use('/motorcycles', motRoutes);

export default app;

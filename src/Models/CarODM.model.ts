import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM.model';
import ICar from '../Interfaces/ICar';

export default class CarORM extends AbstractODM<ICar> {
  constructor() {
    const CarSchema = new Schema<ICar>({
      model: { type: 'String', required: true },
      year: { type: 'Number', required: true },
      color: { type: 'String', required: true },
      status: { type: 'boolean', default: false },
      buyValue: { type: 'Number', required: true },
      doorsQty: { type: 'Number', required: true },
      seatsQty: { type: 'Number', required: true },
    });
    super(CarSchema, 'cars');
  }
}

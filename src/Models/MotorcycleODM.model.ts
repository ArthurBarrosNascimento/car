import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleORM extends AbstractODM<IMotorcycle> {
  constructor() {
    const Motorcycle = new Schema<IMotorcycle>({
      model: { type: 'String', required: true },
      year: { type: 'Number', required: true },
      color: { type: 'String', required: true },
      status: { type: 'boolean', default: false },
      buyValue: { type: 'Number', required: true },
      category: { type: 'String', required: true },
      engineCapacity: { type: 'Number', required: true },
    });
    super(Motorcycle, 'motorcycles');
  }
}

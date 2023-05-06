import { Types } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleORM from '../Models/MotorcycleODM.model';
import Motorcycle from '../Domains/Motorcycle';

const ERRO_NOT_FOUND = 'Motorcycle not found';
const ERRO_INVALID_ID = 'Invalid mongo id';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle({
        id: motorcycle.id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      });
    }
     
    return null;
  }

  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error(ERRO_INVALID_ID);
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleORM = new MotorcycleORM();
    const newmotorcycle = await motorcycleORM.create(motorcycle);
    return this.createMotorcycleDomain(newmotorcycle);
  }

  public async findAll() {
    const motorcycleORM = new MotorcycleORM();
    const allmotorcycles = await motorcycleORM.findAll();
    return allmotorcycles.map(this.createMotorcycleDomain);
  }

  public async findById(id: string) {
    this.validateId(id);
    const motorcycleORM = new MotorcycleORM();
    const motorcycleFound = await motorcycleORM.findById(id);
    if (!motorcycleFound) throw new Error(ERRO_NOT_FOUND);
    return this.createMotorcycleDomain(motorcycleFound);
  }

  public async updateMotorcycleById(id: string, motorcycle: IMotorcycle) {
    this.validateId(id);
    const motorcycleORM = new MotorcycleORM();
    const updatemotorcycle = await motorcycleORM.updateOne(id, motorcycle);
    if (!updatemotorcycle) throw new Error(ERRO_NOT_FOUND);
    return this.createMotorcycleDomain(updatemotorcycle);
  } 
}
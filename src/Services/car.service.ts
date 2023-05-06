import { Types } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarORM from '../Models/CarODM.model';
import Car from '../Domains/Car';

const ERRO_NOT_FOUND = 'Car not found';
const ERRO_INVALID_ID = 'Invalid mongo id';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    }
     
    return null;
  }

  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error(ERRO_INVALID_ID);
  }

  public async createCar(car: ICar) {
    const carORM = new CarORM();
    const newCar = await carORM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carORM = new CarORM();
    const allCars = await carORM.findAll();
    return allCars.map(this.createCarDomain);
  }

  public async findById(id: string) {
    this.validateId(id);
    const carORM = new CarORM();
    const carFound = await carORM.findById(id);
    if (!carFound) throw new Error(ERRO_NOT_FOUND);
    return this.createCarDomain(carFound);
  }
}
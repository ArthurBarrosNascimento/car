import ICar from '../Interfaces/ICar';
import CarORM from '../Models/CarODM.model';
import Car from '../Domains/Car';

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

  public async createCar(car: ICar) {
    const carORM = new CarORM();
    const newCar = await carORM.create(car);
    return this.createCarDomain(newCar);
  }
}
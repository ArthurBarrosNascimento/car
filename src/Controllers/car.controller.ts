import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/car.service';

const ERRO_INVALID_ID = 'Invalid mongo id';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createCar() {
    try {
      const car: ICar = this.req.body;
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.res.status(400).json('invalid fields');
    }
  }

  public async findAll() {
    try {
      const allCars = await this.service.findAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.res.status(500).json('erro banco');
    }
  }

  public async findById() {
    try {
      const { id: carId } = this.req.params;
      const carFound = await this.service.findById(carId);
      return this.res.status(200).json(carFound);
    } catch (error) {
      const { message } = error as Error;
      if (message === ERRO_INVALID_ID) {
        return this.res.status(422).json({ message });
      }
      return this.res.status(404).json({ message });
    }
  }

  public async updateCarById() {
    try {
      const { id: carId } = this.req.params;
      const carInfo = this.req.body;
      const carUpdated = await this.service.updateCarById(carId, carInfo);
      return this.res.status(200).json(carUpdated);
    } catch (error) {
      const { message } = error as Error;
      if (message === ERRO_INVALID_ID) {
        return this.res.status(422).json({ message });
      }
      return this.res.status(404).json({ message });
    }
  }
}
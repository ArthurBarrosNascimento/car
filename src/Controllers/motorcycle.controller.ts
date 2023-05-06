import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IMotorcycleService from '../Services/motorcycle.service';

const ERRO_INVALID_ID = 'Invalid mongo id';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: IMotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new IMotorcycleService();
  }

  public async createMot() {
    try {
      const mot: IMotorcycle = this.req.body;
      const newMot = await this.service.createMotorcycle(mot);
      return this.res.status(201).json(newMot);
    } catch (error) {
      return this.res.status(400).json('invalid fields');
    }
  }

  public async findAll() {
    try {
      const allMots = await this.service.findAll();
      return this.res.status(200).json(allMots);
    } catch (error) {
      return this.res.status(500).json('erro banco');
    }
  }

  public async findById() {
    try {
      const { id: motId } = this.req.params;
      const motFound = await this.service.findById(motId);
      return this.res.status(200).json(motFound);
    } catch (error) {
      const { message } = error as Error;
      if (message === ERRO_INVALID_ID) {
        return this.res.status(422).json({ message });
      }
      return this.res.status(404).json({ message });
    }
  }

  public async updateMotById() {
    try {
      const { id: motId } = this.req.params;
      const motInfo = this.req.body;
      const motUpdated = await this.service.updateMotorcycleById(motId, motInfo);
      return this.res.status(200).json(motUpdated);
    } catch (error) {
      const { message } = error as Error;
      if (message === ERRO_INVALID_ID) {
        return this.res.status(422).json({ message });
      }
      return this.res.status(404).json({ message });
    }
  }
}
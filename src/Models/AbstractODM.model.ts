import { Model, Schema, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(modelName, schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
}

export default AbstractODM;
import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/motorcycle.service';

import { motoBody, motoResult, motoResultModel } from './mocks/motorcycle.mock';

describe('testa a camada carService', function () {
  it('Testa se adiconar carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(motoResultModel);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motoBody);

    expect(result).to.be.deep.equal(motoResult);
  });
  
  it('Testa se falha ao adicionar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motoBody);

    expect(result).to.be.deep.equal(null);
  });

  it(
    'Testa se falha, retornar "Invalid mongo id" ao tentar procurar uma moto pelo id',
    async function () {
      try {
        const service = new MotorcycleService();
        await service.findById('**&&¨&&&**#$#%%#%#&@%@#&#@*#');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  it('Testa se falha ao procurar uma moto por um id que não existe', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.findById('6348513f34c397abcad040b2');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Testa se econtra uma moto pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motoResultModel);

    const service = new MotorcycleService();
    const result = await service.findById('6348513f34c397abcad040b2');

    expect(result).to.be.deep.equal(motoResult);
  });

  it('Testa se retorna todas as motos', async function () {
    sinon.stub(Model, 'find').resolves([motoResultModel]);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal([motoResult]);
  });

  it('Testa se atualiza uma moto com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});
    try {
      const service = new MotorcycleService();
      await service.updateMotorcycleById('644adf038878d8e18c0a49f3', motoBody);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
  afterEach(function () {
    sinon.restore();
  });
});
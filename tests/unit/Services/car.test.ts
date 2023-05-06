import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/car.service';

import { carBody, carResultModel, carResult } from './mocks/car.mock';

describe('testa a camada carService', function () {
  it('Testa se adiconar carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carResultModel);

    const service = new CarService();
    const result = await service.createCar(carBody);

    expect(result).to.be.deep.equal(carResult);
  });

  it('Testa se falha ao adicionar um carro', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const service = new CarService();
    const result = await service.createCar(carBody);

    expect(result).to.be.deep.equal(null);
  });

  it(
    'Testa se falha retorna "Invalid mongo id" ao tentar procurar um carro pelo id',
    async function () {
      try {
        const service = new CarService();
        await service.findById('**&&¨&&&**#$#%%#%#&@%@#&#@*#');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  it('Testa se falha ao procurar um carro por um id que não existe', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.findById('64499232f75a1d20be2cd47d');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Testa se econtra um carro pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(carResultModel);

    const service = new CarService();
    const result = await service.findById('64499232f75a1d20be2cd47d');

    expect(result).to.be.deep.equal(carResult);
  });
  it('Testa se retorna todos os carros', async function () {
    sinon.stub(Model, 'find').resolves([carResultModel]);

    const service = new CarService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal([carResult]);
  });

  it('Testa se atualiza um carro com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});
    try {
      const service = new CarService();
      await service.updateCarById('64499232f75a1d20be2cd47d', carBody);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
  afterEach(function () {
    sinon.restore();
  });
});
import IVehicle from './IVehicle';

export default interface IMotorcycle extends IVehicle{
  category: string | 'Street' | 'Custon' | 'Trail';
  engineCapacity: number;
} 
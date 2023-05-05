import IVehicle from './vehicle.interface';

export default interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}
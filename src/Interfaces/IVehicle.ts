export default interface IVehicle {
  id?: number | undefined;
  model: string;
  year: number;
  color: string;
  status?: boolean | false;
  buyValue: number;
}
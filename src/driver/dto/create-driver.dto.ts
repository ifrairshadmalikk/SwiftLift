export class CreateDriverDto {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly licenseNumber: string;
  readonly vehicleType?: string;
  readonly vehicleModel?: string;
  readonly vehiclePlate?: string;
}

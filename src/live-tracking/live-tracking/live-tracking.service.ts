import { Injectable } from '@nestjs/common';

interface Location {
  lat: number;
  lng: number;
  timestamp: Date;
}

@Injectable()
export class LiveTrackingService {
  private driverLocations: Map<string, Location> = new Map();

  async updateLocation(driverId: string, lat: number, lng: number) {
    this.driverLocations.set(driverId, { lat, lng, timestamp: new Date() });
  }

  async getDriverLocation(driverId: string) {
    return this.driverLocations.get(driverId);
  }

  async getAllDrivers() {
    return Array.from(this.driverLocations.entries());
  }
}

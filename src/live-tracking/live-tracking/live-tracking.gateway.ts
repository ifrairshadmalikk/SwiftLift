import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LiveTrackingService } from './live-tracking.service';

@WebSocketGateway({
  cors: {
    origin: '*', // TODO: restrict for production
  },
})
export class LiveTrackingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly liveTrackingService: LiveTrackingService) {}

  // Track connected users by roles
  private connectedDrivers: Map<string, string> = new Map(); // driverId → socketId
  private connectedGuardians: Map<string, string> = new Map(); // guardianId → socketId
  private connectedPassengers: Map<string, string> = new Map(); // passengerId → socketId

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Clean up disconnected users
    for (const [driverId, socketId] of this.connectedDrivers.entries()) {
      if (socketId === client.id) this.connectedDrivers.delete(driverId);
    }
    for (const [guardianId, socketId] of this.connectedGuardians.entries()) {
      if (socketId === client.id) this.connectedGuardians.delete(guardianId);
    }
    for (const [passengerId, socketId] of this.connectedPassengers.entries()) {
      if (socketId === client.id) this.connectedPassengers.delete(passengerId);
    }
  }

  // ✅ When a user joins (Driver, Passenger, or Guardian)
  @SubscribeMessage('joinTracking')
  handleJoin(
    @MessageBody()
    data: { userId: string; role: 'driver' | 'guardian' | 'passenger' },
    @ConnectedSocket() client: Socket,
  ) {
    const { userId, role } = data;

    if (role === 'driver') this.connectedDrivers.set(userId, client.id);
    if (role === 'guardian') this.connectedGuardians.set(userId, client.id);
    if (role === 'passenger') this.connectedPassengers.set(userId, client.id);

    console.log(`${role} (${userId}) joined tracking: ${client.id}`);
  }

  // ✅ When driver sends location
  @SubscribeMessage('driverLocation')
  async handleDriverLocation(
    @MessageBody()
    data: {
      driverId: string;
      lat: number;
      lng: number;
      passengerIds: string[]; // passengers linked to this driver
      guardianIds: string[]; // guardians linked to those passengers
    },
  ) {
    const { driverId, lat, lng, passengerIds, guardianIds } = data;

    await this.liveTrackingService.updateLocation(driverId, lat, lng);

    // Notify passengers
    passengerIds.forEach((pid) => {
      const socketId = this.connectedPassengers.get(pid);
      if (socketId) {
        this.server.to(socketId).emit('locationUpdate', { driverId, lat, lng });
      }
    });

    // Notify guardians
    guardianIds.forEach((gid) => {
      const socketId = this.connectedGuardians.get(gid);
      if (socketId) {
        this.server.to(socketId).emit('locationUpdate', { driverId, lat, lng });
      }
    });
  }
}

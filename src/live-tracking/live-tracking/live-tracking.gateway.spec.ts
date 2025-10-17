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
    origin: '*', // TODO: restrict in production
  },
})
export class LiveTrackingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly liveTrackingService: LiveTrackingService) {}

  // When a driver sends location
  @SubscribeMessage('driverLocation')
  async handleDriverLocation(
    @MessageBody() data: { driverId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    // save last location
    await this.liveTrackingService.updateLocation(data.driverId, data.lat, data.lng);

    // broadcast to passengers/guardians tracking this driver
    this.server.emit(`locationUpdate:${data.driverId}`, data);
  }

  // When a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // When a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}

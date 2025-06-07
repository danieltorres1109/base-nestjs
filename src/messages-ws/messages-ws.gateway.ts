import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/core/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // Emitir eventos a todos los clientes conectados
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payLoad: JwtPayload;
    try {
      payLoad = this.jwtService.verify<JwtPayload>(token);
      await this.messagesWsService.registerClient(client, payLoad.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  // Emite unicamente al cliente, no a todos
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // client.emit('message-from-server', {
    //   fullName: 'soy yyo',
    //   message: payload.message || 'no messagek',
    // });

    // client.broadcast.emit('message-from-server', {
    //   fullName: 'soy yyo',
    //   message: payload.message || 'no messagek',
    // });
    //
    //
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.geUserFullName(client.id),
      message: payload.message || 'no messagek',
    });
  }
}

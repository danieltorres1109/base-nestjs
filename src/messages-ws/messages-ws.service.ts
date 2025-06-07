import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/core/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClient {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClient = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>,
  ) {}

  async registerClient(client: Socket, userID: string) {
    const user = await this.userRepositoy.findOneBy({ id: userID });
    if (!user) throw new Error(`User with ID ${userID} not found.`);

    this.connectedClients[client.id] = {
      socket: client,
      user: user,
    };
  }

  removeClient(clientId: string): void {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  geUserFullName(socketId: string) {
    const client = this.connectedClients[socketId].user.fullName;
    return client;
  }
}

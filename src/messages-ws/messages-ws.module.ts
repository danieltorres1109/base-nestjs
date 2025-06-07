import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule],
})
export class MessagesWsModule {}

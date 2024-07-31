import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [ReportesController],
  providers: [],
  imports: [NatsModule],
})
export class ReportesModule {}

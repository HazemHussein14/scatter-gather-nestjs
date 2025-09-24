import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Provider1Service } from './provider1.service';
import { Provider2Service } from './provider2.service';

@Module({
  imports: [HttpModule.register({ timeout: 10000 })],
  providers: [Provider1Service, Provider2Service],
  exports: [Provider1Service, Provider2Service],
})
export class ProvidersModule {}

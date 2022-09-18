import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AeropuertoAerolineaModule } from './aeropuerto-aerolinea/aeropuerto-aerolinea.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from './aeropuerto/aeropuerto.entity';
import { Aerolinea } from './aerolinea/aerolinea.entity';

@Module({
  imports: [AerolineaModule, AeropuertoModule, AeropuertoAerolineaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [Aerolinea, Aeropuerto],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

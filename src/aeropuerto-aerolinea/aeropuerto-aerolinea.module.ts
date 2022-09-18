import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from 'src/aerolinea/aerolinea.entity';
import { Aeropuerto } from 'src/aeropuerto/aeropuerto.entity';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aerolinea,Aeropuerto])],
  providers: [AeropuertoAerolineaService]
})
export class AeropuertoAerolineaModule {}

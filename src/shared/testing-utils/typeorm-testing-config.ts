/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from '../../aeropuerto/aeropuerto.entity';
import { Aerolinea } from '../../aerolinea/aerolinea.entity';


export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Aeropuerto,Aerolinea],
    synchronize: true,
    keepConnectionAlive: true 
  }),
  TypeOrmModule.forFeature([Aeropuerto,Aerolinea]),
];

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Aerolinea } from '../aerolinea/aerolinea.entity';
import { Aeropuerto } from '../aeropuerto/aeropuerto.entity';


@Injectable()
export class AeropuertoAerolineaService {
    constructor(
        @InjectRepository(Aeropuerto)
        private readonly aeropuertoRepository: Repository<Aeropuerto>,
     
        @InjectRepository(Aerolinea)
        private readonly aerolineaRepository: Repository<Aerolinea>
    ) {}

    async addAirportToAirline(aerolineaId: string, aeropuertoId: string,): Promise<Aerolinea> {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea)
          throw new BusinessLogicException('La aerolinea no existe',BusinessError.NOT_FOUND);
    
        const aeropuerto= await this.aeropuertoRepository.findOne({
          where: { id: aeropuertoId },
        });
        if (!aeropuerto)
          throw new BusinessLogicException('El aeropuerto no existe',BusinessError.NOT_FOUND);
    
        aerolinea.aeropuertos = [...aerolinea.aeropuertos, aeropuerto];
        return await this.aerolineaRepository.save(aerolinea);
      }

      async findAirportsFromAirline(aerolineaId: string): Promise<Aeropuerto[]> {
        const aerolinea  = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea)
          throw new BusinessLogicException('La aerolinea no existe',BusinessError.NOT_FOUND);
    
        return aerolinea.aeropuertos;
      }
      
      async findAirportFromAirline(aerolineaId: string,aeropuertoId: string): Promise<Aeropuerto> {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea)
          throw new BusinessLogicException('La aerolinea no existe',BusinessError.NOT_FOUND);
    
        const aeropuerto = await this.aeropuertoRepository.findOne({
          where: { id: aeropuertoId },
        });
        if (!aeropuerto)
          throw new BusinessLogicException('El aeropuerto no existe',BusinessError.NOT_FOUND);

        const aeropuertoAerolinea = aerolinea.aeropuertos.find((e) => e.id === aeropuerto.id);
    
        if (!aeropuertoAerolinea)
          throw new BusinessLogicException('El aeropuerto no existe en el cubrimiento de la aerolinea',BusinessError.PRECONDITION_FAILED);
    
        return aeropuertoAerolinea;
      }

      async updateAirportsFromAirline(aerolineaId: string, aeropuertos: Aeropuerto[]): Promise<Aerolinea[]> {
        const aerolinea =  await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea)
          throw new BusinessLogicException('La aerolinea no existe',BusinessError.NOT_FOUND);
    
        const updatedAeropuertos: Aerolinea[] = [];
    
        for (const aeropuertoEntity of aeropuertos) {
          const aeropuerto = await this.aeropuertoRepository.findOne({
            where: { id: aeropuertoEntity.id },
          });
          if (!aeropuerto)
             throw new BusinessLogicException('El aeropuerto no existe',BusinessError.NOT_FOUND);

          aerolinea.aeropuertos = [...aerolinea.aeropuertos, aeropuerto];
          updatedAeropuertos.push(await this.aerolineaRepository.save(aerolinea));
        }
    
        return updatedAeropuertos;
      }

      async deleteAirportFromAirline(aerolineaId: string, aeropuertoId: string) {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea)
          throw new BusinessLogicException('La aerolinea no existe',BusinessError.NOT_FOUND);
    
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where: { id: aeropuertoId },
        });
        if (!aeropuerto)
          throw new BusinessLogicException('El aeropuerto no existe',BusinessError.NOT_FOUND);
    
        const aeropuertoAerolinea = aerolinea.aeropuertos.find((e) => e.id === aeropuerto.id);
    
        if (!aeropuertoAerolinea)
          throw new BusinessLogicException('El aeropuerto no esta relacioando con la aerolinea', BusinessError.PRECONDITION_FAILED );
    
        aerolinea.aeropuertos = aerolinea.aeropuertos.filter((e) => e.id !== aeropuertoId);
        await this.aerolineaRepository.save(aerolinea);
      }
}

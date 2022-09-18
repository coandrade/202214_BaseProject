import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Aerolinea } from './aerolinea.entity';


@Injectable()
export class AerolineaService {
    constructor(
        @InjectRepository(Aerolinea)
        private readonly aerolineaRepository: Repository<Aerolinea>
      ) {}

      async findAll(): Promise<Aerolinea[]> {
        
        return await this.aerolineaRepository.find({
            relations: ["aeropuertos"]
        });
      }

      async findOne(id: string): Promise<Aerolinea> {
        const aerolinea = await this.aerolineaRepository.findOne({
            where: {id}, relations: ["aeropuertos"] 
        });
        if (!aerolinea) {
          throw new BusinessLogicException("La aerolinea no existe", BusinessError.NOT_FOUND);       
        }  
        return aerolinea;
      }

      async create(aerolinea: Aerolinea): Promise<Aerolinea> {
        var fecha = new Date(Date.now());
        if (new Date(aerolinea.fechaFundacion) >= fecha) 
            throw new BusinessLogicException("La fecha de fundacion es mayor a la fecha actual", BusinessError.BAD_REQUEST);
        
        return await this.aerolineaRepository.save(aerolinea);
      }

      async update(id: string, aerolinea: Aerolinea): Promise<Aerolinea> {
        const aerolineaExiste = await this.aerolineaRepository.findOne({
          where: { id }
        });
        if (!aerolineaExiste)
          throw new BusinessLogicException('La aerolinea no existe', BusinessError.NOT_FOUND);

        var fecha = new Date(Date.now());  
        if (new Date(aerolinea.fechaFundacion) >= fecha) 
            throw new BusinessLogicException("La fecha de fundacion es mayor a la fecha actual", BusinessError.BAD_REQUEST);

        return await this.aerolineaRepository.save({...aerolineaExiste,...aerolinea});
      }
      
      async delete(id: string) {
        const aerolinea = await this.aerolineaRepository.findOne({
            where:{id}
        });
        if (!aerolinea) { 
          throw new BusinessLogicException("La aerolinea no existe", BusinessError.NOT_FOUND);
        }
        await this.aerolineaRepository.remove(aerolinea);
      }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Aeropuerto } from './aeropuerto.entity';

@Injectable()
export class AeropuertoService {
    constructor(
        @InjectRepository(Aeropuerto)
        private readonly aeropuertoRepository: Repository<Aeropuerto>
      ) {}

      async findAll(): Promise<Aeropuerto[]> {
        
        return await this.aeropuertoRepository.find({
            relations: ["aerolineas"]
        });
      }

      async findOne(id: string): Promise<Aeropuerto> {
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where: {id}, relations: ["aerolineas"] 
        });
        if (!aeropuerto) {
          throw new BusinessLogicException("El aeropuerto no existe", BusinessError.NOT_FOUND);       
        }  
        return aeropuerto;
      }

      async create(aeropuerto: Aeropuerto): Promise<Aeropuerto> {
        if (aeropuerto.codigo.length != 3) 
            throw new BusinessLogicException("El codigo del aeropuerto debe tener solo 3 caracteres", BusinessError.PRECONDITION_FAILED);
        
        return await this.aeropuertoRepository.save(aeropuerto);
      }

      async update(id: string, aeropuerto: Aeropuerto): Promise<Aeropuerto> {
        const aeropuertoExiste = await this.aeropuertoRepository.findOne({
          where: { id }
        });
        if (!aeropuertoExiste)
          throw new BusinessLogicException('El aeropuerto no existe', BusinessError.NOT_FOUND);

        if (aeropuerto.codigo.length != 3) 
          throw new BusinessLogicException("El codigo del aeropuerto debe tener solo 3 caracteres", BusinessError.BAD_REQUEST);

        return await this.aeropuertoRepository.save({...aeropuertoExiste,...aeropuerto});
      }
      
      async delete(id: string) {
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where:{id}
        });
        if (!aeropuerto) { 
          throw new BusinessLogicException("La aerolinea no existe", BusinessError.NOT_FOUND);
        }
        await this.aeropuertoRepository.remove(aeropuerto);
      }      
}

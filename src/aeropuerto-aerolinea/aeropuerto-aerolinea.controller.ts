import { Controller,Delete,Get,HttpCode,Param,Post,Put, UseInterceptors,Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { AeropuertoDto } from '../aeropuerto/aeropuerto.dto';
import { Aeropuerto } from '../aeropuerto/aeropuerto.entity';

@Controller('aeropuerto-aerolinea')
export class AeropuertoAerolineaController {
    constructor(private readonly aeropuertoAerolineaService: AeropuertoAerolineaService){}


    @Post(':aeropuertoId/airports/:aerolineaId')
    async addAirportToAirline(@Param('aeropuertoId') aeropuertoId: string, @Param('aerolineaId') aerolineaId: string) {
      return await this.aeropuertoAerolineaService.addAirportToAirline(aerolineaId,aeropuertoId);
    }


    @Get(':aerolineaId/airports')
    async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: string) {
      return await this.aeropuertoAerolineaService.findAirportsFromAirline(aerolineaId);
    }
  
    @Get(':aerolineaId/airports/:aeropuertoId')
    async findAirportFromAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string) {
      return await this.aeropuertoAerolineaService.findAirportFromAirline(aerolineaId, aeropuertoId);
    }
  
  
    @Put(':aerolineaId/airports')
    async updateAirportsFromAirline(
      @Param('aerolineaId') aerolineaId: string, @Body() aeropuertoDto: AeropuertoDto[]) {
      const aeropuerto = plainToInstance(Aeropuerto, aeropuertoDto);        
      return await this.aeropuertoAerolineaService.updateAirportsFromAirline(aerolineaId,aeropuerto);
    }
  
    @Delete(':aerolineaId/airports/:aeropuertoId')
    @HttpCode(204)
    async deleteAirportFromAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string) {
      return await this.aeropuertoAerolineaService.deleteAirportFromAirline(aerolineaId,aeropuertoId);
    }
}

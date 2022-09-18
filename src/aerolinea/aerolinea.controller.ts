import { Controller,Delete,Get,HttpCode,Param,Post,Put, UseInterceptors,Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AerolineaDto } from './aerolinea.dto';
import { Aerolinea } from './aerolinea.entity';
import { AerolineaService } from './aerolinea.service';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaController {
    constructor(private readonly aerolineaService: AerolineaService) {}
    @Get()
    async findAll() {
        return await this.aerolineaService.findAll();
    }

    @Get(':aerolineaId') 
    async findOne(@Param('aerolineaId') aerolineaId: string) {
        return await this.aerolineaService.findOne(aerolineaId);
    }

    @Post()
    async create(@Body() aerolineaDto: AerolineaDto) {
        const aerolinea = plainToInstance(Aerolinea, aerolineaDto);
        return await this.aerolineaService.create(aerolinea);
    }

    @Put(':aerolineaId')
    async update(@Param('aerolineaId') aerolineaId: string, @Body() aerolineaDto: AerolineaDto) {
        const aerolinea = plainToInstance(Aerolinea, aerolineaDto);
        return await this.aerolineaService.update(aerolineaId, aerolinea);
    }

    @Delete(':aerolineaId')
    @HttpCode(204)
    async delete(@Param('aerolineaId') aerolineaId: string) {
        return await this.aerolineaService.delete(aerolineaId);
    }    

}

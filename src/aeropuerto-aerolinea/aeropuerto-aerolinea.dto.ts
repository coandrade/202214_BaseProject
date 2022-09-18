import { IsString } from 'class-validator';

export class AeropuertoAerolineaDto {

    @IsString()
    readonly idAerolinea: string;

    @IsString()
    readonly idAeropuerto: string;
}

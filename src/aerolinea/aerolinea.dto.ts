import { Type } from 'class-transformer';
import {IsDate, IsString, IsUrl} from 'class-validator';

export class AerolineaDto {

    @IsString()
    readonly nombre: string;
    @IsString()
    readonly descripcion: string;
    @IsDate()
    @Type(() =>  Date)
    readonly fechaFundacion: Date;
    @IsUrl()
    readonly paginaWeb: string;

}

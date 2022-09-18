import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,ManyToMany,JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { Aeropuerto } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class Aerolinea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
    
    @Column()
    fechaFundacion: Date;
    
    @Column()
    paginaWeb: string;

    @ManyToMany(() => Aeropuerto, aeropuerto => aeropuerto.aerolineas)
    @JoinTable()
    aeropuertos: Aeropuerto[];

}

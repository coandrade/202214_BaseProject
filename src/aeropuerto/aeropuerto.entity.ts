import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,ManyToMany,JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { Aerolinea } from "../aerolinea/aerolinea.entity";

@Entity()
export class Aeropuerto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    pais: string;

    @Column()
    ciudad: string;

    @ManyToMany(() => Aerolinea, aerolinea => aerolinea.aeropuertos)
    aerolineas: Aerolinea[];

}

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn() id: number;

    @Column() name: string;

    @Column() email: string;

    @Column({ length: 25, nullable: true }) phone: string;
}

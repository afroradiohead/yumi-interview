import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderAttribute} from './order_attribute.entity';

@Entity('meals')
export class Meal {
    @PrimaryGeneratedColumn() id: number;

    @Column({nullable: true}) name: string;

    @Column({type: 'text', nullable: true}) description: string;

    @Column({nullable: true}) image_url: string;

    @OneToMany(type => OrderAttribute, orderAttribute => orderAttribute.meal)
    @JoinColumn({ referencedColumnName: 'meal_id' })
    orderAttributes: OrderAttribute[];
}

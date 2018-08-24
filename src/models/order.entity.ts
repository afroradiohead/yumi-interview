import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderAttribute} from './order_attribute.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn() id: number;

    @Column({unsigned: true, type: 'int'}) user_id: number;

    @Column({ type: 'timestamp' }) delivery_date: string;

    @OneToMany(type => OrderAttribute, orderAttribute => orderAttribute.order)
    @JoinColumn({ referencedColumnName: 'order_id' })
    attributes: OrderAttribute[];
}

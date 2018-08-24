import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './order.entity';
import {Meal} from './meal.entity';

@Entity('order_attributes')
export class OrderAttribute {
    @PrimaryGeneratedColumn() id: number;

    @Column({unsigned: true, type: 'int'}) meal_id: number;

    @Column({unsigned: true, type: 'int'}) order_id: number;

    @Column({type: 'int'}) quantity: number;

    @ManyToOne(type => Order, order => order.attributes)
    @JoinColumn({ name: 'order_id'})
    order: Order;

    @ManyToOne(type => Meal, meal => meal.orderAttributes)
    @JoinColumn({ name: 'meal_id'})
    meal: Meal;
}

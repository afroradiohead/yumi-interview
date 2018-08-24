import {Injectable} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {Order} from './models/order.entity';
import * as moment from 'moment';
import {get} from 'lodash';

interface IFindOrdersProps {
    user_id: number | string;
    delivery_date?: string;
    per?: number | string;
    page?: number | string;
    sort?: 'delivery_date' | 'id';
    direction?: 'ASC' | 'DESC';
}

@Injectable()
export class AppService {
    constructor(
        private readonly entityManager: EntityManager,
    ) {}
  async findOrders(props: IFindOrdersProps): Promise<any> {
        const allowedSortMap = {
            delivery_date: 'o.delivery_date',
            id : 'o.id',
        };
        const allowedDirectionMap = {
            DESC: 'DESC',
            ASC: 'ASC',
        };
        const deliveryDateMoment = moment(props.delivery_date || null);
        const per = Math.floor(+props.per) || 4;
        const page = Math.max(Math.floor(+props.page), 1) || 1;
        const sort = get(allowedSortMap, props.sort, allowedSortMap.id);
        const direction = get(allowedDirectionMap, (props.direction || '').toUpperCase(), allowedDirectionMap.ASC);

        let orderQuery = this.entityManager.createQueryBuilder(Order, 'o')
          .leftJoinAndSelect('o.attributes', 'order_attributes')
          .leftJoinAndSelect('order_attributes.meal', 'meals')
          .where('o.user_id = :user_id', { user_id: props.user_id })
          .take(per)
          .skip((page - 1) * per)
          .orderBy(sort, direction);
        if (deliveryDateMoment.isValid()){
          orderQuery = orderQuery.andWhere(
              'o.delivery_date = :delivery_date',
              {delivery_date: deliveryDateMoment.format('YYYY-MM-DD')},
          );
      }

        const orders = await orderQuery.getMany();
        return orders.map(order => {
        const meals = order.attributes.map(attribute => ({
            id: attribute.meal.id,
            quantity: attribute.quantity,
            name: attribute.meal.name,
            description: attribute.meal.description,
            image_url: attribute.meal.image_url,
        }));
        return {
            id: order.id,
            delivery_date: moment(order.delivery_date).format('YYYY-MM-DD'),
            meal_count: meals.reduce((acc, meal) => acc + meal.quantity, 0),
            meals,
        };
      });
  }
}

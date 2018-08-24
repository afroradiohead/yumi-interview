import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {AppService} from '../../app.service';

@Controller()
export class OrdersController {
    constructor(private readonly appService: AppService) {}

    @Get('/api/v1/orders')
    async root(@Query() query, @Res() res) {
        const errors = [];
        if (!query.user_id) errors.push('User Id is Required');

        if (errors.length > 0){
            return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({errors});
        }
        return res.status(HttpStatus.OK).json({
            orders: await this.appService.findOrders({
                user_id: query.user_id,
                delivery_date: query.delivery_date,
                per: query.per,
                page: query.page,
                sort: query.sort,
                direction: query.direction,
            }),
        });
    }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./models/order.entity");
const moment = require("moment");
const lodash_1 = require("lodash");
let AppService = class AppService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    findOrders(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedSortMap = {
                delivery_date: 'o.delivery_date',
                id: 'o.id',
            };
            const allowedDirectionMap = {
                DESC: 'DESC',
                ASC: 'ASC',
            };
            const deliveryDateMoment = moment(props.delivery_date || null);
            const per = Math.floor(+props.per) || 4;
            const page = Math.max(Math.floor(+props.page), 1) || 1;
            const sort = lodash_1.get(allowedSortMap, props.sort, allowedSortMap.id);
            const direction = lodash_1.get(allowedDirectionMap, (props.direction || '').toUpperCase(), allowedDirectionMap.ASC);
            let orderQuery = this.entityManager.createQueryBuilder(order_entity_1.Order, 'o')
                .leftJoinAndSelect('o.attributes', 'order_attributes')
                .leftJoinAndSelect('order_attributes.meal', 'meals')
                .where('o.user_id = :user_id', { user_id: props.user_id })
                .take(per)
                .skip((page - 1) * per)
                .orderBy(sort, direction);
            if (deliveryDateMoment.isValid()) {
                orderQuery = orderQuery.andWhere('o.delivery_date = :delivery_date', { delivery_date: deliveryDateMoment.format('YYYY-MM-DD') });
            }
            const orders = yield orderQuery.getMany();
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
        });
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
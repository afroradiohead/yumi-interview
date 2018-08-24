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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const meal_entity_1 = require("./meal.entity");
let OrderAttribute = class OrderAttribute {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderAttribute.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unsigned: true, type: 'int' }),
    __metadata("design:type", Number)
], OrderAttribute.prototype, "meal_id", void 0);
__decorate([
    typeorm_1.Column({ unsigned: true, type: 'int' }),
    __metadata("design:type", Number)
], OrderAttribute.prototype, "order_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", Number)
], OrderAttribute.prototype, "quantity", void 0);
__decorate([
    typeorm_1.ManyToOne(type => order_entity_1.Order, order => order.attributes),
    typeorm_1.JoinColumn({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.Order)
], OrderAttribute.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(type => meal_entity_1.Meal, meal => meal.orderAttributes),
    typeorm_1.JoinColumn({ name: 'meal_id' }),
    __metadata("design:type", meal_entity_1.Meal)
], OrderAttribute.prototype, "meal", void 0);
OrderAttribute = __decorate([
    typeorm_1.Entity('order_attributes')
], OrderAttribute);
exports.OrderAttribute = OrderAttribute;
//# sourceMappingURL=order_attribute.entity.js.map
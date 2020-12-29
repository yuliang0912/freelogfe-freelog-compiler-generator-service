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
exports.HomeController = void 0;
const midway_1 = require("midway");
const fs_1 = require("fs");
const compiler_generator_service_1 = require("../service/compiler-generator-service");
let HomeController = class HomeController {
    async index(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();
        const options = { language, color };
        const zipPackagePath = this.compilerGeneratorService.getZipPackagePath(options);
        if (!fs_1.existsSync(zipPackagePath)) {
            await this.compilerGeneratorService.generateGrammar(options).then(antrlGrammarPath => {
                this.compilerGeneratorService.generateGrammarZip(options, './generated_grammars', antrlGrammarPath);
            }).catch(ctx.error);
        }
        ctx.body = fs_1.createReadStream(zipPackagePath);
        ctx.attachment(`${color}_${language}.zip`);
    }
    async deleteCacheGrammar(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();
        this.compilerGeneratorService.clearCacheGrammar({ language, color });
        ctx.success(true);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], HomeController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", compiler_generator_service_1.CompilerGeneratorService)
], HomeController.prototype, "compilerGeneratorService", void 0);
__decorate([
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
__decorate([
    midway_1.del('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "deleteCacheGrammar", null);
HomeController = __decorate([
    midway_1.provide(),
    midway_1.controller('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE2RDtBQUM3RCwyQkFBZ0Q7QUFDaEQsc0ZBQStFO0FBSy9FLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFRdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHO1FBQ1gsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDckYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDcEQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXJCLE1BQU0sT0FBTyxHQUFHLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDakYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLElBQUksUUFBUSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBR0QsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUc7UUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDckYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDcEQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ25FLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNKLENBQUE7QUE3Qkc7SUFEQyxlQUFNLEVBQUU7OzJDQUNXO0FBRXBCO0lBREMsZUFBTSxFQUFFOzhCQUNpQixxREFBd0I7Z0VBQUM7QUFHbkQ7SUFEQyxZQUFHLENBQUMsR0FBRyxDQUFDOzs7OzJDQWVSO0FBR0Q7SUFEQyxZQUFHLENBQUMsR0FBRyxDQUFDOzs7O3dEQU9SO0FBL0JRLGNBQWM7SUFGMUIsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsR0FBRyxDQUFDO0dBQ0gsY0FBYyxDQWdDMUI7QUFoQ1ksd0NBQWMifQ==
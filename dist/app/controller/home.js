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
const fs = require("fs");
let HomeController = class HomeController {
    async index(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();
        const options = { language, color };
        const zipPackagePath = this.compilerGeneratorService.getZipPackagePath(options);
        if (!fs.existsSync(zipPackagePath)) {
            await this.compilerGeneratorService.generateGrammar(options).then(antrlGrammarPath => {
                this.compilerGeneratorService.generateGrammarZip(options, './generated_grammar', antrlGrammarPath);
            });
        }
        ctx.body = fs.createReadStream(zipPackagePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE2RDtBQUU3RCx5QkFBeUI7QUFJekIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQU12QixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFDWCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNwRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckIsTUFBTSxPQUFPLEdBQUcsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDbEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDakYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZHLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxJQUFJLFFBQVEsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUdELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNuRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FDSixDQUFBO0FBM0JHO0lBREMsZUFBTSxFQUFFOztnRUFDMkM7QUFHcEQ7SUFEQyxZQUFHLENBQUMsR0FBRyxDQUFDOzs7OzJDQWVSO0FBR0Q7SUFEQyxZQUFHLENBQUMsR0FBRyxDQUFDOzs7O3dEQU9SO0FBN0JRLGNBQWM7SUFGMUIsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsR0FBRyxDQUFDO0dBQ0gsY0FBYyxDQThCMUI7QUE5Qlksd0NBQWMifQ==
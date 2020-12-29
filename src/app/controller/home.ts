import {inject, controller, get, del, provide} from 'midway';
import {existsSync, createReadStream} from 'fs';
import {CompilerGeneratorService} from '../service/compiler-generator-service';
import {FreelogContext} from 'egg-freelog-base';

@provide()
@controller('/')
export class HomeController {

    @inject()
    ctx: FreelogContext;
    @inject()
    compilerGeneratorService: CompilerGeneratorService;

    @get('/')
    async index(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();

        const options = {language, color};
        const zipPackagePath = this.compilerGeneratorService.getZipPackagePath(options);
        if (!existsSync(zipPackagePath)) {
            await this.compilerGeneratorService.generateGrammar(options).then(antrlGrammarPath => {
                this.compilerGeneratorService.generateGrammarZip(options, './generated_grammars', antrlGrammarPath);
            }).catch(ctx.error);
        }
        ctx.body = createReadStream(zipPackagePath);
        ctx.attachment(`${color}_${language}.zip`);
    }

    @del('/')
    async deleteCacheGrammar(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();
        this.compilerGeneratorService.clearCacheGrammar({language, color});
        ctx.success(true);
    }
}

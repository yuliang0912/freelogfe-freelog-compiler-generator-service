import {inject, controller, get, del, provide} from 'midway';
import {ICompilerGeneratorService} from '../../interface';
import * as fs from 'fs';

@provide()
@controller('/')
export class HomeController {

    @inject()
    compilerGeneratorService: ICompilerGeneratorService;

    @get('/')
    async index(ctx) {
        const language = ctx.checkQuery('language').exist().in(['Java', 'JavaScript']).value;
        const color = ctx.checkQuery('color').exist().value;
        ctx.validateParams();

        const options = {language, color};
        const zipPackagePath = this.compilerGeneratorService.getZipPackagePath(options);
        if (!fs.existsSync(zipPackagePath)) {
            await this.compilerGeneratorService.generateGrammar(options).then(antrlGrammarPath => {
                ctx.error(antrlGrammarPath);
                // this.compilerGeneratorService.generateGrammarZip(options, './generated_grammar', antrlGrammarPath);
            }).catch(ctx.error);
        }
        ctx.body = fs.createReadStream(zipPackagePath);
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

import { CompilerGeneratorService } from '../service/compiler-generator-service';
import { FreelogContext } from 'egg-freelog-base';
export declare class HomeController {
    ctx: FreelogContext;
    compilerGeneratorService: CompilerGeneratorService;
    index(ctx: any): Promise<void>;
    deleteCacheGrammar(ctx: any): Promise<void>;
}

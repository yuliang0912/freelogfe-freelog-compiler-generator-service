import { ICompilerGeneratorService } from '../../interface';
export declare class HomeController {
    compilerGeneratorService: ICompilerGeneratorService;
    index(ctx: any): Promise<void>;
    deleteCacheGrammar(ctx: any): Promise<void>;
}

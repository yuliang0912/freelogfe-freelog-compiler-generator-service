import { ICompilerGeneratorService, CommandLineOption } from '../../interface';
export declare class CompilerGeneratorService implements ICompilerGeneratorService {
    readonly compilerGeneratorJarPath = "./freelog-compiler-generator.jar";
    /**
     * 生成G4语法以及对应的语言相关parser
     * @param {CommandLineOption} options
     * @returns {Promise<string>}
     */
    generateGrammar(options: CommandLineOption): Promise<string>;
    /**
     * 压缩语法包
     * @param {CommandLineOption} options
     * @param {string} g4GrammarPath
     * @param {string} antrlGrammarParsePath
     */
    generateGrammarZip(options: CommandLineOption, g4GrammarPath: string, antrlGrammarParsePath: string): void;
    /**
     * 获取已经生成好的语法包路径
     * @param {CommandLineOption} options
     * @returns {string}
     */
    getZipPackagePath(options: CommandLineOption): string;
    /**
     * 清理缓存的G4语法和对应的语言parser
     * @param {CommandLineOption} options
     */
    clearCacheGrammar(options: CommandLineOption): void;
    /**
     * 创建目录
     * @param dirPath
     * @param args
     * @private
     */
    _createDir(dirPath: any, ...args: any[]): void;
    /**
     * 生成语法文件输出目录
     * @param {CommandLineOption} options
     * @returns {string}
     * @private
     */
    _generateGrammarOutputDir(options: CommandLineOption): string;
    /**
     * 删除目录
     * @param path
     * @private
     */
    _rmDir(path: any): void;
}

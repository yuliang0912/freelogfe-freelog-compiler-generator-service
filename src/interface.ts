export enum LanguageEnum {
    Java = 'Java',
    JavaScript = 'JavaScript'
}

export interface CommandLineOption {
    color: string;
    language: LanguageEnum;
}

export interface ICompilerGeneratorService {
    generateGrammar(options: CommandLineOption): Promise<string>;

    clearCacheGrammar(options: CommandLineOption): void;

    generateGrammarZip(options: CommandLineOption, g4GrammarPath: string, antrlGrammarParsePath: string);

    getZipPackagePath(options: CommandLineOption): string;
}

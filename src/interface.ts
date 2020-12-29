export enum LanguageEnum {
    Java = 'Java',
    JavaScript = 'JavaScript'
}

export interface CommandLineOption {
    color: string;
    language: LanguageEnum;
}

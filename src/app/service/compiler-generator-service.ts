import * as fs from 'fs';
import {provide} from 'midway';
import {exec} from 'child_process';

const admZip = require('adm-zip');
// const archiver = require('archiver');
import {ICompilerGeneratorService, CommandLineOption} from '../../interface';

@provide('compilerGeneratorService')
export class CompilerGeneratorService implements ICompilerGeneratorService {

    readonly compilerGeneratorJarPath = './freelog-compiler-generator.jar';

    /**
     * 生成G4语法以及对应的语言相关parser
     * @param {CommandLineOption} options
     * @returns {Promise<string>}
     */
    async generateGrammar(options: CommandLineOption): Promise<string> {
        const outputDir = this._generateGrammarOutputDir(options);
        const command = `java -jar ${this.compilerGeneratorJarPath} -c ${options.color} -t ${options.language} -o ${outputDir}`;

        return new Promise((resolve, reject) => {
            exec(command, function (error, stdout, stderr) {
                error || stderr ? reject(error || stderr) : resolve(stdout);
            });
        }).then(() => {
            return `${outputDir}/generated_grammar`;
        }).catch(error => {
            this._rmDir(outputDir);
            return error;
        });
    }

    /**
     * 压缩语法包
     * @param {CommandLineOption} options
     * @param {string} g4GrammarPath
     * @param {string} antrlGrammarParsePath
     */
    generateGrammarZip(options: CommandLineOption, g4GrammarPath: string, antrlGrammarParsePath: string): void {
        const localBaseDownPath = `./download-grammar-package/${options.color}/${options.language}/package`.toLowerCase();
        const localG4GrammarPath = `${localBaseDownPath}/g4_grammar`;
        this._createDir(localBaseDownPath, localG4GrammarPath);

        fs.readdirSync(antrlGrammarParsePath).forEach(file => {
            fs.copyFileSync(`${antrlGrammarParsePath}/${file}`, `${localBaseDownPath}/${file}`);
        });
        fs.readdirSync(g4GrammarPath).forEach(file => {
            fs.copyFileSync(`${g4GrammarPath}/${file}`, `${localG4GrammarPath}/${file}`);
        });

        const zip = new admZip();
        zip.addLocalFolder(localBaseDownPath);
        zip.writeZip(this.getZipPackagePath(options));

        // const output = fs.createWriteStream(`./download-grammar-package/${options.color}/${options.language}/package.zip`);
        // const archive = archiver('zip');
        // archive.pipe(output);
        // archive.on('error', console.error)
        // archive.directory(`download-grammar-package/${options.color}/${options.language}/package`, false);
        // archive.finalize();
        this._rmDir(localBaseDownPath);
    }

    /**
     * 获取已经生成好的语法包路径
     * @param {CommandLineOption} options
     * @returns {string}
     */
    getZipPackagePath(options: CommandLineOption): string {
        return `./download-grammar-package/${options.color}/${options.language}/package.zip`;
    }

    /**
     * 清理缓存的G4语法和对应的语言parser
     * @param {CommandLineOption} options
     */
    clearCacheGrammar(options: CommandLineOption): void {
        this._rmDir(this._generateGrammarOutputDir(options));
        if (fs.existsSync(this.getZipPackagePath(options))) {
            fs.unlinkSync(this.getZipPackagePath(options));
        }
    }

    /**
     * 创建目录
     * @param dirPath
     * @param args
     * @private
     */
    _createDir(dirPath, ...args) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true});
        }
        args.forEach(path => this._createDir(path));
    }

    /**
     * 生成语法文件输出目录
     * @param {CommandLineOption} options
     * @returns {string}
     * @private
     */
    _generateGrammarOutputDir(options: CommandLineOption): string {
        return `./output/${options.color}/${options.language}`.toLowerCase();
    }

    /**
     * 删除目录
     * @param path
     * @private
     */
    _rmDir(path) {
        if (!fs.existsSync(path)) {
            return;
        }
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = `${path}/${file}`;
            if (fs.statSync(curPath).isDirectory()) {
                this._rmDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

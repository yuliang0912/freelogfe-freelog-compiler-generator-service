"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerGeneratorService = void 0;
const fs = require("fs");
const midway_1 = require("midway");
const child_process_1 = require("child_process");
const admZip = require('adm-zip');
let CompilerGeneratorService = class CompilerGeneratorService {
    constructor() {
        this.compilerGeneratorJarPath = './freelog-cg-0.0.1.jar';
    }
    /**
     * 生成G4语法以及对应的语言相关parser
     * @param {CommandLineOption} options
     * @returns {Promise<string>}
     */
    async generateGrammar(options) {
        const outputDir = this._generateGrammarOutputDir(options);
        const command = `java -jar ${this.compilerGeneratorJarPath} -sn ${options.color} -t ${options.language} -o ${outputDir} -ng false`;
        return new Promise((resolve, reject) => {
            child_process_1.exec(command, function (error, stdout, stderr) {
                error || stderr ? reject(error || stderr) : resolve(stdout);
            });
        }).then(() => {
            return `${outputDir}/generated_grammars`;
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
    generateGrammarZip(options, g4GrammarPath, antrlGrammarParsePath) {
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
    getZipPackagePath(options) {
        return `./download-grammar-package/${options.color}/${options.language}/package.zip`;
    }
    /**
     * 清理缓存的G4语法和对应的语言parser
     * @param {CommandLineOption} options
     */
    clearCacheGrammar(options) {
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
            fs.mkdirSync(dirPath, { recursive: true });
        }
        args.forEach(path => this._createDir(path));
    }
    /**
     * 生成语法文件输出目录
     * @param {CommandLineOption} options
     * @returns {string}
     * @private
     */
    _generateGrammarOutputDir(options) {
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
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
CompilerGeneratorService = __decorate([
    midway_1.provide('compilerGeneratorService')
], CompilerGeneratorService);
exports.CompilerGeneratorService = CompilerGeneratorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXItZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvY29tcGlsZXItZ2VuZXJhdG9yLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLG1DQUErQjtBQUMvQixpREFBbUM7QUFFbkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBS2xDLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBQXJDO1FBRWEsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFzSGpFLENBQUM7SUFwSEc7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBMEI7UUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxDQUFDLHdCQUF3QixRQUFRLE9BQU8sQ0FBQyxLQUFLLE9BQU8sT0FBTyxDQUFDLFFBQVEsT0FBTyxTQUFTLFlBQVksQ0FBQztRQUVuSSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLG9CQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO2dCQUN6QyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsT0FBTyxHQUFHLFNBQVMscUJBQXFCLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFF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
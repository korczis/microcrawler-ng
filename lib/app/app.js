import cheerio from 'cheerio';
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import process from 'process';
import request from 'superagent';
import Table from 'cli-table';

const packageJson = require('../../package.json');

export default class App {
  listModules() {
    const table = new Table({
      head: ['Name', 'URL']
    });

    Object.keys(this.modules).forEach((moduleName) => {
      const info = this.modules[moduleName].info;
      table.push([
        info.name,
        info.url
      ]);
    });

    console.log(table.toString());
  }

  loadModules() {
    return new Promise((resolve, reject) => {
      const dir = path.resolve(__dirname, '..', 'modules');

      fs.readdir(dir, (err, data) => {
        if (err) {
          return reject(err);
        }

        const res = {};
        data.forEach((file) => {
          const fullPath = path.join(dir, file);

          const isFile = fs.lstatSync(fullPath).isFile();
          const moduleName = isFile ? file.replace('.js', '') : file;

          const module = require(fullPath);
          res[moduleName] = module;
        });

        resolve(res);
      });
    });
  }

  processResults(results) {
    console.log(JSON.stringify(results, null, 4));
  }

  run() {
    commander
      .version(packageJson.version)
      .option('-l, --list-modules', 'List supported crawlers/modules')
      .option('-t, --type [type]', 'Type of crawler to use')
      .parse(process.argv);

    this.loadModules().then((modules) => {
      this.modules = modules;

      if (commander.listModules) {
        return this.listModules();
      }

      if (!commander.args.length) {
        return commander.help();
      }

      // Check if crawler type/module name was specified
      if (!commander.type) {
        console.log('Type of crawlwer to use not specified!');
        return commander.help();
      }

      const module = modules[commander.type];
      if (!module) {
        console.log(`Invalid crawler type '${commander.type}' specified.`);
        return false;
      }

      // Process arguments
      commander.args.forEach((uri) => {
        request
          .get(uri)
          .end((err, data) => {
            if (err) {
              console.log(err);
              return;
            }

            const doc = cheerio.load(data.text);
            const res = module.listing(doc, {
              url: uri
            });

            this.processResults(res);
          });
      });
    }, (err) => {
      console.log(err);
    });
  }
};

import cheerio from 'cheerio';
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import process from 'process';
import request from 'superagent';

const packageJson = require('../../package.json');

export default class App {
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

  run() {
    commander
      .version(packageJson.version)
      .option('-t, --type [type]', 'Type of crawler to use')
      .parse(process.argv);

    if (!commander.args.length) {
      return commander.help();
    }

    if (!commander.type) {
      console.log('Type of crawlwer to use not specified!');
      return commander.help();
    }

    this.loadModules().then((modules) => {
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

            console.log(JSON.stringify(res, null, 4));
          });
      });
    }, (err) => {
      console.log(err);
    });
  }
};

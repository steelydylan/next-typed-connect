#! /usr/bin/env node
const { program } = require('commander');
const { main } = require('./lib/index.js');
const path = require('path');

program
  .option('-p, --pagesDir <dir>', '--pagesDir <path>', "pages")
  .option('-b, --baseDir <dir>', '--baseDir <path>', ".")
  .option('-d, --distDir <dir>', '--distDir <path>', "node_modules/.next-typed-connect")
  .option('-m, --moduleNameSpace <dir>', '--moduleNameSpace <path>', ".next-typed-connect")
  .option('-w, --watch', 'watch mode');
program.parse(process.argv);
const options = program.opts();
const config = {
  pagesDir: path.resolve(options.pagesDir),
  baseDir: path.resolve(options.baseDir),
  distDir: path.resolve(options.distDir),
  moduleNameSpace: options.moduleNameSpace,
}

if (options.watch) {
  const chokidar = require('chokidar');
  const watcher = chokidar.watch(options.pagesDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  watcher.on('change', async (path) => {
    console.log(`File ${path} has been changed`);
    watcher.unwatch(options.pagesDir);
    await main(config);
    watcher.add(options.pagesDir);
  });
} else {
  main(config);
}

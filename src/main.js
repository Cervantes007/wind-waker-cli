import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import ncp from 'ncp';
import shell from 'shelljs';
import { promisify } from 'util';
import { projectInstall } from 'pkg-install';

const copy = promisify(ncp);
const access = promisify(fs.access);

export async function createProject(options) {
  if (shell.exec(`mkdir ${options.name}`).code !== 0) {
    process.exit(1);
  }

  const templateDir = path.resolve(new URL(import.meta.url).pathname, '../../templates', options.template);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyTemplateFiles(options);
  console.log(`Project folder created.`);
  const spinner = ora('Installing dependencies').start();
  await projectInstall({
    cwd: options.targetDirectory,
    prefer: options.pm || 'yarn',
  });
  spinner.stop();
  const startCommand = options.pm === 'npm' ? 'npm run dev:ui' : 'yarn dev:ui';
  console.log(chalk.blue('-----------------Welcome, to get started run:---------------------'));
  console.log(`$ cd ${options.name}`);
  console.log(`$ ${startCommand}`);
  console.log(chalk.blue('                       Happy Coding!                             '));

  return true;
}

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

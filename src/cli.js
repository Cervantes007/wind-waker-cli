import inquirer from 'inquirer';
import { createProject } from './main';
import chalk from 'chalk';

export async function cli(rawArgs) {
  const args = rawArgs.splice(2);
  console.log(args);
  let name;
  if (args.length > 0) {
    name = args[0];
  }
  const options = await promptForOptions({ name });
  await createProject(options);
}

async function promptForOptions(options = {}) {
  const questions = [];

  if (!options.name) {
    questions.push({
      type: 'text',
      name: 'name',
      message: 'Please enter the project name:',
    });
  }

  questions.push({
    type: 'list',
    name: 'pm',
    message: 'Select package manager:',
    choices: ['npm', 'yarn'],
    default: 'yarn',
  });

  const answers = await inquirer.prompt(questions);
  const name = options.name || answers.name;
  if (!name) {
    console.error('%s Project name is required', chalk.red.bold('ERROR:'));
    process.exit(1);
  }
  return {
    name: name,
    pm: answers.pm,
    template: 'typescript',
    targetDirectory: options.targetDirectory || `${process.cwd()}/${name}`,
  };
}

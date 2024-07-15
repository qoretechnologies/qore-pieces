import { writeFile } from 'node:fs/promises';
import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { displayNameToCamelCase, findPieceSourceDirectory, displayNameToKebabCase } from '../utils/piece-utils';
import { checkIfFileExists, makeFolderRecursive } from '../utils/files';
import { join } from 'node:path';

function createActionTemplate(displayName: string, description: string) {
  const camelCase = displayNameToCamelCase(displayName)
  const actionTemplate = `import { createAction, Property } from '@activepieces/pieces-framework';

export const ${camelCase} = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: '${camelCase}',
  displayName: '${displayName}',
  description: '${description}',
  props: {},
  async run() {
    // Action logic here
  },
});
`;

  return actionTemplate
}
const checkIfPieceExists = async (pieceName: string) => {
  const path = await findPieceSourceDirectory(pieceName);
  if (!path) {
    console.log(chalk.red(`🚨 Piece ${pieceName} not found`));
    process.exit(1);
  }
};

const checkIfActionExists = async (actionPath: string) => {
  if (await checkIfFileExists(actionPath)) {
    console.log(chalk.red(`🚨 Action already exists at ${actionPath}`));
    process.exit(1);
  }
}
const createAction = async (pieceName: string, displayActionName: string, actionDescription: string) => {
  const actionTemplate = createActionTemplate(displayActionName, actionDescription)
  const actionName = displayNameToKebabCase(displayActionName)
  const path = await findPieceSourceDirectory(pieceName);
  await checkIfPieceExists(pieceName);
  console.log(chalk.blue(`Piece path: ${path}`))

  const actionsFolder = join(path, 'src', 'lib', 'actions')
  const actionPath = join(actionsFolder, `${actionName}.ts`)
  await checkIfActionExists(actionPath)

  await makeFolderRecursive(actionsFolder);
  await writeFile(actionPath, actionTemplate);
  console.log(chalk.yellow('✨'), `Action ${actionPath} created`);
};


export const createActionCommand = new Command('create')
  .description('Create a new action')
  .action(async () => {
    const questions = [
      {
        type: 'input',
        name: 'pieceName',
        message: 'Enter the piece folder name:',
        placeholder: 'google-drive',
      },
      {
        type: 'input',
        name: 'actionName',
        message: 'Enter the action display name',
      },
      {
        type: 'input',
        name: 'actionDescription',
        message: 'Enter the action description',
      }
    ];

    const answers = await inquirer.prompt(questions);
    createAction(answers.pieceName, answers.actionName, answers.actionDescription);
  });

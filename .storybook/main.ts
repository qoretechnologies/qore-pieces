import type { StorybookConfig } from '@storybook/react-vite';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const sourceRoot = resolve(__dirname, '../src');
    const dirs = (
      await readdir(resolve(sourceRoot), {
        withFileTypes: true,
      })
    ).filter((dirent) => dirent.isDirectory());
    const sourceRootAliases = dirs.reduce((acc, dir) => {
      const dirPath = resolve(sourceRoot, dir.name);
      return { ...acc, [dir.name]: dirPath };
    }, {});
    return mergeConfig(config, {
      define: {
        'process.env': {
          ZENDESK_DOMAIN: 'https://qorehelp.zendesk.com',
          ZENDESK_EMAIL: 'mkrtchyanastghik86@gmail.com',
          ZENDESK_API_TOKEN: 'YYQxVbSJ4hc9rIgMjlt1Bil7NtnL1siLx4AaxFdR',
        },
      },
      resolve: { alias: { ...config.resolve.alias, ...sourceRootAliases } },
    });
  },
};
export default config;

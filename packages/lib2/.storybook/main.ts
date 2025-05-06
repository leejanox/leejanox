import type { StorybookConfig } from '@storybook/react-vite';

import path, { join, dirname, resolve } from "path"
import { mergeConfig } from 'vite';
import glsl from 'vite-plugin-glsl'

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "staticDirs":['../public'],
  "addons": [
    getAbsolutePath('@storybook/addon-essentials'),
    //getAbsolutePath('@storybook/addon-onboarding'),
    //getAbsolutePath('@chromatic-com/storybook'),
    //getAbsolutePath("@storybook/experimental-addon-test")
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(glsl({
      include:[
        '**/*.glsl',
        '**/*.vs',
        '**/*.fs',
        '**/*.vert',
        '**/*.frag'
      ]
    }));
    return config;
  }
};
export default config;
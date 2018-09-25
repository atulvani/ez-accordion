import { Config } from '@stencil/core';

export const config :Config = {
  namespace: 'ezaccordion',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Usage',
      items: [
        'usage/basic-usage',
        'usage/advanced-usage',
        'usage/form-integration',
      ],
    },
    'hooks-overview',
    'styling'
  ],
};

export default sidebars;
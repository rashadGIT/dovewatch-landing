import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['next-env.d.ts', 'out/**'],
  },
];

export default eslintConfig;

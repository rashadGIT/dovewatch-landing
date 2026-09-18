import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['next-env.d.ts', 'out/**'],
  },
  {
    // eslint-config-next 16 bundles eslint-plugin-react-hooks v7's new
    // React Compiler-oriented rules; downgrade to warn rather than block
    // the build on the read-localStorage-in-an-effect-on-mount pattern
    // (see cookie-consent.tsx) — same override as frontend/eslint.config.mjs.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
];

export default eslintConfig;

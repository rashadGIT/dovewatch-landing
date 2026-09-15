import type { NextConfig } from 'next';

// Static export: this is a marketing site (no auth, no per-request data),
// served from S3+CloudFront rather than Amplify's SSR compute — see
// infrastructure/lib/stacks/landing-stack.ts for why. `output: 'export'`
// produces plain HTML/CSS/JS in `out/` with no Node server required.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // next/image's optimization API needs a server; unoptimized falls back
    // to plain <img> tags, which is fine for a static export this size.
    unoptimized: true,
  },
};

export default nextConfig;

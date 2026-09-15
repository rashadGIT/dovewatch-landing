# dovewatch-landing

Public marketing site for [dovewatch.com](https://dovewatch.com) — a static Next.js export served
from S3 + CloudFront (see `infrastructure/lib/stacks/landing-stack.ts` in the main repo). Links
back to the real app (`app.dovewatch.com`) for sign in, sign up, pricing, and contact — it doesn't
duplicate any of those flows.

## Development

```bash
npm install
npm run dev          # http://localhost:3100
npm run build         # static export to out/
npm run test          # Jest + React Testing Library
npm run test:e2e       # Playwright
```

## Deployment

Deploys automatically on push to `main` via `.github/workflows/deploy.yml` (build → `aws s3 sync`
→ CloudFront invalidation). One-time setup required before the first deploy will work:

1. `cdk bootstrap aws://887067305712/us-east-1` (CloudFront's ACM cert must live in us-east-1;
   see `LandingCertificateStack`) — if not already done.
2. `cdk deploy DoveWatchLandingCertificateStack DoveWatchLandingStack` from `/infrastructure`.
3. Copy the `LandingDeployRoleArn`, `LandingBucketName`, and `LandingDistributionId` stack outputs
   into this repo's GitHub secrets: `AWS_LANDING_DEPLOY_ROLE_ARN`, `AWS_LANDING_BUCKET_NAME`,
   `AWS_LANDING_DISTRIBUTION_ID`.
4. DNS validation for the cert may require nothing further if it's DNS-validated against the
   existing `dovewatch.com` hosted zone automatically — check the ACM console if `cdk deploy`
   hangs on `CERTIFICATE_VALIDATION`.

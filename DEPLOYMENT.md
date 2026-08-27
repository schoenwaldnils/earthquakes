# Production deployment

The site is exported as a static Next.js build and deployed to the `production/`
prefix of the configured S3 bucket. CloudFront is invalidated after a successful
sync, so the public site serves the current export.

## Triggers

- **Daily:** `00:00 UTC` (`0 0 * * *`).
- **After a merge to `main`:** a deployment runs automatically.
- **Manual recovery:** in GitHub, open **Actions → earthquakes → Run workflow**
  and select `main`.

Only one production deployment may run at a time. Queued deployments are kept,
rather than cancelling a potentially valid export already in progress.

## Required GitHub Actions secrets

| Secret | Purpose |
| --- | --- |
| `AWS_S3_BUCKET` | S3 bucket containing the static site. |
| `AWS_ACCESS_KEY_ID` | AWS credential for the deploy user. |
| `AWS_SECRET_ACCESS_KEY` | Matching secret for the deploy user. |
| `DISTRIBUTION` | CloudFront distribution ID to invalidate. |

The AWS identity must be allowed to sync the `production/` prefix in the bucket
and create invalidations for `DISTRIBUTION`. The workflow prints only the AWS
account ID as an early credential check; it does not expose credentials.

## Monitoring and recovery

- Monitor **Actions → earthquakes** for the daily scheduled run and enable GitHub
  notifications for failed workflows on this repository.
- GitHub can automatically disable scheduled workflows in inactive public
  repositories. If the workflow is shown as disabled, re-enable it in the
  Actions UI, then use **Run workflow** to confirm the AWS deployment path.
- If the AWS check, S3 sync, or CloudFront invalidation fails, repair the named
  secret or AWS permission and re-run the workflow from `main`.
- Verify the deployment by loading https://earthquakes.schoen.world/ and checking
  the visible **Aktualisiert** timestamp.

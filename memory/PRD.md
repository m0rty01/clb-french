# CLB French Trainer — Product Requirements (PRD)

## Product
A discipline-focused French learning app for CLB 5 / CLB 7 (TEF/TCF Canada) prep. Daily routines, grammar, mock tests, AI writing evaluation, progress tracking, Stripe subscriptions.

## Recently Completed
- **Stripe webhook hardening (P0, DONE):** webhook dispatched before Mongo, signature-verified, returns 400 only on bad signature, never 500. Reconciliation fallback `/api/stripe/reconcile`. (verified, 14/14 backend tests)
- CSS production issue: confirmed stale-cache, resolved by user.

## ACTIVE FEATURE — 3-Tier Subscription Model
Restructure pricing to limit API cost on lower tiers and maximize MRR.

### Tiers & Pricing (locked)
| Feature | Free ($0) | Standard ($9/mo, $79/yr) | Premium ($34/mo, $249/yr) |
|---|---|---|---|
| Daily Grammar & Vocab | Current day only | Full + Archives | Full + Archives |
| Mock Tests (Read/Listen) | 1 / 30 days | Unlimited | Unlimited |
| AI Writing Evaluations | 2 / 30 days | 15 / 30 days | Unlimited |
| AI Speaking Practice | Locked | Locked | Unlimited (Coming Soon build) |
| Analytics | Current day | Full trends | Deep diagnostics |
| Processing priority | Standard | Standard | Fast queue |

### Decisions / Assumptions (proceeding)
- AI Speaking Practice: **BUILT** (no new keys — reuses GEMINI_API_KEY for audio STT+eval). Endpoints + `/dashboard/speaking` recorder page. Premium-gated.
- Legacy: existing $9 subscribers → mapped to **Standard** + legacy banner (180-day unlimited writing). Launch date = 2026-06-01.
- Rate limiting: **MongoDB-backed** app-level (Free 1/min, Standard 5/min, Premium 20/min) on AI endpoints.
- Stripe: dynamic `price_data` with new amounts (no dashboard product setup). Webhook sets tier from `metadata.tier`.

### Usage tracking
- 30-day rolling cycle anchored at `subscriptionStartDate` (paid) or `createdAt` (free).
- Usage = count of records in current cycle (`writing_evaluations`, `test_results`); inserted only on success → no decrement on LLM failure.
- New endpoint `GET /api/usage` returns remaining counts + cycle info for dashboard counters.

### Phase rollout
1. Backend: 3-tier limits config, 30-day cycle helpers, enforce writing (2/15/∞) + mock tests (1/∞/∞), speaking gate, `/usage`, legacy flag, rate limiting. — IN PROGRESS
2. Stripe: new price keys (standard/premium × monthly/yearly), checkout + webhook tier mapping.
3. Frontend: 3-tier pricing page + monthly/annual toggle, dashboard banner/modal, usage counters, legacy banner, speaking "Coming Soon" gate.
4. Test + deploy.

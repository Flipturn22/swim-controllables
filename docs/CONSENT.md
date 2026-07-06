# Consent & privacy framework (v0.1)

**Purpose:** Separate “use Off Deck for me” from “help build anonymized research”—so swimmers and parents stay in control while the backend can eventually support real cohort analytics.

**Audience:** Swimmers (HS+), parents (including managing younger athletes), and later coaches (read-only, opt-in only).

---

## What you’re building toward (plain language)

Off Deck logs what swimmers control **outside the pool**—sleep, how practice felt, meet times—and looks for **personal patterns** (My Clues). With enough swimmers who **choose** to contribute anonymized data, those same logs can be studied in the aggregate to learn which controllables tend to show up when swimmers perform well—without telling any coach what to write on the board.

That’s the path from **guesswork → personal insight → cohort patterns → careful prediction language** (“swimmers like you often…”), not fortune-telling.

---

## Two consent layers (not one checkbox)

### Layer A — Account & sync (required for cloud features)

**When:** Creating an account or turning on sync (replacing device-only storage).

**What it covers:**

- Store profile, check-ins, and meet times on Off Deck servers  
- Sync across devices and backup data  
- Run **personal** My Clues and trends for that athlete only  
- Product improvement using **aggregated, non-identifiable** usage (e.g. “40% complete check-in on first try”)—no sale of personal data  

**What it does *not* cover:**

- Putting the swimmer’s name or identifiable rows into a research dataset  
- Showing data to a coach (separate sharing toggle, Phase 2)  
- Comparing this swimmer to teammates or public rankings  

---

### Layer B — Research contribution (optional, explicit opt-in)

**When:** Separate step after signup—or anytime in Settings—with plain explanation. Default: **off**.

**What it covers:**

- Copy de-identified copies of check-ins, meet times, and profile **bands** (age band, event categories, practice load—not name, team, or exact height/weight) into a research dataset  
- Internal analysis to improve My Clues and understand patterns across swimmers  
- Possible future publication of **aggregate** findings (e.g. “in our cohort of age-group swimmers…”) with no individual identification  

**What it does *not* cover:**

- Sharing identifiable data with third parties for advertising  
- Selling data  
- Coach or parent seeing **other** swimmers’ data  
- Medical diagnosis or injury labeling  

**Withdrawal:** User or parent can turn off research contribution anytime. Past de-identified rows may remain in aggregate datasets that can no longer be linked back (standard research practice—state clearly).

---

## Suggested in-app copy

### Short (signup summary)

> **Your data stays yours.** Off Deck stores your logs so you can see your patterns and don’t lose them on a new phone.  
>  
> **Coaches don’t get automatic access**—you choose what to share later.  
>  
> **Optional:** Help improve swimming for everyone by contributing anonymized data to research. You can change this anytime in Settings.

---

### Layer A — Account & sync (required checkbox or continue action)

**Title:** Save my logs securely

**Body:**

> Off Deck will store your profile, check-ins, and meet times on our servers so you can sync across devices and see your trends over time.  
>  
> We use this only to run **your** personal insights (like My Clues) and to improve the app. We don’t sell your personal information.  
>  
> Coaches and other swimmers **cannot** see your data unless you turn on sharing later.

**Button:** Continue / Create account

---

### Layer B — Research contribution (optional, separate screen or expandable section)

**Title:** Help research (optional)

**Body:**

> If you opt in, we add **de-identified** copies of your check-ins and meet times to a research dataset—no name, no team, no free-text notes. Age and body measurements are stored only as ranges (e.g. 15–16, not your exact height).  
>  
> This helps us learn what controllables (sleep, readiness, recovery) tend to show up when swimmers swim well—so future swimmers get better guidance.  
>  
> This is **not** medical advice and **not** a grade of your coach’s training. You can turn this off anytime in Settings.

**Toggle labels:**

- Off (default): *Don’t include my data in research*  
- On: *Include my anonymized data in research*

**Parent-managed accounts (under 13):** Parent must opt in on behalf of athlete; athlete UI shows “Your parent manages research settings.”

---

### Phase 2 — Share with coach (future, third toggle)

Not research—visibility. Separate from Layer B.

**Title:** Share with my coach

**Body:**

> Your coach can see a **read-only summary** you choose—like readiness trends and recent times—not your private notes. You can turn this off anytime.

Default: **off**. Athlete initiates (HS+); parent cannot force share without clear rules for younger ages.

---

## Who can see what

| Data | Swimmer | Parent (linked) | Coach | Research dataset |
|------|---------|-----------------|-------|------------------|
| Full profile | Yes | Yes (if linked) | No* | Bands only |
| Daily check-in | Yes | Optional summary | If shared | De-identified metrics |
| Free-text notes | Yes | Yes | No | **Excluded** |
| Meet times | Yes | Yes | If shared | De-identified |
| My Clues | Yes | Optional | If shared | Derived aggregates only |
| Cohort insights | Personalized text only | No | Aggregate Phase 3+ | Internal analysis |

\*Coach Phase 2+: opt-in read-only slice only.

---

## De-identification rules (research export)

Before a row enters the research dataset:

| Field | Treatment |
|-------|-------------|
| Name, email, team, meet name | Remove |
| `account_id` | Replace with `research_participant_id` (one-way hash + salt) |
| Age | → `age_band` |
| Height, weight | → bands |
| Notes | Exclude |
| Dates | Shift or use relative day index optional (TBD for publication) |
| Events, sleep, readiness, times | Keep numeric/banded values |

Re-identification (linking research ID back to account) restricted to minimal admin break-glass—not available to coaches or researchers externally.

---

## Language rules for insights (personal and cohort)

**Allowed:**

- “In your last three meets, higher sleep the week before lined up with faster times.”  
- “Swimmers with a similar profile often see readiness matter before meets.”  
- “You’re building a picture—keep logging after meets.”  

**Not allowed:**

- “You will drop 2 seconds if you sleep 9 hours.”  
- “Your coach is overtraining you.”  
- “You rank #4 on the team for readiness.”  

Same rules apply when cohort analytics eventually feed the app.

---

## COPPA & minors (US-oriented checklist)

- Under 13: parent-managed account; parent consent for Layer A and B  
- Collect minimum fields needed; no public profiles  
- No behavioral advertising to children  
- Provide parent access to review/delete child data  
- Document in privacy policy before public launch  

Legal review before production—not a substitute for a lawyer.

---

## Privacy policy outline (when you ship backend)

1. What we collect (link to DATA_DICTIONARY.md)  
2. Why (personal insights, sync, optional research)  
3. Who sees it (table above)  
4. Retention & deletion  
5. Research opt-in/out  
6. Security (encryption in transit/at rest—describe when implemented)  
7. Contact  

---

## Implementation checklist (when building backend)

- [ ] `consent_sync_at`, `consent_research_at`, `consent_research_version` on account  
- [ ] Block research export pipeline unless `consent_research === true`  
- [ ] Settings screen: toggle research + link to this doc  
- [ ] Audit log for consent changes  
- [ ] Delete account removes identifiable data; document research retention  
- [ ] Schema version on each exported row (`2026-07-personal-v1`, etc.)

---

## One paragraph for your mom (research ambition, coach-safe)

> We’re building a longitudinal picture of **off-pool controllables and meet outcomes** across swimmers who opt in—same data that powers a kid’s My Clues, stripped of names and teams for study. The goal is to reduce guesswork at scale: what patterns show up when swimmers do well, so we can eventually say careful, cohort-level things about success—not to replace coaches or label training as wrong.

---

*Keep in sync with `PRODUCT.md` and `DATA_DICTIONARY.md`. Update consent version when collection scope changes.*

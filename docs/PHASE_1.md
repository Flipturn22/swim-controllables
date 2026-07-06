# Phase 1 — locked spec (v1.0)

**Product:** Off Deck · **Status:** Design locked · **Build:** In progress (local MVP behind spec)

Phase 1 proves families will log controllables and find **personal patterns** useful — with **no coach account**. Coach features are Phase 2+ (see Stage 1/2 philosophy in chat + updated `PRODUCT.md` Phase 2 when synced).

---

## Success criteria

- 10+ families complete a **2-week logging streak**
- Qualitative: better conversation with coach/parent (optional — no share required)
- Users return after at least one meet
- Check-in feels like **< 60 seconds** on a phone after practice

---

## 1. Signup (rolling, ~10–12 steps)

| ID | Field | Phase 1 |
|----|-------|---------|
| A-01 | Swimmer / parent | **In** |
| A-02 | First name | **In** |
| A-03 | Email / account | **Out** until backend sync |
| A-04 | Parent linked to athlete | **Out** until backend |
| A-05 | Who manages account | **Out** until backend (role implies for now) |
| B-01 | Age | **In** |
| B-02 | Grad year | **In** |
| B-03 | Sex | **In, required** |
| B-04 | Primary events (max 4) + **“Still figuring it out”** | **In** |
| B-05 | ~~Pool days/week~~ → **Weekly team schedule template** | **In** (replaces old enum) |
| B-06 | Height (ft + in) | **In, required** |
| B-07 | Weight (lbs) | **In, required** |
| B-08 | Years on club team | **In** |
| B-09 | Club + HS overlap (not either/or) | **In** |
| B-10 | Team / club name | **In, optional** |
| B-11–B-12 | Stroke / distance profile | **Computed** from events |
| B-13 | Wingspan | **In, required** + short note on why it matters per swimmer |
| B-14 | Dominant hand / foot | **In, optional** |
| B-15 | ~~Superstition~~ → **Dragsuit at practice (Y/N)** + **Tech suit picker** (meet list) | **In** |

### Schedule template (replaces B-05)

Swimmer maps **team’s typical week** once:

- Which days have pool practice (Mon–Sun grid)
- Optional: AM / PM / both per day
- Season context: club / HS / summer / break (can switch later in settings)

**Not asked:** “How many days per week?” self-estimate.

---

## 2. Daily check-in (practice days)

Shown on days the **schedule template** marks as practice (or end-of-day nudge if missed).

| Field | Phase 1 | Notes |
|-------|---------|-------|
| **Attendance** | **In** | Full / Partial / Missed (E-03) |
| **Sleep bucket** | **In, required** | `rough` · `ok` · `solid` — primary sleep signal |
| **Sleep hours** | **In, optional** | Expand only; 13+ or anyone who wants depth |
| **Soreness** | **In** | 1–5, simple scale (D-03) |
| **Felt sick** | **In** | Y/N when relevant (D-08) |
| ~~Readiness at practice~~ | **Out** as daily default | Replaced by attendance + weekly buy-in |
| ~~Free-text note~~ | **Out** | Stage 1 locked |
| C-02–C-07 | **Out** | Bedtime, naps, screens, etc. |
| D-01–D-06, D-09–D-10 | **Out** of daily | Mood, energy, stress, motivation, cycle |
| E-01, E-02, E-07, E-08 | **Automated** from schedule | No manual “had practice?” |
| E-04–E-06 | **Out** | RPE, yards, set type — coach territory |
| F-01–F-05 | **Out** of daily | See Phase 1.5 |
| Apple Health K-01 | **Out** | Prefill layer when sync ships |

### Sleep philosophy (locked)

- **Bucket is truth** for My Clues and trends.
- **Hours / wearables** are optional enrichment — never required.
- App works fully with **zero** sync opt-in.
- Clues may show **inverse patterns** (rough sleep + good meet) — never blame coach’s training.

---

## 3. Weekly check-in (1 screen, ~30 sec)

| Field | Phase 1 | Notes |
|-------|---------|-------|
| **Buy-in to coach’s plan this week** (D-07) | **In** | 1–5, coach-safe wording — **weekly, not daily** |
| **Team dryland this week?** | **In** | Y/N (from schedule when possible) |
| **Personal gym / lift outside team?** | **In** | Y/N — gym matters for your data story |
| H-01–H-05 metrics | **Out** | Push-ups, plank, VJ — Phase 1.5 |
| H-06–H-07 | **Out** | Defer |

**Wording for buy-in (example):** *“How connected do you feel to your team’s plan this week?”* — not *“Do you agree with coach?”*

---

## 4. Meet times

| Field | Phase 1 |
|-------|---------|
| I-01 Event | **In** |
| I-02 Time | **In** |
| I-04 Meet name | **In, optional** |
| I-05 Date | **In** |
| I-03 Course | **Default SCY**; picker Phase 1.5 |
| I-06 Splits | **Out** — import later |
| I-07–I-10, I-13–I-15 | **Out** on entry form |
| I-11 PB flag | **Computed** |
| I-12 vs season best | **Computed** |
| J-01–J-04 | **Computed** (7-day window before meet) |
| Tech suit used this race | **Optional** if not already on profile |

Manual entry only — no MeetMobile/SwimCloud import in Phase 1.

---

## 5. My Clues / Trends

- Personal **n=1** only — no team compare
- **Meet-window focused** (7 days before meets), not “today felt bad”
- Plain language; trends not guarantees
- Inverse patterns allowed in copy
- Optional **one question for coach** on dashboard — respectful, never demands training change

---

## 6. Learn

- Static controllables library (sleep, fueling, dryland questions for coach)
- Body & events orientation (uses height, weight, wingspan, events from profile)
- No scraped content

---

## 7. Explicitly out of Phase 1

- Coach accounts, invite codes, share (Phase 2)
- Backend / accounts / sync (Phase 1 local OK for pilot; S1 rollout next)
- Private notes / misery diary
- Workout prescription, yards, RPE, set type
- Wearables / Apple Health
- Daily fueling taps (Phase 1.5)
- Research consent UI (documented in `CONSENT.md`; in-app with backend)
- Meet import API
- Genetics, recruiting, leaderboards

---

## 8. Build checklist (code vs spec)

| Item | Spec | Code |
|------|------|------|
| Rolling signup + expanded profile | ✓ | ✓ |
| Schedule template + attendance | ✓ | ✓ |
| Sleep bucket + optional hours | ✓ | ✓ |
| Weekly buy-in + dryland/gym | ✓ | ✓ |
| Meet times + computed PB | ✓ | ✓ |
| My Clues meet-window | ✓ | ✓ |
| No private notes | ✓ | ✓ |
| Learn + coach question | ✓ | ✓ |

---

## 9. Locked (2026-07-04)

All Phase 1 product decisions confirmed:

| Topic | Lock |
|-------|------|
| Sleep | Bucket required + optional hours; no Apple Health in Phase 1 |
| Weekly buy-in | Yes — weekly only, coach-safe wording |
| Fueling (F) | Deferred Phase 1.5; Learn content only |
| Dryland / gym | Weekly Y/N only |
| Meet entry | Minimal + computed PB |

---

*Aligned with `PRODUCT.md` constitution and Stage 1 philosophy (Model 1, no blurred lines, no coach blame).*

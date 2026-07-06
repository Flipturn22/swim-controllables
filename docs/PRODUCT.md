# Product spec (v0.1)

**Working name:** Off Deck (repo: swim-controllables)

**One-line pitch:** Help swimmers and parents own what happens outside the pool, and optionally share readiness with coaches — so buy-in goes up without anyone fighting over the whiteboard.

---

## Constitution (read before every feature)

> We help swimmers and parents take ownership of what they control outside the pool, and give coaches an optional window into readiness and engagement — so buy-in goes up and nobody has to fight over the whiteboard.

**Wall version:** Better buy-in through shared controllables — coaches still run the pool.

### For skeptical coaches

> This isn’t a training plan and it isn’t here to second-guess what you put on the board. It helps swimmers and parents focus on what happens **outside** your practice — sleep, recovery, basic body and event understanding, and simple trends between habits and meet times — so athletes show up ready to train **your** program. We don’t prescribe sets, criticize team philosophy, or tell families to change what you’re doing. When something in the pool might matter, we encourage athletes to bring **one clear observation or question** to you, not a lecture from an app. You stay in charge of the water; we help reduce the guesswork around everything else.

### Feature pass/fail test

Before shipping anything, ask:

1. Does it help buy-in without prescribing pool workouts?
2. Is coach visibility **opt-in by the athlete** (Phase 2+)?
3. Could a coach fairly read this as supportive, not undermining?
4. Are we stating trends/observations, not guarantees?
5. Is the data source user-entered or clearly cited public reference — not scraped proprietary databases?

---

## Problem

Swimming training is mostly coach-written. Athletes have limited control in the pool but significant influence on sleep, recovery, readiness, and self-understanding. Parents want to help but often increase friction with the coach. Coaches struggle when athletes don’t buy in — and lack visibility into off-pool factors that affect performance.

**Gap:** No shared, low-conflict language for controllables + readiness between athlete, parent, and coach.

---

## Users

| User | Job to be done |
|------|----------------|
| **Athlete (HS / serious age-group)** | Own what I control; understand why I plateau; buy in to my team’s plan for real reasons |
| **Parent** | Support without undermining the coach; reduce anxiety and guesswork |
| **Coach (Phase 2+)** | See readiness/engagement for athletes who opt in; have better conversations, not more parent emails |

**Primary launch:** Athlete + parent (coach not required for value).

---

## Phase 1 — MVP (private, no coach account)

**Goal:** Prove families will log controllables and find personal patterns useful.

**Full locked spec:** [`docs/PHASE_1.md`](PHASE_1.md)

### Core flows

1. **Onboarding (rolling)** — role, name, age, grad year, sex, events (+ “still figuring it out”), **weekly team schedule template** (not pool-days guess), body metrics (height, weight, wingspan required), club/HS context, dragsuit + tech suit picker
2. **Practice-day check-in** (< 60 seconds) — **attendance** (Full / Partial / Missed), **sleep bucket** (Rough / OK / Solid) with **optional** hours expand, soreness (1–5), sick Y/N when relevant — **no free-text notes**
3. **Weekly check-in** — buy-in to coach’s plan (1–5, coach-safe wording), team dryland Y/N, personal gym Y/N
4. **Meet times** — manual entry (SCY default); computed PB + 7-day window clues
5. **My Clues / trends** — meet-window personal n=1; inverse patterns OK; never blames coach’s training
6. **Learn** — controllables library + body/event orientation
7. **Optional coach question** — one respectful line from trends (Phase 1: show on deck; Phase 2: same dashboard when connected)

### Explicitly out of Phase 1

- Workout generation or set prescription
- Coach accounts or dashboards (Phase 2+)
- Free-text diary / private notes
- Daily “how practice felt” as primary signal
- Sleep hours required; Apple Health / wearables
- Daily fueling taps (Phase 1.5)
- Genetics / DNA
- Recruiting / roster fit / SwimCloud scraping
- Grading or shaming athletes
- Auto-reports to coaches or parents

### Data principles

- User-entered data only (plus static public reference content)
- Label all insights as personal trends, not universal rules
- Privacy by default; stored per athlete profile

### Success metrics (first 8–12 weeks)

- 10+ families complete 2-week check-in streak
- Qualitative: “I had a better conversation with my coach/parent”
- Retention: users return after at least one meet

---

## Phase 2 — Coach connect (buy-in bridge)

**Goal:** Enable collaboration without coach threat. **Stage 1 locked:** Model 1 first; when coach joins, **same dashboard** as swimmer — no blurred lines.

### Features

- **Athlete-initiated connect** — team invite code or one-time link (not coach roster pull)
- **Coach signup** — required constitution (supportive, not undercutting; no seat at program table)
- **Mirrored view** — coach sees **identical** controllables data per connected swimmer
- **Disconnect** — one tap, immediate; parent rules by age band
- **No mandates** — clubs cannot require Off Deck through the product

### Still out of scope

- Coach editing athlete data
- Team-wide mandates
- Workout recommendations

---

## Phase 3 — Coach roster (B2B)

**Goal:** Team-level readiness visibility for coaches who want it.

- Coach account + roster (invite or club code)
- Aggregated readiness for **opt-in** athletes only
- Engagement signal (who’s checking in — buy-in proxy)
- Export for pre-meet “who might be under-recovered” — observational only
- Pricing: club / coach subscription

---

## Messaging by audience

**Parents:** Support your kid without second-guessing the team.

**Athletes:** Own what you control so you can buy in to your coach’s plan for real reasons.

**Coaches:** See readiness and engagement for swimmers who choose to share — you still write every set.

---

## Legal / trust guardrails

- Not medical advice; not a substitute for coaching
- COPPA-aware flows if under-13 (parent-managed accounts)
- No scraping SwimCloud, team sites, or proprietary metrics
- Cite public sources for educational content (LTAD, NCAA/public sports science summaries)

---

## Open decisions

- [ ] Product name
- [ ] Minimum age / parent-managed model
- [ ] Mobile PWA vs native later
- [ ] First sport: swimming only until Phase 3 validates broader athletics

---

## Next build step (when ready)

Scaffold Phase 1 only: onboarding → check-in → manual times → simple trend view → static controllables content. No coach features until Phase 1 retention is validated.

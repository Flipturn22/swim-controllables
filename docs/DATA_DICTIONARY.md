# Data dictionary (v0.1)

**Purpose:** One schema for the app, personal insights (My Clues), and—only with consent—aggregated research. Same rows swimmers log; different views and permissions on top.

**North star (research, long-term):** Understand which **off-pool controllables and context** tend to show up before swimmers perform well—not to prescribe workouts or rank coaches.

**North star (product, now):** Help each swimmer see **their** patterns and reduce guesswork with their coach and parents.

---

## How the data layers connect

```text
Swimmer logs          →  Personal view (My Clues, trends, PBs)
       ↓
Backend stores        →  Sync, history, clue engine
       ↓
De-identified cohort  →  Internal analytics (min N, no names)
       ↓
Later (opt-in only)   →  “Swimmers like you often…” — probabilistic, not promises
```

**Prediction (what you’re getting at):** Over time, with enough swimmers and meets, you can model **relationships** between controllable habits + context and meet outcomes **within cohorts** (age band, events, practice load). That supports:

- Personal: *“Before your last three PBs, sleep averaged X.”*
- Cohort: *“In 14–16 100/200 freestylers with 5 pool days/week, higher pre-meet readiness scores showed up in more PB weeks.”*
- Never: *“Sleep 9 hours and you will go 52 high.”*

Performance in the pool stays the **outcome**. Coach-written training stays **out of scope** for v1–v2 collection.

---

## Field status legend

| Status | Meaning |
|--------|---------|
| **Live** | In Off Deck app today (local) |
| **Planned** | Next schema versions—add when backend sync ships |
| **Optional** | User can skip; may still power personal clues if present |
| **Research** | Included in de-identified exports only if research consent is on |
| **Deferred** | Explicitly not collecting yet (see Out of scope) |

---

## 1. Identity & account

| Field | Type | Status | Personal | Research | Notes |
|-------|------|--------|----------|----------|-------|
| `account_id` | UUID | Planned | Yes | No (replace with `research_participant_id`) | Server-side only |
| `research_participant_id` | UUID | Planned | No | Yes | Rotating pseudonym for exports; not reversible by researchers |
| `role` | enum: `athlete`, `parent` | Live | Yes | No | Parent accounts link to athlete, not duplicate logs |
| `created_at` | ISO datetime | Live | Yes | No | |

---

## 2. Swimmer profile (context, not destiny)

Used to **segment** cohorts and personalize language—not to label someone “built for sprint.”

| Field | Type | Status | Personal | Research | Notes |
|-------|------|--------|----------|----------|-------|
| `first_name` | string | Live | Yes | **Never** | Display only; strip from research exports |
| `age` | integer 8–22 | Live | Yes | **Band only** | Export as `age_band`: 8–10, 11–12, 13–14, 15–16, 17–18, 19–22 |
| `grad_year` | integer | Live | Yes | Optional band | Proxy for school vs club phase |
| `sex` | enum | Planned | Yes | Band optional | **Required at signup (Phase 1)** — cohort splits |
| `primary_events` | string[] max 4 | Live | Yes | Yes (events only) | Standard event codes from `EVENT_OPTIONS` |
| `weekly_practices` | enum | **Deprecated** | — | — | Replaced by `practice_schedule` template + attendance |
| `practice_schedule` | object | Planned | Yes | Yes | Mon–Sun practice days; optional AM/PM; season variant |
| `practice_attendance` | enum | Planned | Yes | Yes | `full`, `partial`, `missed` — logged on practice days |
| `height_inches` | integer | Live | Yes | **Band only** | Export as cm bands or quintiles, not exact |
| `weight_lbs` | integer | Live | Yes | **Band only** | Export as bands; sensitive for minors |
| `team_name` | string optional | Planned | Optional | **Never** | Avoid identifying clubs in research v1 |

---

## 3. Check-in (practice-day + weekly)

**Swimmer lens:** Attendance + recovery you control — not a verdict on coach’s training.

### Practice-day row

| Field | Type | Status | Personal | Research | Notes |
|-------|------|--------|----------|----------|-------|
| `check_in_id` | UUID | Live | Yes | Yes | |
| `athlete_id` | UUID | Planned | Yes | Pseudonym | |
| `date` | ISO date | Live | Yes | Yes | One row per practice day (or calendar day on practice) |
| `practice_attendance` | enum | Planned | Yes | Yes | `full`, `partial`, `missed` — **primary engagement signal** |
| `sleep_bucket` | enum | Planned | Yes | Yes | **`rough`, `ok`, `solid` — primary sleep signal (Phase 1)** |
| `sleep_hours` | number optional | Planned | Yes | Yes | Optional expand only; secondary to bucket in clues |
| `sleep_source` | enum | Planned | Yes | Yes | `manual_bucket`, `manual_hours`, `healthkit` (future) |
| `soreness` | integer 1–5 | Planned | Yes | Yes | Higher = more sore |
| `felt_sick` | boolean | Planned | Yes | Yes | D-08; optional when relevant |
| `sleep_hours_legacy` | number | Live | Yes | Yes | **Deprecated** — old hour grid; migrate to bucket |
| `readiness` | integer 1–5 | Live | **Deprecated** | — | Removed from daily Phase 1; use weekly buy-in |
| `note` | string | Live | **Removed** | **Never** | No free-text in Phase 1 |

**Out of Phase 1 daily:** mood, school stress, readiness, notes, C-02–C-07, E-04–E-06, composite energy score.

### Weekly row (separate cadence)

| Field | Type | Status | Personal | Research | Notes |
|-------|------|--------|----------|----------|-------|
| `weekly_buy_in` | integer 1–5 | Planned | Yes | Yes | D-07; coach-safe wording; **not daily** |
| `team_dryland_week` | boolean | Planned | Yes | Yes | Y/N |
| `personal_gym_week` | boolean | Planned | Yes | Yes | Y/N — outside team program |

**Wearables (future):** K-01 Apple Health may **prefill** bucket/hours — never required. See `PHASE_1.md`.

**Not collecting (v1–v2):** RHR, HRV, RPE, yards, session type—defer to wearable sub-study or never, to stay off the whiteboard.

---

## 4. Meet times (primary outcome)

**Swimmer lens:** The scoreboard truth. Everything else is evaluated against **your** times over time.

| Field | Type | Status | Personal | Research | Notes |
|-------|------|--------|----------|----------|-------|
| `meet_time_id` | UUID | Live | Yes | Yes | |
| `date` | ISO date | Live | Yes | Yes | |
| `event` | string | Live | Yes | Yes | From standard event list |
| `course` | enum | Planned | Yes | Yes | `SCY`, `SCM`, `LCM`—default SCY |
| `time_seconds` | number | Live | Yes | Yes | Canonical storage |
| `meet_name` | string optional | Live | Yes | **Never** or hash | Can identify location; strip or generalize for research |
| `is_personal_best` | boolean computed | Planned | Yes | Yes | PB flag for clues and celebrations |
| `race_readiness` | integer 1–5 optional | Planned | Optional | Yes | Self-report morning of meet—pre-meet ritual hook |
| `split_1`, `split_2` | number optional | Planned | Optional | Yes | Optional; event-dependent |

**Derived for analytics (server-side, not user-entered):**

| Derived field | Description |
|---------------|-------------|
| `days_since_last_meet` | Gap between meets |
| `check_ins_7d_before_meet` | Rolling window for My Clues |
| `sleep_avg_7d_before_meet` | |
| `readiness_avg_7d_before_meet` | |
| `pb_rate_by_event` | Share of meets with PB in primary events |
| `time_vs_season_best_pct` | How close to personal best (for “good meet” without requiring PB) |

---

## 5. Pre-meet window (planned)

**Swimmer lens:** “The week before a meet”—where patterns actually show up.

| Field | Type | Status | Notes |
|-------|------|--------|-------|
| `meet_id` | UUID | Planned | Optional link if user adds meet to calendar |
| `meet_date` | date | Planned | |
| `window_start` | date | computed | Usually meet_date − 7 days |
| Aggregates | — | computed | Sleep avg, readiness avg, check-in count, optional dryland |

Stored as **computed snapshots** when a meet time is logged—not a separate form.

---

## 6. Dryland / controllables (optional module, planned)

Light version only—aligned with Learn, not lab testing.

| Field | Type | Status | Research | Notes |
|-------|------|--------|----------|-------|
| `dryland_id` | UUID | Planned | Yes | ~weekly cadence |
| `date` | date | Planned | Yes | |
| `pushups_max` | integer | Planned | Yes | Kids tracker parity |
| `plank_seconds` | integer | Planned | Yes | |
| `vertical_jump_inches` | integer optional | Planned | Yes | Optional |
| `notes` | string | Planned | **Never** | Personal only |

**Deferred:** CMJ force plate, grip dynamometer, 1RM bench—Performance Tracker territory; separate consent if ever.

---

## 7. Product & consent events (server only)

Not swimming data—used to improve the app.

| Event | When |
|-------|------|
| `signup_completed` | Profile finished |
| `check_in_submitted` | |
| `meet_time_submitted` | |
| `clue_viewed` | User opened My Clues |
| `research_consent_granted` / `_withdrawn` | |

---

## 8. Out of scope (do not collect without new constitution)

| Topic | Why |
|-------|-----|
| Workout sets, intervals, coach prescriptions | Coach domain; undermines buy-in story |
| Yards / sRPE / ACWR as core fields | Training load product; not controllables-first |
| Genetics / DNA | Explicitly out in PRODUCT.md |
| Coach ratings or “should change training” | Trust killer |
| Other swimmers’ data in personal views | No leaderboards |
| Scraped SwimCloud / roster data | Legal and positioning |

Wearables (sleep/HRV from Apple Health): **future optional module** with separate consent—not v1 backend.

---

## 9. Cohort definitions (for research & prediction)

When N is large enough, segment by **bands**, not individuals:

| Dimension | Bands |
|-----------|-------|
| Age | 8–10, 11–12, 13–14, 15–16, 17–18, 19–22 |
| Practice load | From `weekly_practices` |
| Primary stroke | Derived from events (free, back, breast, fly, IM) |
| Distance profile | Sprint / middle / distance from primary events |
| Sex | Optional band if collected |

**Minimum N rule (internal):** Do not publish or show cohort insights until cell size ≥ **30** athletes (tune with stat review). Personal clues can use n=1 with plain language.

---

## 10. My Clues → research pipeline

Same variables, two outputs:

| Stage | Input | Output |
|-------|--------|--------|
| Personal (≥3 meets) | 7-day check-in aggregates before each meet | Star-rated clues for that athlete |
| Cohort (≥30 per cell) | De-identified rows | Distribution of which clues correlate with `time_vs_season_best` or PB |
| Predictive (later) | Profile band + rolling controllables | *“Swimmers with your profile often benefit from prioritizing sleep before meets”* — probability language only |

**Evaluation metrics for “doing well” (outcomes):**

1. Personal best in event  
2. Time within X% of season best  
3. Self-reported race readiness (when collected)  
4. **Not:** comparison to other swimmers on team

---

## 11. Versioning

| Schema version | Scope |
|----------------|--------|
| `2026-07-personal-v1` | Live local: profile, check-in, meet times |
| `2026-08-sync-v1` | + account, sync, PB flags, age bands for export |
| `2026-09-checkin-v2` | + mood, soreness, optional fields |
| `2026-10-research-v1` | + research_participant_id, consent flags, export pipeline |

Bump version when fields are added; never repurpose meaning of existing fields.

---

## 12. Open questions (swimmer-led—decide before backend)

- [ ] Is `sex` worth collecting for cohort splits, or skip entirely?  
- [ ] One check-in per day or per practice on double days?  
- [ ] Pre-meet `race_readiness`—worth a 5-tap screen meet morning?  
- [ ] Dryland weekly vs skip for v1 backend?  
- [ ] Minimum meets before showing any cohort hint in app (suggest: never in app until very high N; keep cohort insights internal or coach-facing aggregate only at first)

---

*This dictionary should stay aligned with `PRODUCT.md` constitution. Any new field must pass the feature pass/fail test there.*

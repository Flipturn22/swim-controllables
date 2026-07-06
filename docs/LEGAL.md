# Legal roadmap (working memo — not legal advice)

**Product:** Off Deck (swim controllables app)  
**Last updated:** 2026-07-04  
**Status:** Pre-pilot — local prototype only; no public backend yet

> **This document is a planning checklist, not legal advice.** Have a qualified attorney (privacy/tech + ideally COPPA experience) review before you invite families you do not know, collect data on servers, or charge clubs.

---

## 1. What laws actually apply to Off Deck?

Off Deck is **not a HIPAA product** in its current design (direct-to-consumer; no doctor/health-plan integration). It **is** a consumer app that collects **health-adjacent** data (sleep, soreness, sick days, body metrics, meet times). That puts you mainly under **FTC** rules, **COPPA** (users under 13), and eventually **state privacy** laws (especially California if you have CA users).

| Law / regime | Likely applies? | Why |
|--------------|-----------------|-----|
| **HIPAA** | **No** (typical path) | You are not a covered entity or business associate unless you sign BAAs with teams/hospitals and handle their PHI. |
| **FTC Act (Section 5)** | **Yes** | Deceptive/unfair privacy or security practices are enforceable. Privacy policy must match behavior. |
| **FTC Health Breach Notification Rule (HBNR)** | **Yes** (when cloud + health data) | Direct-to-consumer apps that collect identifiable health/wellness info and can draw from multiple sources (user input + future Apple Health) generally must comply. Requires breach notification procedures. |
| **COPPA** | **Yes** if under-13 allowed | You collect name, age, sex, body metrics — all personal information under COPPA. Mixed-audience app with ages 8+. |
| **COPPA 2025 amendments** | **Yes** — compliance was **April 22, 2026** | Separate parental consent for non-integral third-party sharing (ads, AI training). Data retention limits. Expanded PI definitions. |
| **CCPA / CPRA (California)** | **Maybe later** | Triggers when you meet revenue/volume thresholds or buy/sell/share PI at scale. Stricter rules for under-16 opt-in to sale/share. |
| **CA Age-Appropriate Design Code (CAADCA)** | **Likely** if CA minors use it | Defines “child” as **under 18**. Partial enforcement restored 2026; age estimation or child-level defaults for all users may be required. |
| **FDA (medical device)** | **Low risk if positioned correctly** | General wellness / healthy lifestyle — **not** diagnosing disease, treating injury, or replacing clinical devices. Your “not medical advice” stance fits. |
| **FERPA** | **Unlikely** (v1) | Applies to schools/ed records, not typical club parent signup — unless a **school district** becomes the customer. |
| **USA Swimming Safe Sport** | **Contextual** | You are not replacing mandatory reporting; do not present app as abuse hotline. Coaches/clubs have separate duties. |
| **CFAA / scraping** | **Avoid** | No SwimCloud/team site scraping (already in constitution). |
| **Research / IRB** | **Later (Layer B)** | De-identified cohort research may need legal review; academic publication often needs IRB. Consumer opt-in alone may not be enough for all uses. |

**References (start here):**

- [FTC Mobile Health Apps Interactive Tool](https://www.ftc.gov/business-guidance/resources/mobile-health-apps-interactive-tool)
- [FTC Health Breach Notification Rule](https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0)
- [FTC COPPA Rule (2025 amendments)](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data)
- [FDA General Wellness Policy](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)

---

## 2. What you are / are not (product positioning = legal positioning)

### You ARE (safe framing)

- A **wellness / controllables log** for swimmers and parents  
- **Personal pattern** tool (n=1), not clinical diagnosis  
- **Optional** coach visibility (Phase 2), athlete-initiated  
- **Optional** de-identified research (Layer B), separate consent  

### You are NOT (do not imply in marketing or UI)

- Medical advice, diagnosis, or treatment  
- Injury prediction or “overtraining diagnosis”  
- A substitute for coaching or sports medicine  
- HIPAA-compliant “medical record” (unless you later pursue that path deliberately)  
- Mental health therapy or crisis service  
- Guaranteed performance outcomes (“sleep 9h → drop 2 seconds”)  

**Copy rule:** Trends and “swimmers like you often…” — never promises. Already aligned with `PRODUCT.md` and `CONSENT.md`.

---

## 3. COPPA — your biggest pre-launch item

You allow **ages 8–22** and collect:

- First name  
- Age, sex  
- Height, weight, wingspan  
- Team name (optional)  
- Check-ins (sleep, soreness, attendance, buy-in)  

All of this is **personal information** for children **under 13**.

### Before cloud pilot with strangers

1. **Age gate** — neutral screen (“What is your birth year?”), no nudging to fake age  
2. **Under 13 → parent-managed account** — parent creates account; child profile linked  
3. **Verifiable parental consent (VPC)** before collecting PI from under-13 on servers — email plus, credit card micro-charge, video call, or COPPA-approved vendor (e.g. Privo, EpicPlayground, etc.)  
4. **Privacy policy** directed at parents — plain language  
5. **Parent rights** — review, delete, revoke consent  
6. **No behavioral ads** to children — you should have **no ads** in v1 anyway  
7. **Data minimization** — collect only what Phase 1 needs (you’ve done well cutting notes)  
8. **2025 COPPA:** separate consent if you ever share child data with third parties for **ads or AI training** — don’t bundle with signup  

### Practical shortcut many startups use

- **Pilot 1: 13+ only** — avoids full COPPA machinery for first beta  
- **Add under-13** after VPC flow is built and lawyer-reviewed  

**Decision needed:** Is age-group 8–12 in **Pilot 1**, or **13+ only until VPC**?

---

## 4. FTC Health Breach Notification Rule (when you add backend)

When Off Deck stores identifiable sleep/soreness/sick/meet data in the cloud:

- Document **what** you collect and **where** it lives  
- **Encrypt in transit** (HTTPS) and **at rest** (database provider)  
- **Access controls** — no public buckets, no coach access without connect  
- **Breach response plan** — notify users, and FTC when required, within rule timelines  
- **Vendor contracts** — Supabase/Vercel/etc. must meet your security expectations  
- **No selling** health data — your model is subscription, not data sales (keep it that way)  

Future **Apple Health sync** strengthens HBNR “personal health record” characterization — plan for it now.

---

## 5. Privacy policy + Terms of Service (required before real pilot)

### Privacy policy must describe

| Topic | Off Deck specifics |
|-------|-------------------|
| Data collected | Link to `DATA_DICTIONARY.md` bands in plain English |
| Purpose | Personal insights, sync, optional research, optional coach share |
| Who sees it | Swimmer, linked parent, connected coach only, never other swimmers |
| Retention | How long you keep data; delete on account deletion |
| Children | COPPA section; parent rights |
| Research opt-in/out | Layer B separate from account |
| Security | Encryption, hosting region (US), breach notification |
| Contact | Email for privacy requests |
| Changes | How you notify users |

### Terms of Service should include

- **Not medical advice** / not emergency service  
- **Acceptable use** — no harassing coaches, no false data to harm others  
- **Account eligibility** — age rules, parent-managed minors  
- **Limitation of liability** (lawyer-drafted)  
- **Dispute resolution** (if you want arbitration — lawyer decision)  
- **IP** — you own the app; user owns their data  
- **Termination** — user can delete account  
- **Coach relationship** — app does not employ coaches; club subscriptions separate  

**Cost:** Template + attorney review ~**$500–2,500** for startup-appropriate docs.

---

## 6. Phase 2 coach features — legal notes

Aligned with your Stage 1 philosophy; still need docs:

- **Coach ≠ HIPAA recipient** unless they’re using it in clinical role (they’re not)  
- **Athlete initiates connect** — document in ToS  
- **Same dashboard** — coach sees what athlete sees; disclose in privacy policy  
- **No mandate** — ToS prohibits club from using app as disciplinary system through your infrastructure (soft enforce via contract with clubs later)  
- **Coach constitution** — not a contract, but sets expectations; real terms are ToS + club agreement  
- **Buy-in scores** — frame as athlete self-report, not objective truth; avoid “coach ranking” language  

**Club B2B contract (Phase 3):** DPA-style addendum — who is controller, subprocessors, deletion, minors on roster.

---

## 7. Research layer (Layer B) — don’t skip legal later

Your `CONSENT.md` framework is good. Additional legal reality:

- **Separate opt-in** — required; default off  
- **De-identification** — bands for age/height/weight; strip name, team, meet name  
- **Re-identification risk** — small swim cohorts (one 15yo 400 IMer in a town) can be re-identified from aggregates — **minimum cell size** (you said 30+) is prudent  
- **Withdrawal** — user can opt out; policy on rows already in aggregate datasets  
- **IRB** — if you publish academically or make disease claims from cohort data, consult IRB/ethics review  
- **COPPA** — parental consent for research use of **under-13** data is separate and sensitive  
- **FTC 2025** — using child data to train AI models requires **separate** parental consent — if you ever ML-train on identifiable child logs, lawyer first  

---

## 8. FDA / “medical device” line

Stay in **general wellness**:

| OK | Risky |
|----|-------|
| Sleep, attendance, soreness logging | “Detects overtraining syndrome” |
| Personal trends before meets | “Diagnoses RED-S / eating disorders” |
| Educational Learn content | Clinical thresholds (“HRV below X = sick”) |
| Inverse pattern language | “You should see a doctor because…” automated |

If you add wearables, present data as **wellness trends**, not clinical alerts — unless you pursue FDA path (you shouldn’t in v1).

---

## 9. Other practical items

| Item | Action |
|------|--------|
| **Entity** | Form LLC before taking money or signing clubs |
| **Trademark** | Clearance search on “Off Deck” before marketing spend |
| **Insurance** | Cyber liability + tech E&O when backend live |
| **Analytics** | If using Google Analytics etc., disclose; avoid on under-13 without care |
| **Email** | CAN-SPAM if marketing emails; transactional only for pilot is simpler |
| **Accessibility** | ADA Title III for web — basic a11y is good practice |
| **Illinois BIPA** | Not collecting biometrics now — if you add voice/fingerprint, revisit |
| **Parent/athlete disputes** | Parent delete rights for minors; HS+ athlete controls coach connect |

---

## 10. What is legally OK at each stage?

| Stage | Legal exposure | Minimum legal work |
|-------|----------------|-------------------|
| **Now (local prototype, you + friends on your laptop)** | Low | None required; still avoid false claims |
| **Desk test (5 people, your Wi‑Fi, still localStorage)** | Low–medium | Informal consent; no public marketing |
| **Cloud pilot (10–20 families, URL)** | **Medium–high** | Privacy policy, ToS, COPPA plan (or 13+ only), security basics, breach plan |
| **Paid clubs / minors under 13 at scale** | **High** | Full attorney review, VPC, DPA for clubs, insurance |
| **Research dataset + coach B2B** | **High** | Consent versioning, DPIA-style review, contracts |

---

## 11. Pre-pilot legal checklist (do before sharing a public URL)

### Must have (lawyer-reviewed)

- [ ] Privacy Policy published  
- [ ] Terms of Service published  
- [ ] “Not medical advice” disclaimer in ToS + onboarding  
- [ ] Age strategy decided: **13+ only** OR **full COPPA VPC for under-13**  
- [ ] Parent-managed flow for minors (if under-13 or under-18 CAADCA)  
- [ ] Account deletion process documented and working  
- [ ] Encryption in transit + at rest on backend  
- [ ] Breach notification internal playbook (HBNR)  
- [ ] Consent timestamps stored (`consent_sync_at`, policy version)  
- [ ] No third-party ad SDKs on child flows  
- [ ] Vendor list (hosting, auth, email) documented  

### Should have before scale

- [ ] Cyber insurance  
- [ ] Trademark clearance  
- [ ] LLC operating  
- [ ] Club/customer agreement template (Phase 3)  
- [ ] Research opt-in (Layer B) lawyer-reviewed before enabling  
- [ ] CAADCA assessment if significant CA user base  

---

## 12. Recommended decisions (product + legal alignment)

1. **Pilot 1 age floor: 13+** — fastest path to legal pilot; add 8–12 with VPC in Pilot 2  
2. **No ads, no data sale, no AI training on identifiable logs** — ever, unless explicitly redesigned with counsel  
3. **Keep no private notes** — reduces COPPA/research/weaponization risk (already locked)  
4. **Lawyer review once** before first public URL with 10+ families you don’t know well  
5. **Budget ~$1.5k–3k** for startup legal docs + 1–2 hours counsel on COPPA/HBNR fit  

---

## 13. Questions for your attorney (copy-paste)

1. Are we a vendor under the FTC Health Breach Notification Rule given sleep/soreness/meet data only (no wearable yet)?  
2. Pilot 1: 13+ only vs full COPPA — recommended path and VPC vendor?  
3. Does CAADCA apply to us at pilot scale, and which provisions are in effect now?  
4. Is our “My Clues” / inverse correlation copy general wellness or any clinical claim risk?  
5. What must Layer B research consent say, and do we need IRB for internal cohort analysis?  
6. Coach connect: sufficient disclosures in privacy policy + ToS, or need coach-specific agreement?  
7. Club subscription later: standard SaaS agreement + DPA sufficient for minors’ data on roster?  

---

*Keep in sync with `CONSENT.md`, `PRODUCT.md`, `PHASE_1.md`. Update this memo when collection scope, age range, or coach/research features ship.*

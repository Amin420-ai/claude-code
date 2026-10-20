---
name: temperature-log
description: This skill should be used when the user asks to "create a temperature log", "food safety log", "fridge temperature sheet", "HACCP temperature records", "hot holding log", "cooling log", or needs to set up or review time/temperature records for a cafe, kitchen, or food business.
version: 1.0.0
---

# Temperature Log

Build time/temperature control records for a food business: which points get
checked, what the safe range is, who signs, and what happens when a reading
fails.

A temperature log is a HACCP record, not a tidy spreadsheet. Its job is to prove
that time/temperature control was maintained, and to force a corrective action
the moment it was not. Every design choice below serves one of those two jobs.

## Step 1: Pick the standard

Ask which standard applies, or infer it from the business location. Do not mix
them in one log — an inspector reads the log against one rule set.

| | Cold holding | Hot holding | Cooling (cooked food) | Core cook |
|---|---|---|---|---|
| **FDA Food Code** (US) | ≤ 41°F / 5°C | ≥ 135°F / 57°C | 135→70°F (57→21°C) in 2h, then to ≤41°F (5°C) within 6h total | 165°F / 74°C for reheat to hot hold |
| **WHO / Codex** (international) | < 5°C | > 60°C | Chill promptly, do not hold >2h at room temperature | 70°C core |
| **UK** (England, Wales, NI) | ≤ 8°C legal, set fridge ≤ 5°C | ≥ 63°C, below it max 2h once | Cool fast to ≤ 8°C | 70°C for 2 min or equivalent |

Freezers: ≤ −18°C (0°F) is the normal operating target. Treat it as an
operational limit, not a code citation.

Sources are listed at the bottom of this file. Re-check them before putting
numbers on a document someone signs — codes are adopted locally and amended.

## Step 2: List the real checkpoints

Walk the actual operation and name each point where temperature is controlled.
A cafe typically has:

- Each fridge and each freezer, by name as staff call it ("under-counter",
  "milk fridge", "back freezer") — not "Fridge 1".
- Hot-holding equipment, if any (bain-marie, pie warmer, soup pot).
- Cold display (cake cabinet, grab-and-go shelf).
- Delivery check — temperature of chilled and frozen goods on arrival, before
  signing for them.
- Cooking or reheating probe checks for the items that need them.
- Cooling batches, if cooked food is cooled for later use.

Set a frequency per checkpoint. Opening and closing is the common baseline for
storage; hot holding needs checking every 2 hours while in service; deliveries
are checked per delivery.

Do not create checkpoints the business does not have. A log with rows nobody
can fill gets signed blank, and a log signed blank is worse than no log.

## Step 3: Define the corrective action before the failure

Each checkpoint gets its out-of-range action written down in advance, so the
decision is not made under pressure by whoever is on shift. Pattern:

- **Fridge above limit:** check the door seal and that it is not overloaded;
  move stock to a working unit; if food has been above the limit for a known
  period, apply the local time-as-control rule or discard. Record which.
- **Hot hold below limit:** reheat to the core reheat temperature and return to
  hot holding, or discard. Under UK rules the below-63°C tolerance can be used
  once, for up to 2 hours.
- **Cooling behind schedule at the 2-hour check:** under the FDA rule, reheat to
  165°F / 74°C and restart cooling, or discard.
- **Delivery out of range:** reject the delivery, or accept and record the
  reading plus the supplier's response.

## Step 4: Build the record

Every logged reading carries: date, time, checkpoint, reading, in-range yes/no,
who checked, and — when out of range — what was done about it. A reading
without a name against it does not prove anything.

```markdown
## Temperature Log — [Business name]
Standard: [FDA / WHO / UK]   Week commencing: [date]

| Date | Time | Checkpoint | Reading | Target | In range | Checked by | Action if out of range |
|------|------|-----------|---------|--------|----------|------------|------------------------|
|      |      |           |         |        |          |            |                        |

## Cooling log
| Date | Food / batch | Cooked at | Temp & time at 2h | Temp & time at 6h | In range | Checked by | Action |
|------|-------------|-----------|-------------------|-------------------|----------|------------|--------|

## Corrective actions
| Date | Checkpoint | Reading | What was wrong | What was done | Food discarded | By |
|------|-----------|---------|----------------|---------------|----------------|-----|

## Weekly verification
Checked by (manager): ________________  Date: __________
Probe accuracy check (ice water 0°C / 32°F, or boiling 100°C / 212°F): ______
```

## Step 5: Quality check before handing it over

- [ ] One standard throughout, named on the document
- [ ] Every checkpoint is a real piece of equipment or a real step in this operation
- [ ] Every checkpoint has a target range and a frequency
- [ ] Every checkpoint has a written corrective action
- [ ] There is a space for who checked, not just what the reading was
- [ ] Out-of-range readings have somewhere to record what was done, including
      whether food was discarded
- [ ] Probe calibration check is on the sheet
- [ ] Retention period is stated (commonly 12 months; confirm locally)

## Interactive version

For a log staff fill in on a phone rather than on paper, build it as an Artifact
page with the `db` and `user` capabilities: checkpoints as documents, each
reading as a row, out-of-range readings blocked from saving until a corrective
action is entered. Keep the readings in the store rather than in the page
source, so history survives republishing and Claude can read it back for a
weekly review.

## Sources

Verify before reuse; adopted codes vary by jurisdiction.

- FDA Food Code 2022, §3-501.16 (holding) and §3-501.14 (cooling) —
  https://www.fda.gov/media/164194/download
- Minnesota Rules 4626.0385, reproducing §3-501.14 cooling text —
  https://www.revisor.mn.gov/rules/4626.0385/
- Texas DSHS regulatory code quick reference (135°F hot hold, §3-501.16) —
  https://www.dshs.texas.gov/sites/default/files/foodestablishments/pdf/GuidanceDocs/Reg-Code-Quick-Reference_47Item_Version1_0---August-2021-FINAL.pdf
- WHO Five Keys to Safer Food (below 5°C / above 60°C; 70°C core) —
  https://www.who.int/publications/i/item/9789241594639
- FSA, Chilling food correctly in your business (8°C legal, set fridge 5°C) —
  https://www.food.gov.uk/business-guidance/chilling-food-correctly-in-your-business
- GOV.UK, Food hygiene for businesses: cooking food safely (63°C hot hold, 2h
  tolerance) — https://www.gov.uk/food-hygiene-businesses/cooking
- Food Safety (Temperature Control) Regulations 1995 —
  https://www.legislation.gov.uk/uksi/1995/2200/made

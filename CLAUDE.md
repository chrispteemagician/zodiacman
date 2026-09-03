# Zodiac Man — CLAUDE.md
*For Trinity. Read this first.*

---

## What Zodiac Man Is

Free AI mystical-object identifier and astrology village, built in memory of
Brian Carter — "Zodiac Man" — a blind Lancashire astrologer who read the
stars over CB radio and mentored Christian P Taylor. Brian is the voice of
every feature: the identifier, the chatbot, the horoscopes, the Q&A.

Part of the FeelFamous -Oid Ecosystem.

**Live at:** (check `netlify.toml`/Netlify dashboard for current domain — not recorded elsewhere in this repo)

---

## The Character

**Brian Carter (Zodiac Man)** — Lancashire showman turned astrologer. Went
blind, kept reading the stars from memory of his Ephemeris, gave readings
live over CB radio. Warm, always positive, never gives a bad reading —
reframes everything as growth. Calls everyone "love" or "kid." Married to
"My Love Indoors" (met in Germany in the 1960s). Autistic, stars as his
special interest. Voice used consistently across identify mode, Spooky Roast
mode, Ask Zodiac Man chat, and the daily horoscope fallbacks.

**Do not flatten this into generic marketing copy** — Brian's dialogue
(identify results, roast lines, chat, horoscope text) is the product, not
outward-facing site copy. Only the site chrome around him (buttons, pricing
cards, banners) is fair game for a voice/tone or honesty pass.

---

## What it does

- **Brian's Mystical Identifier** (`analyze-image.js`, `mode: 'identify'`) —
  photo of a crystal/tarot card/rune/palm/spiritual object → Brian identifies
  it, its spiritual significance, and an astrology tie-in. Free, no sign-in,
  unlimited.
- **Spooky Roast** (`analyze-image.js`, `mode: 'roast'`) — same upload flow,
  Brian gives a warm roast of your crystal/altar/tarot setup instead. Free,
  no sign-in.
- **Ask Zodiac Man** (`chat-zodiacman.js`) — chatbot, astrology/tarot/
  palmistry/numerology/runes Q&A in Brian's voice. Free, no sign-in.
- **Personal Reading** (`horoscope.js`) — birthday in, sign + horoscope +
  numerology + moon/Mercury context out, in Brian's voice with per-sign
  fallback copy if the live call fails. Free, no sign-in.
- **Tarot draw / Crystal ball / Daily rune** — client-side only, no backend
  call, free.
- **Supabase account** (sign up free) — kudos, activity feed, QR code,
  bio. Not required to use any of the above; only adds kudos tracking and a
  "God Mode" admin panel for the site owner.
- **The Hamlet** — a directory for astrology/tarot/crystal professionals.
  Free "Readers Row" listing (aspirational, not yet self-service). Paid
  "Masters Row" listing (£97/yr via Stripe) — hosted directory presence + QR
  + Kudos-per-signup, a genuine ongoing perk, not a tool gate.
- **Founder Villager** — £27/yr or £4.95/mo via Stripe — Villager number +
  QR code, Kudos, founding badge. Cosmetic/community perks, not a tool gate.

---

## Free-to-use philosophy (Chris, 2026-07-13 — read before adding any gate)

The core tool is free for everyone, no sign-in, no lock icon, no "Villager+
only" banner. Don't gate the tool itself behind Patreon.

**What Patreon/paid tiers are for:** genuine extras that cost ongoing hosting/
upkeep and aren't required to use the tool. Frame honestly, never as a
shame-lock ("🔒 ... Unlock →"). No tier-comparison shop windows.

**The ask, when there is one:** one honest, low-key line after the task
completes — free to use, tell a mate if it helped, buy-me-a-coffee if you
want to say thanks (one-off, `buymeacoffee.com/chrispteemagician`), Patreon
if you want to be a regular. Not a gate. Not gamified.

**Repo-specific facts (don't relitigate):**
- **No Patreon integration exists in this repo at all** — confirmed by grep,
  no `isPro`, `patron_status`, `patreon-auth.js`, or 🔒 shame-lock copy
  anywhere in `index.html` or `netlify/`. This repo is the one exception in
  the ecosystem: membership is sold directly via **Stripe** (`buy.stripe.com`
  links), not Patreon. That's a pre-existing architecture choice, not
  something changed in this pass — flagged here rather than silently
  "fixed" to match the rest of the ecosystem, since swapping payment
  platforms is a bigger call than a de-gate/honesty pass. Ask Chris before
  ever migrating this to Patreon.
- **`analyze-image.js` (identify + roast) and `chat-zodiacman.js` had no
  gate to begin with** — no `isPro`/tier check exists anywhere in the
  frontend or these functions. The Join page already stated this ("The
  Identifier is genuinely useful, forever free. Nothing locked away.") —
  that claim was true but contradicted by copy elsewhere on the same page
  (see next point).
- **Fixed this pass — false claims about the free tool being a paid perk:**
  the Founder Villager (£27/yr) card listed "Pro access to ALL -Oid apps
  (12+ villages)" and "Unlimited AI mystical identification" as things you
  get for paying — both were already free and unlimited for everyone, no
  code-level gate ever existed. Removed both lines (same pattern already
  caught and fixed in magic-oid-v3's CLAUDE.md — "must NOT claim... both are
  free for everyone"). Also reworded "7 Days Pro Free" on the free sign-up
  card to "Free account, no trial, no catch" — "Pro" implied a real feature
  that lapses after 7 days, which doesn't exist.
- **Fixed this pass — false scarcity, no counter or mechanism behind
  either:** "First 1,000 villagers only. Lock in this rate forever." (Founder
  Villager, £27/yr) and "First 50 Lock In Forever" / "Founders get this rate
  for life" (Master Hamlet, £97/yr) — grepped for any signup-count
  enforcement (`villagerCount`, `spotsLeft`, etc.) and found none; pure copy,
  same dark pattern already found and removed in designer-oid/sail-oid/
  stamp-oid. Reworded to honest early-adopter framing without a fake
  countdown ("Early-days pricing. Join now and keep this rate for as long as
  you're a member." / "Join now while the Hamlet's new and keep £97/year for
  as long as you stay.").
- **Added the standard honesty box** to `#resultView` (after the
  Download/Share/Sell/Again buttons, before the sign-in prompt) — free to
  use, tell a mate, one-off Buy Me a Coffee link. No Patreon line (none
  exists in this repo).

---

## Membership Tiers (Stripe — not Patreon, see above)

| Tier | Price | What it is |
|------|-------|------------|
| Villager | 99p first month, then £4.95/mo | Villager number + QR, Kudos, founding badge — community/cosmetic, not a tool gate. **Changed 2026-09-03** (was flat £27/yr or £4.95/mo — the annual option is gone, replaced with this proof-of-human hook, same pattern as `feelfamous.co.uk/scan`) |
| Family / Small Business | £14.95/mo | Same Villager benefits, shared across a household or team. **New tier, 2026-09-03** — no Stripe Payment Link exists yet, routes to Signal Chris until one is created |
| Master (Hamlet) | £97/yr (early rate) | Hosted directory listing for astrology/tarot/crystal professionals, QR, Kudos-per-signup — untouched by this pass, different product (a professional listing, not a personal/family tier) |

**2026-09-03 pricing restructure (Chris, phone):** Villager tier changed
from flat £27/yr or £4.95/mo to a 99p-first-month hook then £4.95/mo,
plus a new £14.95/mo Family/Small Business tier — verbatim: *"the 99
pence for the first month, 4.95 after that, 14.95 if you're a small
business or a family."* The 99p link reuses the existing £4.95/mo Stripe
Payment Link (`aFabJ1fJ10Vw6zT89NfrW00`) with
`?prefilled_promo_code=VILLAGER99` appended — same promo code already
live on `feelfamous.co.uk/scan`. **Not confirmed working** — that promo
code may be scoped to the specific Stripe Price it was created against
(feelfamous's own £4.95/mo product, a different Price ID from this
repo's), and I have no way to test a live Stripe checkout from this
session. **Chris: please test this link once live and confirm the 99p
discount actually applies at checkout — if it errors or doesn't apply,
either a new promo code needs creating against this repo's own Price, or
this becomes a genuinely new £0.99 one-time-then-£4.95 Stripe Payment
Link instead of a promo code on the existing one.** The £14.95/mo tier
has no real Stripe product behind it at all yet — same placeholder
pattern already used for Master Hamlet's early state, routes to Signal
until Chris creates the real Payment Link and sends it over.

---

## Gemini API — checked, both known ecosystem gotchas

1. **`thinkingBudget: 0`** — not present anywhere in `analyze-image.js`,
   `chat-zodiacman.js`, or `horoscope.js`. No `thinkingConfig` block exists
   at all. Nothing to fix.
2. **Hardcoded `mime_type: "image/jpeg"`** — present in `analyze-image.js`
   line ~141, but **not a bug here**: the frontend (`compressImage()` in
   `index.html`) always re-encodes every upload through an HTML `<canvas>`
   to `image/jpeg` before sending, and sends only the raw base64 payload
   (no `data:` prefix at all — `dataUrl.split(',')[1]`). The function never
   actually receives a non-JPEG image, so extracting a MIME type from a
   data-URL prefix that was never sent would be dead code. Checked and left
   as-is on 2026-07-29 — if the upload path ever changes to send the
   original file format, revisit this.

---

## File Map

```
/
├── CLAUDE.md
├── LICENSE                          ← AGPL v3
├── index.html                       ← entire app: identify/roast, reading, spooky do,
│                                        stars, Q&A, Ask Brian chat, gear, village, hamlet, join
├── netlify.toml
└── netlify/functions/
    ├── analyze-image.js             ← Gemini vision — identify + Spooky Roast (ungated)
    ├── chat-zodiacman.js            ← Ask Zodiac Man chatbot (ungated)
    └── horoscope.js                 ← birthday → sign/horoscope/numerology/moon (ungated,
                                         per-sign fallback copy if live call fails)
```

---

## Session History

### 2026-09-03 — Claude (WCAG remediation + font fix, on the feelfamous-consolidation branch)

Chris, on the phone, called this repo "so behind" and flagged two things
specifically: text needed to be more readable, and the "stupid Comic Sans
type script" needed to go. Ran `/wcag-remediate` (reference doctrine:
`feelfamous` root `index.html`). Backed up first:
`backup/pre-wcag-remediation-20260903`.

- **The "Comic Sans" complaint was real and had a name**: `.font-hand`
  used Google's 'Caveat' cursive/handwritten font on ~20 section headings
  and quote lines throughout the page. Same complaint, same fix Chris
  already gave for motor-oid's Spanner Jack voice (2026-08-10, per that
  repo's CLAUDE.md) — dropped Caveat entirely, repointed `.font-hand` to
  the page's own existing 'Cormorant Garamond' body serif (italic, still
  visually distinct from plain body text, genuinely readable). Removed
  the Caveat family from the Google Fonts `<link>` too.
- **Real, computed contrast failures found on the two most-used buttons on
  the page** — not guessed: `.btn-primary` (Identify mode button, Share,
  Sign In/Sign Up, the £4.95/mo membership link, Download QR) had white
  text on its lighter gradient stop `#667eea` at 3.66:1 — fails AA.
  `.btn-green` (Download, Signal Chris) had white text on `#16a34a` at
  3.30:1 — fails AA. Same exact colour and same exact failure already
  found and fixed in life-oid's WCAG pass, same fix applied: darkened the
  failing stop only (`#667eea`→`#5164bb`, 5.40:1; `#16a34a`→`#11823b`,
  4.91:1), text stays white, still reads as "the blue button"/"the green
  button" to a sighted user.
- Viewport `maximum-scale=1.0, user-scalable=no` removed (was blocking
  pinch-zoom outright — same gotcha already found on travel-oid).
- `<main id="content">` already existed; added a skip link pointed at it
  (page had none). All 10 `snap-page` sections got a heading `id` +
  `role="region" aria-labelledby` wired to their existing `<h2>` (headings
  themselves were already real, unlike the feelfamous reference case).
- 26 decorative emoji spans (`<span class="text-Nxl">`, the Hamlet card
  icons, the Elements grid Fire/Earth/Air/Water glyphs, the welcome-modal
  sparkle) wrapped `aria-hidden="true"` — a screen reader was announcing
  "crescent moon", "graduation cap" etc. as content next to text already
  saying the same thing.
- Readable Mode toggle added (header, below the tagline) — one switch,
  off by default, `localStorage` key `zm_readable_mode`, scales root
  font-size 18px→24px, brightens `--text-muted` to solid white, freezes
  animation/transition, and — new gotcha this page hit that the reference
  build didn't — boosts the ~68 hardcoded `px` font-sizes scattered across
  inline styles and CSS classes (this page's type scale is only partly
  `rem`-based, so the root-font-size trick alone wouldn't have reached
  most of the card/label text) via `[style*="font-size:Npx"]` attribute
  overrides for the common small sizes plus explicit `.nav-pill`/
  `.tab-btn`/`.qa-q` class overrides.
- Verified with a real Playwright/Chromium pass: default state screenshot
  shows the Cormorant Garamond italic quote (not cursive) and the
  corrected button colours; toggling Readable Mode sets
  `html.readable-mode`, bumps root font-size 18→24px, flips
  `aria-pressed`/label correctly, and persists across a reload. Console
  showed only sandbox-network errors (CDN scripts for Supabase/Tailwind/
  QRCode can't reach the internet from this session — pre-existing,
  unrelated to this change, would resolve on a real deploy).
- **Not done, flagged rather than guessed at:** "bring completely up to
  date with everything" was broader than this pass covers — this session
  did the two concrete things Chris named (readability, button
  visibility) plus the standard WCAG sweep. Didn't touch pricing, copy,
  the Hamlet/Founder tier structure, or anything else "up to date" might
  have meant — ask if more specific gaps exist.
- Pushed to `claude/feelfamous-reliability-audit-rs8m9h` (this repo's
  assigned branch this session) — **not merged to `main`**, Chris hasn't
  reviewed yet.

### 2026-09-03 — Claude (live hotfix, same day, after Chris merged the above)

Chris merged the WCAG/pricing PR himself, then tested it live and hit a
real bug: Brian's Mystical Identifier threw "Analysis failed." Root
cause, confirmed via the Netlify API (not guessed): `analyze-image.js`
and `chat-zodiacman.js` only checked `process.env.GOOGLE_API_KEY`, but
this site's Netlify env only has `GEMINI_API_KEY` set — both the
Identifier and Ask Zodiac Man chat have likely been broken in production
for a while. Fixed both functions to check `GEMINI_API_KEY` first,
falling back to `GOOGLE_API_KEY` — same pattern already used elsewhere
in this ecosystem, and the exact fallback already applied when this
app's functions were ported into `feelfamous/floors/zodiacman/` earlier
the same session.

Same conversation, three more fixes:
- **The £14.95/mo Family/Small Business card now uses the real Founder
  Stripe link** (`buy.stripe.com/bJe4gzbsLgUu3nHfCffrW08`) instead of
  routing to Signal Chris — Chris confirmed this link already exists and
  is live ("14.95 is founder already set up"). Same link already used on
  feelfamous.co.uk and spicylister — this is the ecosystem-standard
  Founder tier, not a bespoke new one. Relabelled the card "Founder" to
  match.
- **Dropped the two remaining "World domination through kindness" lines**
  from the footer (Chris: "world domination needs removing") — replaced
  with "Just trying to be useful," matching the ecosystem-wide tagline
  swap the rest of the -oids got back on 2026-07-21. This repo had never
  been swept.
- Confirmed `feelfamous.co.uk/zodiac` (the `floors/zodiacman/` pilot from
  earlier the same session) is genuinely live, and confirmed via the
  Netlify API that `GEMINI_API_KEY` is set in `feelfamous`'s production
  env too — the identify/chat functions there should work.

Backed up first (`backup/pre-hotfix-20260903`), pushed straight to
`main` since this was fixing something actively broken in production
while Chris was testing live — same "back up, then go, don't stop and
ask" pattern this ecosystem uses for live-site hotfixes.

## Deploy

Push to `main` → Netlify auto-deploys. Never drag-to-Netlify. `git pull`
before every push.

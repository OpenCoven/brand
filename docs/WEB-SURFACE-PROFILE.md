# OpenCoven web surface profile v1.0.0

**Status:** stable for public web consumers  
**Owner:** `OpenCoven/brand`  
**Consumers:** static sites, documentation, social/OG composition, and product marketing surfaces  
**Normative artifacts:** `web/profile.json`, `web/profile.css`, and `web/assets/mark.svg`

This profile turns OpenCoven's identity and voice into a versioned, framework-neutral contract. It is visual identity—not production component behavior. Interaction semantics remain owned by `OpenCoven/ui`; product behavior remains owned by the corresponding product repository.

## Canonical identity

The canonical mark is the flat, symmetric crown/lotus form at `web/assets/mark.svg`. It uses `currentColor` so a consumer can render one monochrome mark against a high-contrast field.

Do not use the retired hood, crescent, trident, torch, or COMUX-era sigils as current OpenCoven identity. Do not add gradients, glow, smoke, sparkles, bevels, or texture to the mark.

- Minimum digital mark: 16 px; prefer 24–32 px in navigation.
- Clear space: at least one central-aperture width on every side.
- Wordmark: live text set in the display role. Do not stretch, outline, or recreate the name as decorative geometry.
- Lockup: mark first, wordmark second, separated by `--oc-space-2`.
- Favicon: mark alone on one high-contrast field.
- OG/social: one mark, one concise message, generous negative space, and descriptive alt text.

## Surface hierarchy

1. `--oc-bg`: page field.
2. `--oc-surface-1`: primary reading or decision surface.
3. `--oc-surface-2`: grouped secondary content.
4. `--oc-surface-3`: selected, nested, or high-density technical surface.
5. `--oc-border` / `--oc-border-strong`: structural separation, not decoration.

Violet is the identity/action anchor, not a universal status color. Presence, action, success, pending/reconciling, blocked/rejected, and neutral evidence each have distinct semantic tokens and must also carry text, icon, shape, or weight.

## Theme contract

Apply `data-oc-theme="light"`, `dark`, or `system` to `<html>`. Omitting the attribute behaves like `system`.

- Light and dark palettes are both first-class.
- The initial theme must be determined before first paint when a user preference exists.
- A theme control exposes three named states—not an ambiguous sun/moon-only toggle.
- Forced-colors mode delegates action, focus, and borders to system colors.
- No information may depend on a particular theme.

All text/control contrast pairs listed in `web/profile.json` are validated at 4.5:1 or stronger; primary reading text targets 7:1.

## Typography

- **Display:** Geist/Inter/system; identity statements, section headings, product names.
- **Reading:** Inter/system; prose, navigation, controls, policy.
- **Utility/mono:** SF Mono/system mono; commands, identifiers, evidence, revisions.
- Body copy: `--oc-type-0`, `--oc-leading-reading`, and a 60–68 ch measure.
- Technical receipts may use up to `--oc-technical-measure`.
- Labels use `--oc-type--1`, weight, and `--oc-tracking-label`; do not shrink essential information below readable size.

## Spacing, density, radius, and elevation

The exported scale is 4/8/12/16/24/32/48/64/96 px. Use 48–96 px vertical bands for narrative sections, 16–24 px inside evidence panels, and 8–16 px between related actions.

Radii are exactly 4/8/12/16 px. Choose one radius by hierarchy; do not invent route-local scales. Shadows are quiet separation. Avoid luminous violet glow around ordinary controls or cards.

## Action hierarchy

A decision surface may have one filled action. Secondary and quiet actions remain outlined or text-like. Violet indicates an action or identity anchor only where the accompanying semantics are clear.

## Status and maturity

- **Available / verified:** green semantic treatment plus a check or explicit label.
- **Beta / reconciling / stale:** amber semantic treatment plus explicit wording.
- **Blocked / rejected / unavailable:** red semantic treatment plus explicit wording.
- **Experimental / protocol direction / planned / archived:** neutral evidence treatment plus the exact maturity term.
- **Presence:** violet treatment plus “connected,” “active embodiment,” or equivalent text.

Never use a colored dot alone. Never display unavailable proof as zero-valued negative social proof.

## Motion and imagery

Motion clarifies causality, relationship, or state. Decorative looping is optional and subordinate.

- Fast: 120 ms; standard: 180 ms; slow: 320 ms.
- Reduced motion removes translation, scale, parallax, autoplay, and loops while preserving immediate state feedback.
- Screenshots must be current, date/revision attributed, and truthfully labeled.
- Diagrams should clarify identity → authority → orchestration → runtime → product boundaries.
- WebGL/3D is progressive enhancement only: local, gated, pauseable, and never the sole carrier of information.

## Voice

Clear, technically grounded, emotionally resonant, never fake-mystical. “Familiar,” “coven,” “threads,” and related language must immediately clarify architecture, authority, evidence, or behavior.

Do not imply legal ownership, personhood, fiduciary status, unrestricted agency, or continuity beyond implemented evidence.

## Specimens

`web/specimen.html` demonstrates:

- global navigation and lockup;
- hero/conceptual section and static ward;
- one-filled-action hierarchy;
- product card and protocol boundary;
- status/maturity treatments;
- command block;
- technical evidence receipt;
- responsive behavior down to 320 px;
- light/dark/system and reduced-motion compatibility through the exported tokens.

The specimen is an identity reference, not a production component implementation.

## Versioning

- Patch: documentation corrections or value-preserving additions.
- Minor: backward-compatible tokens/assets/specimens.
- Major: removed/renamed tokens, changed canonical mark, or meaningfully changed semantic roles.

Consumers pin an immutable commit or release and run a byte/semantic canary before updating.

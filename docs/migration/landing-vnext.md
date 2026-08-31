# Migrating public web surfaces to web profile v1

## Replace private token sets

Import `web/profile.css` once at the start of the consumer's global cascade. Remove page-local copies of brand colors, typography roles, spacing scales, radii, and status colors. Consumer-only layout tokens may remain namespaced to that consumer.

The former `ui/color-tokens.css` and `ui/typography.css` paths now forward to the profile for compatibility; new consumers should use `web/profile.css` directly.

## Theme migration

Replace route-specific theme attributes with `data-oc-theme="light|dark|system"` on `<html>`. Store only the preference; let system mode continue to respond to operating-system changes.

## Mark migration

Use `web/assets/mark.svg`. Retire hood/crescent/trident-era marks and decorative logo treatments from current surfaces. Consumer alt text belongs on the surrounding link or image usage; the raw SVG is intentionally unopinionated.

## Status migration

Map existing states by meaning, not by color:

- active embodiment → presence;
- completed and verified → success;
- waiting/stale/reconciling → pending;
- failed/rejected/unavailable → blocked;
- experimental/planned/archived/unknown → evidence.

Every state requires visible wording or another non-color cue.

## Landing-specific removals

- Eliminate route-local violet scales and historical gradients/glow.
- Replace multiple radius systems with 4/8/12/16 px.
- Replace private font stacks with exported roles.
- Keep 3D/WebGL outside the render-critical path and preserve a complete static ward.
- Treat product maturity as explicit content, not visual atmosphere.

# OpenCoven Brand

The official source of truth for OpenCoven's visual identity, voice, and brand system.

> If it carries the Coven's name, it should look, sound, and feel like it belongs here.

---

## What's in this repo

| Folder | What it holds |
|--------|---------------|
| [`DESIGN.md`](./DESIGN.md) | Canonical design direction: Arcane Field Manual — palette, type, surfaces, motion, voice. |
| [`logo/`](./logo) | Wordmarks, marks, and monoline variants in SVG. |
| [`icons/`](./icons) | System icons (gateway, agents, tools, workflow). |
| [`social/`](./social) | Banners, avatars, OG images for X, GitHub, Discord, etc. |
| [`ui/`](./ui) | Design tokens — `color-tokens.css`, `typography.css`. |
| [`docs/`](./docs) | Usage guidance — how to apply the brand in the wild. |

---

## Quick reference

**Palette (core):**
- Ink Black `#050409`
- Charcoal Glass `#111018`
- Smoky Panel `#191622`
- Deep Plum `#3B164F`
- **Coven Violet `#8E3DFF`** ← brand anchor
- Ritual Purple `#A855F7`
- Orchid Glow `#D26BFF`
- Amethyst Mist `#C9A7FF`
- Manual Paper `#E8E0F0`

**Avoid as brand color:** periwinkle, indigo, electric blue-violet, any blue glow. Blue is reserved for explicit actionable/system states.

**Typography:** see [`ui/typography.css`](./ui/typography.css).

**Voice:** clear, technically grounded, emotionally resonant, never fake-mystical. The magic framing should clarify the architecture, not obscure it.

For the full direction, read [`DESIGN.md`](./DESIGN.md).

---

## Using this repo

- **Need a logo or asset?** Pull from this repo, not from screenshots or older Coven repos.
- **Building a Coven surface (docs site, app, social)?** Wire in `ui/color-tokens.css` and follow `DESIGN.md`.
- **Writing for OpenCoven?** Check `docs/BRAND-USAGE.md` before publishing.

---

## Contributing

Brand evolution happens deliberately. If you want to propose a change:

1. Open an issue describing the change and why.
2. For visual changes, include before/after.
3. Brand decisions are reviewed by Val and the brand familiars before landing.

Small fixes (typos, broken asset links, missing alt text) — open a PR directly.

---

## License

Brand assets (logos, marks, icons, banners) are **© OpenCoven** and may only be used in accordance with `docs/BRAND-USAGE.md`. Tokens, type scales, and documentation are released under the same terms as the rest of the OpenCoven ecosystem unless noted otherwise.

---

Maintained by the Coven ✦

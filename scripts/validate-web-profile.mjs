import { readFile, readdir } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const webRoot = new URL('../web/', import.meta.url);
const [manifestSource, css, specimenCss, mark, specimen, docs, pkgSource, webEntries] =
  await Promise.all([
    read('web/profile.json'),
    read('web/profile.css'),
    read('web/specimen.css'),
    read('web/assets/mark.svg'),
    read('web/specimen.html'),
    read('docs/WEB-SURFACE-PROFILE.md'),
    read('package.json'),
    readdir(webRoot, { withFileTypes: true }),
  ]);
const manifest = JSON.parse(manifestSource);
const pkg = JSON.parse(pkgSource);
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const rootWebFiles = webEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
const forbiddenParallelAliases = rootWebFiles.filter((name) =>
  ['tokens.css', 'tokens.json'].includes(name),
);
assert(
  forbiddenParallelAliases.length === 0,
  `parallel web-profile aliases are forbidden: ${forbiddenParallelAliases.join(', ')}`,
);

const canonicalManifestFiles = [];
for (const name of rootWebFiles.filter((entry) => entry.endsWith('.json'))) {
  let candidate;
  try {
    candidate = JSON.parse(await readFile(new URL(name, webRoot), 'utf8'));
  } catch {
    continue;
  }
  const identifiesWebProfile =
    candidate?.schemaVersion === 'opencoven.brand-web-profile/v1' ||
    typeof candidate?.profileVersion === 'string' ||
    (typeof candidate?.profile === 'string' && candidate.profile.startsWith('opencoven.'));
  const claimsAuthority = candidate?.status === 'stable' || candidate?.status === 'canonical';
  if (identifiesWebProfile && claimsAuthority) canonicalManifestFiles.push(name);
}
assert(
  canonicalManifestFiles.length === 1 && canonicalManifestFiles[0] === 'profile.json',
  `exactly one canonical web-profile manifest is allowed at web/profile.json; found: ${canonicalManifestFiles.join(', ') || '(none)'}`,
);

assert(manifest.schemaVersion === 'opencoven.brand-web-profile/v1', 'schemaVersion must be v1');
assert(/^\d+\.\d+\.\d+$/.test(manifest.profileVersion), 'profileVersion must be semver');
assert(pkg.version === manifest.profileVersion, 'package and profile versions must match');
assert(pkg.exports['./web/profile.css'] === './web/profile.css', 'profile CSS export is missing');
assert(pkg.exports['./web/profile.json'] === './web/profile.json', 'profile manifest export is missing');
assert(pkg.exports['./web/assets/mark.svg'] === './web/assets/mark.svg', 'canonical mark export is missing');

const requiredTokens = [
  'oc-bg',
  'oc-surface-1',
  'oc-surface-2',
  'oc-surface-3',
  'oc-text',
  'oc-text-muted',
  'oc-text-subtle',
  'oc-border',
  'oc-border-strong',
  'oc-action',
  'oc-action-hover',
  'oc-on-action',
  'oc-focus',
  'oc-presence',
  'oc-on-presence',
  'oc-success-bg',
  'oc-success-text',
  'oc-pending-bg',
  'oc-pending-text',
  'oc-blocked-bg',
  'oc-blocked-text',
  'oc-evidence-bg',
  'oc-evidence-text',
];
for (const theme of ['light', 'dark']) {
  for (const token of requiredTokens) {
    const value = manifest.themes[theme]?.[token];
    assert(/^#[0-9a-f]{6}$/i.test(value ?? ''), `${theme}.${token} must be a six-digit hex color`);
    assert(
      css.toLowerCase().includes(`--${token}: ${value?.toLowerCase()};`),
      `${theme}.${token} is not exported by CSS`,
    );
  }
}

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  const value = hex.slice(1);
  const r = channel(Number.parseInt(value.slice(0, 2), 16));
  const g = channel(Number.parseInt(value.slice(2, 4), 16));
  const b = channel(Number.parseInt(value.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}
for (const pair of manifest.contrastPairs) {
  const theme = manifest.themes[pair.theme];
  const ratio = contrast(theme[pair.foreground], theme[pair.background]);
  assert(
    ratio + Number.EPSILON >= pair.minimum,
    `${pair.theme} ${pair.foreground}/${pair.background} is ${ratio.toFixed(2)}; requires ${pair.minimum}`,
  );
}

assert(mark.includes('viewBox="0 0 212 212"'), 'canonical mark viewBox drifted');
assert(mark.includes('fill="currentColor"'), 'canonical mark must be monochrome currentColor');
assert(!/(gradient|filter|mask|image)/i.test(mark), 'canonical mark must stay flat and dependency-free');

for (const id of [
  'global-navigation',
  'hero-and-ward',
  'action-hierarchy',
  'product-card',
  'status-badges',
  'command-block',
  'technical-receipt',
]) {
  assert(specimen.includes(`data-specimen="${id}"`), `missing specimen: ${id}`);
}
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'reduced-motion export is missing');
assert(css.includes('@media (forced-colors: active)'), 'forced-colors export is missing');
assert(specimenCss.includes('@media (max-width: 26.875rem)'), '320–430 px specimen coverage is missing');
assert(docs.includes('Do not imply legal ownership'), 'voice/legal safety rule is missing');
assert(docs.includes('WebGL/3D is progressive enhancement only'), '3D/WebGL rule is missing');
assert(
  docs.includes('Exactly one canonical public-web profile'),
  'single-authority policy is missing from the web profile documentation',
);

if (failures.length > 0) {
  throw new Error(
    `Web profile validation failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`,
  );
}
console.log(
  `Validated OpenCoven web profile ${manifest.profileVersion}: ${requiredTokens.length * 2} theme tokens, ${manifest.contrastPairs.length} contrast pairs, and one canonical authority.`,
);

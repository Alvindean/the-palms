// The Palms - static build.
// Pulls content from Sanity if SANITY_PROJECT_ID is set, otherwise from /content/*.json.
// Bakes content into a plain content.js so the live site makes ZERO runtime fetches of its
// own content. Transpiles JSX -> JS (no in-browser Babel).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const presetReact = require.resolve('@babel/preset-react');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const JSX = ['tweaks-panel.jsx', 'palms.jsx', 'nav.jsx', 'app.jsx', '_shared.jsx', 'pages/massagens.jsx', 'pages/massagistas.jsx'];
const HTML = ['index.html', 'massagens.html', 'massagistas.html'];
const STATIC = ['styles.css', 'nav.css', 'pages.css', 'sitemap.xml', 'robots.txt', 'llms.txt'];
const HOMEPAGE_KEYS = ['hero', 'guardian', 'og', 'feature1', 'feature2', 'feature3', 'feature4',
  'gallery1', 'gallery2', 'gallery3', 'gallery4', 'gallery5', 'gallery6', 'gallery7', 'gallery8'];

function rmrf(p) { try { fs.rmSync(p, { recursive: true, force: true }); } catch (e) { /* mount may forbid unlink; files are overwritten in place */ } }
function cp(a, b) { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); }
function cpDir(a, b) { fs.cpSync(a, b, { recursive: true }); }
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function localTherapists() { return readJson(path.join(ROOT, 'content', 'therapists.json')); }
function localHomepage() { return readJson(path.join(ROOT, 'content', 'homepage.json')); }

async function loadContent() {
  if (process.env.SANITY_PROJECT_ID) {
    console.log('- content source: Sanity (' + process.env.SANITY_PROJECT_ID + ')');
    const { createClient } = await import('@sanity/client');
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
      token: process.env.SANITY_TOKEN || undefined,
    });
    const homeProj = HOMEPAGE_KEYS.map(function (k) { return '"' + k + '": ' + k + '.asset->url'; }).join(', ');
    const homepage = (await client.fetch('*[_type=="homepage"][0]{' + homeProj + '}')) || {};
    const therapists = await client.fetch(
      '*[_type=="therapist"]|order(order asc, _createdAt asc){name, tag, touch, years, size, "img": photo.asset->url}'
    );
    const local = localHomepage();
    for (const k of HOMEPAGE_KEYS) if (!homepage[k]) homepage[k] = local[k];
    return { homepage, therapists: (therapists && therapists.length) ? therapists : localTherapists() };
  }
  console.log('- content source: local /content/*.json (Sanity not configured)');
  return { homepage: localHomepage(), therapists: localTherapists() };
}

function transpile(file) {
  const code = fs.readFileSync(path.join(SRC, file), 'utf8');
  const out = babel.transformSync(code, {
    filename: file,
    sourceType: 'script',
    presets: [[presetReact, { runtime: 'classic' }]],
    compact: false,
    comments: false,
  }).code;
  const dest = path.join(DIST, file.replace(/\.jsx$/, '.js'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
}

function rewriteHtml(file) {
  let html = fs.readFileSync(path.join(SRC, file), 'utf8');
  html = html.replace(/<script src="https:\/\/unpkg\.com\/react@[^"]*\/umd\/react\.development\.js"[^>]*><\/script>/,
    '<script src="vendor/react.production.min.js"></script>');
  html = html.replace(/<script src="https:\/\/unpkg\.com\/react-dom@[^"]*\/umd\/react-dom\.development\.js"[^>]*><\/script>/,
    '<script src="vendor/react-dom.production.min.js"></script>');
  html = html.replace(/[ \t]*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[^>]*><\/script>\n?/, '');
  html = html.replace(/<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g, '<script src="$1.js"></script>');
  html = html.replace('<script src="vendor/react-dom.production.min.js"></script>',
    '<script src="vendor/react-dom.production.min.js"></script>\n  <script src="content.js"></script>');
  html = html.replace('</body>', '  <script defer src="/_vercel/insights/script.js"></script>\n</body>');
  fs.writeFileSync(path.join(DIST, file), html);
}

async function main() {
  rmrf(DIST); fs.mkdirSync(DIST, { recursive: true });
  const { homepage, therapists } = await loadContent();

  const contentJs =
    'window.CONTENT = ' + JSON.stringify({ images: homepage }) + ';\n' +
    'window.THERAPISTS = ' + JSON.stringify(therapists) + ';\n';
  fs.writeFileSync(path.join(DIST, 'content.js'), contentJs);
  console.log('- baked content.js: ' + Object.keys(homepage).length + ' image slots, ' + therapists.length + ' therapists');

  JSX.forEach(transpile);
  console.log('- transpiled ' + JSX.length + ' scripts');

  STATIC.forEach(function (f) { const s = path.join(SRC, f); if (fs.existsSync(s)) cp(s, path.join(DIST, f)); });
  cpDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
  cpDir(path.join(ROOT, 'vendor'), path.join(DIST, 'vendor'));

  HTML.forEach(rewriteHtml);
  console.log('- built ' + HTML.length + ' pages -> dist/');
  console.log('BUILD OK');
}
main().catch(function (e) { console.error('BUILD FAILED:', e); process.exit(1); });

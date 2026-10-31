// Build step 3 of 3 (see "build" in package.json). Renders every route from
// src/routes.js to static HTML with the SSR bundle, so crawlers and visitors
// without JS get the full page. Pure Node: no headless browser needed.
//
//   /             -> dist/index.html
//   /impressum    -> dist/impressum.html   (Cloudflare serves it at /impressum)
//   unknown URLs  -> dist/404.html         (served with status 404, see wrangler.jsonc)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, notFoundRoute, getHead } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
  ];
  if (head.robots) tags.push(`<meta name="robots" content="${esc(head.robots)}" />`);
  if (head.canonical) tags.push(`<link rel="canonical" href="${esc(head.canonical)}" />`);
  tags.push(
    `<meta property="og:title" content="${esc(head.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(head.ogDescription)}" />`,
  );
  if (head.ogUrl) tags.push(`<meta property="og:url" content="${esc(head.ogUrl)}" />`);
  tags.push(
    `<meta property="og:locale" content="${esc(head.ogLocale)}" />`,
    `<meta name="twitter:title" content="${esc(head.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(head.ogDescription)}" />`,
  );
  for (const data of head.jsonLd) {
    // "<" escaped so the JSON can never close the script tag early.
    const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-route-jsonld>\n${json}\n</script>`);
  }
  return tags.join('\n    ');
}

async function renderPage(route, outFile) {
  const appHtml = await render(route.path);
  const head = getHead(route);
  // Function replacers: a "$" in the content must not be read as a replace pattern.
  const page = template
    .replace(/<html lang="[^"]*">/, () => `<html lang="${esc(head.lang)}">`)
    .replace('<!--app-head-->', () => headTags(head))
    .replace('<div id="root"><!--app-html-->', () => `<div id="root" data-prerendered="${esc(route.path)}">${appHtml}`);
  if (page.includes('<!--app-html-->') || page.includes('<!--app-head-->')) {
    throw new Error(`Placeholder left in ${outFile}`);
  }
  fs.writeFileSync(path.join(distDir, outFile), page);
  console.log(`prerendered ${route.path.padEnd(24)} -> dist/${outFile}`);
}

for (const route of routes) {
  await renderPage(route, route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`);
}
await renderPage(notFoundRoute, '404.html');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const { canonical } = getHead(route);
    return `  <url>
    <loc>${canonical}</loc>
    <changefreq>${route.sitemap.changefreq}</changefreq>
    <priority>${route.sitemap.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`wrote dist/sitemap.xml (${routes.length} URLs)`);

fs.rmSync(ssrDir, { recursive: true, force: true });

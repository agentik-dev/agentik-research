// shots.mjs: screenshot every built page at four widths in light and dark,
// into .cache/shots/<page>.<width>.<scheme>.jpg (full page, cut at 6000 px).
//   node scripts/shots.mjs     PAGES=index,journal/ WIDTHS=390 SCHEMES=dark narrow it
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { CACHE, browser, pages, serve, slug } from './lib/site.mjs';

const list = (name, all) => (process.env[name] ? process.env[name].split(',') : all);
const WIDTHS = list('WIDTHS', ['390', '768', '1280', '1680']).map(Number);
const SCHEMES = list('SCHEMES', ['light', 'dark']);
const MAX = 6000;
const out = join(CACHE, 'shots');
if (!process.env.PAGES && !process.env.WIDTHS && !process.env.SCHEMES) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const site = await serve();
const chrome = await browser();
const todo = pages();
let n = 0;
for (const scheme of SCHEMES) {
  for (const width of WIDTHS) {
    const ctx = await chrome.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const p of todo) {
      await page.goto(site.url + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Mermaid draws after load; wait for each diagram's SVG.
      await page.waitForFunction(() => [...document.querySelectorAll('.mermaid')].every((m) => m.querySelector('svg') || m.shadowRoot), null, { timeout: 10000 }).catch(() => {});
      // Grow the viewport to the page, so the fixed canvas paints all of it
      // as it does while a reader scrolls; then shoot the viewport.
      const height = Math.min(MAX, await page.evaluate(() => document.documentElement.scrollHeight));
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(150);
      await page.screenshot({
        path: join(out, `${slug(p)}.${width}.${scheme}.jpg`),
        type: 'jpeg', quality: 72, animations: 'disabled',
      });
      await page.setViewportSize({ width, height: 900 });
      n++;
    }
    await ctx.close();
  }
}
await chrome.close();
await site.close();
console.log(`shots: ${n} screenshots of ${todo.length} pages in .cache/shots/`);

// utils/helpers.js
'use strict';

/**
 * Removes Google ad iframes and sticky footer banners that overlap
 * interactive elements on DemoQA pages.
 *
 * DemoQA injects several ad layers including:
 *   - #google_ads_iframe_* (ad banners in body)
 *   - #fixedban (sticky bottom-of-page ad)
 *   - footer (footer element overlapping submit button on smaller viewports)
 *
 * Call this AFTER navigating to the target page.
 *
 * @param {import('playwright').Page} page
 */
async function hideAds(page) {
  await page.evaluate(() => {
    // Remove fixed bottom ad banner
    const fixedBan = document.getElementById('fixedban');
    if (fixedBan) fixedBan.remove();

    // Remove page footer
    const footer = document.querySelector('footer');
    if (footer) footer.remove();

    // Remove all Google ad iframes
    document.querySelectorAll('[id^="google_ads_iframe"]').forEach(el => el.remove());
    document.querySelectorAll('.google-auto-placed').forEach(el => el.remove());
  });
}

/**
 * Scrolls an element into the center of the viewport before interacting.
 * Useful for DemoQA where ad banners cover the bottom of the page.
 *
 * @param {import('playwright').Locator} locator
 */
async function scrollIntoCenter(locator) {
  await locator.evaluate(el =>
    el.scrollIntoView({ block: 'center', inline: 'nearest' })
  );
}

/**
 * Custom delay function.
 * @param {number} ms - Milliseconds to wait
 */
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { hideAds, scrollIntoCenter, delay };

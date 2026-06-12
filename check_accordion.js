const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Block ads and analytics to prevent timeouts
  await page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('google-analytics') || 
        url.includes('googletagservices') || 
        url.includes('googleadservices') || 
        url.includes('googleads') || 
        url.includes('doubleclick') || 
        url.includes('adnxs') || 
        url.includes('amazon-adsystem') || 
        url.includes('pagead')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  try {
    await page.goto('https://demoqa.com/accordian', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(5000);
    const ids = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[id]')).map(el => el.id);
    });
    console.log('All found IDs on the page:', ids);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();

const puppeteer = require('puppeteer');

(async () => {
  
  // On soumet à puppeteer les configurations pour le navigateur qu'il va utiliser 
  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: false,  // Mode non-headless pour voir le navigateur ouvert
    executablePath: '/usr/bin/google-chrome',
    args: ['--start-maximized']  // Argument pour ouvrir le navigateur en mode plein écran
  });

  // Et maintenant, on envoie le robot sur la toile ! 

  // Puppeteer : ouvre une nouvelle page avec le navigateur configuré !
  const page = await browser.newPage();

  // Puppeteer : rend toi maintenant sur le site voyagespirates ! 
  await page.goto('https://www.momondo.fr/vols/paris/nouvelle-zelande#navbar-item-latest-deals');

  let bouttonAccepterTout = await page.waitForSelector("::-p-xpath(//button[.//div[contains(text(), 'Tout accepter')]])");
  bouttonAccepterTout.click();

  let allerSimple = await page.waitForSelector("::-p-xpath(//label[@data-text='Aller simple'])")
  allerSimple.click();
  await wait(500);

  let mainDivOffres = await page.waitForSelector("::-p-xpath(//div[@class='kml-row'])")

  const prices = await page.evaluate((mainDiv) => {
    
    const priceElements = mainDiv.querySelectorAll('span.Ze-l-price');
    
    return Array.from(priceElements)
      .map(el => el.innerText)
      .filter(text => text.includes('€'));
  }, mainDivOffres);

  console.log(prices);
  
  // On vire la caractère spécial € de tous les prix
  const cleanedPrices = prices.map(price => parseInt(price.replace(/[ €]/g, '').replace(/\s+/g, ''), 10));

  // On trouve le prix le moins élevé
  const minPrice = Math.min(...cleanedPrices);

  // ..et on l'affiche ! 
  console.log(minPrice);

  await wait(5000);

  await browser.close()
})();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

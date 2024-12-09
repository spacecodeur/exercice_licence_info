const puppeteer = require('puppeteer');

(async () => {
  
  // On soumet à puppeteer les configurations pour le navigateur qu'il va utiliser 
  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: false,  // Mode non-headless pour voir le navigateur ouvert
    // executablePath: '/usr/bin/google-chrome', linux matthieu
    args: ['--start-maximized']  // Argument pour ouvrir le navigateur en mode plein écran
  });

  // Et maintenant, on envoie le robot sur la toile ! 

  // Puppeteer : ouvre une nouvelle page avec le navigateur configuré !
  const page = await browser.newPage();

  // Puppeteer : rend toi maintenant sur le site duckduckgo ! 
  await page.goto('https://duckduckgo.com/');

  // Puppeteer : saisis 'coucou je suis un bot' dans la barre de recherche de duckduckgo !
  await page.type('#searchbox_input', 'méteo lyon');

  await wait(2000); // on attends chaque fois deux secondes pour pouvoir observer les manipulations sur le navigateur :) 

  // Puppeteer : maintenant, simule l'appuie sur la touche entrée du clavier !
  await page.keyboard.press('Enter');

  await wait(5000);

  // Puppeteer : prends un screenshot de la page affichant le résultat de ma recherche sur duckduckgo !
  await page.screenshot({ path: 'meteo_lyon_du_jour.png' });

  // Print the full title
  console.log("j'ai terminé !");

  await browser.close()
})();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
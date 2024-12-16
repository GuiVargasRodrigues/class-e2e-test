const { test, expect } = require('@playwright/test');

test('login com credenciais válidas', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('input[name="username"]', 'tomsmith');
  await page.fill('input[name="password"]', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  await expect(page.locator('div.flash.success')).toContainText('You logged into a secure area!');
});

test('login com credenciais inválidas', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('input[name="username"]', 'invaliduser');
  await page.fill('input[name="password"]', 'invalidpassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('div.flash.error')).toContainText('Your username is invalid!');
});

test('interagir com a tabela', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
  const firstRow = await page.locator('table#table1 tr:nth-child(1)');
  await expect(firstRow).toContainText('John Doe');
});

test('clique no link', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('a[href="/status_codes"]');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
});

test('teste de alerta simples', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await page.click('button:has-text("Click for JS Alert")');
  
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  await expect(page.locator('p')).toHaveText('You successfully clicked an alert');
});

import { expect, test } from '@playwright/test';

const pages = [
  ['Ramos', /\/ramos\/$/],
  ['Plantas', /\/plantas\/$/],
  ['Bodas', /\/bodas-y-eventos\/$/],
  ['Talleres', /\/talleres\/$/],
  ['Encargos', /\/encargos-y-entrega\/$/],
  ['La floristería', /\/la-floristeria\/$/],
  ['Contacto', /\/contacto\/$/],
] as const;

test('el menú recorre las páginas y cada una tiene un solo h1', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const [name, path] of pages) {
    await page.goto('./');
    await page.locator('.site-header').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  }
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await page.goto('aviso-legal/');
  await expect(page.getByRole('heading', { level: 1, name: 'Aviso legal' })).toBeVisible();
  await page.goto('privacidad/');
  await expect(page.getByRole('heading', { level: 1, name: 'Privacidad' })).toBeVisible();
  await page.goto('cookies/');
  await expect(page.getByRole('heading', { level: 1, name: 'Cookies' })).toBeVisible();
});

test('los filtros de ramos funcionan igual y condolencias no abre una página de funeral', async ({ page }) => {
  await page.goto('ramos/');
  await expect(page.locator('[data-filters]')).toHaveAttribute('data-hydrated', 'true');
  await expect(page.getByRole('link', { name: /Ciudad y campo/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Angela/ })).toBeVisible();

  await page.getByRole('radio', { name: 'Cumpleaños', exact: true }).click();
  await expect(page.getByRole('link', { name: /Ciudad y campo/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Angela/ })).toBeHidden();
  await expect(page).toHaveURL(/ocasion=cumpleanos/);

  await page.getByRole('radio', { name: 'Todas', exact: true }).click();
  await page.getByRole('radio', { name: 'Ramo de novia', exact: true }).click();
  await expect(page.getByRole('link', { name: /Angela/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Ciudad y campo/ })).toBeHidden();

  await page.getByRole('radio', { name: 'Todos', exact: true }).click();
  await page.getByRole('radio', { name: 'Condolencias', exact: true }).click();
  await expect(page.getByText(/no tiene página propia/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Angela/ })).toBeHidden();
  await expect(page).not.toHaveURL(/funeral|condolencias\//);

  await page.getByRole('radio', { name: 'Todas', exact: true }).click();
  await page.getByRole('button', { name: 'Para hoy', exact: true }).click();
  await expect(page.getByText(/hora límite está a confirmar/i)).toBeVisible();
});

test('el formulario de presupuesto abre WhatsApp y el correo con los datos', async ({ page }) => {
  await page.goto('bodas-y-eventos/');
  const form = page.locator('#presupuesto');
  await form.scrollIntoViewIfNeeded();
  await expect(form).toHaveAttribute('data-hydrated', 'true');

  const send = form.getByRole('link', { name: 'Pedir presupuesto de boda' });
  await send.click();
  await expect(page.getByRole('alert').first()).toBeVisible();
  await expect(send).not.toHaveAttribute('href', /wa\.me/);

  await page.getByLabel('Vuestros nombres').fill('Ana y Pablo');
  await page.getByLabel('Fecha de la boda').fill('2027-09-06');
  await page.getByLabel('Lugar').fill('Alcoy');
  await page.getByLabel('Estilo').fill('Silvestre');
  await page.getByLabel('Invitados').fill('80');
  await page.getByLabel('Email o teléfono').fill('ana@example.com');
  await page.getByLabel('Mensaje e inspiración').fill('Mesa larga y ramo suelto');
  await page.getByRole('checkbox', { name: /política de privacidad/ }).check();

  await expect(send).toHaveAttribute('href', /wa\.me\/34628484102/);
  const href = await send.getAttribute('href');
  const message = decodeURIComponent(href?.split('text=')[1] ?? '');
  expect(message).toContain('Ana y Pablo');
  expect(message).toContain('Alcoy');
  expect(message).toContain('80');
  expect(message).toContain('Mesa larga y ramo suelto');

  const mail = form.getByRole('link', { name: 'Abrir en el correo' });
  const mailHref = decodeURIComponent((await mail.getAttribute('href')) ?? '');
  expect(mailHref.startsWith('mailto:?')).toBe(true);
  expect(mailHref).toContain('Ana y Pablo');
});

test('en el móvil hay barra de WhatsApp y llamada, solo con icono en llamar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const bar = page.getByRole('navigation', { name: 'Acciones rápidas' });
  await expect(bar.getByRole('link', { name: 'Pedir por WhatsApp' })).toBeVisible();
  const call = bar.getByRole('link', { name: 'Llamar' });
  await expect(call).toBeVisible();
  await expect(call).toHaveAttribute('href', 'tel:+34628484102');
  await expect(bar).not.toContainText('628');
  await page.locator('summary[aria-label="Abrir el menú"]').click();
  await page.locator('.menu-panel').getByRole('link', { name: 'Plantas', exact: true }).click();
  await expect(page).toHaveURL(/\/plantas\/$/);

  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(bar).toBeHidden();
});

test('una ruta desconocida enseña la 404', async ({ page }) => {
  const response = await page.goto('no-existe/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('taller');
});

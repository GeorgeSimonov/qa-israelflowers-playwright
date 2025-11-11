import { test, expect } from '@playwright/test';

test('smoke: home → search → product → cart', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Проверяем, что главная загрузилась
    await expect(page).toHaveTitle(/פרח|flower|פרחים|israel/i);

    // Поиск
    const search = page.locator('input[type="search"], input[placeholder*="חיפוש"], input[placeholder*="search"]');
    if (await search.count()) {
        await search.first().fill('rose');
        await search.first().press('Enter');
    }

    // Ждём появление карточек
    const product = page.locator('a[href*="/product/"], .product a, .product-item a').first();
    await product.waitFor({ state: 'visible', timeout: 10000 });
    await product.click();

    // Кнопка "Добавить в корзину"
    const add = page.locator('button, a', { hasText: /add to cart|להוספה|הוסף|קנה|הוספה לעגלה/i }).first();
    await add.waitFor({ state: 'visible', timeout: 10000 });
    await add.click();

    // Ждём, переходим в корзину
    await page.waitForTimeout(1500);
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });

    // Проверяем наличие символа ₪ (цены)
    const total = page.locator('text=₪');
    await expect(total).toHaveCountGreaterThan(0);
});

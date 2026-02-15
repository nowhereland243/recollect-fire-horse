// Shared nav initialization for pages that don't use main.ts
import { initNav } from './nav';
import { initI18n } from './i18n';

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initI18n();
});

import { useEffect } from 'react';

/**
 * Поддерживает CSS-переменную --tg-viewport-height в актуальном состоянии.
 * Работает как в Telegram WebApp, так и в обычном браузере (fallback).
 */
export function useTelegramViewportHeight() {
    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;

        const set = (h: number) =>
            document.documentElement.style.setProperty(
                '--tg-viewport-height',
                `${h}px`
            );

        if (tg) {
            const apply = () => set(tg.viewportHeight);
            apply();
            tg.onEvent('viewportChanged', apply);
            tg.expand?.();
            return () => tg.offEvent('viewportChanged', apply);
        }

        const applyFallback = () => set(window.innerHeight);
        applyFallback();
        window.addEventListener('resize', applyFallback);
        return () => window.removeEventListener('resize', applyFallback);
    }, []);
}

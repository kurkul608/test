import { useEffect } from 'react';

/**
 *  • Создаёт CSS-переменную --app-height с актуальной высотой видимой области
 *  • Делаeт страницу скроллимой на 1 px, чтобы iOS не «дёргала» layout
 *  • Отключает жест закрытия (Bot API ≥ 7.7)
 */
export function useFixIOSKeyboard() {
    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;

        // --- 1. вычисляем высоту ----------------------------------------------
        const setHeight = (h: number) =>
            document.documentElement.style.setProperty('--app-height', `${h}px`);

        function applyHeight() {
            if (tg?.viewportHeight) return setHeight(tg.viewportHeight);
            if (window.visualViewport) return setHeight(window.visualViewport.height);
            setHeight(window.innerHeight); // fallback
        }

        applyHeight();
        tg?.onEvent?.('viewportChanged', applyHeight);
        window.visualViewport?.addEventListener('resize', applyHeight);
        window.addEventListener('resize', applyHeight);

        // --- 2. делаем root скроллимым на 1 px, если он был равен viewport ------
        const ensureScrollable = () => {
            if (document.documentElement.scrollHeight <= window.innerHeight) {
                document.documentElement.style.minHeight = 'calc(100dvh + 1px)';
            }
        };
        ensureScrollable();
        window.addEventListener('load', ensureScrollable);

        // --- 3. блокируем жест свёртывания (если доступно) ---------------------
        tg?.disableVerticalSwipes?.();
        tg?.expand?.();

        return () => {
            tg?.offEvent?.('viewportChanged', applyHeight);
            window.visualViewport?.removeEventListener('resize', applyHeight);
            window.removeEventListener('resize', applyHeight);
            window.removeEventListener('load', ensureScrollable);
        };
    }, []);
}

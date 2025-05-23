import { useEffect } from 'react';
import './ChatBugDemo.css';

export default function ChatBugDemo() {
    useEffect(() => {
        // Этот хак нужен, чтобы при изменении высоты окна (открытие клавиатуры) обновлялось значение vh
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVh();
        window.addEventListener('resize', setVh);

        return () => window.removeEventListener('resize', setVh);
    }, []);

    return (
        <div className="chat">
            <div className="chat-wrap">
                <div className="chat-messages">
                    <div className="message">Привет! Это тест на баг с клавиатурой.</div>
                    <div className="message">Попробуй нажать на инпут в Telegram Mini App 😉</div>
                </div>
                <form className="chat-input-form">
        <textarea
            placeholder="Напиши сообщение..."
            className="chat-textarea"
            rows={1}
        />
                </form>
            </div>

        </div>
    );
}

import './ChatBugDemo.css';
import {useTelegramViewportHeight} from "./useTelegramViewportHeight.ts";

export default function ChatBugDemo() {
    useTelegramViewportHeight();
    return (
        <div className="chat">
            <div className="chat-messages">
                <div className="message">Привет! Это тест на баг с клавиатурой. UPD9</div>
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
    );
}

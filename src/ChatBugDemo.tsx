import './ChatBugDemo.css';
import {useFixIOSKeyboard} from "./useFixIOSKeyboard.ts";

export default function ChatBugDemo() {
    useFixIOSKeyboard();
    return (
        <div className="chat">
            <div className="chat-messages">
                <div className="message">Привет! Это тест на баг с клавиатурой. UPD10</div>
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

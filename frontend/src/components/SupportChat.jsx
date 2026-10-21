import { useEffect, useRef, useState } from 'react';
import './SupportChat.css';

// builds the helper's address from the page's address, so it works on localhost and on the network without changing anything
const CHAT_URL = `${window.location.protocol}//${window.location.hostname}:5001/api/chat`;

function SupportChat()
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);

    // every time a message gets added, scroll to the bottom so you see the newest one
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: 'nearest' });
    }, [messages, loading]);

    // adds your message, sends the whole chat to the helper server, then adds its reply
    async function send(event)
    {
        event.preventDefault();
        const text = input.trim();
        if (!text || loading) return;

        const history = [...messages, { role: 'user', content: text }];
        setMessages(history);
        setInput('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch(CHAT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history })
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || 'Something went wrong.');
            setMessages([...history, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            // if it fails, take your message back out of the chat and put it back in the box so you can try again
            setMessages(messages);
            setInput(text);
            setError(err instanceof TypeError ? "Can't reach the helper. Is assistant.py running?" : err.message);
        }
        setLoading(false);
    }

    return <div className="support-chat">
        <div className="support-chat__messages" aria-live="polite">
            <p className="support-chat__bubble support-chat__bubble--bot">Hi, welcome to Gunter's Blacksmithing! I'm the customer service assistant. How can I help you today?</p>
            {messages.map((message, index) => (
                <p key={index} className={'support-chat__bubble support-chat__bubble--' + (message.role === 'user' ? 'you' : 'bot')}>
                    {message.content}
                </p>
            ))}
            {loading && <p className="support-chat__bubble support-chat__bubble--bot support-chat__typing">Thinking...</p>}
            <div ref={bottomRef} />
        </div>

        {error && <p className="support-chat__error">{error}</p>}

        <form className="support-chat__form" onSubmit={send}>
            <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask the support helper"
                maxLength={1000}
            />
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
        </form>
    </div>
}

export default SupportChat;

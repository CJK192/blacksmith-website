import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const items = [1, 2, 3, 4];

function Home() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <main className="home-page">
      <section className="home-inventory" aria-labelledby="inventory-heading">
        <h1 id="inventory-heading">Check out our inventory:</h1>
        <div className="home-inventory-grid">
          {items.map((item) => (
            <Link className="home-item-card" to="/sword" key={item}>
              <span className="home-item-preview" aria-hidden="true">
                <svg viewBox="0 0 100 80" fill="none">
                  <path d="M15 24h70v12L66 49H43L28 36H15V24Z" />
                  <path d="M46 49v12H35v8h39v-8H62V49M68 24V14H42v10" />
                </svg>
              </span>
              <span className="home-item-name">Item {item}</span>
              <span className="home-item-detail">View item <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <aside className="home-todos" aria-labelledby="todo-heading">
        <h2 id="todo-heading">Gunter’s To-Do List</h2>
      </aside>

      <div className="home-support">
        {supportOpen && (
          <section className="home-support-panel" id="home-support-panel" aria-labelledby="support-heading">
            <h2 id="support-heading">AI Support Helper</h2>
            <p>Need a hand around the shop?</p>
            <p>AI chat isn’t connected yet. You can browse the inventory or visit our support page for help.</p>
            <Link to="/support" className="home-support-link">Go to support →</Link>
          </section>
        )}
        <button
          className="home-support-toggle"
          type="button"
          aria-expanded={supportOpen}
          aria-controls={supportOpen ? 'home-support-panel' : undefined}
          onClick={() => setSupportOpen(!supportOpen)}
        >
          <span aria-hidden="true">{supportOpen ? '−' : '+'}</span>
          {supportOpen ? 'Close helper' : 'AI Support Helper'}
        </button>
      </div>
    </main>
  );
}

export default Home;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AnvilIcon from '../components/AnvilIcon';
import ToDoList from '../components/ToDoList';

// each tile on the home page - name shows on the tile, link is the page it opens
const items = [
  { name: 'Sword', link: '/sword' },
  { name: 'Chainmail', link: '/chainmail' },
  { name: 'Plate Armor', link: '/platearmor' },
  { name: 'Cooking Pot', link: '/cookingpot' },
];

function Home() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <main className="home-page">
      <section className="home-inventory" aria-labelledby="inventory-heading">
        <h1 id="inventory-heading">Check out our inventory:</h1>
        <div className="home-inventory-grid">
          {items.map((item) => (
            <Link className="home-item-card" to={item.link} key={item.name}>
              <span className="home-item-preview" aria-hidden="true">
                <AnvilIcon />
              </span>
              <span className="home-item-name">{item.name}</span>
              <span className="home-item-detail">View Item</span>
            </Link>
          ))}
        </div>
      </section>

      <aside className="home-todos" aria-labelledby="todo-heading">
        <h2 id="todo-heading">Gunter’s To-Do List</h2>
        <div>
          <ToDoList></ToDoList>
        </div>
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

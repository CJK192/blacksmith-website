import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ToDoList from '../components/ToDoList';
import { itemImages } from '../itemImages';
import SupportChat from '../components/SupportChat';
import PixelSnow from '../components/reactbits/PixelSnow';
import TiltedCard from '../components/reactbits/TiltedCard';
import DecryptedText from '../components/reactbits/DecryptedText';
import StarBorder from '../components/reactbits/StarBorder';

// TiltedCard tilts the item pictures in 3d with your mouse. isTouch is true on phones and tablets,
// the tilt is turned off there so tapping a tile doesnt push it off the screen
const isTouch = window.matchMedia?.('(hover: none) and (pointer: coarse)').matches ?? false;

// each tile on the home page, name is what it says and link is the page it opens
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
      {/* orange pixel embers behind the page, they sit behind everything so they dont block clicks */}
      <div className="home-embers" aria-hidden="true">
        <PixelSnow color="#ff8c00" variant="square" density={0.35} speed={0.6} wind={0.1} pixelSize={4} glow={0.9} mouseInteraction={false} />
      </div>

      <section className="home-inventory" aria-labelledby="inventory-heading">
        <h1 id="inventory-heading">
          <DecryptedText text="Check out our inventory:" animateOn="view" sequential speed={40} />
        </h1>
        <div className="home-inventory-grid">
          {items.map((item) => (
            <Link className="home-item-card" to={item.link} key={item.name}>
              <span className="home-item-preview" aria-hidden="true">
                <TiltedCard containerWidth="100%" containerHeight="100%" imageWidth="100%" imageHeight="100%" radius={0} rotateAmplitude={isTouch ? 0 : 14} scaleOnHover={isTouch ? 1 : 1.06} gyroscope={false} showTooltip={false}>
                  <img src={itemImages[item.name].Black} alt="" />
                </TiltedCard>
              </span>
              <span className="home-item-name">{item.name}</span>
              <span className="home-item-detail">View Item</span>
            </Link>
          ))}
        </div>

        {/* StarBorder runs a glowing light around the button, as={Link} makes it work like a link to the game page */}
        <StarBorder as={Link} to="/game" className="home-play-game" color="#ffdd00" backgroundColor="#d32f2f" textColor="#ffffff" radius={0} thickness={3} stars={2}>
          Play Game!
        </StarBorder>
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
            <SupportChat />
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

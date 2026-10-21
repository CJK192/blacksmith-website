'use client';
import React, { useEffect, useRef, useState } from 'react';
import ClickSpark from '../reactbits/ClickSpark';
import Anvil from './Anvil';
import SpotlightCard from './SpotlightCard';
import StarBorder from '../reactbits/StarBorder';
import { freshGame, strike, earnsCoupon } from './game.mjs';
import './HammerTime.css';

export default function HammerTime() {
  const [game, setGame] = useState(freshGame);
  const [copyStatus, setCopyStatus] = useState('');
  const [best, setBest] = useState(0);
  const live = useRef(game);
  const phase = useRef(0);
  const marker = useRef(null);
  const scene = useRef(null);
  const sparks = useRef(null);
  const cooldown = useRef(0);
  const impactTimer = useRef(null);
  function update(next) { live.current = next; setGame(next); }
  useEffect(() => {
    try { setBest(Number(localStorage.getItem('gunther-hammer-best')) || 0); } catch { /* Optional storage. */ }
    let frameId, last = 0;
    function frame(time) {
      if (live.current.status === 'playing' && last) phase.current += Math.min((time-last)/1000, .05) * (1.6 + live.current.count*.18);
      if (marker.current) marker.current.style.left = `${(Math.sin(phase.current)+1)*50}%`;
      last = time; frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);
    function hide() { if (document.hidden && live.current.status === 'playing') update({ ...live.current, status: 'paused' }); }
    document.addEventListener('visibilitychange', hide);
    return () => { clearTimeout(impactTimer.current); cancelAnimationFrame(frameId); document.removeEventListener('visibilitychange', hide); };
  }, []);
  function reset(start = false) {
    clearTimeout(impactTimer.current);
    scene.current?.classList.remove('ht-swing');
    setCopyStatus('');
    phase.current = 0; cooldown.current = 0;
    update({ ...freshGame(), status: start ? 'playing' : 'ready' });
  }
  function pause() { const g=live.current; if (g.status === 'playing' || g.status === 'paused') update({ ...g, status: g.status === 'paused' ? 'playing' : 'paused' }); }
  function hit() {
    const g = live.current;
    if (g.status === 'ready' || g.status === 'finished') { reset(true); return; }
    if (g.status === 'paused') { pause(); return; }
    if (performance.now() < cooldown.current) return;
    cooldown.current = performance.now() + 350;
    const next = strike(g, (Math.sin(phase.current)+1)*50);
    update(next);
    scene.current.classList.remove('ht-swing'); void scene.current.offsetWidth; scene.current.classList.add('ht-swing');
    clearTimeout(impactTimer.current);
    if (next.combo) impactTimer.current = setTimeout(() => {
      const root = scene.current;
      if (!root) return;
      const box = root.parentElement.getBoundingClientRect();
      const svg = root.querySelector('svg').getBoundingClientRect();
      const scale = Math.min(svg.width / 320, svg.height / 220);
      sparks.current?.spark(svg.left - box.left + (svg.width - 320 * scale) / 2 + 177 * scale,
        svg.top - box.top + (svg.height - 220 * scale) / 2 + 126 * scale);
    }, 140);
    if (next.status === 'finished' && next.score > best) {
      setBest(next.score); try { localStorage.setItem('gunther-hammer-best', String(next.score)); } catch { /* Optional storage. */ }
    }
  }
  async function copyCoupon() {
    try { await navigator.clipboard.writeText('GUNTERSPRIZE'); setCopyStatus('Copied!'); }
    catch { setCopyStatus('Select GUNTERSPRIZE above and copy it manually.'); }
  }
  function keyDown(event) {
    if (event.repeat) { if(event.code === 'Space') event.preventDefault(); return; }
    if (event.code === 'Space' && event.target.tagName !== 'BUTTON') { event.preventDefault(); hit(); }
    if (event.code === 'KeyP') { event.preventDefault(); pause(); }
  }
  return (
    <SpotlightCard spotlightColor="#ffc85a" intensity={0.05} borderGlow={0.7} className="ht-game" aria-label="Gunther’s Hammer Time" tabIndex={0} onKeyDown={keyDown}>
      <div className="ht-hud"><strong>HAMMER TIME</strong><span>Score <b key={game.score} className="ht-score">{game.score}</b></span><span>{game.count}/10</span><span>Combo ×{game.combo}</span><span>Best {best}</span></div>
      <div className="ht-quality-heading"><span>FORGE QUALITY</span><strong>{game.quality}%</strong></div>
      <div className="ht-quality-meter" role="progressbar" aria-label="Forge quality" aria-valuenow={game.quality} aria-valuemin={0} aria-valuemax={100}><div style={{width:`${game.quality}%`}} /><i aria-hidden="true" /></div>
      <p className="ht-challenge">Finish above 65% quality to unlock $5 off.</p>
      <ClickSpark ref={sparks} sparkColor={['#ffc85a', '#fff4ce', '#ff8050']} sparkCount={14} sparkRadius={65} sparkSize={8} shape="dot" gravity={.5} glow={0} duration={500}>
        <div ref={scene} className="ht-scene" aria-hidden="true"><Anvil /></div>
      </ClickSpark>
      <p className="ht-feedback" role="status">{game.status === 'paused' ? 'Paused — take your time.' : game.message}</p>
      <div className="ht-track" role="img" aria-label="Strike as the white marker enters green; aim for the gold center.">
        <div className="ht-zone" style={{left:`${game.center-game.width/2}%`,width:`${game.width}%`}} />
        <div className="ht-perfect" style={{left:`${game.center-game.width/6}%`,width:`${game.width/3}%`}} />
        <div ref={marker} className="ht-marker" />
      </div>
      <div className="ht-controls"><StarBorder radius={0} color="#fff1b0" trailColor="#e54b55" thickness={2} duration={3} className="ht-strike" onClick={hit}>{game.status === 'ready' ? 'Start' : game.status === 'finished' ? 'Play again' : game.status === 'paused' ? 'Resume' : 'Strike · Space'}</StarBorder><button type="button" disabled={!['playing','paused'].includes(game.status)} onClick={pause}>{game.status === 'paused' ? 'Resume' : 'Pause'}</button><button type="button" onClick={() => reset()}>Restart</button></div>
      {game.status === 'finished' && (earnsCoupon(game) ? (
        <StarBorder as="div" radius={0} color="#ffc85a" trailColor="#ff8050" duration={5} thickness={2} sparkle className="ht-reward">
          <div role="status"><span className="ht-reward-label">GUNTHER’S PRIZE UNLOCKED</span><h2>$5 OFF</h2><p>You forged {game.quality}% quality. Here’s your reward.</p></div>
          <code>GUNTERSPRIZE</code>
          <button type="button" onClick={copyCoupon}>Copy coupon</button>
          <span className="ht-copy-status" role="status">{copyStatus}</span>
        </StarBorder>
      ) : <p className="ht-no-prize">So close to the prize? Forge again! Finish above 65% quality to earn your $5 coupon.</p>)}
      <p className="ht-hint">Space / tap to strike · P to pause · 10 strikes</p>
    </SpotlightCard>
  );
}

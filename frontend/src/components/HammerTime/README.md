# Hammer Time — embeddable game

Only the game: anvil, timing bar, score and controls. No surrounding page or sidebar.

## React website
Copy `HammerTime.jsx`, `HammerTime.css`, `Anvil.jsx`, `game.mjs`, `ClickSpark.jsx`, `SpotlightCard.jsx`, `SpotlightCard.css`, `StarBorder.jsx`, `StarBorder.css` and `REACT-BITS-LICENSE.md` together into your React project. React and React DOM are the only dependencies.

```jsx
import HammerTime from './HammerTime/HammerTime';

export default function GamePage() {
  return <HammerTime />;
}
```

Styles are scoped to the game. Keyboard controls apply only while focus is within the game, so other parts of your website keep their keyboard behavior. Supports multiple instances and cleans up animation frames on unmount. Switching browser tabs pauses play.

## Any website / quick preview
Open `index.html` directly in a browser. This is a self-contained compiled copy of the same React game. You can also host that file and embed it:

```html
<iframe src="/games/hammer-time/index.html" title="Gunther’s Hammer Time" style="width:100%;max-width:720px;height:960px;border:0"></iframe>
```

## Effects and controls
Uses the official React Bits Click Spark component for orange/gold sparks at the anvil on successful strikes. It supports reduced motion; the timing marker remains necessary for play. Space or tap to strike, P to pause, ten strikes per round. Green: 50 points; gold: 100; combo bonuses up to 50 points. Best score is stored locally when available.

React Bits source: https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/ClickSpark/ClickSpark.jsx
Documentation: https://reactbits.dev/animations/click-spark
The bundled React Bits component retains its license in REACT-BITS-LICENSE.md.

## Prize and UI effects
React Bits Spotlight Card lights the game on hover; Star Border animates the strike control and reward card. Square corners are preserved.
A completed ten-strike round with quality strictly greater than 65% reveals a $5-off coupon, GUNTERSPRIZE, with a copy button. Exactly 65% does not qualify. The displayed quality uses the whole round: perfect strikes add 10%, good strikes add 6%, misses add 0%.

This game displays the reward; configure GUNTERSPRIZE as a $5 discount in the destination website's checkout to make it redeemable. No checkout or discount service is connected here.

## Pixel-art appearance
The game matches the supplied website photo: charcoal panels, white square borders, red controls and a pale equipment backdrop. The surrounding interface retains its pixel-style theme. The forging scene uses smooth SVG artwork with a recognizable sword, a hammer that pivots around its grip, blade recoil, and sparks timed to contact. React Bits accents stay subtle. The font inherits the host website’s `--font` variable, with a monospace fallback for the standalone preview. Coupon rules remain above 65% quality for GUNTERSPRIZE.

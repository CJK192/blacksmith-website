# Hammer Time

this is gunter's hammer time game, it's on the game page (`Pages/GamePage.jsx`). its just the game itself, the anvil, timing bar, score and buttons.

## how to play
- hit **start**, then press **space** or tap to swing the hammer
- hit when the white line is in the **green** for 50 points, **gold** is 100
- hitting a bunch in a row gives a combo bonus (up to +50)
- **p** pauses, you get 10 swings a round
- your best score saves in your browser

## the prize
if you finish a round with **more than 65%** forge quality you unlock a $5 off coupon: **GUNTERSPRIZE**. exactly 65% doesnt count.
- gold hit = +10% quality
- green hit = +6%
- miss = 0%

the cart page takes GUNTERSPRIZE and knocks $5 off the total. heads up, its only on the front end so anyone who types the code gets it, not just people who won.

## files
- `HammerTime.jsx` - the game
- `HammerTime.css` - how it looks
- `Anvil.jsx` - the anvil, sword and hammer drawing
- `game.mjs` - scoring and the coupon rule
- `SpotlightCard.jsx` + `.css` - the glow when you hover the game (react bits)

click spark and star border are react bits too, they're in `components/reactbits/` and the rest of the site uses them as well.

## react bits
the sparks, glow and button borders come from [react bits](https://reactbits.dev). keep `REACT-BITS-LICENSE.md` in this folder, the license says it has to stay with the code.

## if it lags
the game page background is turned down to low quality so the game runs smoother. if its still laggy the background can be paused or taken off.

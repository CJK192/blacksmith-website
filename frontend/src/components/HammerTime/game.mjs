export const freshGame = () => ({ status: 'ready', count: 0, score: 0, combo: 0, quality: 0, center: 50, width: 28, message: 'Hit green for 50. Gold for 100.' });
export function strike(game, position, random = Math.random) {
  const distance = Math.abs(position - game.center);
  const perfect = distance <= game.width / 6;
  const hit = distance <= game.width / 2;
  const combo = hit ? game.combo + 1 : 0;
  const points = (perfect ? 100 : hit ? 50 : 0) + (hit ? Math.min(50, (combo - 1) * 10) : 0);
  const count = game.count + 1;
  const quality = game.quality + (perfect ? 10 : hit ? 6 : 0);
  return { ...game, count, combo, quality, score: game.score + points,
    status: count === 10 ? 'finished' : 'playing', center: 25 + random() * 50, width: 28 - count * 1.2,
    message: count === 10 ? `${quality >= 85 ? 'Masterwork!' : quality >= 60 ? 'Fine craftsmanship!' : 'Keep practicing!'} ${game.score + points} points · ${quality}% quality` : `${perfect ? 'Perfect!' : hit ? 'Good strike!' : 'Miss!'}${points ? ` +${points}` : ' Try again.'}` };
}

export const earnsCoupon = game => game.status === 'finished' && game.count === 10 && game.quality > 65;

// game page- AI used
import FaultyTerminal from '../components/reactbits/FaultyTerminal'
import HammerTime from '../components/HammerTime/HammerTime'
import './GamePage.css'

function GamePage()
{
    return <div className="game-page">
    {/*arcade background, low quality so the game doesnt lag*/}
    <div className="game-background" aria-hidden="true">
        <FaultyTerminal tint="#ff8c00" brightness={0.6} scale={1.5} mouseReact={false} pageLoadAnimation dpr={0.5} glow={0} persistence={0} timeScale={0.2} />
    </div>

    <h1>Game</h1>

    {/*hammer time game*/}
    <div className="game-box">
        <HammerTime />
    </div>

             </div>
}

export default GamePage;
// AI stopped

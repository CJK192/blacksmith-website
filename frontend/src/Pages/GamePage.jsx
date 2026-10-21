import FaultyTerminal from '../components/reactbits/FaultyTerminal'
import HammerTime from '../components/HammerTime/HammerTime'
import './GamePage.css'

function GamePage()
{
    return <div className="game-page">
    {/*arcade background, dpr 0.5 draws it at low resolution so the game doesnt lag*/}
    <div className="game-background" aria-hidden="true">
        <FaultyTerminal tint="#ff8c00" brightness={0.6} scale={1.5} mouseReact={false} pageLoadAnimation dpr={0.5} glow={0} persistence={0} timeScale={0.2} />
    </div>

    <h1>Game</h1>

    {/*the hammer time game, all of its files are in components/HammerTime*/}
    <div className="game-box">
        <HammerTime />
    </div>

             </div>
}

export default GamePage;

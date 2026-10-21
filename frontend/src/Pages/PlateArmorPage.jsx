import { useState } from 'react';
import { useCart } from '../CartContext';
import { itemImages } from '../itemImages';
// react bits- AI used
import GlareHover from '../components/reactbits/GlareHover';
import ShinyText from '../components/reactbits/ShinyText';
// AI stopped

function PlateArmorPage() {
  const { addToCart } = useCart(); {/*opens the shared cart*/}
  const price = "210.00"; // add price here
  const [selectedColor, setSelectedColor] = useState('Black'); {/*sets default color*/}

  const colors = ['Black', 'Red', 'Blue', 'Silver', 'Gold']; {/*available colors*/}

  const colorImages = itemImages['Plate Armor']; {/*pictures for each color*/}

  const imageUrl = colorImages[selectedColor];

  return <div style={{ padding: '2rem' }}>
    <div style={{ display: 'flex', gap: '2rem' }}> {/*display flex, gap 2rem splits page in half*/}

      <div style={{ flex: 1 }}> {/*take up half of the page*/}
      {/*shine on picture- AI used*/}
      <GlareHover width="100%" height="auto" background="white" borderRadius="8px" glareColor="#ffb300" glareOpacity={0.5} blendMode="multiply">
      <div style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}> {/*calm lil if else statement incase the url is empty*/}
        {imageUrl ? (
          <img src={imageUrl} alt={selectedColor + ' Plate Armor'} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        ) : (
          <span style={{ color: '#aaa' }}>Image Placeholder</span>
        )}
      </div>
      </GlareHover>
      {/*AI stopped*/}
    </div>

    {/*text*/}
    <div style={{ flex: 1 }}>
      <h1>Plate Armor</h1> {/*item name*/}
      {/*shiny price- AI used*/}
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d32f2f', marginBottom: '2rem' }}><ShinyText text={'$' + price} color='#d32f2f' shineColor='#ffdd00' speed={3} /></p>
      {/*AI stopped*/}

{/*Color Options- AI used*/}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Color: <span style={{ color: '#666' }}>{selectedColor}</span></p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: color.toLowerCase(),
                border: selectedColor === color ? '3px solid #333' : '2px solid #ccc',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '12px',
                color: color === 'Black' ? 'white' : 'black',
                fontWeight: selectedColor === color ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={color}
            >
              {selectedColor === color && '✓'}
            </button>
          ))}
        </div>
      </div>
{/*AI stopped*/}

      <p>Item details will go here</p>
      <button className="cart-button"
      onClick={() => addToCart('Plate Armor', price, selectedColor)}
      style={{width: '100%', padding: '2.5rem 3.5rem', borderRadius: '0px', cursor: 'pointer' , fontSize: '3rem', borderWidth:"0.5rem", color:'white'}}
      >Add to Cart</button>
      </div>
    </div>

    {/*reviews*/}
    <div style={{ marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
      <h2>Reviews</h2>
      <p>Customer reviews will go here</p>
    </div>
  </div>
}

export default PlateArmorPage;

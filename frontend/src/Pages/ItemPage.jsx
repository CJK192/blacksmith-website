import { useState } from 'react';

function ItemPage() {
  const price = "67.00"; // add price here
  const [selectedColor, setSelectedColor] = useState('Black'); {/*sets default color*/}

  const colors = ['Black', 'Red', 'Blue', 'Silver', 'Gold']; {/*available colors*/}

  const colorImages = {
    Black: 'https://via.placeholder.com/500x500?text=Black',
    Red: 'https://via.placeholder.com/500x500?text=Red',
    Blue: 'https://via.placeholder.com/500x500?text=Blue',
    Silver: 'https://via.placeholder.com/500x500?text=Silver',
    Gold: 'https://via.placeholder.com/500x500?text=Gold'
  };

  const imageUrl = colorImages[selectedColor];

  return <div style={{ padding: '2rem' }}>
    <div style={{ display: 'flex', gap: '2rem' }}> {/*display flex, gap 2rem splits page in half*/}

      <div style={{ flex: 1 }}> {/*take up half of the page*/}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
      }}> {/*calm lil if else statement incase the url is empty*/}
        {imageUrl ? (
          <img src={imageUrl} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        ) : (
          <span style={{ color: '#aaa' }}>Image Placeholder</span>
        )}
      </div>
    </div>

    {/*text*/}
    <div style={{ flex: 1 }}>
      <h1>Item Name</h1> {/*item name*/}
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d32f2f', marginBottom: '2rem' }}>${price}</p>

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
      </div>
    </div>

    {/*reviews*/}
    <div style={{ marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
      <h2>Reviews</h2>
      <p>Customer reviews will go here</p>
    </div>
  </div>
}

export default ItemPage;

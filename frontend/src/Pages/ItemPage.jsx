function ItemPage() {
  const imageUrl = ""; //img url add here for each item
  const price = "67.00"; // add price here

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

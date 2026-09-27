import member1 from '../assets/team/member1.png'
import member2 from '../assets/team/member2.png'
import member3 from '../assets/team/member3.png'
import member4 from '../assets/team/member4.png'

function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/*top*/}
      <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'white' }}>About Gunter's Blacksmithing</h1>
        <p style={{ fontSize: '1.2rem', color: 'white', margin: '0 auto' }}>
          Crafting quality products with passion and precision since day one.
        </p>
      </section>

      {/* mission*/}
      <section style={{ marginBottom: '4rem', backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '0px' , border: 'dotted  5px #333'}}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
          Our mission is to provide customers with a smooth experience when purchasing with Gunter!
          Our motto is quality over quantity, and we're committed to delivering products that exceed expectations.
        </p>
      </section>

      {/* story*/}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'white' }}>Our Story</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
          We are simple business that started through Gunter's passion for blacksmithing. Starting through projects in his barn, a hobby has grown into a business that serves customers with high-quality products and exceptional service.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
          Every product is carefully crafted with attention to detail and a commitment to excellence.
        </p>
      </section>

      {/* team*/}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem', color: 'white' }}>Our Team</h2>
        {/*ai used started*/}
        <div style={{ backgroundColor: '#f9f9f9', border: 'dotted 5px #333', borderRadius: '0px', overflow: 'hidden' }}>

          {/* Gunter - First Row */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', borderBottom: 'dotted 3px #333' }}>
            <div style={{ textAlign: 'center', width: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img
                  src="https://img.itch.zone/aW1nLzE2NTcxMjYyLnBuZw==/original/VD4j86.png"
                  alt="Gunter"
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block',
                    transform: 'rotate(357deg)'
                  }}
                />
              </div>
              <h3 style={{ marginBottom: '0.25rem', color: '#333', fontSize: '1.1rem' }}>Gunter</h3>
              <p style={{ fontSize: '0.85rem', color: '#d32f2f', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Founder & Master Blacksmith
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#555' }}>
                The visionary behind our craft with decades of expertise.
              </p>
            </div>
          </div>

          {/* Crafters - Second Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', backgroundColor: '#fff' }}>
            {[
              {
                name: 'Cole Keller',
                role: 'Senior Craftsperson',
                image: member1,
                description: 'Expert in traditional techniques.'
              },
              {
                name: 'Joshua Lobert',
                role: 'Craftsperson',
                image: member2,
                description: 'Dedicated to quality and precision.'
              },
              {
                name: 'Felix Wu',
                role: 'Craftsperson',
                image: member3,
                description: 'Bringing passion to every project.'
              },
              {
                name: 'Markus Noll',
                role: 'Craftsperson',
                image: member4,
                description: 'Committed to excellence.'
              }
            ].map((member, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRight: idx !== 3 ? 'dotted 2px #ddd' : 'none'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}
                />
                <h3 style={{ marginBottom: '0.25rem', color: '#333', fontSize: '0.95rem' }}>{member.name}</h3>
                <p style={{ fontSize: '0.75rem', color: '#d32f2f', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.8rem', lineHeight: '1.3', color: '#555' }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/*ai used end*/}

    {/* values*/}
       <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'white' }}>Our Values</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            We value craftsmanship, integrity, and customer satisfaction. Our team is dedicated to creating products that not only meet but exceed expectations. We believe in continuous improvement and innovation while staying true to our roots in traditional blacksmithing.
        </p>
      </section>

     
      

</div>
    );
}

export default About;
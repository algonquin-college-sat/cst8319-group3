import "../Styles/AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>About The Great Indian Festival</h1>

      <section className="about-section">
        <p>
          The Great Indian Festival is a vibrant cultural celebration that brings
          together music, dance, art, food, and community. Our mission is to
          showcase the rich diversity of Indian traditions while creating an
          inclusive space for people of all backgrounds to connect and enjoy.
        </p>

        <p>
          From live performances to interactive workshops, the festival offers
          something for everyone. Whether you're exploring Indian culture for the
          first time or reconnecting with your roots, we welcome you to join us
          in this joyful celebration.
        </p>
      </section>

      <section className="about-highlights">
        <h2>Festival Highlights</h2>
        <ul>
          <li>Live music and dance performances</li>
          <li>Authentic Indian cuisine</li>
          <li>Art and craft exhibitions</li>
          <li>Workshops and cultural activities</li>
          <li>Family‑friendly environment</li>
        </ul>
      </section>
    </div>
  );
}

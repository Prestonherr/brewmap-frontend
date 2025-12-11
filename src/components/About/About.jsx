import "./About.css";

function About() {
  return (
    <main className="about">
      <div className="about__container">
        <h1 className="about__title">About BrewMap</h1>
        <div className="about__content">
          <section className="about__section">
            <h2 className="about__section-title">
              Discover Local Coffee Shops
            </h2>
            <p className="about__section-text">
              BrewMap helps you find the best coffee shops in any city. Simply
              enter a city name and choose your search radius to discover local
              cafes, roasteries, and coffee spots near you.
            </p>
          </section>
          <section className="about__section">
            <h2 className="about__section-title">How It Works</h2>
            <p className="about__section-text">
              Our application uses OpenStreetMap data to find coffee shops and
              cafes in your area. You can search by city and adjust the radius
              to find coffee shops within 1 to 25 miles of your location.
            </p>
          </section>
          <section className="about__section">
            <h2 className="about__section-title">Future Features</h2>
            <p className="about__section-text">
              Coming soon: Save your favorite coffee shops, leave reviews, and
              create personalized coffee shop lists. We're building a community
              of coffee enthusiasts!
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default About;

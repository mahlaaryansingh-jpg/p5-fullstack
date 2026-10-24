import TutorialCard from "./TutorialCard";
import { tutorials } from "../data/content";

function FeaturedTutorials() {
  return (
    <section className="featured-section tutorials-section">

      <h2>Featured Tutorials</h2>

      <div className="cards-container">

        {tutorials.map((tutorial, index) => (
          <TutorialCard
            key={tutorial.id}
            tutorial={tutorial}
            index={index}
          />
        ))}

      </div>

      <button className="see-more-button">
        See all tutorials
      </button>

    </section>
  );
}

export default FeaturedTutorials;
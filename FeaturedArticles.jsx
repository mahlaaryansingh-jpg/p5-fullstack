import ArticleCard from "./ArticleCard";
import { articles } from "../data/content";

function FeaturedArticles() {
  return (
    <section className="featured-section">

      <h2>Featured Articles</h2>

      <div className="cards-container">

        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
          />
        ))}

      </div>

      <button className="see-more-button">
        See all articles
      </button>

    </section>
  );
}

export default FeaturedArticles;
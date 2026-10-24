function ArticleCard({ article, index }) {
  return (
    <div className="content-card">

      <div className="image-box">
        <img
          src={`/images/article${index + 1}.jpg`}
          alt="Article image"
        />
      </div>

      <h3>{article.title}</h3>

      <p className="description-title">
        Description
      </p>

      <p className="description">
        {article.description}
      </p>

      <p className="technology">
        e.g., {article.technology}
      </p>

      <div className="line"></div>

      <div className="card-bottom">

        <span className="rating">
          ⭐ {article.rating}
        </span>

        <span className="author">
          {article.author}
        </span>

      </div>

    </div>
  );
}

export default ArticleCard;
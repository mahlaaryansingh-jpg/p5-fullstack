function TutorialCard({ tutorial, index }) {
  return (
    <div className="content-card">

      <div className="image-box">
        <img
          src={`/images/tutorial${index + 1}.jpg`}
          alt="Tutorial image"
        />
      </div>

      <h3>{tutorial.title}</h3>

      <p className="description-title">
        Description
      </p>

      <p className="description">
        {tutorial.description}
      </p>

      <p className="technology">
        e.g., {tutorial.technology}
      </p>

      <div className="line"></div>

      <div className="card-bottom">

        <span className="rating">
          ⭐ {tutorial.rating}
        </span>

        <span className="author">
          {tutorial.author}
        </span>

      </div>

    </div>
  );
}

export default TutorialCard;
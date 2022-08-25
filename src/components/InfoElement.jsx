function InfoElement() {
  return (
    <div className="big-border info">
      <div className="info-box">
        <h3>What?</h3>
        <p>
          This program is a javascripr implementation of "boids" algorithm. The
          movement of particles on the screen is called flocking. Flocking is
          typical for the movement of a big group of birds, fish, or insects.
        </p>
      </div>

      <div className="info-box">
        <h3>How?</h3>
        <ul>
          <li>
            Every particle on the screen tries to have the same direction of
            movement as other nearby particles.
          </li>
          <li>Particles are atracted together.</li>
          <li>
            Particles also repel each other (proportional to one over distance)
          </li>
        </ul>
      </div>

      <div className="info-box about">
        <div className="gh-icon">
        <a className="gh-link" href="https://github.com/PMerka/firefly-boids">
          <img src={require("./github_logo.png")} alt="Github icon" />
          <br />
          Source code
        </a>
        </div>

        <div>
          Created by <br />
          Pavel Měrka
        </div>
      </div>
    </div>
  );
}

export default InfoElement;

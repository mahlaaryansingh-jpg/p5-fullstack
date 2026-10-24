
import React from "react";
import Subscribe from "./Subscribe";

function Footer() {
  return (
    <footer className="footer">
   

      <div className="footer-content">
        <div className="footer-section">
          <h3>DEV@Deakin</h3>
          <p>
            Connect with developers, share ideas, and learn
            new skills.
          </p>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/questions">Questions</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Get in touch with the DEV@Deakin community.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DEV@Deakin. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

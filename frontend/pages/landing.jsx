import React from "react";

export default function Landing() {
  return (
    <>
      <div className="landingPageContainer">
        <nav>
          <div className="navHeader">
            <h2>ConnectX</h2>
          </div>
          <div className="navLink">
            <p>Join as Guest</p>
            <p>Register</p>
            <div role="button">
              <p>Login</p>
            </div>
          </div>
        </nav>
        <div className="landingPageMainContainer">
          <div>
            <h1>
              <span style={{ color: "#FF9839" }}>Connect</span> with your Loved
              Ones
            </h1>
            <p>Cover a distance by ConnectX</p>
            <div role="button">
              <a href="/auth">Get Started</a>
            </div>
          </div>
          <div>
            <img src="/mobile.png" alt="mobiles" />
          </div>
        </div>
      </div>
    </>
  );
}

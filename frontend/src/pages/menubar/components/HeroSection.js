import React from "react";
import "../../../App.css";
import "../css/HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* <video src={backgroundvideo} autoPlay loop muted> </video> */}
      <h1 className="h1">
        Connect with <br /> your team{" "}
      </h1>
      <span className="p">
        {" "}
        "Die Smarte-Kasse ist ein System, das Ihnen erlaubt, eine Caffè-Liste zu
        führen, <br /> sein Geld aufzuladen und andere Produkte zu kaufen"
      </span>
      <a className="a" href="/ueberuns">
        <button className="button">Get Started</button>
      </a>
    </div>
  );
}

export default HeroSection;

import React from "react";
import "../css/AboutUs.css";

function Ueberuns() {
  return (
    <div className="page-container">
      <div className="text-container">
        <h1 className="uber-h1">Nice to meet you!</h1>
        <h2 className="uber-h22">
          Wir sind Studenten an der Fachhochschule Esslingen.
        </h2>
        <p className="uber-text">
          Im Rahmen unseres Studienprojekts hatten wir die Aufgabe, eine
          Anwendung für die Firmen Pep Digital und STEINBEISER zu entwickeln.{" "}
        </p>
        <p className="uber-text">
          Gemeinsam mit Kevin Erath und Martin Karl konnten wir ersten Konzepte
          für die Anwendung entwickeln und weitere Konzepte ausarbeiten. Darüber
          hinaus steuerte unser Betreuer Jörg Nietzsche weitere Ideen zu dem
          Projekt bei. Diese Konzepte konnten wir dann Schritt für Schritt in
          die Praxis umsetzen.{" "}
        </p>
        <p className="uber-text">
          So wurde klar, dass wir eine Anwendung entwickeln würden, die es uns
          ermöglicht, eine digitale Kaffeekasse zu sein, mit der man Mitarbeiter
          verwalten und Produkte kaufen kann.{" "}
        </p>
        <p className="uber-text">
          Durch dieses Projekt konnten wir über unsere Grenzen hinauswachsen und
          viele neue Dinge lernen. Darunter die Entwicklung eines
          RFID-Lesegeräts, mit dem man sich an einem Terminal anmelden kann,
          sowie die Entwicklung mit einem Raspberry Pi und vieles mehr.{" "}
        </p>
        <p className="uber-text">
          In diesem Sinne möchten wir uns bei allen Beteiligten bedanken und
          wünschen ihnen viel Erfolg bei der Weiterentwicklung der intelligenten
          Kasse.
        </p>
      </div>

      <div className="element-container">
        <div className="element-rounding">
          <div className="element1"></div>
          <h2 className="uber-h2"> Gina Neumar</h2>

          <p className="uber-p"> Studentin, Hochschule für Gestaltung </p>
          <p className="uber-p"> Esslingen </p>
          <p className="uber-p"> gineit00@hs-esslingen.de </p>
        </div>
        <div className="element-rounding">
          <div className="element2"></div>
          <h2 className="uber-h2"> Phileas Roth</h2>

          <p className="uber-p"> Student, Hochschule Esslingen </p>
          <p className="uber-p"> Esslingen </p>
          <p className="uber-p"> philroth1910@yahoo.de </p>
        </div>
        <div className="element-rounding">
          <div className="element3"></div>
          <h2 className="uber-h2"> Arne Hobrlant</h2>

          <p className="uber-p"> Student, Hochschule Esslingen </p>
          <p className="uber-p"> Leonberg </p>
          <p className="uber-p"> arne.hobrlant@hotmail.com </p>
        </div>
        <div className="element-rounding">
          <div className="element4"></div>
          <h2 className="uber-h2"> Benjamin Baunach</h2>
          <p className="uber-p"> Student, Hochschule Esslingen </p>
          <p className="uber-p"> Stuttgart, Untertürkheim </p>
          <p className="uber-p"> Benjaminbaunach@posteo.de </p>
        </div>
      </div>
    </div>
  );
}

export default Ueberuns;

import React from "react";
import Card from "react-bootstrap/Card";

function VisualizerHistory({
  caisses1,
  caissesEvent,
  bankCaisses,
  LiquideDisponible,
}) {
  const totalCaisses1 = caisses1.reduce(
    (acc, e) => acc + e.Recette.reduce((acc, e) => acc + e.montant, 0),
    0
  );

  const totalCheques =
    caisses1.reduce(
      (acc, e) =>
        acc + e.Cheques.reduce((acc, e) => acc + e.MontantDeCheque, 0),
      0
    ) + caissesEvent.Cheques.reduce((acc, e) => acc + e.MontantDeCheque, 0);

  const totalTpe =
    caisses1.reduce(
      (acc, e) =>
        acc + e.TPEs.reduce((acc, e) => acc + e.MontantDeTransaction, 0),
      0
    ) + caissesEvent.TPEs.reduce((acc, e) => acc + e.MontantDeTransaction, 0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        marginBottom: "30px",
        marginTop: "-80px",
      }}
    >
      {/* Card mta3 totale des recette */}
      <Card
        style={{
          width: "28rem",

          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des recette de caisse
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {totalCaisses1 + caissesEvent.Recette[0].montant}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des liquide en caisse */}
      <Card
        style={{
          width: "28rem",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Liquide disponible en caisse
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {LiquideDisponible}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des Cheques */}
      <Card
        style={{
          width: "28rem",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des Cheques
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {totalCheques}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des transaction tpe */}
      <Card
        style={{
          width: "28rem",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des transaction TPE
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {totalTpe}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VisualizerHistory;
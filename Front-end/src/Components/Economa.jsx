import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/Achat_Action";
import { Col, Row, Carousel, Modal } from "react-bootstrap";
import Visualizer from "./Visualizer";
import AddProduct from "./AddProduct";
import EconomaProduct from "./EconomaProduct";
import Navbar from "./Navbar";
import Plateformes from "./Plateformes";
import { getCurrent } from "../Redux/Actions/Users_Action";

function Economa() {
  const dispatch = useDispatch();
  const caisses = useSelector((state) => state.caisses1.caisses);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    dispatch(getProducts(), getCurrent());
  }, [dispatch]);

  const products = useSelector((state) => state.Products.products);
  const user = useSelector((state) => state.users.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and show modal
  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  // Calculate the sum of all valid prices in the nested structure
  const calculateTotalSum = () => {
    const newTotalSum = products.reduce((sum, product) => {
      const productPrices = product.Product.map(
        (p) => parseFloat(p.Price) || 0
      );
      return (
        sum + productPrices.reduce((priceSum, price) => priceSum + price, 0)
      );
    }, 0);
    setTotalSum(newTotalSum.toFixed(3));
  };

  useEffect(() => {
    calculateTotalSum();
  }, [products, calculateTotalSum]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "2%",
        }}
      >
        <Plateformes />
      </div>
      <div
        style={{
          marginTop: "85px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Visualizer />
      </div>
      <Row style={{ display: "flex", width: "100%" }}>
        <Col className="col-6">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "2%",
            }}
          >
            <Card
              style={{
                width: "95%",
                height: "900px",
                overflow: "auto",

                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="Card"
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "3rem",
                    marginBottom: "25px",
                  }}
                >
                  Liste des achats
                  <br />
                  Total: {totalSum}
                </Card.Title>
                {user.Role === "User" ? null : <AddProduct />}
                <div style={{ marginTop: "25px" }}>
                  {products.map((product) => (
                    <EconomaProduct product={product} key={product._id} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col className="col-6">
          <div style={{ marginTop: "10px" }}>
            <Carousel>
              {products.map((product) => (
                <Carousel.Item key={product._id}>
                  <img
                    className="d-block w-100"
                    src={product.Facture}
                    onClick={() => handleImageClick(product.Facture)}
                    style={{
                      cursor: "pointer",
                      width: "300px",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    alt={`Product ${product._id}`}
                  />
                  <Carousel.Caption>
                    <h3>{product.Name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Selected "
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Economa;

import React from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import styles from "../../styles/NotFoundPage.module.css";
import btnStyles from "../../styles/Button.module.css";

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <div className="d-flex justify-content-center mb-4">
          <Container className={`mb-4 py-4 px-3 px-md-5 ${appStyles.Content}`}>
            <h1 className={`${styles.Header} mt-4`}>Oops! This page must&apos;ve taken a stroll in the garden...</h1>
            <p>We can&apos;t find the page you&apos;re looking for. It might be lost among the flowers!</p>
            <div className="d-flex justify-content-center my-4">
              <Button className={`${btnStyles.StandardBtn} px-3 py-2 mx-2`} onClick={() => history.goBack()}>
                Go back
              </Button>
              <Button className={`${btnStyles.StandardBtn} px-3 py-2 mx-2`} onClick={() => history.push('/')}>
                Home page
              </Button>
            </div>
              <Image src="https://res.cloudinary.com/dihkuau3v/image/upload/v1713963609/404-page_mncut4.webp" alt="Garden scene" fluid />
          </Container>
        </div>
      </Col>
    </Row>
  );
};

export default NotFoundPage;

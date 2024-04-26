import React from "react";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import styles from "../../styles/NotFoundPage.module.css";

const InternalServerErrorPage = () => (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <div className="d-flex justify-content-center mb-4">
          <Container className={`mb-4 py-4 px-3 px-md-5 ${appStyles.Content}`}>
            <h1 className={`${styles.Header} mt-2`}>Oh dear! Our garden seems a bit overgrown...</h1>
            <p>It looks like our system might have tangled itself up in the vines. We&apos;re tending to it as quickly as we can, but feel free to try again later.</p>
            <div className="d-flex justify-content-center">
              <Image src="https://res.cloudinary.com/dihkuau3v/image/upload/v1713969505/500-page_robqzq.webp" alt="Happy plant" fluid />
            </div>
          </Container>
        </div>
      </Col>
    </Row>
  );

export default InternalServerErrorPage;

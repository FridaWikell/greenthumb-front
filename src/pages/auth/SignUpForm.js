import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import axios from "axios";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import useRedirect from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={`${styles.Header} mb-3`}>New here? Welcome!</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                aria-label="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message) => (
              <Alert variant="warning" key={`username-${message}`}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                aria-label="password"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message) => (
              <Alert key={`password1-${message}`} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                aria-label="confirm password"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message) => (
              <Alert key={`password2-${message}`} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.StandardBtn} px-3 py-2 mx-auto`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message) => (
              <Alert key={`non-field-${message}`} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage} ${styles.OverflowImage}`}
          src="https://res.cloudinary.com/dihkuau3v/image/upload/v1713793275/vecteezy_gardening-png-graphic-clipart-design_23743657_1_nzcncc.webp"
          alt="Smiling gardener with two plants"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
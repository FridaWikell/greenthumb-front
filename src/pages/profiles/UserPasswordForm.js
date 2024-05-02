import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    newPassword1: "",
    newPassword2: "",
  });
  // Destructuring using camelCase
  const { newPassword1, newPassword2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Adjust name to match state variable names if they come as snake_case from inputs
    const formattedName = name.replace(/_\w/g, (m) => m[1].toUpperCase());
    setUserData({
      ...userData,
      [formattedName]: value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submitData = {
        new_password1: newPassword1,
        new_password2: newPassword2,
      };
      await axiosRes.post("/dj-rest-auth/password/change/", submitData);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="password">New password</Form.Label>
              <Form.Control
                placeholder="New password"
                type="password"
                id="password"
                value={newPassword1}
                onChange={handleChange}
                name="newPassword1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label htmlFor="confirm-password">Confirm password</Form.Label>
              <Form.Control
                placeholder="Confirm new password"
                type="password"
                id="confirm-password"
                value={newPassword2}
                onChange={handleChange}
                name="newPassword2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.CancelBtn} px-3 py-2 mx-2`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.SubmitBtn} px-3 py-2 mx-2`}
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
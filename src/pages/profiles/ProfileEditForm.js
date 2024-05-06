import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    profileName: "",
    profileContent: "",
    profileImage: "",
  });

  const { profileName, profileContent, profileImage } = profileData;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    } else {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ profileName: name, profileContent: content, profileImage: image });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      };

      handleMount();
    }
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", profileName);
    formData.append("content", profileContent);
  
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile.current.files[0]);
    }
  
    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {profileImage && (
                <figure>
                  <Image src={profileImage} alt="profile image" fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
              <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`} htmlFor="image-upload">
                Ready for a new profile image? Click here!
              </Form.Label>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profileImage: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="profileName"
                  aria-label="profile name"
                  value={profileName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  name="profileContent"
                  aria-label="content"
                  value={profileContent}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className={`${btnStyles.CancelBtn} px-3 py-2 mx-2`} onClick={() => history.goBack()}>
                Cancel
              </Button>
              <Button className={`${btnStyles.SubmitBtn} px-3 py-2 mx-2`} type="submit">
                Save
              </Button>
            </div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="profileName"
                aria-label="profile name"
                value={profileName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="profileContent"
                aria-label="content"
                value={profileContent}
                onChange={handleChange}
              />
            </Form.Group>
            <Button className={`${btnStyles.CancelBtn} px-3 py-2 mx-2`} onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button className={`${btnStyles.SubmitBtn} px-3 py-2 mx-2`} type="submit">
              Save
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;

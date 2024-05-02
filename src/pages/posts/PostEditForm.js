import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const PostEditForm = () => {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    hardinessZone: "0",
  });

  const { title, content, image, hardinessZone } = postData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        if (data.is_owner) {
          setPostData({
            title: data.title,
            content: data.content,
            image: data.image,
            hardinessZone: data.hardiness_zone, // Convert backend snake_case to camelCase
          });
        } else {
          history.push("/");
        }
      } catch (err) {
        // console.error("Failed to fetch post data:", err);
      }
    };

    fetchPostData();
  }, [history, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      const newImage = URL.createObjectURL(event.target.files[0]);
      setPostData(prev => ({
        ...prev,
        image: newImage,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hardiness_zone", hardinessZone); // Sending back to the server in snake_case

    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      if (err.response && err.response.status !== 401) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
          <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>
            <div className="text-center">
              <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title" 
                  id="title"
                  value={title} 
                  onChange={handleChange} 
                />
                {errors.title?.map((error, idx) => <Alert key={idx} variant="warning">{error}</Alert>)}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="content">Content</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={6}
                  name="content"
                  id="content"
                  value={content}
                  onChange={handleChange}
                />
                {errors.content?.map((error, idx) => <Alert key={idx} variant="warning">{error}</Alert>)}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="hardiness-zone">Hardiness Zone</Form.Label>
                <Form.Control
                  as="select"
                  name="hardinessZone"
                  id="hardiness-zone"
                  value={hardinessZone}
                  onChange={handleChange}
                >
                  <option value="0">Not applicable</option>
                  <option value="1">Zone 1</option>
                  <option value="2">Zone 2</option>
                  <option value="3">Zone 3</option>
                  <option value="4">Zone 4</option>
                  <option value="5">Zone 5</option>
                  <option value="6">Zone 6</option>
                  <option value="7">Zone 7</option>
                  <option value="8">Zone 8</option>
                </Form.Control>
              </Form.Group>
              {errors.hardinessZone?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button className={`${btnStyles.CancelBtn} px-3 py-2 mt-3 mx-2`} onClick={() => history.goBack()}>Cancel</Button>
              <Button className={`${btnStyles.SubmitBtn} px-3 py-2 mt-3 mx-2`} type="submit">Save</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostEditForm;

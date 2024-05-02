import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";

const PostCreateForm = () => {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    hardinessZone: "",
  });
  const { title, content, image, hardinessZone } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hardiness_zone", hardinessZone);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const hardinessZoneDropdown = (
    <>
      <Form.Group>
        <Form.Label htmlFor="hardiness-zone">Hardiness zone</Form.Label>
        <Form.Control
          as="select"
          name="hardinessZone"
          id="hardiness-zone"
          value={hardinessZone}
          onChange={handleChange}
          required
        >
          <option value="" disabled defaultValue>Choose a zone</option>
          <option value="1">Zone 1</option>
          <option value="2">Zone 2</option>
          <option value="3">Zone 3</option>
          <option value="4">Zone 4</option>
          <option value="5">Zone 5</option>
          <option value="6">Zone 6</option>
          <option value="7">Zone 7</option>
          <option value="8">Zone 8</option>
          <option value="0">Not applicable</option>
        </Form.Control>
      </Form.Group>
      {errors?.hardinessZone?.map((message, idx) => (
        <Alert key={`hardinessZone-error-${idx}`} variant="warning" className="mt-1">{message}</Alert>
      ))}
    </>
  );

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label htmlFor="title-field">Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          id="title-field"
          value={title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        {errors?.title?.map((message, idx) => (
          <Alert key={`title-error-${idx}`} variant="warning" className="mt-1">{message}</Alert>
        ))}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="content-field">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          id="content-field"
          value={content}
          onChange={handleChange}
          isInvalid={!!errors.content}
        />
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx} className="mt-1">
            {message}
          </Alert>
        ))}
      </Form.Group>

      {hardinessZoneDropdown}

      <Button
        className={`${btnStyles.CancelBtn} px-3 py-2 mx-2`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.SubmitBtn} px-3 py-2 mx-2`} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <Form.Label htmlFor="image-upload" className="sr-only">Upload image</Form.Label>
              {image ? (
                <Image className={appStyles.Image} src={image} rounded />
              ) : (
                <Asset
                  src="https://res.cloudinary.com/dihkuau3v/image/upload/v1714137937/download-small_bj3345.webp"
                  message="Click or tap to upload an image"
                />
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert key={`image-error-${idx}`} variant="warning" className="mt-1">{message}</Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostCreateForm;

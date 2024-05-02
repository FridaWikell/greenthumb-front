import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PostsPage = ({ message, filter = "" }) => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  const renderContent = () => {
    if (!hasLoaded) {
      return <Container className={appStyles.Content}><Asset spinner /></Container>;
    }

    if (posts.results.length) {
      return (
        <InfiniteScroll
          dataLength={posts.results.length}
          loader={<Asset spinner />}
          hasMore={!!posts.next}
          next={() => fetchMoreData(posts, setPosts)}
        >
          {posts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setPosts} />
          ))}
        </InfiniteScroll>
      );
    } 
      return (
        <Container className={appStyles.Content}>
          <Asset src="https://res.cloudinary.com/dihkuau3v/image/upload/v1712912063/no-result_ugwawx.jpg" message={message} />
        </Container>
      );
    
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div className="d-flex justify-content-center mb-3">
          <Link to="/posts/create">
            <Button className={btnStyles.StandardBtn}><i className="fa-regular fa-square-plus" />Add post</Button>
          </Link>
        </div>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
          <Form.Label htmlFor="search-posts" className="sr-only">Search posts</Form.Label>
          <Form.Control
            value={query}
            id="search-posts"
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {renderContent()}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default PostsPage;
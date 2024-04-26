import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({ results: [], next: null });

  const currentUser = useCurrentUser();
  const profileImage = currentUser?.profile_image;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [{ data: fetchedPost }, { data: fetchedComments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost(fetchedPost);
        setComments(fetchedComments);
      } catch (err) {
        // console.error("Failed to load post or comments:", err);
      }
    };

    fetchContent();
  }, [id]);

  const renderCommentsSection = () => {
    if (!comments.results.length) {
      return currentUser ? (
        <div className="px-3 py-2">Looks like the comment section is fresh out of the oven - be the first to serve up some thoughts!</div>
      ) : (
        <div className="px-3 py-2">No comments...Do you want to be the first?</div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={comments.results.length}
        loader={<Asset spinner />}
        hasMore={!!comments.next}
        next={() => fetchMoreData(comments, setComments)}
      >
        {comments.results.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.author}
            text={comment.text}
            createdAt={comment.createdAt}
            setComments={setComments}
          />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <Post 
          id={post.id}
          title={post.title}
          content={post.content}
          image={post.image}
          setPosts={setPost}
          postPage
        />
        <Container className={appStyles.Content}>
          {currentUser && (
            <CommentCreateForm
              profileId={currentUser.profile_id}
              profileImage={profileImage}
              postId={id}
              setComments={setComments}
            />
          )}
          {renderCommentsSection()}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;

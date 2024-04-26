import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { profile_image: profileImage } = currentUser || {};

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: postData }, { data: commentsData }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [postData] });
        setComments(commentsData);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const renderCommentList = () => (
    <InfiniteScroll
      dataLength={comments.results.length}
      loader={<Asset spinner />}
      hasMore={!!comments.next}
      next={() => fetchMoreData(comments, setComments)}
    >
      {comments.results.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          setPost={setPost}
          setComments={setComments}
        />
      ))}
    </InfiniteScroll>
  );

  const renderNoComments = () => (
    <div className="px-3 py-2">Looks like the comment section is fresh out of the oven - be the first to serve up some thoughts!</div>
  );

  const renderComments = () => {
    if (currentUser) {
      return (
        <>
          <CommentCreateForm
            profile_id={currentUser.profile_id}
            profileImage={profileImage}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />
          {comments.results.length ? renderCommentList() : renderNoComments()}
        </>
      );
    } 
      return comments.results.length ? renderCommentList() : <div className="px-3 py-2">No comments...Do you want to be the first?</div>;
    
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {renderComments()}
        </Container>
      </Col>
    </Row>
  );
};

export default PostPage;
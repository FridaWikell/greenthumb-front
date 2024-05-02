import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import ConfirmModal from "../../components/ConfirmModal";
import styles from "../../styles/Post.module.css";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id: profileId,
    profile_image: profileImage,
    comments_count: commentsCount,
    likes_count: likesCount,
    like_id: likeId,
    title,
    content,
    image,
    updated_at: updatedAt,
    postPage,
    setPosts,
    hardiness_zone: hardinessZone
  } = props;

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => history.push(`/posts/${id}/edit`);
  const handleDelete = () => setShowConfirmModal(true);

  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
      setShowConfirmModal(false);
    } catch (err) {
      // console.error("Failed to delete post:", err);
      setShowConfirmModal(false);
    }
  };

  const cancelDelete = () => setShowConfirmModal(false);

  const handleLikeInteraction = async (shouldLike) => {
    try {
      if (shouldLike) {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setPosts(prev => ({
          ...prev,
          results: prev.results.map(p => p.id === id ? {...p, likes_count: p.likes_count + 1, like_id: data.id} : p)
        }));
      } else {
        await axiosRes.delete(`/likes/${likeId}/`);
        setPosts(prev => ({
          ...prev,
          results: prev.results.map(p => p.id === id ? {...p, likes_count: p.likes_count - 1, like_id: null} : p)
        }));
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const renderLikeButton = () => {
    if (isOwner) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can&apos;t like your own post!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      );
    } if (likeId) {
      return (
        <button onClick={() => handleLikeInteraction(false)} className="icon-button" type="button" aria-label="Unlike button">
          <i className={`fas fa-heart ${styles.Heart}`} />
        </button>
      );
    } if (currentUser) {
      return (
        <button onClick={() => handleLikeInteraction(true)} className="icon-button" type="button" aria-label="Like button">
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </button>
      );
    } 
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      );
    
  };

  return (
    <>
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profileId}`}>
              <Avatar src={profileImage} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span className={`${styles.SmallerText} mr-4`}>{updatedAt}</span>
              {isOwner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        {!image?.includes("default-image_r3k7wr") && (
          <Card.Img className="mb-4" src={image} alt={title} />
        )}
        <Card.Body className="pt-0">
          <Link to={`/posts/${id}`}>
            {title && <Card.Title className="text-center mb-4">{title}</Card.Title>}
            {content && <Card.Text className="mb-4">{content}</Card.Text>}
            <hr className={styles.Line}/>
            <div className={`${styles.SmallerText} mb-2`}>Hardiness zone {hardinessZone}</div>
          </Link>
          <hr className={styles.Line}/>
          <div className={styles.PostBar}>
            {renderLikeButton()}
            {likesCount}
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
              <span className="sr-only">View comments</span>
            </Link>
            {commentsCount}
          </div>
        </Card.Body>
      </Card>
      <ConfirmModal
        show={showConfirmModal}
        handleClose={cancelDelete}
        handleConfirm={confirmDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </>
  );
};

export default Post;
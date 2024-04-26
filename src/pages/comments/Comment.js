import React, { useState } from "react";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import ConfirmModal from "../../components/ConfirmModal";

const Comment = (props) => {
  const {
    profile_id: profileId,
    profile_image: profileImage,
    owner,
    updated_at: updatedAt,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setShowConfirmModal(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profileId}`}>
          <Avatar src={profileImage} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updatedAt}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profileId}
              content={content}
              profileImage={profileImage}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {isOwner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={() => setShowConfirmModal(true)}
          />
        )}
      </Media>
      <ConfirmModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        handleConfirm={handleDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this comment?"
      />
    </>
  );
};

export default Comment;
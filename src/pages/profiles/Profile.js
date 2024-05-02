import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id: followingId, image, owner } = profile;

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} alt="avatar" />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (followingId ? (
            <Button
              className={`${btnStyles.UnfollowBtn} px-3 py-1`}
              onClick={() => handleUnfollow(profile)}
            >
              <span className={styles.SmallerText}>Unfollow</span>
            </Button>
          ) : (
            <Button
              className={`${btnStyles.FollowBtn} px-3 py-1`}
              onClick={() => handleFollow(profile)}
            >
              <span className={styles.SmallerText}>Follow</span>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
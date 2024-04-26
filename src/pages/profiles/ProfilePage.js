import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

const ProfilePage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfileData }, { data: profilePostsData }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
        ]);

        const camelCaseProfile = {
          ...pageProfileData,
          isOwner: pageProfileData.is_owner,
          followingId: pageProfileData.following_id,
        };

        setProfile(camelCaseProfile);
        setProfilePosts(profilePostsData);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [id, setProfileData]);

  const mainProfile = profile && (
    <>
      {profile.isOwner && <ProfileEditDropdown id={profile.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} roundedCircle src={profile.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile.owner}</h3>
          <Row className="justify-content-center">
            <Col xs={4} className="my-2">
              <div>{profile.postsCount}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile.followersCount}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile.followingCount}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser && !profile.isOwner && (profile.followingId ? (
            <Button className={`${btnStyles.UnfollowBtn} px-3 py-2`} onClick={() => handleUnfollow(profile)}>
              Unfollow
            </Button>
          ) : (
            <Button className={`${btnStyles.FollowBtn} px-3 py-2`} onClick={() => handleFollow(profile)}>
              Follow
            </Button>
          ))}
        </Col>
        {profile.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}&apos;s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        >
          {profilePosts.results.map(post => (
            <Post
              key={post.id}
              id={post.id}
              owner={post.owner}
              image={post.image}
              content={post.content}
              commentsCount={post.commentsCount}
              likesCount={post.likesCount}
              createdAt={post.createdAt}
              setPosts={setProfilePosts}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <Asset src="https://res.cloudinary.com/dihkuau3v/image/upload/v1712912063/no-result_ugwawx.jpg" message={`No results found, ${profile?.owner} hasn't posted yet.`} />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
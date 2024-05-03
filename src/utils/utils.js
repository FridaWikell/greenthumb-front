import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: [...new Set([...prevResource.results, ...data.results.filter((item) =>
        !prevResource.results.some((res) => res.id === item.id)
      )])]
    }));
  } catch (err) {
    // console.log(err);
  }
};

export const followHelper = (profile, clickedProfile, followingId) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followersCount: profile.followersCount + 1,
      following_id: followingId,
    };
  }
  if (profile.isOwner) {
    return { ...profile, followingCount: profile.followingCount + 1 };
  }
  return profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followersCount: profile.followersCount - 1,
      following_id: null,
    };
  }
  if (profile.isOwner) {
    return { ...profile, followingCount: profile.followingCount - 1 };
  }
  return profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp.toString());
};

export const shouldRefreshToken = () => !!localStorage.getItem("refreshTokenTimestamp");

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
import axios from "axios";

export const followUser = async (targetUserId, token) => {
    return axios.post("http://localhost:8800/api/follow/follower", { targetUserId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const unfollowUser = async (targetUserId, token) => {
    return axios.post("http://localhost:8800/api/follow/unfollow", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            targetUserId,
        },
    });
};


export const checkFollowStatus = async (targetUserId, token) => {
    const res = await axios.get(`http://localhost:8800/api/follow/isFollowing/${targetUserId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res.data.isFollowing;
}
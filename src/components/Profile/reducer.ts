import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  name: string;
  id: string;
  email: string;
  type: string;
}

interface Follower {
  id: string;
  name: string;
  profilePic: string;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  image: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  user: string;
  profilePic: string;
  text: string;
}

interface RecentGame {
  id: string;
  mode: string;
  map: string;
  mapImage: string;
  brawlerImage: string;
  brawlerName: string;
  brawlerLevel: number;
  kills: number;
  deaths: number;
  damage: number;
}

interface ProfileState {
  profile: {
    user: UserProfile;
    followers: Follower[];
    following: Follower[];
    brawlStarsId: string;
  };
  recentPosts: Post[];
  recentGames: RecentGame[];
}

const initialState: ProfileState = {
  profile: {
    user: { name: "", id: "", email: "", type: "" },
    followers: [],
    following: [],
    brawlStarsId: "",
  },
  recentPosts: [],
  recentGames: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (
      state,
      { payload: profileData }: PayloadAction<{ email?: string; brawlStarsId?: string }>
    ) => {
      if (profileData.email) state.profile.user.email = profileData.email;
      if (profileData.brawlStarsId) state.profile.brawlStarsId = profileData.brawlStarsId;
    },
    addPost: (state, { payload: post }: PayloadAction<Post>) => {
      state.recentPosts = [...state.recentPosts, post];
    },
    updatePost: (state, { payload: updatedPost }: PayloadAction<Post>) => {
      state.recentPosts = state.recentPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
    deletePost: (state, { payload: postId }: PayloadAction<string>) => {
      state.recentPosts = state.recentPosts.filter((post) => post._id !== postId);
    },
  },
});

export const { updateProfile, addPost, deletePost } = profileSlice.actions;
export default profileSlice.reducer;

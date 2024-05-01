import {create} from "zustand";

type PostContentStore = {
    postContent: string;
    setPostContent: (content: string) => void;
}

export const usePostContentStore = create<PostContentStore>((set) => ({
  postContent: "",
  setPostContent: (content: string) => set({ postContent: content }),
}));

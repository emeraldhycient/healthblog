import { RichTextEditor } from "@src/components/ui";
import { usePostContentStore } from "@src/lib/state";
import React from "react";

export const WritePost = () => {
  const { setPostContent, postContent } = usePostContentStore();

  const handleContentChange = (content: string) => {
    setPostContent(content);
  };
  return (
    <div className="section section-center">
      <RichTextEditor onChange={handleContentChange} value={postContent} />
    </div>
  );
};

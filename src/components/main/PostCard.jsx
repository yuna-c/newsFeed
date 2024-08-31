import { useState } from 'react';
import { PostCardContainer, PostCardProfile, PostContent, PostImg, LikeButton } from '../../styles/layout-main';

function PostCard() {
  return (
    <PostCardContainer>
      <PostCardProfile>
        <h3>프로필</h3>
        <p>닉네임</p>
        업로드 시간
      </PostCardProfile>
      <PostContent>
        <PostImg>
          <img src="" />
        </PostImg>
        <LikeButton>
          <button>좋아요</button>
        </LikeButton>
      </PostContent>
    </PostCardContainer>
  );
}
export default PostCard;

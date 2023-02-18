import InfiniteScroll from 'react-infinite-scroller';
import { fetchCommentsAPI, removeCommentAPI, updateCommentAPI } from '../../api/comment';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';
import { CommentItem } from './item';

export const CommentList = ({ commentInfos, setCommentInfos, reviewId }) => {
  const [hasMore, setHasMore] = useState(true);
  const [loginUser, _] = useRecoilState(loginUserAtom);

  const onLoadMore = async () => {
    if (commentInfos.length <= 0) return;
    const page = Math.ceil(commentInfos.length / 10) + 1;
    const commentRes = await fetchCommentsAPI(reviewId, page);
    const refetchComments = commentRes.data.comments;

    if (refetchComments.length < 10) {
      setHasMore(false);
    }

    setCommentInfos([...commentInfos, ...refetchComments]);
  };

  const onDelete = async (comment, writer) => {
    if (writer.email !== loginUser?.email) {
      alert('작성자만 삭제 가능합니다');
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    const select = confirm('삭제 하시겠습니까?');

    if (select) {
      await removeCommentAPI(comment.commentId);
      setCommentInfos(commentInfos.filter(commentInfo => commentInfo.comment.commentId !== comment.commentId));
      return;
    }
  };

  const onUpdate = async comment => {
    const updatedCommentRes = await updateCommentAPI(comment);
    const updatedComment = updatedCommentRes.data.comment;

    setCommentInfos(
      commentInfos.map(commentInfo => {
        if (commentInfo.comment.commentId !== updatedComment.comment_id) {
          return commentInfo;
        }
        return {
          ...commentInfo,
          comment: {
            ...updatedComment,
            commentId: updatedComment.comment_id,
            createdAt: updatedComment.created_at,
          },
        };
      }),
    );
  };

  return (
    <InfiniteScroll pageStart={1} loadMore={onLoadMore} hasMore={hasMore}>
      {commentInfos.length > 0 &&
        commentInfos?.map(commentInfo => (
          <CommentItem
            comment={commentInfo.comment}
            writer={commentInfo.writer}
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={commentInfo.comment.commentId}
          />
        ))}
    </InfiniteScroll>
  );
};

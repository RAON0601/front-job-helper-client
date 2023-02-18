import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroller';
import { DefaultProfileIcon } from '../commons/DefaultImageIcon';
import { getYYYYMMDD } from '../../utils/date';
import { ControlText } from '../commons/ControlText';
import { fetchCommentsAPI, removeCommentAPI } from '../../api/comment';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';

const CommentItem = ({ comment, writer, onDelete, onUpdate }) => {
  return (
    <Stack flexDirection="row" sx={{ margin: '16px 0', padding: '16px 0', borderBottom: '1px solid #ccc' }}>
      <DefaultProfileIcon />

      <Stack flexDirection="column" flexGrow={1}>
        <Typography fontWeight={700}>{writer.nickname}</Typography>
        <Typography fontSize={16}>{comment.contents}</Typography>
        <Typography fontSize={12}>{getYYYYMMDD(comment.createdAt)}</Typography>
      </Stack>

      <Stack flexDirection="row">
        <ControlText sx={{ mr: 1 }}>수정</ControlText>
        <ControlText onClick={() => onDelete(comment, writer)}>삭제</ControlText>
      </Stack>
    </Stack>
  );
};

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

  const onUpdate = (comment, writer) => {};

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

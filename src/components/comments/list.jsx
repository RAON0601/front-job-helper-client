import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroller';
import { DefaultProfileIcon } from '../commons/DefaultImageIcon';
import { getYYYYMMDD } from '../../utils/date';
import { ControlText } from '../commons/ControlText';
import { fetchCommentsAPI } from '../../api/comment';
import { useState } from 'react';

const CommentItem = ({ comment, writer }) => {
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
        <ControlText>삭제</ControlText>
      </Stack>
    </Stack>
  );
};

export const CommentList = ({ commentInfos, setCommentInfos, reviewId }) => {
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <InfiniteScroll pageStart={1} loadMore={onLoadMore} hasMore={hasMore}>
      {commentInfos.length > 0 &&
        commentInfos?.map(commentInfo => <CommentItem comment={commentInfo.comment} writer={commentInfo.writer} />)}
    </InfiniteScroll>
  );
};

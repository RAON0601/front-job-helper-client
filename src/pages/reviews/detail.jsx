import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviewAPI } from '../../api/review';
import { useEffect, useState } from 'react';
import { Title } from '../../components/reviews/Title';
import { ReviewDetailHeader } from '../../components/reviews/DetailHeader';
import { Divider } from '@mui/material';
import { DetailWrapper } from '../../components/reviews/DetailWrapper';
import { CommentCreateForm } from '../../components/comments/create';
import { CommentHeader } from '../../components/comments/header';
import { CommentList } from '../../components/comments/list';
import { fetchCommentsAPI } from '../../api/comment';

export const ReviewDetailPage = () => {
  const { reviewId } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [commentInfos, setCommentInfos] = useState([]);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const res = await fetchReviewAPI(reviewId);
        const commentsRes = await fetchCommentsAPI(reviewId, 1);

        setCommentInfos(commentsRes.data.comments);
        setData(res.data);
      } catch (error) {
        alert('에러가 발생했습니다!');
        navigate('/');
      }
    }
  }, []);

  if (!data) return '로딩중';

  const writer = data.writer;
  const review = data.review;

  return (
    <>
      <DetailWrapper>
        <ReviewDetailHeader {...{ writer, review }} />
        <Divider />
        <Title sx={{ marginTop: '20px' }}>{review.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: review.contents }} />
      </DetailWrapper>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <CommentHeader />
      <CommentCreateForm {...{ commentInfos, setCommentInfos }} />
      <CommentList {...{ commentInfos, setCommentInfos, reviewId }} />
    </>
  );
};

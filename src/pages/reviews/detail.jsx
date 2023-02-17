import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviewAPI } from '../../api/review';
import { useEffect, useState } from 'react';
import { Title } from '../../components/reviews/Title';
import { ReviewDetailHeader } from '../../components/reviews/DetailHeader';
import { Divider } from '@mui/material';

export const ReviewDetailPage = () => {
  const { reviewId } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const res = await fetchReviewAPI(reviewId);
        setData(res.data);
      } catch (error) {
        alert('에러가 발생했습니다!');
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return '로딩중';

  const writer = data.writer;
  const review = data.review;

  return (
    <>
      <ReviewDetailHeader {...{ writer, review }} />
      <Divider />
      <Title sx={{ marginTop: '20px' }}>{review.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: review.contents }} />
    </>
  );
};

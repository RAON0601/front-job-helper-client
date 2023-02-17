import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { countReviewAPI, fetchReviewsAPI } from '../../api/review';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getYYYYMMDD } from '../../utils/date';
import { ReviewListWrapper } from '../../components/reviews/ListWrapper';

export const ReviewListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [reviews, setReviews] = useState([]);

  const onPageChange = (e, nextPage) => setPage(nextPage);

  useEffect(() => {
    async function fetchData() {
      const countRet = await countReviewAPI();
      const reviewsRet = await fetchReviewsAPI(page);
      setCount(countRet.data.count);
      setReviews(reviewsRet.data.reviews);
    }

    fetchData();
  }, [page]);

  return (
    <ReviewListWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">리뷰 번호</TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">작성 일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews?.map(review => (
            <TableRow>
              <TableCell align="center">{review.review_id}</TableCell>
              <TableCell align="center">{review.nickname}</TableCell>
              <TableCell align="center">
                <Link to={`/reviews/${review.review_id}`}>
                  <Typography fontWeight={700}>{review.title}</Typography>
                </Link>
              </TableCell>
              <TableCell align="center">{getYYYYMMDD(review.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: '16px', position: 'relative', width: '100%' }}>
        <Pagination count={Math.ceil((count ?? 10) / 10)} page={page} onChange={onPageChange} />
        <Button onClick={() => navigate('/reviews/create')} variant="contained" sx={{ position: 'absolute', right: 0 }}>
          리뷰 작성
        </Button>
      </Stack>
    </ReviewListWrapper>
  );
};

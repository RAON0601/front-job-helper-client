import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ReviewListPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>게시글 리스트</div>
      <Button onClick={() => navigate('/reviews/create')}>리뷰 작성</Button>
    </div>
  );
};

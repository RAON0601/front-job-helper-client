import Stack from '@mui/system/Stack';
import { getYYYYMMDD } from '../../utils/date';
import { DefaultProfileIcon } from '../commons/DefaultImageIcon';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';
import { deleteReviewAPI } from '../../api/review';
import { useNavigate } from 'react-router';
import { ControlText } from '../commons/ControlText';

export const ReviewDetailHeader = ({ writer, review }) => {
  const { nickname, profileImageUrl } = writer;
  const { createdAt } = review;
  const [loginUser, setLoginUser] = useRecoilState(loginUserAtom);
  const navigate = useNavigate();

  const onDelete = async () => {
    if (loginUser.email !== writer.email) {
      alert('작성자만 삭제 할 수 있습니다!');
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    const select = confirm('삭제 하시겠습니까?');

    if (select) {
      await deleteReviewAPI(review.reviewId);
      navigate('/');
    }
  };

  const routeEdit = () => {
    if (loginUser.email !== writer.email) {
      alert('작성자만 수정 할 수 있습니다!');
      return;
    }

    navigate(`/reviews/edit/${review.reviewId}`);
  };

  return (
    <Stack flexDirection="row" alignItems="center">
      {/* 회원 기능 추가하면 프로필 이미지 추가 */}
      <div>{profileImageUrl || <DefaultProfileIcon />}</div>
      <Stack flexDirection="column" flexGrow="1">
        <Typography>{nickname}</Typography>
        <Typography>{getYYYYMMDD(createdAt)}</Typography>
      </Stack>
      <Stack flexDirection="row">
        <ControlText sx={{ marginRight: '4px' }} onClick={routeEdit}>
          수정
        </ControlText>
        <ControlText onClick={onDelete}>삭제</ControlText>
      </Stack>
    </Stack>
  );
};

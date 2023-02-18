import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const CustomCommentIcon = styled(CommentIcon)`
  color: #1976d2;
  margin-right: 8px;
`;

export const CommentHeader = () => {
  return (
    <Stack flexDirection="row" sx={{ mb: 2 }}>
      <CustomCommentIcon />
      <Typography fontWeight={700}>댓글</Typography>
    </Stack>
  );
};

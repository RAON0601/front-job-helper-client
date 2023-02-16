import { useParams } from "react-router-dom";

export const ReviewDetailPage = () => {
  const { reviewId } = useParams();

  return <div>리뷰 디테일 페이지</div>;
};

import { UserType } from "./UserTypes";

export type ReviewType = {
  id: string;
  review: string;
  rating: number;
  createdAt: string;
  dog: string;
  user: UserType;
};

export type GetReviewsTypeApiRes = {
  status: "success";
  data: {
    reviews: ReviewType[];
  };
};

export type CreateReviewTypeApiRes = {
  status: "success";
  data: {
    review: ReviewType;
  };
};

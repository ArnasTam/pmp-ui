import User from 'src/models/user';

export interface CourseReview {
  id: string;
  content: string;
  author: User;
}

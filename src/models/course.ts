import CourseTag from 'src/models/course_tag';
import User from 'src/models/user';
import Difficulty from 'src/types/course_difficulty';

interface Course {
  id: string;
  title: string;
  descriptionRichText: string;
  difficulty: Difficulty;
  author: User;
  estimatedTimeOfCompletion: number;
  participantCount: number;
  tags: CourseTag[];
  createdAt: Date;
}

export default Course;

import CourseLesson from 'src/models/course_lesson';
import Difficulty from 'src/types/course_difficulty';

export interface CreateCourseRequest {
  title: string;
  descriptionRichText: string;
  estimatedTimeOfCompletion: number;
  difficulty: Difficulty;
  codeLessons: CourseLesson[];
  tagIds: string[];
}

export default CreateCourseRequest;

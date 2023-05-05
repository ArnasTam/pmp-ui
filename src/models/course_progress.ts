import Course from 'src/models/course';
import CourseLesson from 'src/models/course_lesson';

export enum CourseProgressStatus {
  IN_PROGRESS,
  COMPLETED,
  WITHDRAWN,
}

export interface CourseProgress {
  id: string;
  completedCodeLessons: CourseLesson[];
  course: Course;
  status: CourseProgressStatus;
  courseId: string;
  userId: string;
}

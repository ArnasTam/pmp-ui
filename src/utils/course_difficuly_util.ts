import CourseDifficulty from 'src/types/course_difficulty';

export const getTitleByCourseDifficulty = (difficulty: CourseDifficulty) => {
  switch (difficulty) {
    case CourseDifficulty.Beginner:
      return 'Beginner';
    case CourseDifficulty.Intermediate:
      return 'Intermediate';
    case CourseDifficulty.Advanced:
      return 'Advanced';
    default:
      return undefined;
  }
};
export const getColorByCourseDifficulty = (difficulty: CourseDifficulty) => {
  switch (difficulty) {
    case CourseDifficulty.Beginner:
      return 'green';
    case CourseDifficulty.Intermediate:
      return 'orange';
    case CourseDifficulty.Advanced:
      return 'red';
    default:
      return undefined;
  }
};

import Difficulty from 'src/types/course_difficulty';

export const getTitleByCourseDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Beginner:
      return 'Beginner';
    case Difficulty.Intermediate:
      return 'Intermediate';
    case Difficulty.Advanced:
      return 'Advanced';
    default:
      return undefined;
  }
};
export const getColorByCourseDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Beginner:
      return 'green';
    case Difficulty.Intermediate:
      return 'orange';
    case Difficulty.Advanced:
      return 'red';
    default:
      return undefined;
  }
};

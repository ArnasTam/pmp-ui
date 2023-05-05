import { CodeProblemDto } from 'src/models/http/code_problem_dto';
import User from 'src/models/user';
import Difficulty from 'src/types/course_difficulty';

export interface ChallengeResponse {
  id: string;
  codeProblem: CodeProblemDto;
  author: User;
  difficulty: Difficulty;
}

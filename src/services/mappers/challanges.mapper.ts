import { Challenge } from 'src/models/challenge';
import { ChallengeResponse } from 'src/models/http/challenges/challenge_response';

const mapChallengeResponseToChallenge = (
  input: ChallengeResponse,
): Challenge => ({
  allowedCodeLanguageIds: input.codeProblem.allowedCodeLanguages.map(
    (language) => language.id,
  ),
  codeEditorTemplate: input.codeProblem.codeEditorTemplate,
  descriptionRichText: input.codeProblem.descriptionRichText,
  id: input.id,
  testCases: input.codeProblem.testCases,
  title: input.codeProblem.title,
  author: input.author,
  difficulty: input.difficulty,
  codeProblemId: input.codeProblem.id,
});

export default mapChallengeResponseToChallenge;

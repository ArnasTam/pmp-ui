import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from 'src/components/auth/auth_guard';
import ChallengePage from 'src/pages/challenges/challenge_page/challenge_page';
import ChallengesPage from 'src/pages/challenges/challenges_page/challenges_page';
import CreateChallengePage from 'src/pages/challenges/create_challenge_page/create_challenge_page';
import EditChallengePage from 'src/pages/challenges/edit_challenge_page/edit_challenge_page';
import OwnedChallengesPage from 'src/pages/challenges/owned_challenges_page/owned_challenges_page';
import CodeLanguagesPage from 'src/pages/code_languages/code_languages_page';
import CodeLessonPage from 'src/pages/courses/code_lesson_page/code_lesson_page';
import CoursePage from 'src/pages/courses/course_page/course_page';
import CoursesPage from 'src/pages/courses/courses_page/courses_page';
import CreateCoursePage from 'src/pages/courses/create_course_page/create_course_page';
import EditCoursePage from 'src/pages/courses/edit_course_page/edit_course_page';
import EnrolledCourses from 'src/pages/courses/enrolled_courses/enrolled_courses';
import OwnedCoursePage from 'src/pages/courses/owned_courses_page/owned_course_page';
import NotFound from 'src/pages/not_found_page/not_found_page';
import { useAuthStore, UserRole } from 'src/providers/use_auth_store';

const Router: FC = () => {
  const { role } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/owned" element={<OwnedCoursePage />} />
          <Route path="/courses/enrolled" element={<EnrolledCourses />} />
          <Route path="/courses/create-new" element={<CreateCoursePage />} />
          <Route path="/courses/:courseId/edit" element={<EditCoursePage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route
            path="/courses/:courseId/lessons/:lessonId"
            element={<CodeLessonPage />}
          />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/challenges/owned" element={<OwnedChallengesPage />} />
          <Route
            path="/challenges/create-new"
            element={<CreateChallengePage />}
          />
          <Route
            path="/challenges/:challengeId/edit"
            element={<EditChallengePage />}
          />
          <Route path="/challenges/:challengeId" element={<ChallengePage />} />
          {role === UserRole.ADMIN && (
            <Route path="/code-languages" element={<CodeLanguagesPage />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

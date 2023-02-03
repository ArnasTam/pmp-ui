import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from 'src/components/auth/auth_guard';
import ChallengesPage from 'src/pages/challenges_page/challenges_page';
import CoursesPage from 'src/pages/courses_page/courses_page';
import ExamsPage from 'src/pages/exams_page/exams_page';
import HomePage from 'src/pages/home_page/home_page';
import NotFound from 'src/pages/not_found_page/not_found_page';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;

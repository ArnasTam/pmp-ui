import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from 'src/components/page_layout/page_layout';
import NotFound from 'src/pages/not_found_page/not_found_page';

const CoursePage: FC = () => {
  const { courseId } = useParams();

  if (!courseId) {
    return <NotFound />;
  }

  return <PageLayout>{`Single Course Page ${courseId}`}</PageLayout>;
};
export default CoursePage;

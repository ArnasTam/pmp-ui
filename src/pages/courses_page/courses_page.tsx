import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { FC } from 'react';
import CourseCard from 'src/components/courses/course_card/coures_card';
import PageLayout from 'src/components/page_layout/page_layout';
import CourseTag from 'src/models/course_tag';
import User from 'src/models/user';
import CourseDifficulty from 'src/types/course_difficulty';

const CoursesPage: FC = () => (
  <PageLayout>
    <Flex flexWrap="wrap" gap="24px" justifyContent="space-evenly">
      {_.times(200, (i) => (
        <CourseCard
          key={i}
          courseId={i.toString()}
          title="Test"
          participantsCount={12333223}
          rating={1233.22222}
          estimatedHoursNeeded={100000}
          difficulty={CourseDifficulty.Beginner}
          tags={[{ id: 'js_id', title: 'javascript' } as CourseTag]}
          author={{ userName: 'ArnasTam' } as User}
        />
      ))}
    </Flex>
  </PageLayout>
);
export default CoursesPage;

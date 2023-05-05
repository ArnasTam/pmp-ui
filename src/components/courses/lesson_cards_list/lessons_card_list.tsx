import { Box, Button, useDisclosure } from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import EditLessonModal from 'src/components/courses/edit_lesson_modal/edit_lesson_modal';
import LessonCard from 'src/components/courses/lesson_card/lesson_card';
import CourseLesson from 'src/models/course_lesson';

interface LessonCardsListProps {
  courseId?: string;
  lessons: CourseLesson[];
  onChange?: (courseLessons: CourseLesson[]) => void;
  completedLessonIds?: string[];
  isEditable?: boolean;
  onLessonNavigate?: (courseId: string, lessonId: string) => void;
}

const LessonCardsList: FC<LessonCardsListProps> = ({
  courseId,
  lessons,
  onChange,
  onLessonNavigate,
  completedLessonIds,
  isEditable = false,
}) => {
  const [modalLesson, setModalLesson] = useState<CourseLesson | undefined>(
    undefined,
  );
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [lessonsList, setLessonsList] = useState(lessons);

  const updateLessonList = useCallback(
    (list: CourseLesson[]) =>
      setLessonsList(
        list.map((item, index) => ({
          ...item,
          lessonNr: index + 1,
        })),
      ),
    [],
  );

  const reorder = useCallback(
    (
      list: CourseLesson[],
      startIndex: number,
      endIndex: number,
    ): CourseLesson[] => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    },
    [],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const items = reorder(
        lessonsList,
        result.source.index,
        result.destination.index,
      );

      updateLessonList(items);
    },
    [lessonsList],
  );

  const handleDelete = useCallback(
    (id: string) => {
      updateLessonList(lessonsList.filter((item) => item.id !== id));
    },
    [lessonsList],
  );

  const handleModalSave = useCallback(
    (lesson: CourseLesson) => {
      const index = lessonsList.findIndex((item) => item.id === lesson.id);
      const lessonExists = index !== -1;

      if (lessonExists) {
        const updatedList = [...lessonsList];
        updatedList[index] = lesson;
        setLessonsList(updatedList);
      } else {
        setLessonsList([
          ...lessonsList,
          { ...lesson, lessonNr: lessonsList.length + 1 },
        ]);
      }
      onModalClose();
    },
    [lessonsList],
  );

  useEffect(() => {
    if (onChange) {
      onChange(lessonsList);
    }
  }, [lessonsList]);

  useEffect(() => {
    if (lessons) {
      setLessonsList(lessons);
    }
  }, [lessons]);

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lessonsList.map((item, index) => (
                <Draggable
                  isDragDisabled={!isEditable}
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided2) => (
                    <div
                      key={item.id}
                      ref={provided2.innerRef}
                      id={item.id}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                    >
                      <LessonCard
                        key={item.id}
                        isCompletedLesson={completedLessonIds?.includes(
                          item.id,
                        )}
                        courseId={courseId}
                        lesson={item}
                        onDelete={handleDelete}
                        onEdit={() => {
                          setModalLesson(item);
                          onModalOpen();
                        }}
                        isEditable={isEditable}
                        onNavigate={onLessonNavigate}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isEditable && (
        <Button
          mt="15px"
          p="10px"
          w="100%"
          onClick={() => {
            setModalLesson(undefined);
            onModalOpen();
          }}
        >
          Add Lesson
        </Button>
      )}
      <EditLessonModal
        lesson={modalLesson}
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={handleModalSave}
      />
    </Box>
  );
};

export default LessonCardsList;

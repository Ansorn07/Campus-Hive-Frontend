import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures
} from '../slices/viewCourseSlice';

import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  // Clear previous course state on mount
  useEffect(() => {
    dispatch(setCourseSectionData([]));
    dispatch(setEntireCourseData([]));
    dispatch(setCompletedLectures([]));
    dispatch(setTotalNoOfLectures(0));
  }, []);

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);

        if (!courseData?.courseDetails) {
          console.error("No course details found.");
          return;
        }

        const { courseContent } = courseData.courseDetails;

        dispatch(setCourseSectionData(courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos || []));

        // Calculate total lectures
        let lectures = 0;
        courseContent?.forEach((section) => {
          lectures += section?.subSection?.length || 0;
        });

        dispatch(setTotalNoOfLectures(lectures));
      } catch (error) {
        console.error("Failed to fetch course details", error);
      }
    };

    if (courseId && token) {
      setCourseSpecificDetails();
    }
  }, [courseId, token]);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-6">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;

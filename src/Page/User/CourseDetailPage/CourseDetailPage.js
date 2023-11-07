import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetail } from "../../../Redux/courseDetailSlice";

const CourseDetailPage = () => {
  // This extracts the courseId from the URL
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log(state); // Add this line to log the state

  const { courseDetail, isLoading, error } = useSelector(
    (state) => state.courseDetail
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(courseId));
    }
  }, [dispatch, courseId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!courseDetail) {
    return <div>No course details available.</div>;
  }

  return (
    <div>
      {/* Render your course details here using courseDetail data */}
      <h1>{courseDetail.tenKhoaHoc}</h1>
      {/* ... other details */}
    </div>
  );
};

export default CourseDetailPage;

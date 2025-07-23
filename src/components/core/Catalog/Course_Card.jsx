import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height = "h-[250px]" }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-richblack-800 hover:scale-[1.02] transition-all duration-300">
      <Link to={`/courses/${course?._id || ""}`}>
        {/* Thumbnail */}
        <img
          src={course?.thumbnail || "https://via.placeholder.com/300x200"}
          alt="course thumbnail"
          className={`${Height} w-full object-cover`}
        />

        {/* Course Info */}
        <div className="flex flex-col gap-2 px-3 py-4">
          <p className="text-lg font-semibold text-richblack-5">
            {course?.courseName || "Untitled Course"}
          </p>
          <p className="text-sm text-richblack-200">
            {course?.instructor?.firstName || "Unknown"} {course?.instructor?.lastName || ""}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-5">{avgReviewCount.toFixed(1)}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>
          <p className="text-lg font-bold text-richblack-5">₹{course?.price || "Free"}</p>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;

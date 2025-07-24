import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player';
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const [previewSource, setPreviewSource] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.find((course) => course._id === sectionId);
        const filteredVideoData = filteredData?.subSection.find((data) => data._id === subSectionId);
        setVideoData(filteredVideoData);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const subIndex = courseSectionData[sectionIndex].subSection.findIndex((data) => data._id === subSectionId);
    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const subIndex = courseSectionData[sectionIndex].subSection.findIndex((data) => data._id === subSectionId);
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subIndex === courseSectionData[sectionIndex].subSection.length - 1
    );
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const subIndex = courseSectionData[sectionIndex].subSection.findIndex((data) => data._id === subSectionId);
    const subSections = courseSectionData[sectionIndex].subSection;

    if (subIndex < subSections.length - 1) {
      const nextSubSectionId = subSections[subIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else if (sectionIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[sectionIndex + 1];
      const nextSubSectionId = nextSection.subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`);
    }
  };

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const subIndex = courseSectionData[sectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if (subIndex > 0) {
      const prevSubSectionId = courseSectionData[sectionIndex].subSection[subIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else if (sectionIndex > 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastSubSection = prevSection.subSection[prevSection.subSection.length - 1];
      navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSubSection._id}`);
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
      ) : (
        <div className="relative w-full aspect-video">
          <ReactPlayer
            ref={playerRef}
            url={videoData.videoUrl}
            controls
            width="100%"
            height="100%"
            onEnded={() => setVideoEnded(true)}
          />
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[100] grid place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={loading ? "Loading..." : "Mark As Completed"}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current?.seekTo) {
                    playerRef.current.seekTo(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={goToPrevVideo} className="blackButton">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading} onClick={goToNextVideo} className="blackButton">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;

import React, { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id, token })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="rounded-lg bg-richblack-700 p-6 px-8 space-y-4 max-h-[500px] overflow-y-auto">
        {Array.isArray(course?.courseContent) && course.courseContent.length > 0 ? (
          course.courseContent.map((section) => (
            <details key={section._id} open className="border border-richblack-600 rounded-md">
              <summary className="flex cursor-pointer items-center justify-between bg-richblack-800 px-4 py-2 rounded-t-md hover:bg-richblack-900 transition">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-2xl text-yellow-100" />
                  <p className="font-semibold text-richblack-5">{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-x-3 text-richblack-300">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(section._id, section.sectionName)
                    }
                  >
                    <MdEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2: "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                  <AiFillCaretDown className="text-xl" />
                </div>
              </summary>

              <div className="bg-richblack-700 px-6 pb-4 space-y-2">
                {Array.isArray(section.subSection) && section.subSection.length > 0 ? (
                  section.subSection.map((data) => (
                    <div
                      key={data._id}
                      onClick={() => setViewSubSection(data)}
                      className="flex items-center justify-between p-2 bg-richblack-800 rounded hover:bg-richblack-900 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu className="text-xl text-yellow-100" />
                        <p className="text-richblack-5">{data.title}</p>
                      </div>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-x-3 text-richblack-300"
                      >
                        <button
                          onClick={() =>
                            setEditSubSection({ ...data, sectionId: section._id })
                          }
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete this Sub-Section?",
                              text2: "This lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBin6Line className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-richblack-300">No lectures yet.</p>
                )}

                <button
                  onClick={() => setAddSubSection(section._id)}
                  className="mt-3 flex items-center gap-x-2 text-yellow-100 hover:underline"
                >
                  <FaPlus />
                  <span>Add Lecture</span>
                </button>
              </div>
            </details>
          ))
        ) : (
          <p className="text-sm text-richblack-300">
            No sections added yet. Click "Next" to add a section.
          </p>
        )}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default NestedView

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetail } from "../../../Redux/courseDetailSlice";
import { dangKyKhoaHoc } from "../../../Services/api";
import { message } from "antd";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseDetail, isLoading, error } = useSelector(
    (state) => state.courseDetail
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(courseId));
    }
  }, [dispatch, courseId]);

  const handleCourseRegistration = async () => {
    const userAccount = localStorage.getItem("userAccount");
    if (!userAccount) {
      message.error("You must be logged in to register for a course.");
      return;
    }
    try {
      const data = {
        taiKhoan: userAccount,
        maKhoaHoc: courseId,
      };
      const response = await dangKyKhoaHoc(data);
      if (response.data === "Ghi danh thành công!") {
        message.success("Đã đăng ký thành công");
      } else {
        message.info("Lỗi!");
      }
    } catch (error) {
      message.error(
        "Đăng ký không thành công vì có thể bạn đã đăng ký khóa học này rồi"
      );
    }
  };

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
    <main className='site-main'>
      <section className='inner-banner-wrap'>
        <div className='inner-banner-container'>
          <div className='container'>
            <div className='inner-banner-content'>
              <h1 className='inner-title'>Chi tiết khóa học</h1>
            </div>
          </div>
        </div>
      </section>

      <div className='course-detail-section'>
        <div className='pattern-overlay circle-pattern'></div>

        <div className='course-detail-inner'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8'>
                <div className='course-detail-container'>
                  <div className='course-description'></div>
                  <div className='course-tag'>
                    <div className='row align-items-center justify-content-center'>
                      <div className='col-md-4 text-center pink-border'>
                        <div className='course-teach-tag d-flex align-items-end justify-content-center'>
                          <figure className='author-img'>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/image/educator/thailand.jpg"
                              }
                              alt=''
                            />
                          </figure>
                          <div>
                            <h6>{courseDetail.nguoiTao.hoTen}</h6>
                            <span className='tag-description'>Giảng viên</span>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 text-center pink-border'>
                        <span>Thể loại:</span>
                        <h5>{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h5>
                      </div>
                      <div className='col-md-4 text-center pink-border'>
                        <span>34 reviews</span>
                        <div className='rating-start-wrap'>
                          <div className='rating-start'>
                            <span style={{ width: "80%" }}></span>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 text-center pink-border'>
                        <span>Gía:</span>
                        <h3>$14.99</h3>
                      </div>
                    </div>
                  </div>
                  <figure className='course-image figure-round-border'>
                    <img
                      src={courseDetail.hinhAnh}
                      alt=''
                    />
                  </figure>
                  <div className='tab-container'></div>
                </div>
              </div>
              <div className='col-lg-4 order-lg-first'>
                <div className='side-bar'>
                  <div className='video-widget'>
                    <iframe
                      width='560'
                      height='315'
                      src='https://www.youtube.com/embed/YoXxevp1WRQ?list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8'
                      title='CS50 2020 - Lecture 0 - Scratch'
                      frameborder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowfullscreen></iframe>
                  </div>
                  <div className='widget-bg widget-service icon-list-content brochure'>
                    <ul>
                      <li>
                        <i class='fa-regular fa-clock'></i>
                        <span>Thời lượng: 12 tuần</span>
                      </li>
                      <li>
                        <i class='fa-solid fa-book'></i>
                        <span>Bài giảng</span>
                      </li>
                      <li>
                        <i class='fa-solid fa-list'></i>
                        <span>Cấp độ kĩ năng</span>
                      </li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <div className='enroll-courses-btn'></div>
                  </div>
                  <div className='widget widget-bg widget-post-thumb'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='course-detail-page'>
        <section className='course-header'>
          <img
            src={courseDetail.hinhAnh}
            alt={courseDetail.tenKhoaHoc || "Course Image"}
          />
          <p className='course-category'>
            {courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </p>
          <h1 className='course-title'>{courseDetail.tenKhoaHoc}</h1>
        </section>
        <section className='course-content'>
          <p className='course-instructor'>
            Giáo viên: {courseDetail.nguoiTao.hoTen}
          </p>
          <p className='course-description'>{courseDetail.moTa}</p>
        </section>
        <section className='enrollment-section'>
          <button
            onClick={handleCourseRegistration}
            className='enroll-button'>
            Đăng ký
          </button>
        </section>
      </div>
    </main>
  );
};

export default CourseDetailPage;

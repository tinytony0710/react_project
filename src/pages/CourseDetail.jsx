import { Link, useParams } from "react-router";
import { courses } from "../data/courses";

export default function CourseDetail() {
    const { courseId } = useParams();
    const course = courses.find((item) => item.id === courseId);

    if (!course) {
        return (
        <section>
            <h1>找不到課程</h1>
            <p>網址中的課程 ID 是：{courseId}</p>
            <Link to="/courses">回課程列表</Link>
        </section>
        );
    }

    return (
        <section>
        <Link to="/courses">回課程列表</Link>
        <h1>{course.title}</h1>
        <p>{course.level} / {course.hours} 小時</p>
        <p>{course.summary}</p>
        </section>
    );
}
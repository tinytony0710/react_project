import { Link } from "react-router";
import { courses } from "@/data/courses";

export default function Courses() {
    return (
        <section>
        <h1>課程列表</h1>
        <div className="course-grid">
            {courses.map((course) => (
            <article className="course-card" key={course.id}>
                <h2>{course.title}</h2>
                <p>{course.level} / {course.hours} 小時</p>
                <p>{course.summary}</p>
                <Link to={`/courses/${course.id}`}>查看課程</Link>
            </article>
            ))}
        </div>
        </section>
    );
}
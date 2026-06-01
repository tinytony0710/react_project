import { Link } from "react-router";


function NotFound() {
    return(
        <section className="card">
            <h1>404</h1>
            <p>找不到這個頁面。</p>
            <Link to="/">回首頁</Link>
        </section>
    )
}


export default NotFound
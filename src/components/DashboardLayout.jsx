import { NavLink, Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
    const navigate = useNavigate();

    function handleLogout() {
        // TODO: 清除 token
        // TODO: 回首頁
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <section className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <button type="button" onClick={handleLogout}>
                登出
                </button>
            </div>
            <nav className="sub-nav">
                <NavLink to="/dashboard" end>
                總覽
                </NavLink>
                |
                <NavLink to="/dashboard/profile">
                個人資料
                </NavLink>
                |
                <NavLink to="/dashboard/settings">
                設定
                </NavLink>
            </nav>
            <Outlet />
        </section>
    );
}
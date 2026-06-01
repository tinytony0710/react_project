import { Outlet } from "react-router";
import Header from "./Header";


function MainLayout() {
    return(
        <>
            <Header/>
            <main className="main">
                <Outlet/>
            </main>
        </>
    );
}


export default MainLayout;
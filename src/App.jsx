import { Routes, Route } from 'react-router'
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import '@/App.css'
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardHome } from '@/pages/dashboard/Home';
import { Profile } from '@/pages/dashboard/Profile';
import { Settings } from '@/pages/dashboard/Settings';
import RequireAuth from '@/components/RequireAuth';
import Login from '@/pages/Login';
// import Character from '@/pages/Character';
import FGOCalculator from '@/pages/FGOCalculator';

function App() {
    return (
        <Routes>
            <Route element={<MainLayout/>} >
                <Route index element={<Home/>} />
                {/* <Route path="/character" element={<Character />} /> */}
                <Route path="/about" element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/another' element={<div><a href=".">another</a></div>} />
                <Route path='/FGOcalculator' element={<FGOCalculator/>} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/dashboard" element={
                        <RequireAuth>
                            <DashboardLayout />
                        </RequireAuth>
                }>
                    <Route index element={<DashboardHome />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default App

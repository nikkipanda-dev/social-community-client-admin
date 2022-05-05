import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Routes, Route } from "react-router-dom";

import { globalStyles, styled } from './stitches.config';
import './App.css';

import Navbar from './components/widgets/Navbar';
import LandingPage from './components/pages/landing-page';
import Information from './components/pages/information';
import Administrators from './components/pages/administrators';
import Members from './components/pages/members';
import BlogEntries from './components/pages/blog-entries';
import MicroblogEntries from './components/pages/microblog-entries';
import JournalEntries from './components/pages/journal-entries';
import Discussions from './components/pages/discussions';
import Events from './components/pages/events';
import Multimedia from './components/pages/multimedia';
import Reports from './components/pages/reports';
import UserActivities from './components/pages/user-activities';
import Settings from './components/pages/settings';
import Dashboard from "./components/pages/dashboard";
import Register from "./components/pages/register";
import NotFound from "./components/pages/not-found";

const Wrapper = styled('div', {});
const Main = styled('main', {});

function App() {
    globalStyles();

    const [isAuth, setIsAuth] = useState(false);

    const handleLogIn = () => {
        setIsAuth(true);
    }

    const handleLogOut = () => {
        setIsAuth(false);
    }

    useEffect(() => {
      let loading = true;
        if (loading) {
            if (Cookies.get('auth_user')) {
                handleLogIn();
            } else {
                handleLogOut();
            }
        }

      return () => {
        loading = false
      }
    }, [isAuth]);

    return (
        <Wrapper>
            <Navbar 
            isAuth={isAuth} 
            handleLogOut={handleLogOut} 
            handleLogIn={handleLogIn} />
            <Main>
                <Routes>
                    <Route path="/" element={
                        <LandingPage 
                        isAuth={isAuth} 
                        handleLogIn={handleLogIn} 
                        handleLogOut={handleLogOut} />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="information" element={<Information />} />
                        <Route path="admins" element={<Administrators />} />
                        <Route path="members" element={<Members />} />
                        <Route path="blog-entries" element={<BlogEntries />} />
                        <Route path="microblog-entries" element={<MicroblogEntries />} />
                        <Route path="journal-entries" element={<JournalEntries />} />
                        <Route path="discussions" element={<Discussions />} />
                        <Route path="events" element={<Events />} />
                        <Route path="multimedia" element={<Multimedia />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="user-activities" element={<UserActivities />} />
                    </Route>
                    <Route path="/register/:token" element={
                        <Register 
                        isAuth={isAuth} 
                        handleLogIn={handleLogIn} 
                        handleLogOut={handleLogOut} />} />
                    <Route path="/:username/settings" element={<Settings />} />
                    <Route path="/:path" element={<NotFound />} />
                </Routes>
            </Main>
        </Wrapper>
    );
}

export default App;

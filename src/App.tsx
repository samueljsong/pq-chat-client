import { Route, Routes } from 'react-router-dom';

import './App.css'

import { Toaster     } from "sonner"
import { LandingPage } from './pages/LandingPage';
import { LoginPage   } from './pages/LoginPage';
import { SignupPage  } from './pages/SignupPage';

function App() {

    return (
        <>
            <Toaster richColors position="top-center" />

            <Routes>
                <Route path="/login"  element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/"       element={<LandingPage />} />
            </Routes>
        </>
    )
}

export default App

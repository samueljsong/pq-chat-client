import { Route, Routes } from 'react-router-dom';

import './App.css'

import { Toaster     } from "sonner"
import { LandingPage } from './pages/LandingPage';
import { LoginPage   } from './pages/LoginPage';
import { SignupPage  } from './pages/SignupPage';
import ProtectedRoute from './pages/ProtectedRoute';

import { ChatView } from './Views/ChatView';

function App() {

    return (
        <>
            <Toaster richColors position="top-center" />

            <Routes>
                <Route path="/login"  element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/"       element={<ProtectedRoute><LandingPage /></ProtectedRoute>} >
                    <Route index element={<ChatView />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </>
    )
}

export default App

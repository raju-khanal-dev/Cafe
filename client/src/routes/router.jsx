import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import ProtectedRoute from "../routes/ProtectedRoute";

function Router() {
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Router;
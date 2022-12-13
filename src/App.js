
import './App.css';
import Login from "./userComponents/Login";
import Register from "./userComponents/Register";
import Layout from "./userComponents/Layout";
import { Routes, Route } from 'react-router-dom';
import UserPage from "./userComponents/UserPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                {/* public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<UserPage />} />
                {/*<Route path="unauthorized" element={<Unauthorized />} />*/}

                {/* we want to protect these routes */}
                {/*<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>*/}
                {/*    <Route path="/" element={<Home />} />*/}
                {/*</Route>*/}

                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>*/}
                {/*    <Route path="editor" element={<Editor />} />*/}
                {/*</Route>*/}


                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>*/}
                {/*    <Route path="admin" element={<Admin />} />*/}
                {/*</Route>*/}

                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>*/}
                {/*    <Route path="lounge" element={<Lounge />} />*/}
                {/*</Route>*/}

                {/* catch all */}
                {/*<Route path="*" element={<Missing />} />*/}
            </Route>
        </Routes>
    );
}


export default App;

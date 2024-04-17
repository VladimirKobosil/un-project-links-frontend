import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import LinkIndex from "./links/LinkIndex";
import LinkForm from "./links/LinkForm";
import LinkPreviewsIndex from "./links/LinkPreviewsIndex";

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link to={"/links"} className="navbar-brand">
                            Links
                        </Link>
                        <Link to={"/link-previews"} className="navbar-brand">
                            Link Preview
                        </Link>
                    </div>
                </nav>
                <div className="container mt-4">
                    <Routes>
                        <Route index element={<Navigate to={"/links"}/>}/>
                        <Route path="/links">
                            <Route index element={<LinkIndex/>}/>
                            <Route path="create" element={<LinkForm/>}/>
                            <Route path="edit/:id" element={<LinkForm/>}/>
                        </Route>
                        <Route path="/link-previews" element={<LinkPreviewsIndex/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
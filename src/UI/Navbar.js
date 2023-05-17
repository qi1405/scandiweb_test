import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Reorder } from "@material-ui/icons";

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);

    return (
        <div className="Navbar">
            <div className="leftSide">
                <div className="links">
                    <a target="_blank" href="https://scandiweb.notion.site/Junior-Developer-Test-Task-1b2184e40dea47df840b7c0cc638e61e">Scandiweb</a>
                </div>
            </div>
            <div className="rightSide">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <NavLink
                        to="/"
                        style={({ isActive }) =>
                            isActive
                                ? {
                                    color: "#61DAFB"
                                }
                                : { color: "" }
                        }

                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/add-product"
                        style={({ isActive }) =>
                            isActive
                                ? {
                                    color: "#61DAFB",
                                }
                                : { color: "" }
                        }
                    >
                        ADD
                    </NavLink>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}>
                    {" "}
                    <Reorder />{" "}
                </button>
            </div>
        </div>
    );
}

export default Navbar;

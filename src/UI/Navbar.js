import "./Navbar.css";
import {NavLink, useLocation} from "react-router-dom";
import {useState} from "react";
import {Reorder} from "@material-ui/icons";

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);
    const location = useLocation();

    return (
        <div className="Navbar">
            <div className="leftSide">
                {
                    location.pathname === "/" ?
                        <div className="links">
                            <p>Product List</p>
                        </div> : location.pathname === "/add-product" ?
                            <div className="links">
                                <p>Product Add</p>
                            </div> : null
                }
            </div>
            <div className="rightSide">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <NavLink
                        to="/"
                        style={({isActive}) =>
                            isActive
                                ? {
                                    textDecoration: "underline",
                                    fontWeight: "bolder"
                                }
                                : {color: ""}
                        }

                    >
                        PRODUCTS
                    </NavLink>
                    <NavLink
                        to="/add-product"
                        style={({isActive}) =>
                            isActive
                                ? {
                                    textDecoration: "underline",
                                    fontWeight: "bolder"
                                }
                                : {color: ""}
                        }
                    >
                        ADD
                    </NavLink>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}>
                    {" "}
                    <Reorder/>{" "}
                </button>
            </div>
        </div>
    );
}

export default Navbar;

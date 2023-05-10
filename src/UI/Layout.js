
import { Fragment } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(props) {
    return (
        <Fragment>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    );
}

export default Layout;
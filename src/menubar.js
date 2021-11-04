import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
    useRouteMatch,
    useParams,
  } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const Container = styled("div")(({ theme }) => ({
    width: "50%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    padding: "1.5rem",

    [theme.breakpoints.down("xs")]: {
         width: "auto",
        // marginLeft: "15px"
    }
}));

function MenuBar({ state, setState }) {
    const backToHome = e => setState(pre => ({ ...pre, path: '/' }))

    return (
        <div className="App-menubar">
            <Container>
                {/* <NameHeader>Andrew Karos</NameHeader> */}
                <ul>
                    <li><a href="/">Projects</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </Container>
        </div>
    )
}

export default MenuBar

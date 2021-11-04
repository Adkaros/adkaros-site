import React from 'react';
import { styled } from "@material-ui/core/styles";

const Container = styled("div")(({ theme }) => ({
    width: "1000px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",

    [theme.breakpoints.down("xs")]: {
         width: "auto",
        // marginLeft: "15px"
    }
}));

const NameHeader = styled("div")({
    position: 'relative',
    display: "inline-block",
    alignItems: "center",
    marginLeft: "0px",
    color: "#ffffff",
    fontSize: "2em",
    textAlign: "left",
});

function About({ state, setState }) {

    return (
        <Container>
            <NameHeader>About</NameHeader>
            <div id="aboutContainer">
                <img id="aboutImage" src="domain.png"/>
                <div id="bio">Hello! I'm a Interactive App Developer from Chicago, IL.
                 I've done brand activations, roadshows, tradeshows, installations, LED setups, VR, AR, Web Development, Virtual Events, and more.
                 </div>
            </div>

            <NameHeader>Contact</NameHeader>
            <div id="contactContainer">

            </div>
        </Container>
    )
}

export default About;

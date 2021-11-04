import React from 'react';
import ProjectItem from '../project-item';
import { styled } from "@material-ui/core/styles";

const Container = styled("div")(({ theme }) => ({
    width: "100%",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    textAlign: "center",

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
    fontSize: "3em",
    textAlign: "center",
});

function ProjectInfo({ state, setState }) {

    React.useEffect(() => {

        setTimeout(() => {
            document.getElementById('pinfo-descriptor').style.opacity = 1;
        }, 250);

        setTimeout(() => {
            document.getElementById('pimg').style.opacity = 1;
        }, 350);
    }, []);

    return (
        <Container>
            <div id="pinfo-name">Oceanic Spectrum</div>
            <div id="pinfo-descriptor">Generative Art - GLSL</div>
            <div id="pbody">
                <img id="pimg" src="domain.png"/>
            </div>
        </Container>
    )
}

export default ProjectInfo;
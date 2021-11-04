import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

import ProjectItem from '../project-item';
import { resizeGridItems } from '../DynamicGridUtil';

const Container = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "inline-block",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    padding: "1.5rem",
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

function Projects({ state, setState }) {
    var [currProjectItem, setCurrProjectItem] = useState(-1);
    var [projects, setProjects] = useState([]);
    
    let history = useHistory();

    function onGridItemClicked() {
        history.push('/project-info');
    }

    React.useEffect(() => {
        console.log('download project data');
        
        var temp = [];
        for (var i = 0; i < 4; i++) {
            temp.push(<ProjectItem key={i} data={
               { selected: currProjectItem }
            } />);
        }
        setProjects(temp);

        // to fix issue where all items stay 0x0 when going back
        setTimeout(() => {
            resizeGridItems();
        }, 0);
    }, []);

    return (
        <Container id="projects-page">
            <NameHeader>Andrew Karos</NameHeader>
            <div id="projects-grid">
                { projects.map((comp, i) => {
                    return <ProjectItem key={i} data={{ id: i, selected: currProjectItem, onclick: onGridItemClicked}}/>
                }) }
            </div>
        </Container>
        
    )
}

export default Projects

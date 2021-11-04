import React, { useState } from 'react'
import { styled } from "@material-ui/core/styles";

function ProjectItem({data}) {
    var [opacity, setOpacity] = useState(0);

    React.useEffect(() => {
        console.log('data: ', data);

    }, [data.selected]);

    return (
        <div className="project-grid-item" onClick={data.onclick}>            
            <div className="project-item-tint">
                <div className="project-item-name">Oceanic Spectrum</div>
                <div className="project-item-descriptor">Generative Art - GLSL</div>
            </div>

            <img src="domain.png" width="100%" height="100%"/>
        </div>
    )
}

export default ProjectItem;
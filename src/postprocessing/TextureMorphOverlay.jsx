import React, { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'

import { fragmentCustomTEX } from "./fragmentCustomTEX";
import { BlendFunction } from 'postprocessing'

// Effect implementation
class TextureMorphOverlayImpl extends Effect {
    constructor(tex1, faded) {
        super('CustomEffect', fragmentCustomTEX, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                ['tex1', new THREE.Texture(tex1)],
                //['time', new Uniform(time)],
                // ["hue", new Uniform(0)]
            ]),
        })
        this.uniforms.get('tex1').value = tex1
    }

    // update(renderer, inputBuffer, deltaTime) {
    //     this.uniforms.get('time').value += 0.05
    // }
}

// Effect component
const TextureMorphOverlay = forwardRef(({ tex1, faded }, ref) => {
    const effect = useMemo(() => new TextureMorphOverlayImpl(tex1, faded), [tex1, faded])
    return <primitive ref={ref} object={effect} dispose={null} />
})

export default TextureMorphOverlay
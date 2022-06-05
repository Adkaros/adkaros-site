import React, { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'

import { fragmentCustomRGB } from "./fragmentCustomRGB";
import { BlendFunction, EffectAttribute, WebGLExtension } from 'postprocessing'

let pFaded = false;

// Effect implementation
class BarrelDistortionImpl extends Effect {
    constructor(faded) {
        //console.log('update barrelDistortion');
        super('CustomEffect', fragmentCustomRGB, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                ['max_distort', new Uniform(20.2)],
                ['num_iter', new Uniform(6)],
                ['time', new Uniform(0)]
            ]),
        })
    }

    update(renderer, inputBuffer, deltaTime) {
        this.uniforms.get('time').value += 0.05
    }
}

// Effect component
const BarrelDistortion = forwardRef(({ faded }, ref) => {
    const effect = useMemo(() => new BarrelDistortionImpl(faded), [faded])
    return <primitive ref={ref} object={effect} dispose={null} />
})

export default BarrelDistortion
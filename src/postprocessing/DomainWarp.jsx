import React, { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'

import { fragmentDomainWarp } from "./fragmentDomainWarp";
import { BlendFunction, EffectAttribute, WebGLExtension } from 'postprocessing'

class DomainWarpImpl extends Effect {
    constructor(faded) {
        super('CustomEffect', fragmentDomainWarp, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                //['iResolution', new THREE.Vector2(1080, 1080)],
            ]),
        })
    }

    // update(renderer, inputBuffer, deltaTime) {
    //     this.uniforms.get('time').value += 0.05
    // }
}

// Effect component
const DomainWarp = forwardRef(({ faded }, ref) => {
    const effect = useMemo(() => new DomainWarpImpl(faded), [faded])
    return <primitive ref={ref} object={effect} dispose={null} />
})

export default DomainWarp
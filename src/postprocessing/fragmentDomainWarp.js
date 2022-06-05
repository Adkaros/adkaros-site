export const fragmentDomainWarp = `
uniform vec2 iResolution;
//uniform float iTime;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 10

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 3.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Celestial Debris

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
    vec2 st = gl_FragCoord.xy/vec2(512, 512)*1.;
	// vec4 color = texture2D(inputBuffer, uv);
	vec3 color = vec3(0.0);

	vec2 q =  vec2(0.0);
	q.x = fbm(st +0.00*time);
	q.y = fbm( st + vec2(200.));

    vec2 r = vec2(0.);
    r.x = fbm( st + 21.0*q + vec2(1.7,229.2)+ 0.125*time );
    r.y = fbm( st + 1.0*q + vec2(80.3,2.8)+ 0.006*time);

    float f = fbm(st+sin(r)*time*0.002);

    color = mix(vec3(0.101961,0.019608,0.166667),
                vec3(1.166667,0.266667,3.498039),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.864706),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.266667,1,1),
                clamp(length(r.x),0.0,1.0));

    outputColor = vec4((f*f*f+1.*f*f+.5*f)*color,1.);
}
`
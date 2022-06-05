export const fragmentCustomTEX = `
// uniform float time;
// uniform float hue;

// uniform int num_iter;
uniform sampler2D tex1;


// mirroring uv function
vec2 mirrored(vec2 v) {

	vec2 m = mod(v,2.);
	return mix(m,2.-m,step(1.,m));

}



// overlay blending mode fu
float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}


void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

vec2 newUV =uv;

// distorting uvs for our texture
newUV.x*=sin(newUV.x*2.12+time*.012);
newUV.y*=sin(newUV.y*1.45+time*.0063);

// distorted texture
vec4 distortions = texture2D(tex1,mirrored(newUV));

// blending original color with distorted texture
vec3 blendedColor = blendOverlay(inputColor.rgb,distortions.rgb,.55);


outputColor = vec4(blendedColor,1.);


}
`
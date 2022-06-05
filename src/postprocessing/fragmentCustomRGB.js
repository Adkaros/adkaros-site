export const fragmentCustomRGB = `
uniform float max_distort;
uniform int num_iter;

vec2 barrelDistortion(vec2 coord, float amt) {
	vec2 cc = coord - 0.5;
	float dist = dot(cc, cc);
	return coord + cc * dist * amt;
}

float sat( float t )
{
	return clamp( t, 0.0, 1.0 );
}

float linterp( float t ) {
	return sat( 1.0 - abs( 2.0*t - 1.0 ) );
}

float remap( float t, float a, float b ) {
	return sat( (t - a) / (b - a) );
}

vec4 spectrum_offset( float t ) {
	vec4 ret;
	float lo = step(t,0.5);
	float hi = 1.0-lo;
	float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
	ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);

	return pow( ret, vec4(1.0/2.2) );
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

// const float max_distort = .28;
// const int num_iter = 6;

// const float reci_num_iter_f = 1.0 / float(num_iter);


void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

float reci_num_iter_f = 1.0 / float(num_iter);


// vec2 newUV=(uv*.5)+.25;
vec2 newUV = uv;
vec4 sumcol = vec4(0.0);
	vec4 sumw = vec4(0.0);	
	for ( int i=0; i<num_iter;++i )
	{
		float t = float(i) * reci_num_iter_f;
		vec4 w = spectrum_offset( t );
		sumw += w;
		sumcol += w * texture2D( inputBuffer, barrelDistortion(newUV, .6 * max_distort*t ) );
	}
	
	outputColor = sumcol / sumw;


// directional rgb shift:


// vec2 dir = uv - vec2( .5 );
// 	float d = .7 * length( dir );
// 	normalize( dir );
// 	vec2 value = d * dir * vec2(100.5);

// 	vec4 c1 = texture2D( inputBuffer, uv - value / resolution.x );
// 	vec4 c2 = texture2D( inputBuffer, uv );
// 	vec4 c3 = texture2D( inputBuffer, uv + value / resolution.y );
	
// 	outputColor = vec4( c1.r, c2.g, c3.b, c1.a + c2.a + c3.b );


}
`
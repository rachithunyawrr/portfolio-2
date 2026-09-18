export const particleVertexShader = /* glsl */ `
  attribute vec3 aPos;
  attribute vec3 aColor;
  attribute vec3 aRand;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScatter;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float tw = 0.72 + 0.28 * sin(uTime * (0.6 + aRand.x * 1.6) + aRand.y * 6.2831);

    vec3 p = aPos;
    p.x += sin(uTime * 0.5 + aRand.y * 6.2831) * 0.10;
    p.y += cos(uTime * 0.44 + aRand.z * 6.2831) * 0.10;
    p.z += sin(uTime * 0.38 + aRand.x * 6.2831) * 0.10;

    if (uScatter > 0.001) {
      vec3 off = aRand * 2.0 - 1.0;
      p += normalize(off + vec3(0.001)) * uScatter * (1.0 + aRand.x * 1.8);
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    float fadeIn = smoothstep(38.0, 14.0, dist);
    float fadeNear = smoothstep(1.2, 3.4, dist);

    float size = aSize * (420.0 / max(dist, 1.0)) * uPixelRatio * tw;

    vColor = aColor;
    vAlpha = tw * fadeIn * fadeNear;

    gl_PointSize = size;
    gl_Position = projectionMatrix * mv;
  }
`

export const particleFragmentShader = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    float a = smoothstep(0.5, 0.02, r);
    a = pow(a, 2.6);
    vec3 glow = vColor * 0.85 + vec3(0.35, 0.55, 1.0) * 0.25;
    gl_FragColor = vec4(glow, a * vAlpha * 1.15);
  }
`
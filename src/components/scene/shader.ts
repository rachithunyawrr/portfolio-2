export const particleVertexShader = `
  attribute vec3 aStart;
  attribute vec3 aTarget;
  attribute vec3 aColor;
  attribute vec3 aSeed;

  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uWave;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float delay = aSeed.x * 0.17;
    float progress = smoothstep(delay, 1.0, uProgress);
    vec3 position = mix(aStart, aTarget, progress);
    float resting = smoothstep(0.72, 1.0, progress);
    float drift = 0.028 * resting;

    position.x += sin(uTime * (0.62 + aSeed.y) + aSeed.x * 16.0) * drift;
    position.y += cos(uTime * (0.51 + aSeed.z) + aSeed.y * 17.0) * drift;
    position.z += sin(uTime * (0.44 + aSeed.x) + aSeed.z * 14.0) * drift;
    position.y += sin(uTime * 3.0 + aTarget.x * 2.2 + aSeed.z * 8.0) * uWave * 0.22 * progress;

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    float distanceToCamera = max(5.0, -viewPosition.z);
    float twinkle = 0.82 + sin(uTime * (1.2 + aSeed.z * 2.1) + aSeed.x * 18.0) * 0.18;

    gl_PointSize = (3.0 + aSeed.z * 2.6) * uPixelRatio * (20.0 / distanceToCamera) * twinkle;
    gl_Position = projectionMatrix * viewPosition;
    vColor = aColor;
    vAlpha = mix(0.38, 1.0, progress) * twinkle * uOpacity;
  }
`

export const particleFragmentShader = `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceFromCenter = length(point);
    float core = smoothstep(0.5, 0.0, distanceFromCenter);
    float glow = pow(core, 2.4);
    gl_FragColor = vec4(vColor * (0.9 + core * 0.45), glow * vAlpha);
  }
`

export const starVertexShader = `
  attribute vec3 aColor;
  attribute float aSize;

  uniform float uPixelRatio;

  varying vec3 vColor;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (42.0 / max(12.0, -viewPosition.z));
    gl_Position = projectionMatrix * viewPosition;
    vColor = aColor;
  }
`

export const starFragmentShader = `
  precision highp float;

  varying vec3 vColor;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float glow = smoothstep(0.5, 0.04, length(point));
    gl_FragColor = vec4(vColor, glow * 0.82);
  }
`

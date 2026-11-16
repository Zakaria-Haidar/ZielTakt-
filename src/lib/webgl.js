// Checked once per page. The probe context is released right away: phones only allow a
// handful of live WebGL contexts, and leaked probes count against that limit.
let cached;
export default function hasWebGL() {
  if (cached === undefined) {
    try {
      const gl = document.createElement('canvas').getContext('webgl');
      cached = Boolean(gl);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      cached = false;
    }
  }
  return cached;
}

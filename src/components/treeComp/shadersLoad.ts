
// shaders.ts

export const loadShader = async (): Promise<{ vertexShader: string, fragmentShader: string }> => {
  const [vertexResponse, fragmentResponse] = await Promise.all([
    fetch('./src/components/treecomp/shaders/vertexshader.glsl'),
    fetch('./src/components/treecomp/shaders/fragmentShader.glsl')
  ]);

  const vertexShader = await vertexResponse.text();
  const fragmentShader = await fragmentResponse.text();

  return { vertexShader, fragmentShader };
};

import fragmentShader from "@glsl/cube/fragment.glsl";
import vertexShader from "@glsl/cube/vertex.glsl";
import raf from "../utils/Raf";
import { texturesMap } from "@js/utils/assets";
import { BoxGeometry, Mesh, ShaderMaterial } from "three";

export class Cube extends Mesh {
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1, 16, 16);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture1: { value: texturesMap.get("diamond") },
      },
    });
    super(geometry, material);
    raf.subscribe("cube", this.update.bind(this));
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}

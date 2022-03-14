import { textureLoader } from "./Loader";

const texturesMap = new Map();

const diamond = textureLoader.load("/assets/cube.png");
texturesMap.set("diamond", diamond);

export { texturesMap };

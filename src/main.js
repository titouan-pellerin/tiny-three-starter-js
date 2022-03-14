import { mainScene } from "@js/Three/MainScene";
import { Cube } from "@js/Three/Cube";

import "./styles/style.scss";

function init() {
  const cube = new Cube();
  mainScene.add(cube);
}

document.addEventListener("DOMContentLoaded", init);

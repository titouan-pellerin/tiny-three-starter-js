import { guiFolders } from "../utils/Debug";
import raf from "../utils/Raf";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFShadowMap,
  sRGBEncoding,
  ACESFilmicToneMapping,
  Color,
  Fog,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class MainScene extends Scene {
  constructor() {
    super();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = document.querySelector(".webgl");
    this.camera = new PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.updateProjectionMatrix();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableRotate = true;
    guiFolders.get("camera").add(this.controls, "enabled").name("OrbitControls");
    this.controls.update();

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      // antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.background = new Color("#000");

    this.add(this.camera);
    this.camera.position.set(0, 0, 20);

    const fog = new Fog(new Color("#000"), 6, 45);
    this.fog = fog;

    window.addEventListener("resize", this.resize.bind(this));

    raf.subscribe("scene", this.update.bind(this));
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.controls.update();
    this.renderer.render(this, this.camera);
  }
}

const mainScene = new MainScene();
export { mainScene };

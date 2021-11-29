import * as Three from "../lib/three.module.js";

// 创建场景
const scene = new Three.Scene();

// 创建分组
const petal = new Three.Group();

// 添加纹理
function create(group) {
  const texture1 = new Three.TextureLoader().load("./assets/图层 1 (1).png");
  const texture2 = new Three.TextureLoader().load("./assets/图层 1.png");
  const texture3 = new Three.TextureLoader().load("./assets/图层 2 (1).png");
  const texture4 = new Three.TextureLoader().load("./assets/图层 2.png");

  const lists = [texture1, texture2, texture3, texture4];

  for (let i = 0; i < 400; i++) {
    const spriteMaterial = new Three.SpriteMaterial({
      map: lists[Math.floor(Math.random() * lists.length)],
    });

    const sprite = new Three.Sprite(spriteMaterial);

    group.add(sprite);

    sprite.scale.set(40, 50, 1);

    sprite.position.set(2000 * (Math.random() - 0.5), 2000 * Math.random(), 0);
  }
  scene.add(group);
}

create(petal);

// 坐标轴
const axisHelper = new Three.AxisHelper(1000);

scene.add(axisHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;

const s = 200;

// 正交相机
const camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1000, 1);

camera.position.set(0, 200, 500);

camera.lookAt(scene.position);

const renderer = new Three.WebGLRenderer();

renderer.setSize(width, height);

renderer.setClearColor(0x000000f, 1);

document.body.appendChild(renderer.domElement);

function render() {
  petal.children.forEach((item) => {
    item.position.x += 0.5;
    item.position.y -= 1;
    if (item.position.y < -400) {
      item.position.y = 800;
    }

    if (item.position.x > 1000) {
      item.position.x = -1000;
    }
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render();

function add() {
  camera.zoom += 1;
}

function dec() {
  if (camera.zoom === 1) {
    return;
  }
  camera.zoom -= 1;
}

document.querySelector("button.add").addEventListener("click", add);
document.querySelector("button.dec").addEventListener("click", dec);

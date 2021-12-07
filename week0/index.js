import * as THREE from "../lib/three.module.js";
import { OrbitControls } from "../lib/orbit-controls.module.js";

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
/**
 * 创建网格模型
 */
var geometry0 = new THREE.SphereGeometry(50, 40, 40); //创建一个球体几何对象
// const material0 = new THREE.MeshLambertMaterial({
//   color: 0xff0000,
// });
const material0 = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  transparent: false,
  opacity: 0.5,
});
// const material0 = new THREE.MeshPhongMaterial({
//   color:0x0000ff,
//   specular:0x4488ee,
//   shininess:12
// })
const mesh0 = new THREE.Mesh(geometry0, material0);
mesh0.position.set(0, 75, 0);
scene.add(mesh0);

var geometry = new THREE.BoxGeometry(200, 50, 150); //创建一个立方体几何对象Geometry
// var material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
// }); //材质对象Material
var sphereMaterial=new THREE.MeshPhongMaterial({
  color:0x0000ff,
  specular:0x4488ee,
  shininess:12
})
var mesh = new THREE.Mesh(geometry, sphereMaterial); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中


var point1 = new THREE.PointLight(0xffffff);
point1.position.set(-400, -200, -300); //点光源位置
scene.add(point1); //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x000000);
// scene.add(ambient);

console.log(scene);
console.log(scene.children);

const axis = new THREE.AxesHelper(200);
scene.add(axis);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(100, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

let T0 = new Date().getTime();
let direction = 1;
function render() {
  let T1 = new Date().getTime();
  const t = T1 - T0;
  T0 = T1;

  requestAnimationFrame(render);

  if (mesh0.position.y >= 150) {
    direction = -1;
  }
  if (mesh0.position.y <= 75) {
    direction = 1;
  }
  mesh0.translateY(direction * 0.05 * t);

  mesh.rotateX(0.001 * t);
  mesh.rotateY(0.001 * t);
  mesh.rotateZ(0.001 * t);

  //执行渲染操作   指定场景、相机作为参数
  renderer.render(scene, camera);
}

render();

const control = new OrbitControls(camera, renderer.domElement);

control.addEventListener("change", function () {
  renderer.render(scene, camera);
});

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//グローバル関数を設定
let scene,camera,renderer,pointLight,controls;

window.addEventListener("load",init);
function init(){
  //シーンの作成
scene= new THREE.Scene();

//カメラをシーンに追加
//PerspectiveCamera(視野角（カメラのどこからどこまで写すかの角度）,アスペクト比（画面比率）,開始距離（カメラが写す開始距離）,終了距離（カメラが写す終わり距離）)
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//カメラのポジションを設定する(x,y,z)
camera.position .set(0,0,500);

//テクスチャを追加
let texture = new THREE.TextureLoader().load("earth.jpg");


//ジオメトリの作成 THREE.SphereGeometry(radius(半径),wideSegment(ポリゴン数縦),（ポリゴン数横）);
let ballGeometry = new THREE.SphereGeometry(100,64,32);
//マテリアル作成  光源を必要としないマテリアル MeshPhysicalMaterial(色、テクスチャ);
let ballMaterial = new THREE.MeshPhysicalMaterial({map:texture});
//メッシュ化 THREE.Mesh(ジオメトリ,マテリアル)
let ballMesh = new THREE.Mesh(ballGeometry,ballMaterial);
scene.add(ballMesh);

//平行光源を追加THREE.DirectionalLight(色,強さ);
//0xとはこれから16進数で書きますよっていう意味！
let directionalLight = new THREE.DirectionalLight(0xffffff,2);
//光の角度を設定
directionalLight.position.set(1,1,1);
//シーンに光を追加
scene.add(directionalLight);

//ポイントライトを作成 仕様はドキュメンテーションを見る
pointLight =new THREE.PointLight(0xffffff,1);
pointLight.position.set( 50, 50, 50 );
scene.add(pointLight);

//ポイントライトがどこにあるか特定する。 PointLightHelper(対象ライト,サイズ)
let pointLightHelper = new THREE.PointLightHelper(pointLight,30);
scene.add(pointLightHelper);




//レンダラーを追加 {alpha:true}を入れることで背景を透過してくれる。
renderer = new THREE.WebGLRenderer({alpha:true});
//Three.jsの画面を画面いっぱいにする
renderer.setSize(window.innerWidth,window.innerHeight);
//解像度を上げる setPixelRatio(window.devicePixelRatio); デバイスのサイズに合わせて解像度を合わせる関数
renderer.setPixelRatio(window.devicePixelRatio);
//bodyに描画するように設定
document.body.appendChild(renderer.domElement);

//リサイズ時にリサイズ関数起動
window.addEventListener("resize",onWindowResize);


//マウス操作が出来るようにしよう
controls = new OrbitControls( camera, renderer.domElement );
animate();

}

//ブラウザのリサイズに対応
function onWindowResize(){
  //レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth,window.innerHeight);
  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}

function animate(){
  //ポイント光源を球の周りを巡回させる。
  //光源を巡回させるCSS
  pointLight.position.set(
    200 * Math.sin(Date.now() /500),
    200 * Math.sin(Date.now() /1000),
    200 * Math.cos(Date.now() /500),
    );
    requestAnimationFrame(animate);
    //シーンとカメラを書き出し
    renderer.render(scene, camera);
}



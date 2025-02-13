import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

fetch('./lidar.json')
  .then(response => response.json())
  .then(lidarData => {

      const data = lidarData.filter((d) => d.vehicle_id === "EN12");

      let points = [];
      let colors = [];
      let timestamps = [...new Set(data.map(p => p.timestamp_sec_utc))].sort();
      let frameIndex = 0;

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      let int;

      function updateFrame() {
          const currentTimestamp = timestamps[frameIndex];
          const frameData = data.find(p => p.timestamp_sec_utc === currentTimestamp);
          
          if (!frameData)  {
              clearInterval(int);
          }
          
          const detections = frameData.detections || [];
          const reflectivity = frameData.reflectivity || [];

          for (let i = 0; i < detections.length; i++) {
              const { x, y, z } = detections[i];
              const refl = parseFloat(reflectivity[i]);
              points.push(parseFloat(x), parseFloat(y), parseFloat(z));
              colors.push(1.0, 1.0, 1.0, refl / 100.0);
          }
          
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
          geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
          geometry.computeBoundingSphere();
          
          frameIndex++;
      }
      
      int = setInterval(updateFrame, 200);
  });

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


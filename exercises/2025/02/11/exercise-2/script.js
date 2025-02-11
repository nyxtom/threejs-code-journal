// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define control points
const p0 = new THREE.Vector3(-3, 0, 0);
const p1 = new THREE.Vector3(-1, 3, 0);
const p2 = new THREE.Vector3(1, -3, 0);
const p3 = new THREE.Vector3(3, 0, 0);

// Create a cubic Bezier curve
const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);

// Generate points along the curve
const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Line material and object
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const curveObject = new THREE.Line(geometry, material);
scene.add(curveObject);

// Camera positioning
camera.position.z = 5;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

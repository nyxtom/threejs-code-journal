const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const noise = new Noise(Math.random()); // Seeded Perlin noise
const worldSize = 1000; // World size in blocks
const blocks = new Map();

function getHeight(x, z) {
    return Math.floor(noise.perlin2(x * 0.1, z * 0.1) * 5 + 5);
}

const blockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const dirtMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown dirt color
const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Green grass color
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // Yellow sun

function createInstancedBlocks(instancedMesh, x, y, z, index) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(x * 0.5, y * 0.5, z * 0.5);
    instancedMesh.setMatrixAt(index, matrix);
}

function generateTerrain() {
    const count = worldSize * worldSize;
    const dirtMesh = new THREE.InstancedMesh(blockGeometry, dirtMaterial, count);
    const grassMesh = new THREE.InstancedMesh(blockGeometry, grassMaterial, count / 2);
    let dirtIndex = 0;
    let grassIndex = 0;

    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
        for (let z = -worldSize / 2; z < worldSize / 2; z++) {
            const y = getHeight(x, z);
            if (y > 4) {
                createInstancedBlocks(grassMesh, x, y, z, grassIndex++);
            } else {
                createInstancedBlocks(dirtMesh, x, y, z, dirtIndex++);
            }
        }
    }
    scene.add(dirtMesh);
    scene.add(grassMesh);
}

// Add a sun block in the sky
const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), sunMaterial);
scene.add(sun);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

camera.position.set(0, 10, 20);

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    // More realistic horizon movement for the sun
    time += 0.002; // Slower transition for realism
    const sunRadius = 500; // Increased to match large world
    const sunX = sunRadius * Math.cos(time);
    const sunY = sunRadius * Math.sin(time) + 50; // Higher for better horizon effect
    const sunZ = -500;
    
    sun.position.set(sunX, sunY, sunZ);
    light.position.set(sunX, sunY, sunZ);
    
    renderer.render(scene, camera);
}

generateTerrain();
animate();


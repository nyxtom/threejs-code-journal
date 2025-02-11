mkdir -p exercises/2025/02/11/exercise-1

# Create README.md
cat > README.md <<EOL
Three.js Code Journal

Welcome to the Three.js Code Journal! This repository serves as a daily log of code exercises focused on Three.js. Each exercise or project is organized by date, making it easy to track your progress and revisit previous work.

Folder Structure

The folder structure is organized by year, month, and day. Each exercise or project is contained in its own folder.

threejs-code-journal/
├── README.md
├── index.html
├── gallery.js
├── exercises/
│   ├── YYYY/
│   │   ├── MM/
│   │   │   ├── DD/
│   │   │   │   ├── exercise-N/
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── script.js
│   │   │   │   │   └── style.css

- \`YYYY/MM/DD/exercise-N/\`: Contains the code for each exercise or project.

Getting Started

Follow these steps to get started with your own journaling journey:

1. Clone the repository:
    git clone https://github.com/nyxtom/threejs-code-journal.git

2. Navigate to the folder of the desired exercise:
    cd threejs-code-journal/exercises/YYYY/MM/DD/exercise-N

3. Open \`index.html\` in your browser to see the exercise in action.

Adding Your Own Exercises

Feel free to use this repository as a template for your own journaling journey. Here's how you can add your own exercises:

1. Create a new folder for your exercise:
    mkdir -p exercises/YYYY/MM/DD/exercise-N

2. Add your code files (\`index.html\`, \`script.js\`, \`style.css\`) to the new folder.

3. Commit and push your changes:
    git add .
    git commit -m "Add exercise N for YYYY-MM-DD"
    git push origin main

Contributing

We welcome contributions from the community! If you have an exercise or project you'd like to share, please follow these steps:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Add your exercise or project to the appropriate folder.
4. Submit a pull request with a brief description of your contribution.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Happy coding and journaling!
EOL

# Create index.html
cat > index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Code Journal Gallery</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Three.js Code Journal Gallery</h1>
        <div id="gallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
    </div>
    <script src="gallery.js"></script>
</body>
</html>
EOL

# Create gallery.js
cat > gallery.js <<EOL
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    
    const exercises = [
        // List of exercises (this should be dynamically generated)
        { date: '2025-02-11', name: 'exercise-1', path: 'exercises/2025/02/11/exercise-1/index.html' }
    ];

    exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 p-4 rounded-lg shadow-lg';
        
        const title = document.createElement('h2');
        title.className = 'text-xl font-bold mb-2';
        title.textContent = \`\${exercise.date} - \${exercise.name}\`;
        
        const link = document.createElement('a');
        link.href = exercise.path;
        link.target = '_blank';
        link.className = 'text-blue-400 hover:underline';
        link.textContent = 'View Exercise';

        card.appendChild(title);
        card.appendChild(link);
        gallery.appendChild(card);
    });
});
EOL

# Create exercises/2025/02/11/exercise-1/index.html
cat > exercises/2025/02/11/exercise-1/index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 1 - Three.js Basics</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-900 text-white">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
EOL

# Create exercises/2025/02/11/exercise-1/script.js
cat > exercises/2025/02/11/exercise-1/script.js <<EOL
// Basic Three.js setup

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();
EOL

# Create exercises/2025/02/11/exercise-1/style.css
cat > exercises/2025/02/11/exercise-1/style.css <<EOL
body {
    margin: 0;
    overflow: hidden;
}
EOL

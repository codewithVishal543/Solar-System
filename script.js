// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light so everything is visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Add Sun (yellow)
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets with basic data
const planetData = [
    { name: 'Mercury', size: 0.3, distance: 5, speed: 0.02, color: 0x888888 },
    { name: 'Venus', size: 0.5, distance: 7, speed: 0.015, color: 0xcc9966 },
    { name: 'Earth', size: 0.6, distance: 9, speed: 0.01, color: 0x3399ff },
    { name: 'Mars', size: 0.4, distance: 11, speed: 0.008, color: 0xff3300 }
];

const planets = [];

planetData.forEach(data => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = {...data, angle: Math.random() * Math.PI * 2 };
    planets.push(mesh);
    scene.add(mesh);
});

// Set camera back so everything is visible
camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        const { distance, speed } = planet.userData;
        planet.userData.angle += speed;
        planet.position.x = Math.cos(planet.userData.angle) * distance;
        planet.position.z = Math.sin(planet.userData.angle) * distance;
    });

    renderer.render(scene, camera);
}

animate();

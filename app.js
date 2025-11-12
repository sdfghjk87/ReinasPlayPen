// Initialize the scene
const scene = new THREE.Scene();


// Set up the camera (perspective view with fov, aspect ratio, near and far planes)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create the playpen (a simple cube)
const playpenGeometry = new THREE.BoxGeometry(5, 5, 5); // Size of the playpen
const playpenMaterial = new THREE.MeshBasicMaterial({ color: 0x87cefa, wireframe: true }); // Light blue wireframe
const playpen = new THREE.Mesh(playpenGeometry, playpenMaterial);
scene.add(playpen);


// Create the floor (green for grass or carpet)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;  // Rotate the floor to lie flat
floor.position.y = -2;  // Position the floor below the playpen
scene.add(floor);


// Set up the camera position to look at the scene
camera.position.z = 10;


// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let clock = new THREE.Clock();
let isMovingForward = false;
let isMovingBackward = false;
let isTurningLeft = false;
let isTurningRight = false;


// Keyboard control
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') isMovingForward = true;
    if (event.key === 's') isMovingBackward = true;
    if (event.key === 'a') isTurningLeft = true;
    if (event.key === 'd') isTurningRight = true;
});


document.addEventListener('keyup', (event) => {
    if (event.key === 'w') isMovingForward = false;
    if (event.key === 's') isMovingBackward = false;
    if (event.key === 'a') isTurningLeft = false;
    if (event.key === 'd') isTurningRight = false;
});


// Move the player (camera)
function animate() {
    requestAnimationFrame(animate);


    const delta = clock.getDelta(); // Time elapsed


    // Movement logic
    if (isMovingForward) velocity.z -= 0.1;
    if (isMovingBackward) velocity.z += 0.1;
    if (isTurningLeft) camera.rotation.y += 0.02;
    if (isTurningRight) camera.rotation.y -= 0.02;


    // Apply movement to the camera position
    camera.position.add(velocity);
    velocity.multiplyScalar(0.9); // Dampen movement


    renderer.render(scene, camera);
}


animate();
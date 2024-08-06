import React from 'react';
import Navbar from './navbar';
import styles from './Home.module.css';

function Home() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className={styles.body}>
        <p>This is the home page</p>
      </div>
    </div>
  )
}

// // Add a 3D object
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Camera position
// camera.position.z = 5;

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }
// animate();

// // Handle window resize
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// function Home() {
//   return (
//     <div>
//     <style>
//         body { margin: 0; }
//         canvas { display: block; }
//         .hero { position: relative; width: 100%; height: 100vh; overflow: hidden; }
//     </style>
// <body>
//     <div class="hero" id="hero"></div>
//     <script type="module" src="main.js"></script>
// </body>
// </div>)
// }

export default Home

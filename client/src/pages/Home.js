import React, {useEffect} from 'react';
import Navbar from './navbar';

function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="p-5">
        <p>This is the home page</p>
      </div>
      <div data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
          


        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        : Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
      <Footer />
    </div>
  );
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

export default Home;

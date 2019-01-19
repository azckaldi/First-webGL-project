import './css/style.styl'
import * as THREE from 'three'

/**
 * Import textures 
 */
import universeTextureSource from './textures/universe/space.png' // gris : pas encore utilisé 
const textureLoader = new THREE.TextureLoader()
const universeTexture = textureLoader.load(universeTextureSource)
universeTexture.wrapT = THREE.RepeatWrapping
universeTexture.wrapS = THREE.RepeatWrapping
universeTexture.repeat.set(1,1) // x et y 

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => // responsive 
{
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix() // mettre à jour la matrice de projection TRES LOURD : pas le faire à chaque frame 

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/*
Cursor
*/
const cursor = {}
cursor.x = 0
cursor.y = 0 

window.addEventListener('mousemove', (_event) => // underscore quand paramètre de fonction 
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Add scene : contenir les différentes meshes
 */
 const scene = new THREE.Scene()

 /**
 * Add camera : perspective
 */
const camera = new THREE.PerspectiveCamera(150, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)   

/**
 * universe background
 */

const universe = new THREE.Mesh(
    new THREE.SphereBufferGeometry(12,32,32),
    new THREE.MeshBasicMaterial(
        { 
          map: universeTexture,
          side : THREE.DoubleSide,
        })
)
scene.add(universe)

/**
 * Mesh
 */

 const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
 )
 scene.add(sphere)

 /**
 * Renderer 
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

 /**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop) // fonction qui se rappelle à la frame suivante

    //update sphere / universe
    universe.rotation.y += 0.00001

    sphere.rotation.y += -0.003


    //update camera
    camera.position.x = cursor.x * 3
    camera.position.y = cursor.y * 3
    camera.lookAt(new THREE.Vector3())

    // Renderer
    renderer.render(scene, camera)
}
loop()



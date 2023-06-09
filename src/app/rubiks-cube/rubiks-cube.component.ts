import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rubiks-cube',
  templateUrl: './rubiks-cube.component.html',
  styleUrls: ['./rubiks-cube.component.css'],
})
export class RubiksCubeComponent implements OnInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Object3D;
  private isMouseDown: boolean = false;
  private initialMousePosition: THREE.Vector2 | null = null;
  private finalMousePosition: THREE.Vector2 | null = null;
  private cubeGroup!: THREE.Group;
  private controls!: OrbitControls;
  private textureLoader = new THREE.TextureLoader();
  private clickedCubeletIndex: number | null = null;
  private raycaster = new THREE.Raycaster();
  public cubeSize: number = 3;
  private cubeSizes: number[] = [3, 2, 5];
  private cubeSizeIndex: number = 0;
  private keydownSubscription: any;
  public difficulty: 'easy' | 'medium' | 'hard' | null = null;
  private startTime: number | null = null;
  private timerElement: HTMLElement | null = null;
  private timerInterval: any = null;

  constructor() {}

  ngOnInit() {
    this.textureLoader.load('assets/photocv_nobg.png', (texture) => {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initRubiksCube(texture);
      this.initControls();
      this.animate();

      window.addEventListener('keydown', (event) => this.onKeyDown(event));

      this.rendererCanvas.nativeElement.addEventListener(
        'mousedown',
        this.onMouseDown.bind(this)
      );
      this.rendererCanvas.nativeElement.addEventListener(
        'mousemove',
        this.onMouseMove.bind(this)
      );
      this.rendererCanvas.nativeElement.addEventListener(
        'mouseup',
        this.onMouseUp.bind(this)
      );
      window.addEventListener('keydown', this.onKeyDown.bind(this));

      this.animate = () => {
        requestAnimationFrame(this.animate);

        TWEEN.update();

        this.renderer.render(this.scene, this.camera);
      };
    });
  }

  ngOnDestroy() {
    this.renderer.dispose();
    window.removeEventListener('keydown', (event) => this.onKeyDown(event));
  }

  changeCubeSize() {
    // Remove the old cube from the scene and dispose of its materials
    this.cubeGroup.children.forEach((cubelet) => {
      this.disposeMaterials(cubelet as THREE.Mesh);

      // Dispose of the cubelet's geometry
      const mesh = cubelet as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      // Remove the cubelet from the scene
      this.scene.remove(cubelet);
    });

    this.cubeGroup.children = [];

    // Create and add the new cube to the scene
    const texture = this.textureLoader.load('assets/photocv_nobg.png');
    this.initRubiksCube(texture);
  }

  disposeMaterials(cubelet: THREE.Mesh) {
    if (Array.isArray(cubelet.material)) {
      cubelet.material.forEach((material) => {
        if (material instanceof THREE.Material && material.dispose) {
          material.dispose();
        }
      });
    } else if (
      cubelet.material instanceof THREE.Material &&
      cubelet.material.dispose
    ) {
      cubelet.material.dispose();
    }
  }

  initScene() {
    this.scene = new THREE.Scene();

    // Create and style the timer element
    this.timerElement = document.createElement('div');
    this.timerElement.style.position = 'absolute';
    this.timerElement.style.top = '10px';
    this.timerElement.style.left = '10px';
    this.timerElement.style.fontSize = '20px';
    this.timerElement.style.color = 'white';
    document.body.appendChild(this.timerElement);
  }

  initCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.set(6, 4, 6);
    this.camera.lookAt(this.scene.position);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 12;
    this.controls.rotateSpeed = 0.5;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.rendererCanvas.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(
      (window.innerWidth / 15) * 10,
      (window.innerHeight / 15) * 10
    );
  }
  initCube(texture: THREE.Texture) {
    const size = 1;
    const cubelets: THREE.Object3D[] = [];

    for (let x = -this.cubeSize / 2; x < this.cubeSize / 2; x++) {
      for (let y = -this.cubeSize / 2; y < this.cubeSize / 2; y++) {
        for (let z = -this.cubeSize / 2; z < this.cubeSize / 2; z++) {
          const cubelet = this.createCube(size, texture);
          cubelet.position.set(x * size, y * size, z * size);
          cubelets.push(cubelet);
          this.scene.add(cubelet);
        }
      }
    }

    this.cubeGroup = new THREE.Group();
    this.cubeGroup.add(...cubelets);
    this.scene.add(this.cubeGroup);
  }

  initRubiksCube(texture: THREE.Texture) {
    const size = 1;

    // If cubeGroup already exists, clear it
    if (this.cubeGroup) {
      this.cubeGroup.children.forEach((cubelet) => {
        this.disposeMaterials(cubelet as THREE.Mesh);
        this.scene.remove(cubelet);
      });
      this.cubeGroup.children = [];
    } else {
      // If cubeGroup does not exist, create it
      this.cubeGroup = new THREE.Group();
    }

    for (let x = -this.cubeSize / 2; x < this.cubeSize / 2; x++) {
      for (let y = -this.cubeSize / 2; y < this.cubeSize / 2; y++) {
        for (let z = -this.cubeSize / 2; z < this.cubeSize / 2; z++) {
          const cubelet = this.createCube(size, texture);
          cubelet.position.set(x * size, y * size, z * size);
          this.cubeGroup.add(cubelet);
        }
      }
    }

    this.scene.add(this.cubeGroup);
  }

  createCube(size: number, texture?: THREE.Texture): THREE.Object3D {
    const geometry = new THREE.BoxGeometry(size, size, size);

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Right - Green
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Left - Blue
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Up - Red
      new THREE.MeshBasicMaterial({ color: 0xffa500 }), // Down - Orange
      new THREE.MeshBasicMaterial({ map: texture }), // Front - White
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Back - Yellow
    ];

    const cube = new THREE.Mesh(geometry, materials);

    // Create a wireframe for the cube
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );

    // Add the wireframe to the cube
    cube.add(wireframe);

    return cube;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.startTime !== null) {
      const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Convert to seconds

      // Update the timer element
      if (this.timerElement) {
        this.timerElement.innerText = `Time: ${elapsedTime}s`;
      }

      // Check if the cube is solved
      if (this.isCubeSolved()) {
        console.log('Cube solved in:', elapsedTime, 's');
        this.startTime = null;

        // Stop updating the timer
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
      }
    }

    this.updateScene();
    this.renderer.render(this.scene, this.camera);
  }

  rotateFace(face: string, angleDegrees: number, cubeGroup: THREE.Group) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const rotationAxis = new THREE.Vector3();

    switch (face.toLowerCase()) {
      case 'front':
        rotationAxis.set(0, 0, 1);
        break;
      case 'back':
        rotationAxis.set(0, 0, -1);
        break;
      case 'left':
        rotationAxis.set(-1, 0, 0);
        break;
      case 'right':
        rotationAxis.set(1, 0, 0);
        break;
      case 'up':
        rotationAxis.set(0, 1, 0);
        break;
      case 'down':
        rotationAxis.set(0, -1, 0);
        break;
      default:
        console.error('Invalid face name:', face);
        return;
    }

    cubeGroup.children.forEach((cubelet) => {
      const cubeletPosition = cubelet.position.clone();

      // Rotate the cubelet's position
      //cubeletPosition.applyAxisAngle(rotationAxis, angleRadians);

      // Rotate the cubelet itself
      const cubeletQuaternion = new THREE.Quaternion();
      cubeletQuaternion.setFromAxisAngle(rotationAxis, angleRadians / 2);
      cubelet.quaternion.multiply(cubeletQuaternion);

      // Update cubelet position
      cubelet.position.copy(cubeletPosition);
      cubelet.updateMatrix();
    });
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.initialMousePosition = new THREE.Vector2(event.clientX, event.clientY);

    // Calculate the mouse position in normalized device coordinates (-1 to +1) for both components.
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Create a Raycaster with the camera and the mouse position.
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    // Find the intersected objects from the scene.
    const intersects = this.raycaster.intersectObjects(this.cubeGroup.children);
    if (intersects.length > 0) {
      this.clickedCubeletIndex = this.cubeGroup.children.indexOf(
        intersects[0].object
      );
    }

    if (intersects.length > 0) {
      // The first intersected object is the closest one.
      const clickedCubelet = intersects[0].object;
      console.log('Clicked cubelet:', clickedCubelet);
    }

    if (intersects.length > 0) {
      // The first intersected object is the closest one.
      const clickedCubelet = intersects[0].object as THREE.Mesh;
      const clickedCubeletIndex = this.cubeGroup.children.findIndex(
        (child) => child === clickedCubelet
      );

      console.log(
        'Clicked cubelet:',
        clickedCubelet,
        'Index:',
        clickedCubeletIndex
      );

      if (intersects.length > 0) {
        const clickedCubelet = intersects[0].object as THREE.Mesh;
        this.clickedCubeletIndex = this.cubeGroup.children.findIndex(
          (child) => child === clickedCubelet
        );

        console.log(
          'Clicked cubelet:',
          clickedCubelet,
          'Index:',
          this.clickedCubeletIndex
        );
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;

    this.finalMousePosition = new THREE.Vector2(event.clientX, event.clientY);

    // Perform any desired actions while the mouse is being moved, such as rotating the cube
  }

  onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;

    if (
      !this.initialMousePosition ||
      !this.finalMousePosition ||
      this.clickedCubeletIndex === null
    )
      return;

    const direction = new THREE.Vector2()
      .subVectors(this.finalMousePosition, this.initialMousePosition)
      .normalize();
    if (this.clickedCubeletIndex !== -1) {
      // Based on the selected cubelet and direction, determine which face to rotate and the rotation direction
      const cubelet = this.cubeGroup.children[
        this.clickedCubeletIndex
      ] as THREE.Mesh;
      const face = this.determineFaceToRotate(cubelet);
      const clockwise = this.shouldRotateClockwise(face, direction);
      const layer = this.getLayer(cubelet.position, face);
    }

    this.initialMousePosition = null;
    this.finalMousePosition = null;
    this.clickedCubeletIndex = null;
  }

  onKeyDown(event: KeyboardEvent) {
    const keyToRotationMap: {
      [key: string]: { face: string; clockwise: boolean };
    } = {
      f: { face: 'front', clockwise: true },
      F: { face: 'front', clockwise: false },
      b: { face: 'back', clockwise: true },
      B: { face: 'back', clockwise: false },
      l: { face: 'left', clockwise: true },
      L: { face: 'left', clockwise: false },
      r: { face: 'right', clockwise: true },
      R: { face: 'right', clockwise: false },
      u: { face: 'up', clockwise: true },
      U: { face: 'up', clockwise: false },
      d: { face: 'down', clockwise: true },
      D: { face: 'down', clockwise: false },
    };

    const rotation = keyToRotationMap[event.key];
    if (rotation) {
      console.log(
        'Rotating',
        rotation.face,
        rotation.clockwise ? 'clockwise' : 'counterclockwise'
      );
      this.rotateFace(
        rotation.face,
        rotation.clockwise ? 90 : -90,
        this.cubeGroup
      );
    }
  }

  updateScene() {
    this.controls.update();
  }

  private createRotationTween(
    cubelet: THREE.Object3D,
    axis: THREE.Vector3,
    angle: number
  ): TWEEN.Tween<any> {
    const startQuaternion = cubelet.quaternion.clone();
    const targetQuaternion = new THREE.Quaternion()
      .setFromAxisAngle(axis, angle)
      .multiply(startQuaternion);

    const tween = new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((obj) => {
        cubelet.quaternion.copy(startQuaternion).slerp(targetQuaternion, obj.t);
        this.controls.update();
      })
      .onComplete(() => {
        // Update the cubelet's matrix to apply the new position and quaternion values
        cubelet.updateMatrix();
      });

    return tween;
  }

  determineFaceToRotate(cubelet: THREE.Mesh): string {
    const position = cubelet.position;
    if (position.x === -1) return 'left';
    if (position.x === 1) return 'right';
    if (position.y === -1) return 'down';
    if (position.y === 1) return 'up';
    if (position.z === -1) return 'back';
    if (position.z === 1) return 'front';
    return '';
  }

  shouldRotateClockwise(face: string, direction: THREE.Vector2): boolean {
    const swipeDirection3D = new THREE.Vector3(direction.x, direction.y, 0);
    const cameraRight = this.camera
      .getWorldDirection(new THREE.Vector3())
      .cross(this.camera.up);
    const cameraUp = this.camera.up.clone();

    const angleToRight = swipeDirection3D.angleTo(cameraRight);
    const angleToUp = swipeDirection3D.angleTo(cameraUp);

    if (angleToRight < angleToUp) {
      // If angle to the right vector is smaller, use the camera's right vector for determining the rotation direction.
      const crossProduct = new THREE.Vector3().crossVectors(
        swipeDirection3D,
        cameraRight
      );
      return crossProduct.z > 0;
    } else {
      // If angle to the up vector is smaller, use the camera's up vector for determining the rotation direction.
      const crossProduct = new THREE.Vector3().crossVectors(
        swipeDirection3D,
        cameraUp
      );
      return crossProduct.z < 0;
    }
  }

  private getLayer(position: THREE.Vector3, face: string): number {
    switch (face) {
      case 'front':
      case 'back':
        return Math.round(position.z + 1);
      case 'left':
      case 'right':
        return Math.round(position.x + 1);
      case 'up':
      case 'down':
        return Math.round(position.y + 1);
      default:
        return 0;
    }
  }

  private updateCubeletMaterials(cubelets: THREE.Object3D[]) {
    cubelets.forEach((cubelet) => {
      if (cubelet instanceof THREE.Mesh) {
        const materials = cubelet.material as THREE.Material[];
        materials.forEach((material, index) => {
          if (material instanceof THREE.MeshBasicMaterial) {
            material.needsUpdate = true;
          }
        });
      }
    });
  }

  public setDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = difficulty;

    switch (difficulty) {
      case 'easy':
        this.cubeSize = 2;
        break;
      case 'medium':
        this.cubeSize = 3;
        break;
      case 'hard':
        this.cubeSize = 5;
        break;
    }

    this.textureLoader.load('assets/photocv_nobg.png', (texture) => {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initRubiksCube(texture);
      this.initControls();
      this.animate();

      this.rendererCanvas.nativeElement.addEventListener(
        'mousedown',
        this.onMouseDown.bind(this)
      );
      this.rendererCanvas.nativeElement.addEventListener(
        'mousemove',
        this.onMouseMove.bind(this)
      );
      this.rendererCanvas.nativeElement.addEventListener(
        'mouseup',
        this.onMouseUp.bind(this)
      );
      window.addEventListener('keydown', this.onKeyDown.bind(this));
    });
  }

  //function isCubeSolved that check if the rubiks cube is fully solved
  isCubeSolved(): boolean {
    const cubelets = this.cubeGroup.children as THREE.Mesh[];
    for (let i = 0; i < cubelets.length; i++) {
      const cubelet = cubelets[i];
      const materials = cubelet.material as THREE.Material[];
      const faceColors = materials.map(
        (material) => (material as THREE.MeshBasicMaterial).color
      );

      if (!faceColors.every((color) => color.equals(faceColors[0]))) {
        return false;
      }
    }
    return true;
  }
}

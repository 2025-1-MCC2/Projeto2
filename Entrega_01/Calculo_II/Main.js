import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Configurações iniciais
var length_X = 6; // Comprimento do eixo X
var length_Y = 50; // Comprimento do eixo Y
var length_Z = 6; // Comprimento do eixo Z

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0); // Cinza médio, menos claro

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Configuração da câmera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(20, 20, 20); // Posição inicial da câmera
camera.lookAt(0, 0, 0);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suaviza o movimento da câmera
controls.dampingFactor = 0.05; // Fator de amortecimento
controls.minDistance = 10; // Distância mínima de zoom
controls.maxDistance = 80; // Distância máxima de zoom
controls.maxPolarAngle = Math.PI / 2; // Limita o ângulo de rotação vertical

// Iluminação
const light = new THREE.PointLight({ color: 'white' });
light.position.set(10, 10, 10);
scene.add(light);

// Adicionando eixos X, Y e Z
const axesHelper = new THREE.AxesHelper(5); // Tamanho dos eixos
scene.add(axesHelper);

// Função para criar linhas de marcação nos eixos
function createAxisMarks(length, color, axis) {
    const marks = [];
    for (let i = 1; i < length; i++) {
        const points = [];
        if (axis === 'x') {
            points.push(new THREE.Vector3(i, 0.25, 0));
            points.push(new THREE.Vector3(i, -0.25, 0));
        } else if (axis === 'y') {
            points.push(new THREE.Vector3(0.25, i, 0));
            points.push(new THREE.Vector3(-0.25, i, 0));
        } else if (axis === 'z') {
            points.push(new THREE.Vector3(0, 0.25, i));
            points.push(new THREE.Vector3(0, -0.25, i));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    }
}

// Função para adicionar números nas marcações dos eixos (2D)
function addAxisLabels(length, axis) {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        for (let i = 1; i < length; i++) {
            const textGeometry = new TextGeometry(i.toString(), {
                font: font,
                size: 0.3, // Tamanho menor para evitar sobreposição
                height: 0, // Altura zero para texto 2D
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Posicionamento dos números (2D)
            if (axis === 'x') {
                textMesh.position.set(i, -0.5, 0); // Abaixo do eixo X
                textMesh.rotation.set(0, 0, 0); // Sem rotação
            } else if (axis === 'y') {
                textMesh.position.set(-0.5, i, 0); // À esquerda do eixo Y
                textMesh.rotation.set(0, 0, 0); // Sem rotação
            } else if (axis === 'z') {
                textMesh.position.set(0, -0.5, i); // Abaixo do eixo Z
                textMesh.rotation.set(0, 0, 0); // Sem rotação
            }

            scene.add(textMesh);
        }
    });
}

// Criando marcas nos eixos
createAxisMarks(length_X, 'red', 'x');
createAxisMarks(length_Y, 'green', 'y');
createAxisMarks(length_Z, 'blue', 'z');



// Função principal
function Function(H) {
    return (Math.pow(H, 3) / 3) - (3 * Math.pow(H, 2)) + (5 * H) + 20;
}

// Plotando a função
for (let H = 0; H <= 6; H += 0.01) {
    const Function_Points = [];
    Function_Points.push(new THREE.Vector3(H, Function(H), 0));
    Function_Points.push(new THREE.Vector3(H + 0.01, Function(H + 0.01), 0));

    const Function_Line = new THREE.BufferGeometry().setFromPoints(Function_Points);
    const Function_Line_Material = new THREE.LineBasicMaterial({ color: 'yellow', linewidth: 2 });
    const Function_Line_Line = new THREE.Line(Function_Line, Function_Line_Material);
    scene.add(Function_Line_Line);
}

// Adicionando legenda
const legend = document.createElement('div');
legend.style.position = 'absolute';
legend.style.top = '10px';
legend.style.left = '10px';
legend.style.color = 'black'; // Cor do texto para contraste com o fundo claro
legend.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Fundo semi-transparente
legend.style.padding = '10px';
legend.style.borderRadius = '5px';
legend.innerHTML = `
    <strong>Legenda:</strong><br>
    <span style="color: red;">● Eixo X</span><br>
    <span style="color: green;">● Eixo Y</span><br>
    <span style="color: blue;">● Eixo Z</span><br>
    <span style="color: yellow;">● Função f(x)</span>
`;
document.body.appendChild(legend);

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Atualiza os controles de órbita
    renderer.render(scene, camera);
}
animate();
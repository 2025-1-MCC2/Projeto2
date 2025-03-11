import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var lenght_X = new Number(6);//
var lenght_Y = new Number(50);// lenght of axis must be fucking proportional to the goddaam camera position
var lenght_Z = new Number(6);//

const scene = new THREE.Scene();

let H = Number();

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight({color: 'white'});

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(10,10,10);
camera.lookAt(0,0,0);
const controls = new OrbitControls( camera, renderer.domElement );
//#region Line_Points
const Line_X_points = [];
Line_X_points.push( new THREE.Vector3( lenght_X, 0, 0 ) );
Line_X_points.push( new THREE.Vector3( -lenght_X, 0, 0 ) );

const Line_Y_points = [];
Line_Y_points.push( new THREE.Vector3( 0, lenght_Y, 0 ) );
Line_Y_points.push( new THREE.Vector3( 0, -lenght_Y, 0 ) );

const Line_Z_points = [];
Line_Z_points.push( new THREE.Vector3( 0, 0, lenght_Z ) );
Line_Z_points.push( new THREE.Vector3( 0, 0, -lenght_Z ) );
//#endregion 

//#region Line_Apply
const Line_X_Geometry = new THREE.BufferGeometry().setFromPoints( Line_X_points );
const Line_X_Material = new THREE.LineBasicMaterial( {color: 'red' } );
const Line_X_Line = new THREE.Line( Line_X_Geometry, Line_X_Material );

const Line_Y_Geometry = new THREE.BufferGeometry().setFromPoints( Line_Y_points );
const Line_Y_Material = new THREE.LineBasicMaterial( {color: 'green' } );
const Line_Y_Line = new THREE.Line( Line_Y_Geometry, Line_Y_Material );

const Line_Z_Geometry = new THREE.BufferGeometry().setFromPoints( Line_Z_points );
const Line_Z_Material = new THREE.LineBasicMaterial( {color: 'blue' } );
const Line_Z_Line = new THREE.Line( Line_Z_Geometry, Line_Z_Material );
//#endregion

//#region Scene_Add
scene.add( Line_X_Line );
scene.add( Line_Y_Line );
scene.add( Line_Z_Line );

scene.add( light );

//#endregion

//#region Indent_Line_Marks
for(var X = 1; X < lenght_X; X++){

    const Indent_Line_X_Points_Up = [];
    Indent_Line_X_Points_Up.push( new THREE.Vector3(X,0.25,0));
    Indent_Line_X_Points_Up.push( new THREE.Vector3(X,-0.25,0));

    const Indent_Line_X_Points_Down = [];
    Indent_Line_X_Points_Down.push( new THREE.Vector3(-X,0.25,0));
    Indent_Line_X_Points_Down.push( new THREE.Vector3(-X,-0.25,0));

    const Indent_Line_X_Points_Right = [];
    Indent_Line_X_Points_Right.push( new THREE.Vector3(X,0,0.25));
    Indent_Line_X_Points_Right.push( new THREE.Vector3(X,0,-0.25));

    const Indent_Line_X_Points_Left = [];
    Indent_Line_X_Points_Left.push( new THREE.Vector3(-X,0, 0.25));
    Indent_Line_X_Points_Left.push( new THREE.Vector3(-X,0,-0.25));

    const Indent_Line_X_Geometry_Up = new THREE.BufferGeometry().setFromPoints( Indent_Line_X_Points_Up );
    const Indent_Line_X_Material_Up = new THREE.LineBasicMaterial( {color: 'red' } );
    const Indent_Line_X_Line_Up = new THREE.Line( Indent_Line_X_Geometry_Up, Indent_Line_X_Material_Up );

    const Indent_Line_X_Geometry_Down = new THREE.BufferGeometry().setFromPoints( Indent_Line_X_Points_Down);
    const Indent_Line_X_Material_Down = new THREE.LineBasicMaterial( {color: 'red' } );
    const Indent_Line_X_Line_Down = new THREE.Line( Indent_Line_X_Geometry_Down, Indent_Line_X_Material_Down );

    const Indent_Line_X_Geometry_Right = new THREE.BufferGeometry().setFromPoints( Indent_Line_X_Points_Right );
    const Indent_Line_X_Material_Right = new THREE.LineBasicMaterial( {color: 'red' } );
    const Indent_Line_X_Line_Right = new THREE.Line( Indent_Line_X_Geometry_Right, Indent_Line_X_Material_Right );

    const Indent_Line_X_Geometry_Left = new THREE.BufferGeometry().setFromPoints( Indent_Line_X_Points_Left);
    const Indent_Line_X_Material_Left = new THREE.LineBasicMaterial( {color: 'red' } );
    const Indent_Line_X_Line_Left = new THREE.Line( Indent_Line_X_Geometry_Left, Indent_Line_X_Material_Left );
    scene.add( Indent_Line_X_Line_Up );
    scene.add( Indent_Line_X_Line_Down );
    scene.add( Indent_Line_X_Line_Right );
    scene.add( Indent_Line_X_Line_Left );
}
for(var Y = 1; Y < lenght_Y; Y++){

    const Indent_Line_Y_Points_Up = [];
    Indent_Line_Y_Points_Up.push( new THREE.Vector3(0.25,Y,0));
    Indent_Line_Y_Points_Up.push( new THREE.Vector3(-0.25,Y,0));

    const Indent_Line_Y_Points_Down = [];
    Indent_Line_Y_Points_Down.push( new THREE.Vector3(0.25,-Y,0));
    Indent_Line_Y_Points_Down.push( new THREE.Vector3(-0.25,-Y,0));

    const Indent_Line_Y_Points_Right = [];
    Indent_Line_Y_Points_Right.push( new THREE.Vector3(0,Y,0.25));
    Indent_Line_Y_Points_Right.push( new THREE.Vector3(0,Y,-0.25));

    const Indent_Line_Y_Points_Left = [];
    Indent_Line_Y_Points_Left.push( new THREE.Vector3(0,-Y, 0.25));
    Indent_Line_Y_Points_Left.push( new THREE.Vector3(0,-Y,-0.25));

    const Indent_Line_Y_Geometry_Up = new THREE.BufferGeometry().setFromPoints( Indent_Line_Y_Points_Up );
    const Indent_Line_Y_Material_Up = new THREE.LineBasicMaterial( {color: 'green' } );
    const Indent_Line_Y_Line_Up = new THREE.Line( Indent_Line_Y_Geometry_Up, Indent_Line_Y_Material_Up );

    const Indent_Line_Y_Geometry_Down = new THREE.BufferGeometry().setFromPoints( Indent_Line_Y_Points_Down);
    const Indent_Line_Y_Material_Down = new THREE.LineBasicMaterial( {color: 'green' } );
    const Indent_Line_Y_Line_Down = new THREE.Line( Indent_Line_Y_Geometry_Down, Indent_Line_Y_Material_Down );

    const Indent_Line_Y_Geometry_Right = new THREE.BufferGeometry().setFromPoints( Indent_Line_Y_Points_Right );
    const Indent_Line_Y_Material_Right = new THREE.LineBasicMaterial( {color: 'green' } );
    const Indent_Line_Y_Line_Right = new THREE.Line( Indent_Line_Y_Geometry_Right, Indent_Line_Y_Material_Right );

    const Indent_Line_Y_Geometry_Left = new THREE.BufferGeometry().setFromPoints( Indent_Line_Y_Points_Left);
    const Indent_Line_Y_Material_Left = new THREE.LineBasicMaterial( {color: 'green' } );
    const Indent_Line_Y_Line_Left = new THREE.Line( Indent_Line_Y_Geometry_Left, Indent_Line_Y_Material_Left );
    scene.add( Indent_Line_Y_Line_Up );
    scene.add( Indent_Line_Y_Line_Down );
    scene.add( Indent_Line_Y_Line_Right );
    scene.add( Indent_Line_Y_Line_Left );
}
for(var Z = 1; Z < lenght_Z; Z++){

    const Indent_Line_Z_Points_Up = [];
    Indent_Line_Z_Points_Up.push( new THREE.Vector3(0,0.25,Z));
    Indent_Line_Z_Points_Up.push( new THREE.Vector3(0,-0.25,Z));

    const Indent_Line_Z_Points_Down = [];
    Indent_Line_Z_Points_Down.push( new THREE.Vector3(0,0.25,-Z));
    Indent_Line_Z_Points_Down.push( new THREE.Vector3(0,-0.25,-Z));

    const Indent_Line_Z_Points_Right = [];
    Indent_Line_Z_Points_Right.push( new THREE.Vector3(0.25,0, Z));
    Indent_Line_Z_Points_Right.push( new THREE.Vector3(-0.25,0,Z));

    const Indent_Line_Z_Points_Left = [];
    Indent_Line_Z_Points_Left.push( new THREE.Vector3(0.25,0,-Z));
    Indent_Line_Z_Points_Left.push( new THREE.Vector3(-0.25,0,-Z));

    const Indent_Line_Z_Geometry_Up = new THREE.BufferGeometry().setFromPoints( Indent_Line_Z_Points_Up );
    const Indent_Line_Z_Material_Up = new THREE.LineBasicMaterial( {color: 'blue' } );
    const Indent_Line_Z_Line_Up = new THREE.Line( Indent_Line_Z_Geometry_Up, Indent_Line_Z_Material_Up );

    const Indent_Line_Z_Geometry_Down = new THREE.BufferGeometry().setFromPoints( Indent_Line_Z_Points_Down);
    const Indent_Line_Z_Material_Down = new THREE.LineBasicMaterial( {color: 'blue' } );
    const Indent_Line_Z_Line_Down = new THREE.Line( Indent_Line_Z_Geometry_Down, Indent_Line_Z_Material_Down );

    const Indent_Line_Z_Geometry_Right = new THREE.BufferGeometry().setFromPoints( Indent_Line_Z_Points_Right );
    const Indent_Line_Z_Material_Right = new THREE.LineBasicMaterial( {color: 'blue' } );
    const Indent_Line_Z_Line_Right = new THREE.Line( Indent_Line_Z_Geometry_Right, Indent_Line_Z_Material_Right );

    const Indent_Line_Z_Geometry_Left = new THREE.BufferGeometry().setFromPoints( Indent_Line_Z_Points_Left);
    const Indent_Line_Z_Material_Left = new THREE.LineBasicMaterial( {color: 'blue' } );
    const Indent_Line_Z_Line_Left = new THREE.Line( Indent_Line_Z_Geometry_Left, Indent_Line_Z_Material_Left );
    scene.add( Indent_Line_Z_Line_Up );
    scene.add( Indent_Line_Z_Line_Down );
    scene.add( Indent_Line_Z_Line_Right );
    scene.add( Indent_Line_Z_Line_Left );
}

//#endregion

function Function(H) {
    return (Math.pow(H, 3) / 3) - (3 * Math.pow(H, 2)) + (5 * H) + 20;
}




for(H = 0; H <= 6; H += 0.01){

    
    const Function_Points = [];
    Function_Points.push( new THREE.Vector3(H, Function(H), 0) );
    Function_Points.push( new THREE.Vector3(H + 0.01, Function(H + 0.01), 0) );

    const Function_Line = new THREE.BufferGeometry().setFromPoints( Function_Points );
    const Function_Line_Material = new THREE.LineBasicMaterial( {color: 'Yellow' } );
    const Function_Line_Line = new THREE.Line( Function_Line, Function_Line_Material ); 
    scene.add( Function_Line_Line );
    H += 0.01;
}
//infelizmente não tenho forças para criar uma calculadora de derivadas, então vou ter que usar a função que a professora passou
//#region AAAAAAAAAAAAAAAAAA 
 
 
 
function f(M) {
    return (Math.pow(M, 3) / 3) - (3 * Math.pow(M, 2)) + (5 * M) + 20; // EMemplo: f(M) = (M^3 / 3) - 3M^2 + 5M + 20
}

// Derivada primeira de f(M)
function f_prime(M) {
    return M * M - 6 * M + 5; // Derivada de f(M)
}

// Derivada segunda de f(M)
function f_double_prime(M) {
    return 2 * M - 6; // Derivada segunda de f(M)
}

// Derivada terceira de f(M)
function f_triple_prime(M) {
    return 2; // Derivada terceira de f(M)
}


function taylorThingy(M, a) {
    const f_a = f(a);
    const f_prime_a = f_prime(a);
    const f_double_prime_a = f_double_prime(a);
    const f_triple_prime_a = f_triple_prime(a);

    // Polinômio de Taylor de terceiro grau
    return f_a 
           + f_prime_a * (M - a) 
           + (f_double_prime_a / 2) * Math.pow(M - a, 2)
           + (f_triple_prime_a / 6) * Math.pow(M - a, 3);
}

//#endregion

let a = 0; 
let M = 3.1; 

let resultado = taylorThingy(M, a);
let resultado2 = Function(3.1);
console.log("Aproximação:" + resultado);
console.log("Realidade:" +resultado2);
console.log("Erro:" + (resultado2 - resultado));
console.log("Conclusão: Ao implementar o Polinômio de Taylor no código temos a possibilidade de analisar funções mais complexas. Porém, no caso apresentado ondetemos uma função simples, o passo adicional de calcular o polinômio não gera retorno o suficiente para justificar sua implementaçã complexa");
function Animate(){
  renderer.render( scene, camera );  
  controls.update();
  requestAnimationFrame(Animate);
}
Animate();






//Ao implementar o Polinômio de Taylor no código temos a possibilidade de analisar funções mais complexas. Porém, no caso apresentado ondetemos uma função simples, o passo adicional de calcular o polinômio não gera retorno o suficiente para justificar sua implementaçã complexa;
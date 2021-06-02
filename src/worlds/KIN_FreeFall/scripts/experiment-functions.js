// the list of physics objects that can be used in the scene (and their properties)
const PHYSICS_OBJECTS = {
  object1 = {name: "Ball", mass: 0.3, assetId="", height: 10.3, scale: {x: 0.1, y: 0.1, z: 0.1}},
  object2 = {name: "Teddy", mass: 0.1, assetId="", height: 10.3, scale: {x: 0.1, y: 0.1, z: 0.1}},
  object3 = {name: "Car", mass: 100, assetId="", height: 10.3, scale: {x: 0.1, y: 0.1, z: 0.1}}
};

// the gravity control that controls the physics of each object in the scene
let currentGravityStrength = 1;
const gravityMaxStrength = 3;
const gravityMinStrength = 0;
const gravityIncrementAmount = 0.5;

function startExperiment () {
  console.log('Starting experiment');

  // get all the free fall objects
  let freeFallObjects = document.querySelectorAll("[physics-object]");

  // loop through each free fall object
  freeFallObjects.forEach(element => {
    // enable physics on the object
    element.setAttribute('dynamic-body', '');
  });
};

function resetExperiment () {
  console.log('Reseting experiment');

  // get all the free fall objects
  let freeFallObjects = document.querySelectorAll("[physics-object]");

  // loop through each free fall object
  freeFallObjects.forEach(element => {
    // disable physics on the object
    element.removeAttribute('dynamic-body');

    // reset the position of the object
    element.emit('resetTransform', {});
  });
};

function setLeftObject (object) {
  let newObject = PHYSICS_OBJECTS[object];
  console.log('Setting left object to ' + newObject.name);

  // get left object
  let leftObject = document.querySelector("#leftObject");

  // remove  geometry
  leftObject.removeAttribute('geometry');

  // set gltf model to newObject
  leftObject.setAttribute('gltf-model', '#' + newObject.name + '-gltf');

  // set new model scale
  leftObject.setAttribute('scale', newObject.scale.x + " " + newObject.scale.y + " " + newObject.scale.z);

  // update model mass
  leftObject.setAttribute('physics-object', 'mass:' + newObject.mass);

  // set new height
  let objectPosition = leftObject.getAttribute('position');
  leftObject.setAttribute('position', objectPosition.x + " " + newObject.height + " " + objectPosition.z);
  leftObject.setAttribute('physics-object', 'initialPosition:' + objectPosition.x + " " + newObject.height + " " + objectPosition.z);
};

function setRightObject (object) {
  let newObject = PHYSICS_OBJECTS[object];
  console.log('Setting right object to ' + newObject.name);

  // get left object
  let rightObject = document.querySelector("#rightObject");

  // remove  geometry
  rightObject.removeAttribute('geometry');

  // set gltf model to newObject
  rightObject.setAttribute('gltf-model', '#' + newObject.name + '-gltf');

  // set new model scale
  rightObject.setAttribute('scale', newObject.scale.x + " " + newObject.scale.y + " " + newObject.scale.z);

  // update model mass
  rightObject.setAttribute('physics-object', 'mass:' + newObject.mass);

  // set new height
  let objectPosition = rightObject.getAttribute('position');
  rightObject.setAttribute('position', objectPosition.x + " " + newObject.height + " " + objectPosition.z);
  rightObject.setAttribute('physics-object', 'initialPosition:' + objectPosition.x + " " + newObject.height + " " + objectPosition.z);
};

function increaseGravity () {
  // ensure the gravity is not currently at max value
  if (currentGravityStrength < gravityMaxStrength) {
    console.log('Increasing gravity');

    // increase the gravity
    currentGravityStrength += gravityIncrementAmount;
    setGravity(currentGravityStrength);
  }
};

function decreaseGravity () {
  // ensure the gravity is not currently at min value
  if (currentGravityStrength > gravityMinStrength) {
    console.log('Decreasing gravity');

    // decrease the gravity
    currentGravityStrength -= gravityIncrementAmount;
    setGravity(currentGravityStrength);
  }
}

// used to easily update the gravity text and physics system
function setGravity (gMultiplier) {
  // get the a-scene
  let sceneEl = document.querySelector('a-scene');

  // update the physics system
  sceneEl.systems.physics.driver.world.gravity.y = -9.8 * gMultiplier

  console.log(sceneEl.getAttribute('physics'));

  // update the gravity strength text
  gravityStengthText = document.querySelector('#gravityStrengthText');
  gravityStengthText.setAttribute('text', {
    value: "Current Gravity: " + gMultiplier + "g",
    align: "center"
  });
}

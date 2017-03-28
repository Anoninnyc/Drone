// Below is a drone object with six methods.
// Each method takes a callback and after some amount of time will execute that callback 
// For ease of testing, it will also console.log a value.

// At the bottom of the page the expected output is logged.
// We invoke the chained call of the drone object. 
// However the drone object does not yet have a chained api.

// Add a chained api to the drone object by only modifying the code in the middle of the page.

// A good answer should include the following criteria.
// 1. Code was only added between the below comments.
// 2. Each method in the chain executes only after the previous method has resolved
// 3. Your solution should be flexible to rearranging the methods or changing the timeouts.
// 4. Your solution should not change the behavior/side affects of the original methods. 

// You should assume that you don't know how the methods on the Drone object are implemented. 
// Only that they may or may not be asynchronous and that they take a callback
// that will be called when the action is completed.

function Drone() {};

Drone.prototype.takeoff = function takeoff(callback) {
  setTimeout(function() {
    callback()
    console.log('Took off');
  }, 600);
};

Drone.prototype.turnOnCamera = function turnOnCamera(callback) {
  setTimeout(function() {
    callback()
    console.log('Camera turned on');
  }, 1000);
};
Drone.prototype.pointDownGimbal = function pointDownGimbal(callback) {
  setTimeout(function() {
    callback()
    console.log('Gimbal pointing down');
  }, 750);
};
Drone.prototype.flyToMission = function FlyToMission(callback) {
  setTimeout(function() {
    callback()
    console.log('Flown to mission');
  }, 2000);
};
Drone.prototype.takePhoto = function takePhoto(callback) {
  setTimeout(function() {
    callback()
    console.log('Photo taken');
  }, 500);
};
Drone.prototype.land = function land(callback) {
  setTimeout(function() {
    callback()
    console.log('Landed');
  }, 3000);
};

// DON'T MODIFY ANYTHING ABOVE HERE
const drone = new Drone();
drone.count = 0;
drone.methodsInvoked = [];

const increment = function(callback) {
  drone.count++;
  const nextMethod = drone.methodsInvoked[drone.count];
  callback ? callback() : null;
  if (nextMethod){
    nextMethod(increment) 
  } else {
    drone.invoked = false;
    drone.count = 0;
    drone.methodsInvoked = [];
  }
};

Object.keys(Drone.prototype).forEach(method => {
  drone[method] = callback => {
    drone.methodsInvoked.push(() => {
      Drone.prototype[method](() => increment(callback));
    });
    if (!drone.invoked) {
      //in case a method is invoked immediately, with no setTimeout
      setTimeout(() => {
        drone.methodsInvoked[0]();
      }, 0);
      drone.invoked = true;
    }
    return drone;
  };
});

// END ADD YOUR CODE HERE
//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:")
console.log("Took off");
console.log("Camera turned on");
console.log("Gimbal pointing down");
console.log("Flown to mission");
console.log("Photo taken");
console.log("Landed");

console.log("\n\nActual Output:")
drone.takeoff().turnOnCamera().pointDownGimbal().flyToMission().takePhoto().land();
 
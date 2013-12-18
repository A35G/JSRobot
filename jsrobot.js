function empty(mixed_var) {
  return ( mixed_var === '' || mixed_var === 0 || mixed_var === '0' || 
  mixed_var === null || mixed_var === false || mixed_var === undefined || 
  mixed_var.length === 0 );
}

var Robot = function(robot){
  robot.turnLeft(robot.angle % 90);
};

Robot.prototype.onIdle = function(ev) {

  var robot = ev.robot;

  if (robot.parentId) {
    robot.ahead(1);
    robot.turnGunRight(1);
  }
  else {
   	robot.ahead(-1);
    robot.turnGunLeft(1);
  }

};

Robot.prototype.onWallCollision = function(ev) {

  var robot = ev.robot;

  if(!robot.parentId) {
    robot.turnRight(ev.bearing - 90);
  }
  else {
  	robot.turnRight(ev.bearing + 90);
  }

};

Robot.prototype.onScannedRobot = function(ev) {

  var robot = ev.robot, scannedRobot = ev.scannedRobot;
  if (robot.id == scannedRobot.parentId || robot.parentId == scannedRobot.id) {
    return;
  }
  robot.clone();
  robot.fire();
  robot.turnGunRight(30);

};

Robot.prototype.onRobotCollision = function(ev) {

  var robot = ev.robot, collidedRobot = ev.collidedRobot;

  robot.ignore('onRobotCollision')

  if (ev.bearing > -90 && ev.bearing < 90) {
    robot.back(100);
  } 
  else {
    robot.ahead(100);
  }

  if (robot.id != collidedRobot.parentId && robot.parentId != collidedRobot.id) {
    robot.turnGunRight(ev.bearing - robot.cannonRelativeAngle);
    robot.turnGunLeft(ev.bearing - robot.cannonRelativeAngle);
  }

  robot.listen('onRobotCollision') 

};

Robot.prototype.onHitByBullet = function(ev) {

  var robot;
  robot.clone()
  robot = ev.robot;
  robot.turn(45 - ev.bulletBearing);
  robot.ahead(-50);
  robot.turn(45 - ev.bulletBearing);
  robot.back(90);  

};
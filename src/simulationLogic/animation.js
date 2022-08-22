import {distance, normaliseVector, randomUnitVect, subtractVectors, addVectors,  multiplyVector, sizeOfVector} from './math_helpers'

class Animation {
    constructor(ctx, width, height, boids) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.boids = boids
    }
  
    addMultipleBoids(){}

    addBoid(Number){
      this.boids.push(new Boid(
        [Math.random() * this.width,
        Math.random() * this.height],
        [5 * Math.random(),
        5 * Math.random()]
      ))
          return this.boids.length
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (const boid of this.boids) {
        boid.updatePosition()
        boid.distanceBoids(this.boids)
        boid.align()
        boid.cohesion()
        boid.separation()
        boid.updateVelocity()
        boid.drawBoid(this.ctx)
      }
      window.requestAnimationFrame(() => this.animate());
    }
  }

  class Boid{
    constructor(position, velocity){
        if(!Array.isArray(position)) {
            throw new Error('Position argument is not array');
        }
        if(!Array.isArray(velocity)) {
            throw new Error('Velocity argument is not array');
        }
        //initial position
        this.position = position
        //initial velocity
        this.velocity = velocity

        //constants
        this.perception = 50
        this.maxSpeed = 5
        this.maxForce = 100
        this.alignForce = 1
        this.cohesionForce = 0.5
        this.separationForceConstant = 20
        this.avrgforces = true
    }

    updatePosition(){
        this.position = addVectors(this.position, this.velocity)
        
        if (this.position[0] < 0){
            this.position[0] += 1280
        }
        if (this.position[1] < 0){
            this.position[1] += 720
        }

        if (this.position[0] > 1280){
            this.position[0] += -1280
        }
        if (this.position[1] > 720){
            this.position[1] += -720
        }
        
    }

    distanceBoids(boids){
        //create array of distances between boid and all other boids (from argumnet)
        this.boidDistance = boids.map(boid => { return {distance: distance(boid.position, this.position), object: boid} } )
    }

    drawBoid = (ctx) => {
      const diretion = normaliseVector(this.velocity)
      const endpoint = [this.position[0] + 10 * diretion[0], this.position[1]+ 10 * diretion[1] ]
  
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2
      ctx.beginPath();
      ctx.moveTo(...this.position);
      ctx.lineTo(...endpoint);
      ctx.stroke();
  }

    align(){
        this.avgLocalVelociy = [0, 0]
        let numberOfBoids = 0
        for(const boid of this.boidDistance){
            if(boid.distance < this.perception && boid.object !== this){
                const velocity = boid.object.velocity
                this.avgLocalVelociy = addVectors(this.avgLocalVelociy, velocity)
                numberOfBoids += 1
            }
        }  
        if(this.avrgforces && numberOfBoids > 0){
            this.avgLocalVelociy = multiplyVector(1/numberOfBoids, this.avgLocalVelociy)
        }  
    }

    cohesion(){
        this.avgLocalPosition = [0, 0]
        let numberOfBoids = 0
        for(const boid of this.boidDistance){
            if(boid.distance < this.perception && boid.object !== this){
                const positionVector = subtractVectors(boid.object.position, this.position)
                this.avgLocalPosition = addVectors(this.avgLocalPosition, positionVector)
                numberOfBoids += 1
            }
        }  
        if(this.avrgforces && numberOfBoids > 0){
            this.avgLocalPosition = multiplyVector(1/numberOfBoids, this.avgLocalPosition)
        } 
    }

    separation(){
        this.separationForce = [0, 0]
        let numberOfBoids = 0
        for(const boid of this.boidDistance){
            if(boid.distance < this.perception && boid.object !== this){
                const positionVector = subtractVectors(this.position, boid.object.position)
                const force = multiplyVector(1/boid.distance, positionVector)
                this.separationForce = addVectors(this.separationForce, force)
                numberOfBoids += 1
            }
        } 
        if(this.avrgforces && numberOfBoids > 0){
            this.separationForce = multiplyVector(1/numberOfBoids, this.separationForce)
        }
    }

    updateVelocity(){ 
        const aliognAcceleration = multiplyVector(this.alignForce, this.avgLocalVelociy) 
        const cehesionAcceleration = multiplyVector(this.cohesionForce, this.avgLocalPosition)
        const separationAcceleration = multiplyVector(this.separationForceConstant, this.separationForce)
        let totalAcel = addVectors(aliognAcceleration, cehesionAcceleration, separationAcceleration)
        const totalAcelSize = sizeOfVector(totalAcel)
        if(totalAcelSize > this.maxForce){
            const factor = this.maxForce/totalAcelSize
            totalAcel =  multiplyVector(factor, totalAcel)
        }
        let newVelocity =  addVectors(this.velocity, totalAcel) 
        const totalSpeed = sizeOfVector(newVelocity)
        if(totalSpeed > this.maxSpeed){
            const factor = this.maxSpeed/totalSpeed
            newVelocity =  multiplyVector(factor, newVelocity)
        }
        this.velocity = newVelocity
    }

}
  
  export { Animation, Boid };
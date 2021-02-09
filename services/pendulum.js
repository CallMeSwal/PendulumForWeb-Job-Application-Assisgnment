//defining the pendulum class
class Pendulum {
    constructor(id, mass, length, theta) {
        //defined properties
        this._id = id;
        this._mass = mass;
        this._length = length;
        this._theta = theta;
        this.b=0.998;

        //environmental properties
        this.wind = 0;
        this.g = -9.81;

        //derived properties
        this.x=Math.sin(this.theta)*this.length;
        this.y=Math.cos(this.theta)*this.length;
        this.angVel=0.0;
        this.angAcc= this.g/this.length*Math.sin(this.theta);

        //max values for properties
        this.maxMass=1.5;
        this.minMass=0.2;
        this.maxLength=1.0;
        this.minLength=0.2;
        this.maxTheta=0.80;
        this.minTheta=-0.80;
        this.maxB=1.0;
        this.minB=0.5;

        //max values for environment
        this.maxWind=5.0;
        this.minWind=2.0;
        this.maxG=-1.0;
        this.minG=-30.0;

        this.running = true;

        //define neighbors
        if(this.id!=1){
            this.left={
                id:parseInt(this.id)-1,
                mass:null,
                length:null
            }
        }
        else{
            this.left=null;
        }
        if(this.id!=5){
            this.right={
                id:parseInt(this.id)+1,
                mass:null,
                length:null
            }
        }
        else{
            this.right=null;
        }
    }
    set id(id) {
        this._id = parseInt(id);
    }
    get id() {
        return this._id;
    }
    set mass(mass) {
        this._mass = parseFloat(mass);
    }
    get mass() {
        return this._mass;
    }
    set length(length) {
        this._length = parseFloat(length);
    }
    get length() {
        return this._length;
    }
    set theta(theta) {
        this._theta = parseFloat(theta);
    }
    get theta() {
        return this._theta;
    }
    set b(b) {
        this._b = parseFloat(b);
    }
    get b() {
        return this._b;
    }

    roundProps(){
        //more efficient way to round since toFixed returns string
        this.theta=Math.round(this.theta*10000)/10000;
        this.x=Math.round(this.x*10000)/10000;
        this.y=Math.round(this.y*10000)/10000;
        this.angAcc=Math.round(this.angAcc*10000)/10000;
        this.angVel=Math.round(this.angVel*10000)/10000;
    }
    //-this.b/this.mass*this.theta+
    updatePos(timestep){ 
        if(this.running){
            if(this.wind==0){ // g/l*sin(theta)
                this.angAcc = this.g/this.length*Math.sin(this.theta);
                this.angVel +=this.angAcc*timestep;
                this.angVel *= this.b
                this.theta += this.angVel*timestep;
                this.x=Math.sin(this.theta)*this.length;
                this.y=Math.cos(this.theta)*this.length;
                this.roundProps();
                //console.log(this.theta, this.x, this.y);
            }
            else{
                //assume p=1.225, c=0.5
                var fg=this.mass*this.g;
                var fd=0.5*1.225*(this.wind**2)*0.5*this.mass*4
                this.theta = -Math.atan(fd/fg);
                this.x=Math.sin(this.theta)*this.length;
                this.y=Math.cos(this.theta)*this.length;
                this.roundProps();
            }
        } 
    }
}

module.exports = Pendulum;
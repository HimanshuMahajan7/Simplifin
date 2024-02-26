class Ride {
    static id = 0;

    static incrementID() {
        this.id++;
    }

    constructor(driver, origin, destination, availableSeats, vehicle, registNo, status = 'active') {
        Ride.incrementID();
        this.id = Ride.id;
        this.driver = driver;
        this.origin = origin;
        this.destination = destination;
        this.availableSeats = availableSeats;
        this.vehicle = vehicle;
        this.registNo = registNo;
        this.status = status;
    }
}

export default Ride;

import store from '../db/store';

import UserService from '../services/UserService';
import VehicleService from '../services/VehicleService';
import RideService from '../services/RideService';
import Logger from '../utils/Logger';

const userService = new UserService();
const vehicleService = new VehicleService();
const rideService = new RideService();

class RideSharingSystem {
    start() {
        Logger.log('************************************************');
        Logger.log('******* Ride Sharing Application Started *******');
        Logger.log('************************************************');

        // Add users
        Logger.log('****************** Add Users *******************');
        userService.addUser('Rohan', 36, 'M');
        userService.addUser('Shashank', 29, 'M');
        userService.addUser('Nandini', 29, 'F');
        userService.addUser('Shipra', 27, 'F');
        userService.addUser('Gaurav', 29, 'M');
        userService.addUser('Rahul', 35, 'M');

        // Add vehicles
        Logger.log('***************** Add Vehicles *****************');
        vehicleService.addVehicle('Rohan', 'Swift', 'KA-01-12345');
        vehicleService.addVehicle('Shashank', 'Baleno', 'TS-05-62395');
        vehicleService.addVehicle('Shipra', 'Polo', 'KA-05-41491');
        vehicleService.addVehicle('Shipra', 'Activa', 'KA-12-12332');
        vehicleService.addVehicle('Rahul', 'XUV', 'KA-05-1234');

        // Offer rides
        Logger.log('****************** Offer Rides *****************');
        rideService.offerRide("Rohan", "Hyderabad", "Bangalore", 1, "Swift", "KA-01-12345");
        rideService.offerRide("Shipra", "Bangalore", "Mysore", 1, "Activa", "KA-12-12332");
        rideService.offerRide("Shipra", "Bangalore", "Mysore", 2, "Polo", "KA-05-41491");
        rideService.offerRide("Shashank", "Hyderabad", "Bangalore", 2, "Baleno", "TS-05-62395");
        rideService.offerRide("Rahul", "Hyderabad", "Bangalore", 5, "XUV", "KA-05-1234");
        rideService.offerRide("Rohan", "Bangalore", "Pune", 1, "Swift", "KA-01-12345");

        // Select rides
        Logger.log('****************** Select Rides *****************');
        rideService.selectRide("Nandini", "Bangalore", "Mysore", "1", "Most Vacant"); // (2(c) is the desired output);
        rideService.selectRide("Gaurav", "Bangalore", "Mysore", "1", "Preferred Vehicle", "Activa"); // (2(b) is the desired output);
        rideService.selectRide("Shashank", "Mumbai", "Bangalore", "1", "Most Vacant"); // (No rides found);
        rideService.selectRide("Rohan", "Hyderabad", "Bangalore", "1", "Preferred Vehicle", "Baleno"); // (2(d) is the desired output);
        rideService.selectRide("Shashank", "Hyderabad", "Bangalore", "1", "Preferred Vehicle", "Polo"); // (No rides found)

        Logger.log('******************* End Rides ******************');
        rideService.endRide(1);
        rideService.endRide(2);
        rideService.endRide(3);
        rideService.endRide(4);
        rideService.endRide(5);
        rideService.endRide(6);

        Logger.log('**************** Print Ride Stats ***************');
        rideService.printRideStats();

        // Logger.log('Store State: ', store.getStore());
    }
}

export default RideSharingSystem;
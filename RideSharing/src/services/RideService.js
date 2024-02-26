import store from '../db/store';
import Ride from '../models/Ride';
import Logger from '../utils/Logger';

class RideService {
    constructor() {
        this.activeRides = {};
    }

    offerRide(driverName, origin, destination, availableSeats, vehicle, registNo) {
        const rides = store.getAllRides().filter(ride => ride.driver == driverName && ride.vehicle == vehicle && ride.status == 'active');
        if (rides.length) {
            return Logger.error("Ride Already Registered !!!");
        }

        const user = store.getUser(driverName);
        if (!user) {
            return Logger.error("Driver not found");
        }

        const driverHaveVehicle = user.vehicles.map(vehicle => vehicle.manufacturer).includes(vehicle);
        if (!driverHaveVehicle) {
            return Logger.error("Invalid Ride Offered, Driver dont have Vehicle !!!");
        }

        store.addRide(new Ride(driverName, origin, destination, availableSeats, vehicle, registNo));
        user.rideOffered++;
        Logger.log(`Ride Offered by ${driverName} from ${origin} to ${destination}`);
    }

    selectRide(userName, origin, destination, seats, selectionStrategy, preferredVehicle) {
        const rides = store.getAllRides().filter(ride => ride.origin == origin && ride.destination == destination && ride.availableSeats >= seats);

        if (!rides.length) {
            return Logger.error(`No rides found for ${userName} from ${origin} to ${destination} !!!`);
        }

        let selectedRide;
        if (selectionStrategy === 'Most Vacant') {
            selectedRide = rides.reduce((acc, curr) => acc.availableSeats > curr.availableSeats ? acc : curr);
        } else if (selectionStrategy === 'Preferred Vehicle') {
            selectedRide = rides.find(ride => ride.vehicle == preferredVehicle);
        }

        if (!selectedRide) {
            return Logger.error(`No rides found for ${userName} from ${origin} to ${destination} !!!`);
        }
        selectedRide.availableSeats--;

        const user = store.getUser(userName);
        if (user) {
            user.rideTaken++;
        }
        Logger.info(`Ride Taken by ${userName}, which is offered by ${selectedRide.driver} from ${selectedRide.origin} to ${selectedRide.destination}`);
    }

    endRide(rideId) {
        const ride = store.getAllRides().find(ride => ride.id == rideId);
        if (!ride) {
            return Logger.error('No ride Found with id:  ', rideId);
        }
        ride.status = 'end';
        Logger.log('Ride ended successfully:', rideId);
    }

    printRideStats() {
        const users = store.getAllUsers();
        users.forEach(user => {
            Logger.log(`${user.name}: ${user.rideTaken} Taken, ${user.rideOffered} Offered`);
        });
    }

}

export default RideService;
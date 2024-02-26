import store from '../db/store';
import Vehicle from '../models/Vehicle';
import Logger from '../utils/Logger';

class VehicleService {
    addVehicle(owner, manufacturer, registNo) {
        const vehicle = new Vehicle(owner, manufacturer, registNo);
        const user = store.getUser(owner);
        if (user) {
            user.vehicles.push(vehicle);
            Logger.log("Vehicle Added for: ", owner);
        } else {
            Logger.log("User not found:", owner);
        }

    }

    getVehicles(owner) {
        const user = store.getUser(owner);
        if (user) {
            return user.vehicles;
        } else {
            Logger.log("User not found:", owner);
        }
    }
}

export default VehicleService;

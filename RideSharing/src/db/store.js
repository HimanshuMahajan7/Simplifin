class Store {
    constructor() {
        if (!Store.instance) {
            this.users = {};
            this.rides = [];
            Store.instance = this;
        }
        return Store.instance;
    }

    addUser(name, user) {
        this.users[name] = user;
    }

    getUser(name) {
        return this.users[name];
    }

    getAllUsers() {
        return Object.values(this.users);
    }

    addRide(ride) {
        this.rides.push(ride);
    }

    getAllRides() {
        return this.rides;
    }

    getStore() {
        return this;
    }
}

const instance = new Store();
Object.freeze(instance);

export default instance;
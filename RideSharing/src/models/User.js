class User {
    constructor(name, age, sex, vehicles = []) {
        // name will be id of user
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.vehicles = vehicles;
        this.rideTaken = 0;
        this.rideOffered = 0;
    }
}

export default User;
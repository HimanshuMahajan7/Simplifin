import store from '../db/store';
import User from '../models/User';
import Logger from '../utils/Logger';

class UserService {
    addUser(name, age, sex) {
        const user = new User(name, age, sex);
        store.addUser(name, user);
        Logger.log("New User Added: ", name);
    }
}

export default UserService;
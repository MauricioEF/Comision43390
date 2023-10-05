import AxiosClient from "./AxiosClient";

export default class UsersService {
    constructor() {
        this.client = new AxiosClient();
    }

    getUsers = () =>{
        //Armo mi requestInfo
        const requestInfo = {
            url:`http://localhost:8080/api/users`
        };
        return this.client.makeGetRequest(requestInfo);
    }
}
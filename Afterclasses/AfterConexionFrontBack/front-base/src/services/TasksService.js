import AxiosClient from "./AxiosClient";

export default class TasksService {
    constructor(){
        this.client = new AxiosClient();
    }

    getTasks = () =>{
        const requestInfo = {url:`http://localhost:8080/tasks`};
        return this.client.makeGetRequest(requestInfo);
    }
}
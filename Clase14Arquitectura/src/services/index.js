import ToysService from "./ToysService.js";

import ToysManager from "../dao/Mongo/ToysManager.js";


export const toysService = new ToysService(new ToysManager());
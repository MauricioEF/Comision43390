import ToysRepository from "./repositories/ToysRepository.js";

import PersistenceFactory from "../dao/PersistenceFactory.js";


const {ToysDao} =  await PersistenceFactory.getPersistence();


export const toysService = new ToysRepository(new ToysDao());
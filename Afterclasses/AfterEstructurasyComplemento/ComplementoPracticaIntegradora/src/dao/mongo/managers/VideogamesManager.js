import videogameModel from '../models/videogame.js';

export default class VideoGamesManager {
  getVideogames = (params) => {
    return videogameModel.find(params).lean();
  };

  getVideogameBy = (params) => {
    return videogameModel.findOne(params).lean();
  };

  createVideogame = (videogame) => {
    return videogameModel.create(videogame);
  };

  updateVideogame = (id, videogame) => {
    return videogameModel.updateOne({ _id: id }, { $set: videogame });
  };

  deleteVideogame = (id) => {
    return videogameModel.deleteOne({ _id: id });
  };
}

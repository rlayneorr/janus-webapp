export const environment = {
  production: true,
  context: 'http://localhost:8080/', // change for what the production environment would actually be

  // API calls for the VP functionality group
  addNewCategory: 'http://localhost:8080/vp/category',
  getAllCategories: 'http://localhost:8080/vp/category',
  addNewTrainer: 'http://localhost:8080/vp/trainer/create',
  editCurrentCategory: 'http://localhost:8080/vp/category/update',
  editLocation: 'http://localhost:8080/vp/location/update',
  deleteLocation: 'http://localhost:8080/vp/location/delete',
  addLocation: 'http://localhost:8080/vp/location/create',
  deleteTrainer: 'http://localhost:8080/vp/trainer/delete',
  getAllLocations: 'http://localhost:8080/all/location/all/',
  getAllTrainers: 'http://localhost:8080/all/trainer/all',
  getAllTitles: 'http://localhost:8080/vp/trainer/titles/',
  getAllTiers: 'http://localhost:8080/types/trainer/role/all',
  editTrainer: 'http://localhost:8080/vp/trainer/update',
};

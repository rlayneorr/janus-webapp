export const environment = {
  production: true,
  context: 'http://localhost:8080/test-app/', // change for what the production environment would actually be

  addNewCategory: 'http://localhost:8080/vp/category',
  getAllCategories: 'http://localhost:8080/vp/category',
  addNewTrainer: 'http://localhost:8080/vp/trainer/create',
  editCurrentCategory: 'http://localhost:8080/vp/category/update',
  editLocation: 'http://localhost:8080/vp/location/update',
  addLocation: 'http://localhost:8080/vp/location/create',
  getAllLocations: 'http://localhost:8080/all/location/all/',
  getAllTrainers: 'http://localhost:8080/all/trainer/all',
  getAllTitles: 'http://localhost:8080/vp/trainer/titles/',
  getAllTiers: 'http://localhost:8080/types/trainer/role/all',
  editTrainer: 'http://localhost:8080/vp/trainer/update',
};

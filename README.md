# janus-webapp
Janus is a gateway to other applications such as Caliber or Assign Force. This is the webapp portion of the application which contains all of the angular code as well as a simple spring boot server to host the application in production.

## New Location Service
The new location service is meant to replace all other existing location services that each portal have, and the portals should all share the new location service structure.
(The current portal that contains the new Location Service implemented is Caliber. Every other portal needs to have their location entity or information changed to the new Location Service.)

#### Location service now contains four main entities.
- Location Entity
- Building Entity
- Room Entity
- Unavailability Entity

These entities can be found through the filepath below
- janus-webapp\client-side\src\app\hydra-client\entities\location-entities.

#### Location service Methods
Location service also contain new methods to retrieve information from the backend Location Service from the Gambit Microservice Ecosystem. These methods can be found through the filepath below.
- janus-webapp\client-side\src\app\hydra-client\services\location\location.service.ts

The methods use hydra-client's url service to further organizse all endpoints used. To find the endpoints go into urls.service.ts on the filepath below.
- janus-webapp\client-side\src\app\hydra-client\services\urls\urls.service.ts


#### Location service Testing
The new Location Service has its own spec file in which it has tests to make sure that you are obtaining data from the back end. If you wish to change or modify the tests in the spec file you will have to modify locaiton.service.spec.ts file in the path below.
- janus-webapp\client-side\src\app\hydra-client\services\location\location.service.spec.ts


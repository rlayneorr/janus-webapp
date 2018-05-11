# janus-webapp
Janus is a gateway to other applications such as Caliber or Assign Force. This is the webapp portion of the application which contains all of the angular code as well as a simple spring boot server to host the application in production.

## New Location Service
The new location service is meant to replace all other existing location services that each portal have, and the portals should all share the new location service structure.
(The current portal that contains the new Location Service implemented is Caliber. Every other portal needs to have their location entity or information changed to the new Location Service.)

Location service now contains four main entities.
- Location Entitiy
- Building Entity
- Room Entity
- Unavailability Entity
These entities can be found through this filepath -> janus-webapp\client-side\src\app\hydra-client\entities\location-entities.

Location service also contain new methods to retrieve information from the backend Location Service from the Gambit Microservice Ecosystem.



Single Module Requirement - NodeJS

1. Device/User registration - This can be a simple email ID and a photo that is added and location is tracked for that page

2. Using sockets, track location using the HTML5 geolocation API or Android app

3. Web Dashboard

a. List - listing down the device/user list

b. View User - Click on a device/user, view the user on a google map

c. View User - The map should keep updating as the user moves from place to place using sockets

d. Show all - Click on to show the position and location of all devices and show real time updates of the device

4. Schema design for users

. EmailID

a. Photo

5. Schema design for locations

. UserID/EmailID

a. Lat Lng information

6. Ensure that the above requirements are built as an installable module and also can be used as a standalone module. Using Redis for caching of information.

Note - Feel free to add to the schema/design as needed, the above is the bare minimum expected.

Elaborated module requirements.

1. API endpoints for the Android App
	a. Login (Device)
	b. Register (Device)
	c. Send location coordinates (Say, every 30 seconds)

2. Web Dashboard
	a. Simple login (Single account)
	b. List of registered devices
	c. View device - Uses Google Maps API to show the last received coordinate on a map.
	d. All Devices - Similar to View device, but includes all the registered devices.

Usage of sockets to update realtime location status of devices, and the same reflected on web dashboard with google maps showing realtime updates instead of polling.

Other specifics:
Stack: MEAN (MongoDB, Express, AngularJS, NodeJS)




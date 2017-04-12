RESTful Server Implementation
=============================

By Group 5 of ECE492 W2017


This server is written in javascript on top of Node.js using the express.js framework. Sensor data generate is done using native C code for better performance when ran using the ARM processor SoC. 


Database uses MongoDB, Authentication and security uses passport and 
JSON Web Tokens. Unit testing done using Mocha, Chai, and Supertest libraries.


Main files of interest:
-----------------------
* app.js : Main server file

* public and views: Front end website

* server_unit_test.js and user_unit_test.js : Unit tests

Folder Directory:
-----------------
```
Server
|-- models
|---- sensor_schema.js
|---- user_schema.js
|-- public
|---- css
|---- fonts
|---- js
|------main.js
|-- sensors
|---- sensor_1.json
|---- sensor_2.json
|---- sensor_3.json
|---- sensor_4.json
|---- sensor_5.json
|---- sensor_6.json
|---- sensor_7.json
|---- sensor_8.json
|-- test
|---- server_unit_test.js
|---- user_unit_test.js
|-- views
|---- 404.ejs
|---- footer.ejs
|---- header.ejs
|---- index.ejs
|---- signin.ejs
|-- app.js
|-- cert.pem
|-- config.js
|-- generateJSON.c
|-- generateJSON.o
|-- key.pem
|-- passport.js
|-- package.json
|-- sensorReader.js
LICENSE
README.md
```

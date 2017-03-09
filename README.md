#RESTful Server Implementation


Written by Jiawei Wu of Group 5 


This server is written in javascript on top of Node.js


using the express.js framework.


Sensor data generate is done using native C code 


for better performance when ran using the 


ARM processor SoC. 

Database uses MongoDB, Authentication and security uses passport and 
JSON Web Tokens

Unit testing done using Mocha, Chai, and Supertest libraries

Main files of interest:
app.js : Main server file
server_unit_test.js and user_unit_test.js : Unit tests

Folder Directory:
```
Server
|-- models
|---- sensor_schema.js
|---- user_schema.js
|-- public
|---- main.js
|-- sensors
|---- sensor_1.json
|---- sensor_2.json
|-- test
|---- server_unit_test.js
|---- user_unit_test.js
|-- views
|---- 404.ejs
|---- footer.ejs
|---- header.ejs
|---- index.ejs
|-- app.js
|-- config.js
|-- generateJSON.c
|-- passport.js
|-- package.json
LICENSE
README.md
```

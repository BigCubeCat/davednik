#!/usr/bin/arangosh --javascript.execute 
db._createDatabase('main');
const users = require('@arangodb/users');
users.save('user', "password");
users.grantDatabase('user', 'main', 'rw') // add premisions for database

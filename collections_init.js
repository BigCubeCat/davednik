#!/usr/bin/arangosh --javascript.execute 
db._create("notes")
db._create("users")
db._createEdgeCollection("edge")

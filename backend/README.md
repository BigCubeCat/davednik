# Backend for Davednik

## Run:

- Setup `.env`:
```sh
DB_URL=http://127.0.0.1:8529
PASSWORD=user

```
- `npm i`
- `npm start`

## Usage:

-----

### Get all users

GET: /users/

Response example:
```json
{
	"users": [
		{
			"_key": "136904",
			"_id": "users/136904",
			"_rev": "_ei-NR6u---",
			"name": "TEst user",
			"about": "lorem ipsum",
			"tags": "#art#programming#magic",
			"id": "0000"
		},
		{
			"_key": "137451",
			"_id": "users/137451",
			"_rev": "_ei-fs06---",
			"name": "test",
			"about": "lorem ipsum",
			"tags": "#art#programming#magic",
			"id": "000000"
		}
	]
}
```
### Get one user

GET: /users/<user_id>

Response example:
```json
{
	"user": {
		"_key": "136904",
		"_id": "users/136904",
		"_rev": "_ei-NR6u---",
		"name": "TEst user",
		"about": "lorem ipsum",
		"tags": "#art#programming#magic",
		"id": "0000"
	}
}
```
### Get user neighbors

GET: /users/neighbors/<user_id>

Response example: [Like at all users](#Get-all-users)

### Create user

POST: /users/<user_id>

Request example:

```json
{
	"user": {
		"name": "test",
		"about": "lorem ipsum",
		"tags": "#art#programming#magic"
	}
}
```

Response example: 

```json
{
	"success": "users/137451"
}
```

### Update user

PUT /users/<user_id>

Request example: 

> Put in request body only those keys, which you want update

```json
{
	"about": "Hi",
	"name": "NeoEgor"
}
```

Response example: 

```json
{
	"success": true
}
```

### Delete user

DELETE /users/<user_id>

Response example: 
```json
{
	"success": true
}
```

-----

### Get all edges

GET /edges/

Response example:

```json
{
	"edges": [
		{
			"_key": "2658",
			"_id": "edge/2658",
			"_from": "users/2218",
			"_to": "users/2610",
			"_rev": "_eg5sX2S---"
		},
		{
			"_key": "2668",
			"_id": "edge/2668",
			"_from": "users/2610",
			"_to": "users/2620",
			"_rev": "_eg5srXS---"
		}
  ]
}
```

### Create edge (join users)

POST /edges/

Request example:

```json
{
	"from": "users/2610",
	"to": "users/2626"
}
```

Response example:

```json
{
	"success": true
}
```

-----

### Search by name

GET /search/name/<user.name or regex>

Response example: [Like at all users](#Get-all-users)

### Search by tag 

GET /search/tag/<tag without #>

Response example: [Like at all users](#Get-all-users)

----

## TODO:

- Security
- Count edges btw us

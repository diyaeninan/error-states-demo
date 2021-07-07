swagger: '3.0'
info:
  version: gwe
  title: gew
  description: Enter description about your API here
  contact:
    name: Your name
host: 'localhost:3000'
basePath: /api
schemes:
  - http
consumes:
  - application/json
produces:
  - application/json
paths:
  /user/{userId}:
    get:
      description: 'Sample endpoint: Returns details about a particular user'
      produces:
        - application/json
      parameters:
        - in: path
          name: userId
          type: integer
          required: true
          description: ID of the user
      responses:
        '200':
          description: 'Sample response: Details about a user by ID'
          schema:
            type: array
            items:
              $ref: '#/definitions/User'
definitions:
  User:
    type: object
    required:
      - name
    properties:
      id:
        type: integer
        format: int64
      name:
        type: string
      tag:
        type: string
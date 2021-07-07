{
    "openapi": "3.0.0",
    "info": {
        "title": "Schema Service API",
        "version": "1.0.0",
        "description": "API Specification for Postman Schema Service",
        "contact": {
            "name": "API Design and Mock squad",
            "email": "adm-squad@postman.com",
            "x-slack-channel": "#devel-api-design-mock"
        },
        "x-newrelic-app-id": [
            1016112280,
            1016181575,
            1016112170,
            1016326850
        ]
    },
    "servers": [
        {
            "url": "https://sync-v4.getpostman-beta.com",
            "description": "Beta URL"
        },
        {
            "url": "https://sync-v4.getpostman-stage.com",
            "description": "Stage URL"
        },
        {
            "url": "https://sync-v4.getpostman.com",
            "description": "Prod URL"
        }
    ],
    "paths": {
        "/apis/{apiId}/versions/{apiVersionId}/schemas/{id}": {
            "get": {
                "tags": [
                    "External Endpoint",
                    "CRUD Endpoint"
                ],
                "summary": "Get Schema",
                "description": "This API is used to get a schema based on the schema Id provided in the request.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    },
                    {
                        "name": "id",
                        "description": "Unique id belonging to a particular schema.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/Schema"
                        },
                        "example": "{{id}}"
                    },
                    {
                        "name": "meta",
                        "description": "When true it fetches the meta data of schema instead of schema itself.",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "boolean",
                            "default": false
                        },
                        "example": false
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "oneOf": [
                                        {
                                            "type": "object",
                                            "properties": {
                                                "model_id": {
                                                    "$ref": "#/components/schemas/Model_Id"
                                                },
                                                "meta": {
                                                    "$ref": "#/components/schemas/Meta"
                                                },
                                                "data": {
                                                    "type": "object",
                                                    "required": [
                                                        "id",
                                                        "type",
                                                        "language",
                                                        "createdAt",
                                                        "updatedAt",
                                                        "apiVersion",
                                                        "createdBy",
                                                        "updatedBy",
                                                        "schema"
                                                    ],
                                                    "properties": {
                                                        "type": {
                                                            "$ref": "#/components/schemas/Type"
                                                        },
                                                        "language": {
                                                            "$ref": "#/components/schemas/Language"
                                                        },
                                                        "id": {
                                                            "$ref": "#/components/schemas/VersionId"
                                                        },
                                                        "apiVersion": {
                                                            "$ref": "#/components/schemas/ApiVersionId"
                                                        },
                                                        "createdAt": {
                                                            "$ref": "#/components/schemas/CreatedAt"
                                                        },
                                                        "updatedAt": {
                                                            "$ref": "#/components/schemas/UpdatedAt"
                                                        },
                                                        "createdBy": {
                                                            "$ref": "#/components/schemas/CreatedBy"
                                                        },
                                                        "updatedBy": {
                                                            "$ref": "#/components/schemas/UpdatedBy"
                                                        },
                                                        "schema": {
                                                            "$ref": "#/components/schemas/Schema"
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "model_id": {
                                                    "$ref": "#/components/schemas/Model_Id"
                                                },
                                                "meta": {
                                                    "$ref": "#/components/schemas/Meta"
                                                },
                                                "data": {
                                                    "type": "object",
                                                    "required": [
                                                        "id",
                                                        "type",
                                                        "language",
                                                        "createdAt",
                                                        "updatedAt",
                                                        "apiVersion",
                                                        "createdBy",
                                                        "updatedBy",
                                                        "size"
                                                    ],
                                                    "properties": {
                                                        "type": {
                                                            "$ref": "#/components/schemas/Type"
                                                        },
                                                        "language": {
                                                            "$ref": "#/components/schemas/Language"
                                                        },
                                                        "id": {
                                                            "$ref": "#/components/schemas/VersionId"
                                                        },
                                                        "apiVersion": {
                                                            "$ref": "#/components/schemas/ApiVersionId"
                                                        },
                                                        "createdAt": {
                                                            "$ref": "#/components/schemas/CreatedAt"
                                                        },
                                                        "updatedAt": {
                                                            "$ref": "#/components/schemas/UpdatedAt"
                                                        },
                                                        "createdBy": {
                                                            "$ref": "#/components/schemas/CreatedBy"
                                                        },
                                                        "updatedBy": {
                                                            "$ref": "#/components/schemas/UpdatedBy"
                                                        },
                                                        "size": {
                                                            "$ref": "#/components/schemas/Size"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                "examples": {
                                    "Calling without meta param (default false)": {
                                        "value": {
                                            "model_id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                            "meta": {
                                                "model": "schema",
                                                "action": "findone"
                                            },
                                            "data": {
                                                "createdBy": "14997099",
                                                "updatedBy": "14997099",
                                                "id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                                "type": "openapi3",
                                                "language": "json",
                                                "apiVersion": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                                "createdAt": "2021-05-26T12:41:14.000Z",
                                                "updatedAt": "2021-05-26T12:41:14.000Z",
                                                "schema": "{\n    \"name\": \"collection\"\n}"
                                            }
                                        }
                                    },
                                    "Calling with meta set as true": {
                                        "value": {
                                            "model_id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                            "meta": {
                                                "model": "schema",
                                                "action": "findone"
                                            },
                                            "data": {
                                                "createdBy": "14997099",
                                                "updatedBy": "14997099",
                                                "id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                                "type": "openapi3",
                                                "language": "json",
                                                "apiVersion": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                                "createdAt": "2021-05-26T12:41:14.000Z",
                                                "updatedAt": "2021-05-26T12:41:14.000Z",
                                                "size": 272
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "schemaApiVersionMismatchError",
                                        "title": "Schema and API Version Mismatch Error",
                                        "message": "The Schema ID provided does not belong to the API Version ID provided.",
                                        "details": {}
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the schema you are looking for",
                                        "details": {
                                            "model": "schema",
                                            "model_id": "123",
                                            "owner": "14997099"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "External Endpoint",
                    "CRUD Endpoint"
                ],
                "summary": "Update Schema",
                "description": "This API is used to update a schema content and its configuration like type, language, etc.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    },
                    {
                        "name": "id",
                        "description": "Unique id belonging to a particular schema.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/Schema"
                        },
                        "example": "{{id}}"
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "$ref": "#/components/schemas/Type"
                                    },
                                    "schema": {
                                        "$ref": "#/components/schemas/Schema"
                                    },
                                    "language": {
                                        "$ref": "#/components/schemas/Language"
                                    },
                                    "checksum": {
                                        "type": "string",
                                        "description": "This is a value used to verify against checksum created from schema content."
                                    }
                                }
                            },
                            "example": {
                                "type": "openapi",
                                "schema": "{}",
                                "language": "json",
                                "checksum": ""
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CreateorUpdateResponseSchema"
                                },
                                "example": {
                                    "model_id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                    "meta": {
                                        "model": "schema",
                                        "action": "update"
                                    },
                                    "data": {
                                        "id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                        "type": "openapi3",
                                        "language": "json",
                                        "apiVersion": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                        "createdAt": "2021-05-26T12:41:14.000Z",
                                        "updatedAt": "2021-05-26T13:26:01.000Z",
                                        "createdBy": "14997099",
                                        "updatedBy": "14997099"
                                    },
                                    "revision": 19728324157
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "invalidParamsError",
                                        "title": "Something went wrong",
                                        "message": "There was an unexpected error saving the changes to your API schema. Please try again.",
                                        "details": {
                                            "param": "language"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the schema you are looking for",
                                        "details": {
                                            "model": "schema",
                                            "model_id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                            "owner": "14997099"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "External Endpoint",
                    "CRUD Endpoint"
                ],
                "summary": "Delete Schema",
                "description": "This API is used to delete a schema.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    },
                    {
                        "name": "id",
                        "description": "Unique id belonging to a particular schema.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/Schema"
                        },
                        "example": "{{id}}"
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object"
                            },
                            "example": {}
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "model_id": {
                                            "$ref": "#/components/schemas/Model_Id"
                                        },
                                        "meta": {
                                            "$ref": "#/components/schemas/Meta"
                                        },
                                        "data": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "$ref": "#/components/schemas/VersionId"
                                                }
                                            }
                                        },
                                        "revision": {
                                            "type": "integer",
                                            "description": "This is the unique id created for every changes made in schema. This id is used when we want to restore schema."
                                        }
                                    }
                                },
                                "example": {
                                    "model_id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc",
                                    "meta": {
                                        "model": "schema",
                                        "action": "destroy"
                                    },
                                    "data": {
                                        "id": "32d3a2b1-208a-4943-bf60-7ba82744e1fc"
                                    },
                                    "revision": 19728616135
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "invalidJSONError",
                                        "message": "Invalid JSON body supplied"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/apis/{apiId}/versions/{apiVersionId}/schemas/{id}/restore": {
            "put": {
                "tags": [
                    "External Endpoint",
                    "Changelog Endpoint"
                ],
                "summary": "Restore Schema",
                "description": "This API is used to restore the schema to the particular revision by passing revisionId in query parameter.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    },
                    {
                        "name": "id",
                        "description": "Unique id belonging to a particular schema.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/Schema"
                        },
                        "example": "{{id}}"
                    },
                    {
                        "name": "revisionId",
                        "description": "This is a unique id for every revision made in the schema.",
                        "in": "query",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object"
                            },
                            "example": {}
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "model_id": {
                                            "$ref": "#/components/schemas/Model_Id"
                                        },
                                        "meta": {
                                            "$ref": "#/components/schemas/Meta"
                                        },
                                        "data": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "type",
                                                "language",
                                                "apiVersion",
                                                "createdAt",
                                                "updatedAt",
                                                "createdBy",
                                                "updatedBy",
                                                "schema"
                                            ],
                                            "properties": {
                                                "type": {
                                                    "$ref": "#/components/schemas/Type"
                                                },
                                                "language": {
                                                    "$ref": "#/components/schemas/Language"
                                                },
                                                "id": {
                                                    "$ref": "#/components/schemas/VersionId"
                                                },
                                                "apiVersion": {
                                                    "$ref": "#/components/schemas/ApiVersionId"
                                                },
                                                "createdAt": {
                                                    "$ref": "#/components/schemas/CreatedAt"
                                                },
                                                "updatedAt": {
                                                    "$ref": "#/components/schemas/UpdatedAt"
                                                },
                                                "createdBy": {
                                                    "$ref": "#/components/schemas/CreatedBy"
                                                },
                                                "updatedBy": {
                                                    "$ref": "#/components/schemas/UpdatedBy"
                                                },
                                                "schema": {
                                                    "$ref": "#/components/schemas/Schema"
                                                }
                                            }
                                        },
                                        "revision": {
                                            "type": "integer",
                                            "nullable": true,
                                            "description": "This is the unique id created for every changes made in schema. This id is used when we want to restore schema."
                                        }
                                    }
                                },
                                "example": {
                                    "model_id": "89fab175-b611-4644-b527-95a097257346",
                                    "meta": {
                                        "model": "schema",
                                        "action": "findone"
                                    },
                                    "data": {
                                        "createdBy": "14997099",
                                        "updatedBy": "14997099",
                                        "id": "89fab175-b611-4644-b527-95a097257346",
                                        "type": "openapi3",
                                        "language": "json",
                                        "apiVersion": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                        "createdAt": "2021-05-26T13:57:36.000Z",
                                        "updatedAt": "2021-05-26T13:59:23.000Z",
                                        "schema": "{\"hello\"}"
                                    },
                                    "revision": null
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "invalidJSONError",
                                        "message": "Invalid JSON body supplied"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server.",
                                        "details": {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/apis/{apiId}/versions/{apiVersionId}/schemas/{id}/revisions": {
            "get": {
                "tags": [
                    "External Endpoint",
                    "Changelog Endpoint"
                ],
                "summary": "Get Revisions",
                "description": "This API is used for getting the revisions of a particular schema.If there are more than 10 revisions it only return 10 revisions and a nextMaxId that can be used to get next 10 revisions.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    },
                    {
                        "name": "id",
                        "description": "Unique id belonging to a particular schema.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/Schema"
                        },
                        "example": "{{id}}"
                    },
                    {
                        "name": "maxId",
                        "in": "query",
                        "required": false,
                        "description": "Defines the point up to which revisions have been fetched.",
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "oneOf": [
                                        {
                                            "type": "object",
                                            "properties": {
                                                "count": {
                                                    "type": "integer",
                                                    "maximum": 10,
                                                    "description": "The number of revisions that are present in response body."
                                                },
                                                "revisions": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "createdAt": {
                                                                "type": "string",
                                                                "format": "date-time",
                                                                "description": "The timestamp at which this schema was created and it is in ISO format."
                                                            },
                                                            "updatedAt": {
                                                                "type": "string",
                                                                "format": "date-time",
                                                                "description": "The timestamp at which this schema was last updated and it is in ISO format."
                                                            },
                                                            "id": {
                                                                "type": "integer",
                                                                "description": "A unique id of this revision "
                                                            },
                                                            "entity": {
                                                                "type": "string",
                                                                "description": "It describe around which entity this revision was created."
                                                            },
                                                            "entityId": {
                                                                "type": "string",
                                                                "format": "uuid",
                                                                "description": "This is schema id for which this revision is fetched."
                                                            },
                                                            "checksum": {
                                                                "type": "string",
                                                                "description": "This is a value used to verify against checksum created from schema content."
                                                            },
                                                            "action": {
                                                                "type": "string",
                                                                "description": "The action that created this revision (eg. create, update)"
                                                            },
                                                            "correlationId": {
                                                                "type": "string",
                                                                "nullable": true
                                                            },
                                                            "diff": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "type": {
                                                                        "type": "string",
                                                                        "description": "This tells us about the type through which diff is calculated."
                                                                    },
                                                                    "line": {
                                                                        "type": "string",
                                                                        "description": "This is the actual diff between this and previous revision."
                                                                    }
                                                                }
                                                            },
                                                            "allowedActions": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "restore": {
                                                                        "type": "boolean",
                                                                        "description": "If true specifies that schema can be restored to this revision."
                                                                    }
                                                                }
                                                            },
                                                            "actor": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "id": {
                                                                        "type": "string",
                                                                        "description": "The ID of the user who did this revision."
                                                                    },
                                                                    "name": {
                                                                        "type": "string",
                                                                        "description": "Name of the User."
                                                                    },
                                                                    "username": {
                                                                        "type": "string",
                                                                        "description": "Username of the user."
                                                                    },
                                                                    "profilePicUrl": {
                                                                        "type": "string",
                                                                        "description": "Link for the profile picture of the user.",
                                                                        "nullable": true
                                                                    },
                                                                    "type": {
                                                                        "type": "string",
                                                                        "description": "Specifies which type of user is this."
                                                                    },
                                                                    "isPublic": {
                                                                        "type": "boolean",
                                                                        "description": "Specifies whether user profile is public or not."
                                                                    },
                                                                    "isAccessible": {
                                                                        "type": "boolean",
                                                                        "description": "Specifies whether user profile can be accessed or not."
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "count": {
                                                    "type": "integer",
                                                    "maximum": 10,
                                                    "description": "The number of revisions that are present in this API call."
                                                },
                                                "nextMaxId": {
                                                    "type": "integer",
                                                    "description": "This is the token that needs to be passed as maxId in the next call in order to get next 10 revisions."
                                                },
                                                "revisions": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "createdAt": {
                                                                "type": "string",
                                                                "format": "date-time",
                                                                "description": "The timestamp at which this schema was created and it is in ISO format."
                                                            },
                                                            "updatedAt": {
                                                                "type": "string",
                                                                "format": "date-time",
                                                                "description": "The timestamp at which this schema was last updated and it is in ISO format."
                                                            },
                                                            "id": {
                                                                "type": "integer",
                                                                "description": "A unique id of this revision "
                                                            },
                                                            "entity": {
                                                                "type": "string",
                                                                "description": "It describe around which entity this revision was created."
                                                            },
                                                            "entityId": {
                                                                "type": "string",
                                                                "format": "uuid",
                                                                "description": "This is schema id for which this revision is fetched."
                                                            },
                                                            "checksum": {
                                                                "type": "string",
                                                                "description": "This is a value used to verify against checksum created from schema content."
                                                            },
                                                            "action": {
                                                                "type": "string",
                                                                "description": "The action that created this revision (eg. create, update)"
                                                            },
                                                            "correlationId": {
                                                                "type": "string",
                                                                "nullable": true
                                                            },
                                                            "diff": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "type": {
                                                                        "type": "string",
                                                                        "description": "This tells us about the type through which diff is calculated."
                                                                    },
                                                                    "line": {
                                                                        "type": "string",
                                                                        "description": "This is the actual diff between this and previous revision."
                                                                    }
                                                                }
                                                            },
                                                            "allowedActions": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "restore": {
                                                                        "type": "boolean",
                                                                        "description": "If true specifies that schema can be restored to this revision."
                                                                    }
                                                                }
                                                            },
                                                            "actor": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "id": {
                                                                        "type": "string",
                                                                        "description": "The ID of the user who did this revision."
                                                                    },
                                                                    "name": {
                                                                        "type": "string",
                                                                        "description": "Name of the User."
                                                                    },
                                                                    "username": {
                                                                        "type": "string",
                                                                        "description": "Username of the user."
                                                                    },
                                                                    "profilePicUrl": {
                                                                        "type": "string",
                                                                        "description": "Link for the profile picture of the user.",
                                                                        "nullable": true
                                                                    },
                                                                    "type": {
                                                                        "type": "string",
                                                                        "description": "Specifies which type of user is this."
                                                                    },
                                                                    "isPublic": {
                                                                        "type": "boolean",
                                                                        "description": "Specifies whether user profile is public or not."
                                                                    },
                                                                    "isAccessible": {
                                                                        "type": "boolean",
                                                                        "description": "Specifies whether user profile can be accessed or not."
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                "examples": {
                                    "When number of revision less than equal 10": {
                                        "value": {
                                            "count": 2,
                                            "revisions": [
                                                {
                                                    "createdAt": "2021-05-26T13:59:24.000Z",
                                                    "updatedAt": "2021-05-26T13:59:24.000Z",
                                                    "id": 2763765,
                                                    "entity": "schemaContent",
                                                    "entityId": "89fab175-b611-4644-b527-95a097257346",
                                                    "checksum": "18e5a1d20c669c3f6987338d1442035b1a8955f4",
                                                    "action": "update",
                                                    "correlationId": null,
                                                    "diff": {
                                                        "type": "line",
                                                        "line": "@@ -1,1 +1,1 @@\n-{}\n+{\"hello\"}"
                                                    },
                                                    "allowedActions": {
                                                        "restore": false
                                                    },
                                                    "actor": {
                                                        "id": "14997099",
                                                        "name": "Harshit Singhal prodv1",
                                                        "username": "harshitprodv1",
                                                        "profilePicUrl": null,
                                                        "type": "user",
                                                        "isPublic": true,
                                                        "isAccessible": true
                                                    }
                                                },
                                                {
                                                    "createdAt": "2021-05-26T13:57:37.000Z",
                                                    "updatedAt": "2021-05-26T13:57:37.000Z",
                                                    "id": 2763748,
                                                    "entity": "schemaContent",
                                                    "entityId": "89fab175-b611-4644-b527-95a097257346",
                                                    "checksum": "bf21a9e8fbc5a3846fb05b4fa0859e0917b2202f",
                                                    "action": "create",
                                                    "correlationId": null,
                                                    "diff": {
                                                        "type": "line",
                                                        "line": "@@ -1,0 +1,1 @@\n+{}"
                                                    },
                                                    "allowedActions": {
                                                        "restore": true
                                                    },
                                                    "actor": {
                                                        "id": "14997099",
                                                        "name": "Harshit Singhal prodv1",
                                                        "username": "harshitprodv1",
                                                        "profilePicUrl": null,
                                                        "type": "user",
                                                        "isPublic": true,
                                                        "isAccessible": true
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "When number of revision greater than 10": {
                                        "value": {
                                            "nextMaxId": 2763765,
                                            "count": 10,
                                            "revisions": [
                                                {
                                                    "createdAt": "2021-05-26T13:59:24.000Z",
                                                    "updatedAt": "2021-05-26T13:59:24.000Z",
                                                    "id": 2763765,
                                                    "entity": "schemaContent",
                                                    "entityId": "89fab175-b611-4644-b527-95a097257346",
                                                    "checksum": "18e5a1d20c669c3f6987338d1442035b1a8955f4",
                                                    "action": "update",
                                                    "correlationId": null,
                                                    "diff": {
                                                        "type": "line",
                                                        "line": "@@ -1,1 +1,1 @@\n-{}\n+{\"hello\"}"
                                                    },
                                                    "allowedActions": {
                                                        "restore": false
                                                    },
                                                    "actor": {
                                                        "id": "14997099",
                                                        "name": "Harshit Singhal prodv1",
                                                        "username": "harshitprodv1",
                                                        "profilePicUrl": null,
                                                        "type": "user",
                                                        "isPublic": true,
                                                        "isAccessible": true
                                                    }
                                                },
                                                {
                                                    "createdAt": "2021-05-26T13:57:37.000Z",
                                                    "updatedAt": "2021-05-26T13:57:37.000Z",
                                                    "id": 2763748,
                                                    "entity": "schemaContent",
                                                    "entityId": "89fab175-b611-4644-b527-95a097257346",
                                                    "checksum": "bf21a9e8fbc5a3846fb05b4fa0859e0917b2202f",
                                                    "action": "create",
                                                    "correlationId": null,
                                                    "diff": {
                                                        "type": "line",
                                                        "line": "@@ -1,0 +1,1 @@\n+{}"
                                                    },
                                                    "allowedActions": {
                                                        "restore": true
                                                    },
                                                    "actor": {
                                                        "id": "14997099",
                                                        "name": "Harshit Singhal prodv1",
                                                        "username": "harshitprodv1",
                                                        "profilePicUrl": null,
                                                        "type": "user",
                                                        "isPublic": true,
                                                        "isAccessible": true
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the schema you are looking for",
                                        "details": {
                                            "model": "schema",
                                            "model_id": "1111",
                                            "owner": "14997099"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/apis/{apiId}/versions/{apiVersionId}/schema/subscribe": {
            "post": {
                "tags": [
                    "External Endpoint",
                    "Realtime Endpoint"
                ],
                "summary": "Subscribe to schema events",
                "description": "This API is used to subscribe to the schema events.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "x-socket-id",
                        "in": "header",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object"
                            },
                            "example": {}
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SubscribeorUnsubscribeResponse"
                                },
                                "example": {
                                    "meta": {
                                        "model": "schema",
                                        "action": "subscribe"
                                    },
                                    "data": {
                                        "subscription": {
                                            "id": "apis/27f4bb03-8708-437f-8546-ba7b55a07661/apiversions/978cecf0-3d46-4bc1-bff8-8105a75af346/schema"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "notSocketError",
                                        "message": "You can only call Errors method from a socket connection."
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "External Endpoint",
                    "Realtime Endpoint"
                ],
                "summary": "Unsubscribe from schema events",
                "description": "This API is used to unsubscribe from the schema events.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "x-socket-id",
                        "in": "header",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "apiId",
                        "description": "Unique id belonging to a particular API.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiId"
                        },
                        "example": "{{apiId}}"
                    },
                    {
                        "name": "apiVersionId",
                        "description": "Unique id belonging to a particular API version.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "$ref": "#/components/schemas/ApiVersionId"
                        },
                        "example": "{{apiversionid}}"
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object"
                            },
                            "example": {}
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SubscribeorUnsubscribeResponse"
                                },
                                "example": {
                                    "meta": {
                                        "model": "schema",
                                        "action": "unsubscribe"
                                    },
                                    "data": {
                                        "subscription": {
                                            "id": "apis/27f4bb03-8708-437f-8546-ba7b55a07661/apiversions/978cecf0-3d46-4bc1-bff8-8105a75af346/schema"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "notSocketError",
                                        "message": "You can only call Errors method from a socket connection."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/apiintegration/{id}/state": {
            "get": {
                "tags": [
                    "External Endpoint",
                    "Integration State Endpoint"
                ],
                "summary": "Get Integration State",
                "description": "This API is used to get the integration state of the schema in Postman and Github.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "This is the API github integration id.",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "state": {
                                            "type": "string",
                                            "description": "This field tells about the current state of the integration (eg. running, success)."
                                        },
                                        "message": {
                                            "type": "string",
                                            "description": "This is the message regarding the current state opf integration."
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "This gives more elaborated reason for the current integration state."
                                        },
                                        "source": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "example": {
                                    "state": "fail",
                                    "message": "Unable to sync",
                                    "description": "Something went wrong while trying to sync. Try again.",
                                    "source": "github"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "paramMissingError",
                                        "message": "Parameter is missing in the request.",
                                        "details": {
                                            "param": "user_id"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the apiintegration you are looking for",
                                        "details": {
                                            "model": "apiintegration",
                                            "model_id": "123"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/schemas": {
            "get": {
                "tags": [
                    "External Endpoint",
                    "CRUD Endpoint"
                ],
                "summary": "Get schema by workspace Id",
                "description": "This API is used to get all the schema for a particular workspace.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "workspace",
                        "in": "query",
                        "description": "This is a workspace ID for which all the schema have to be filtered.",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "example": "{{workspace_id}}"
                    },
                    {
                        "name": "filter",
                        "in": "query",
                        "description": "This is used to get the latest schema of an API. The only value it can take is latest",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "example": "latest"
                    },
                    {
                        "name": "type",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "description": "This is the type of the schema (eg. - openapi3, openapi2) for which schema needs to be filtered."
                        },
                        "example": "openapi3"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "model_id": {
                                                "$ref": "#/components/schemas/Model_Id"
                                            },
                                            "meta": {
                                                "$ref": "#/components/schemas/Meta"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "$ref": "#/components/schemas/VersionId"
                                                    },
                                                    "api": {
                                                        "type": "object",
                                                        "properties": {
                                                            "id": {
                                                                "type": "string",
                                                                "format": "uuid",
                                                                "maxLength": 40,
                                                                "description": "Unique id belonging to a particular API."
                                                            },
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Name of the API"
                                                            }
                                                        }
                                                    },
                                                    "apiVersion": {
                                                        "type": "object",
                                                        "properties": {
                                                            "id": {
                                                                "$ref": "#/components/schemas/ApiVersionId"
                                                            },
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Name of the API version."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "example": [
                                    {
                                        "model_id": "89fab175-b611-4644-b527-95a097257346",
                                        "meta": {
                                            "model": "schema",
                                            "action": "getforworkspace"
                                        },
                                        "data": {
                                            "id": "89fab175-b611-4644-b527-95a097257346",
                                            "api": {
                                                "id": "27f4bb03-8708-437f-8546-ba7b55a07661",
                                                "name": "My new API"
                                            },
                                            "apiVersion": {
                                                "id": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                                "name": "Draft"
                                            }
                                        }
                                    },
                                    {
                                        "model_id": "a82df40d-3da2-48c9-adc5-9fbf06d94b80",
                                        "meta": {
                                            "model": "schema",
                                            "action": "getforworkspace"
                                        },
                                        "data": {
                                            "id": "a82df40d-3da2-48c9-adc5-9fbf06d94b80",
                                            "api": {
                                                "id": "675d5d67-30e1-4b22-985d-84c913d1b773",
                                                "name": "xyz"
                                            },
                                            "apiVersion": {
                                                "id": "74c96f22-60f3-44ea-959a-20027f72a86f",
                                                "name": "1.0.0"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "paramMissingError",
                                        "message": "Parameter is missing in the request.",
                                        "details": {
                                            "param": "workspace"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the workspace you are looking for",
                                        "details": {
                                            "model": "workspace",
                                            "model_id": "66",
                                            "owner": "14997099"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server.",
                                        "details": {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/schemas": {
            "get": {
                "tags": [
                    "External Endpoint",
                    "CRUD Endpoint"
                ],
                "summary": "Get schema by workspace Id",
                "description": "This API is used to get all the schema for a particular workspace.",
                "security": [
                    {
                        "AccessToken": []
                    }
                ],
                "parameters": [
                    {
                        "name": "workspace",
                        "in": "query",
                        "description": "This is a workspace ID for which all the schema have to be filtered.",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "example": "{{workspace_id}}"
                    },
                    {
                        "name": "filter",
                        "in": "query",
                        "description": "This is used to get the latest schema of an API. The only value it can take is latest",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "example": "latest"
                    },
                    {
                        "name": "type",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "description": "This is the type of the schema (eg. - openapi3, openapi2) for which schema needs to be filtered."
                        },
                        "example": "openapi3"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "model_id": {
                                                "$ref": "#/components/schemas/Model_Id"
                                            },
                                            "meta": {
                                                "$ref": "#/components/schemas/Meta"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "$ref": "#/components/schemas/VersionId"
                                                    },
                                                    "api": {
                                                        "type": "object",
                                                        "properties": {
                                                            "id": {
                                                                "type": "string",
                                                                "format": "uuid",
                                                                "maxLength": 40,
                                                                "description": "Unique id belonging to a particular API."
                                                            },
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Name of the API"
                                                            }
                                                        }
                                                    },
                                                    "apiVersion": {
                                                        "type": "object",
                                                        "properties": {
                                                            "id": {
                                                                "$ref": "#/components/schemas/ApiVersionId"
                                                            },
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Name of the API version."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "example": [
                                    {
                                        "model_id": "89fab175-b611-4644-b527-95a097257346",
                                        "meta": {
                                            "model": "schema",
                                            "action": "getforworkspace"
                                        },
                                        "data": {
                                            "id": "89fab175-b611-4644-b527-95a097257346",
                                            "api": {
                                                "id": "27f4bb03-8708-437f-8546-ba7b55a07661",
                                                "name": "My new API"
                                            },
                                            "apiVersion": {
                                                "id": "978cecf0-3d46-4bc1-bff8-8105a75af346",
                                                "name": "Draft"
                                            }
                                        }
                                    },
                                    {
                                        "model_id": "a82df40d-3da2-48c9-adc5-9fbf06d94b80",
                                        "meta": {
                                            "model": "schema",
                                            "action": "getforworkspace"
                                        },
                                        "data": {
                                            "id": "a82df40d-3da2-48c9-adc5-9fbf06d94b80",
                                            "api": {
                                                "id": "675d5d67-30e1-4b22-985d-84c913d1b773",
                                                "name": "xyz"
                                            },
                                            "apiVersion": {
                                                "id": "74c96f22-60f3-44ea-959a-20027f72a86f",
                                                "name": "1.0.0"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "paramMissingError",
                                        "message": "Parameter is missing in the request.",
                                        "details": {
                                            "param": "workspace"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "instanceNotFoundError",
                                        "message": "We could not find the workspace you are looking for",
                                        "details": {
                                            "model": "workspace",
                                            "model_id": "66",
                                            "owner": "14997099"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "error": {
                                        "name": "serverError",
                                        "message": "Something went wrong with the server.",
                                        "details": {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "Model_Id": {
                "type": "string",
                "format": "uuid",
                "maxLength": 40,
                "description": "This is the unique id of this schema."
            },
            "Meta": {
                "title": "meta",
                "type": "object",
                "required": [
                    "model",
                    "action"
                ],
                "properties": {
                    "model": {
                        "type": "string",
                        "description": "This is the model on which action is performed."
                    },
                    "action": {
                        "type": "string",
                        "description": "This is the action performed on the server for this API call."
                    }
                }
            },
            "Type": {
                "type": "string",
                "maxLength": 24,
                "description": "This is the type of the schema (eg. - openapi3, openapi2)."
            },
            "Language": {
                "type": "string",
                "maxLength": 24,
                "description": "This the language in which schema is written."
            },
            "VersionId": {
                "type": "string",
                "format": "uuid",
                "maxLength": 40,
                "description": "This is the unique id of a schema."
            },
            "ApiVersionId": {
                "type": "string",
                "format": "uuid",
                "maxLength": 40,
                "description": "A unique id for an API version."
            },
            "ApiId": {
                "type": "string",
                "format": "uuid",
                "maxLength": 40,
                "description": "A unique id for an API."
            },
            "CreatedAt": {
                "type": "string",
                "format": "date-time",
                "description": "The timestamp at which this schema was created and it is in ISO format."
            },
            "UpdatedAt": {
                "type": "string",
                "format": "date-time",
                "description": "The timestamp at which this schema was last updated and it is in ISO format."
            },
            "CreatedBy": {
                "type": "string",
                "maxLength": 24,
                "description": "The ID of the user who created this schema."
            },
            "UpdatedBy": {
                "type": "string",
                "maxLength": 24,
                "description": "The ID of the user who last updated this schema."
            },
            "Identifier": {
                "type": "string",
                "format": "uuid",
                "maxLength": 255,
                "description": "This ID is used to identify schema file on s3 bucket."
            },
            "Schema": {
                "type": "string",
                "description": "It is the actual content of the schema."
            },
            "Size": {
                "type": "integer",
                "description": "This is the size of the schema content and it's unit is byte."
            },
            "Error": {
                "title": "ErrorResonpseBody",
                "type": "object",
                "required": [
                    "error"
                ],
                "properties": {
                    "error": {
                        "type": "object",
                        "required": [
                            "name"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "This is the name of the error thrown."
                            },
                            "message": {
                                "type": "string",
                                "description": "This is the message related to the error thrown."
                            },
                            "details": {
                                "type": "object",
                                "description": "This object contains the details related to the error."
                            }
                        }
                    }
                }
            },
            "CreateorUpdateResponseSchema": {
                "title": "CreateorUpdateResponseSchema",
                "type": "object",
                "properties": {
                    "model_id": {
                        "$ref": "#/components/schemas/Model_Id"
                    },
                    "meta": {
                        "$ref": "#/components/schemas/Meta"
                    },
                    "data": {
                        "type": "object",
                        "required": [
                            "id",
                            "type",
                            "language",
                            "createdAt",
                            "updatedAt",
                            "apiVersion",
                            "createdBy",
                            "updatedBy"
                        ],
                        "properties": {
                            "type": {
                                "$ref": "#/components/schemas/Type"
                            },
                            "language": {
                                "$ref": "#/components/schemas/Language"
                            },
                            "id": {
                                "$ref": "#/components/schemas/VersionId"
                            },
                            "apiVersion": {
                                "$ref": "#/components/schemas/ApiVersionId"
                            },
                            "createdAt": {
                                "$ref": "#/components/schemas/CreatedAt"
                            },
                            "updatedAt": {
                                "$ref": "#/components/schemas/UpdatedAt"
                            },
                            "createdBy": {
                                "$ref": "#/components/schemas/CreatedBy"
                            },
                            "updatedBy": {
                                "$ref": "#/components/schemas/UpdatedBy"
                            }
                        }
                    },
                    "revision": {
                        "type": "integer",
                        "description": "This is the unique id created for every revision made in schema. This id is used when we want to restore schema."
                    }
                }
            },
            "SubscribeorUnsubscribeResponse": {
                "title": "SubscribeorUnsubscribeResponse",
                "type": "object",
                "properties": {
                    "meta": {
                        "$ref": "#/components/schemas/Meta"
                    },
                    "data": {
                        "type": "object",
                        "properties": {
                            "subscription": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "This is the id to which enitity is subscribed."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "AccessToken": {
                "name": "X-Access-Token",
                "description": "User-specific access token belonging to a valid user session.",
                "in": "header",
                "type": "apiKey"
            }
        }
    },
    "security": [
        {
            "AccessToken": []
        }
    ]
}
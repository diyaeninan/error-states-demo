openapi: 3.0.0
info:
  title: Antecipa API 2
  version: 0.2.0
  description: >-
    Antecipa is the first working captial platform in Brazil and this is our
    first API. We are working together to improve our system.

    We are constlantly changin our systems and improving our APIS. (FINk/Team)
    add more here.

    > This API is built on top of a mock server, this means the data is static
    and can't be edited.

    # Getting Started

    Before you start make sure you have selected the correct environment.

    # Authorization

    The Antecipa API uses [Bearer Access Token](https://www.oauth.com/oauth2-servers/access-tokens/) to authenticate requests.

    This sample call, which shows a users list, includes a bearer token in the Authorization request header. This type of token lets you complete an action on behalf of a resource owner.

      ```sh
      $ curl -v -X GET {{url}}/v1/Users \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer Access-Token"
      ```

    # Reponses

    ## HTTP status codes

    For successful requests, Antecipa returns HTTP 2XX status codes.

    For failed requests, Antecipa returns HTTP 4XX or 5XX status codes.

    Antecipa returns these HTTP status codes:

      | Status code | Description |
      |-|-|
      | `200 OK` | The request succeeded.  |
      | `201 Created` | A `POST` method successfully created a resource.  |
      | `204 No Content` | The server successfully executed the method but returns no response body.  |
      | `400 Bad Request` | Request is not well-formed, syntactically incorrect, or violates schema.  |
      | `401 Unauthorized` | Authentication failed due to invalid authentication credentials.  |
      | `404 Not Found` | The specified resource does not exist or get request not found object with requested filter.  |
      | `500 Internal Server Error` | An internal server error has occurred.  |
      | `503 Service Unavailable` | Service Unavailable.  |

    For all errors except Identity errors, Antecipa returns an error response body that includes additional error details in this format.

      ```json
      {
        "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
        "title": "One or more validation errors occurred.",
        "status": 400,
        "traceId": "|4ac0c1b-4f369645927980db.",
        "errors": {
          "Email": [
            "E-mail is required."
          ],
          "LastName": [
            "Lastname is required."
          ],
          "FirstName": [
            "Firstname is required."
          ]
        }
      }
      ```

    ## Antecipa error codes

    Erverything here

    # Global Types

    ## Documents

      | Code | Name |
      |-|-|
      | 1 | RootCNPJ |
      | 2 | CNPJ |
      | 3 | CPF |

    ## Contact

      | Code | Name |
      |-|-|
      | 1 | Email |
      | 2 | Mobile |
      | 3 | Phone |

  contact:
    name: Development support
    url: 'https://antecipa.com/support'
    email: development@antecipa.com
  license:
    name: Private

servers:
  - url: '{{url}}/v1'
    description: Endpoint api's
    variables:
      url:
        default: https://api.antecipa.com
        enum:
          - https://api.antecipa.com
          - https://sandbox-api.antecipa.com
          - https://dev-api.antecipa.com

security:
  - bearerAuth: []

tags:
  - name: Users
    description: >-
      Represents a user in our system. Every operation in this api must be
      authenticated.  Each user is identified by a numeric id and will be
      validated at the API layer.
  - name: Invoices
    description: Represents a invoice context in our system.
  - name: Suppliers
    description: Represents a supplier context in our system.
  - name: Buyers
    description: Represents a buyer context in our system.
paths:
  '/Users':
    get:
      summary: Get a user by filters.
      description: All filters are optionals and can be used to improve your search.
      tags:
        - Users
      parameters:
        - name: userGroupId
          in: query
          schema:
            type: array
            items:
              type: integer
            nullable: true
        - name: onlyEnabled
          in: query
          schema:
            type: boolean
        - name: email
          in: query
          schema:
            type: string
            nullable: true
        - name: Term
          in: query
          schema:
            type: string
            nullable: true
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserList'
    post:
      summary: Create a new user
      description: Perform an add operation of user
      tags:
        - Users
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserCommand'
      responses:
        '204':
          description: Success
  '/Users/{userId}':
    get:
      summary: Get a user by ID
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          description: Id of the user to get the detail
          schema:
            type: integer
      responses:
        '200':
          description: Return the user's detail.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
    put:
      summary: Update a user information
      description: All the provided fields will be updated, including null values, if possible
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserCommand'
      responses:
        '204':
          description: Request accepted.
    delete:
      summary: Perform a delete operation for the user
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Users/{userId}/contacts':
    get:
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
        - name: Value
          in: query
          schema:
            type: string
            nullable: true
        - name: typeId
          in: query
          schema:
            type: array
            items:
              type: integer
            nullable: true
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Contact'
    post:
      summary: Perform an add contact to the user
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AddContactCommand'
      responses:
        '201':
          description: Success
  '/Users/{userId}/contacts/{contactId}':
    get:
      summary: Get an user's contact by id
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
        - name: contactId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
    put:
      summary: Perform an update for contatc
      description: ''
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
        - name: contactId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateContactCommand'
      responses:
        '204':
          description: Success
    delete:
      summary: Delete a contact by Id
      description: ''
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
        - name: contactId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Users/{userId}/changePassword':
    put:
      summary: Perform an change password operation
      description: ''
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChangePasswordCommand'
      responses:
        '204':
          description: Success
  '/Users/requestChangePassword':
    post:
      summary: 'The logged user can request for a new password'' description: '''
      tags:
        - Users
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RequestChangePasswordCommand'
      responses:
        '201':
          description: Success
  '/Users/{userId}/enableDisable':
    patch:
      summary: Enable or disable a user
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Buyers':
    get:
      summary: Get a buyer by filter
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: name
          in: query
          schema:
            type: string
            description: Name of the buyer to filter
        - name: groupId
          in: query
          schema:
            type: integer
            minimum: 1
            description: Group Id of the buyer to filter
        - $ref: '#/components/parameters/CNPJ'
        - name: isActive
          in: query
          schema:
            type: boolean
            description: Filter buyer is active or not
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/BuyerList'
  '/Buyers/{buyerId}':
    get:
      summary: Get a buyer detail
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            description: Buyer Id Filter
            type: integer
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Buyer'
  '/Buyers/{buyerId}/Suppliers':
    get:
      summary: Get a Supplier list
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: statusRegister
          in: query
          schema:
            type: string
            description: Status of supplier's register
        - name: name
          in: query
          schema:
            type: string
            description: Supplier's name
        - $ref: '#/components/parameters/CNPJ'
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SupplierList'
  '/Buyers/{buyerId}/CapitalSources':
    get:
      summary: Get a capital source list
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: isActive
          in: query
          schema:
            type: boolean
            description: Get capital source if is active or not
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/CapitalSourceList'
  '/Buyers/{buyerId}/CapitalSources/{capitalSourceId}':
    get:
      summary: Get a capital source detail
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: capitalSourceId
          in: path
          required: true
          schema:
            description: Capital Source's id filter
            type: integer
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/CapitalSource'
  '/Buyers/{buyerId}/Holidays':
   get:
     summary: Get a Holidays
     description: All filters are optionals and can be use to improve your search.
     tags:
       - Buyers
     parameters:
       - name: buyerId
         in: path
         required: true
         schema:
           type: integer
       - name: name
         in: query
         schema:
           type: string
           description: Holiday's Name
       - name: startDate
         in: query
         schema:
           type: string
           format: "yyyy-mm-dd"
           description: Holiday's start date
       - name: endDate
         in: query
         schema:
           type: string
           format: "yyyy-mm-dd"
           description: Holiday's end date
       - $ref: '#/components/parameters/page'
       - $ref: '#/components/parameters/pageSize'
     responses:
       '200':
         description: Ok - Request executed
         content:
           application/json:
             schema:
               type: array
               items:
                 $ref: '#/components/schemas/HolidayList'
   post:
     summary: Create a holiday information
     description: Perform an add operation of holiday
     tags:
       - Buyers
     parameters:
       - name: buyerId
         in: path
         required: true
         schema:
           type: integer
     requestBody:
       content:
         application/json:
           schema:
             $ref: '#/components/schemas/CreateHolidayCommand'
     responses:
       '201':
         description: Created.
  '/Buyers/{buyerId}/Holidays/{holidayId}':
   get:
     summary: Get a Holiday
     description: All filters are optionals and can be use to improve your search.
     tags:
       - Buyers
     parameters:
       - name: buyerId
         in: path
         required: true
         schema:
           type: integer
       - name: holidayId
         in: path
         required: true
         schema:
           description: Holiday's id filter
           type: integer
     responses:
       '200':
         description: Ok - Request executed
         content:
           application/json:
             schema:
               type: array
               items:
                 $ref: '#/components/schemas/Holiday'
   put:
     summary: Update a holiday information
     description: All the provided fields will be updated, including null values, if possible
     tags:
       - Buyers
     parameters:
       - name: buyerId
         in: path
         required: true
         schema:
           type: integer
       - name: holidayId
         in: path
         required: true
         schema:
           description: Holiday's id filter
           type: integer
     requestBody:
       content:
         application/json:
           schema:
             $ref: '#/components/schemas/UpdateHolidayCommand'
     responses:
       '204':
         description: Request accepted.
   delete:
     summary: Perform a delete operation for the holiday
     tags:
       - Buyers
     parameters:
       - name: buyerId
         in: path
         required: true
         schema:
           type: integer
       - name: holidayId
         in: path
         required: true
         schema:
           description: Holiday's id filter
           type: integer
     responses:
       '204':
         description: Success
  '/Buyers/{buyerId}/Users':
    get:
      summary: Get a Users list
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: name
          in: query
          schema:
            type: string
            description: User's name
        - name: email
          in: query
          schema:
            type: string
            format: email
            description: User's email
        - name: isEnabled
          in: query
          schema:
            type: boolean
            description: Get users if enabled or not
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserList'
    post:
      summary: Create a new user
      description: Perform an add operation of user
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserCommand'
      responses:
        '204':
          description: Success
  '/Buyers/{buyerId}/Users/{userId}':
    get:
      summary: Get a User detail
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    put:
      summary: Update a user information
      description: All the provided fields will be updated, including null values, if possible
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserCommand'
      responses:
        '204':
          description: Request accepted.
    delete:
      summary: Perform a delete operation for the user
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Buyers/{buyerId}/Users/{userId}/enableDisable':
    patch:
      summary: Enable or disable a user
      tags:
        - Buyers
      parameters:
        - name: buyerId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Suppliers/':
    get:
      summary: Get a Supplier list
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Suppliers
      parameters:
        - name: statusRegister
          in: query
          schema:
            type: string
            description: Status of supplier's register
        - name: name
          in: query
          schema:
            type: string
            description: Supplier's name
        - $ref: '#/components/parameters/CNPJ'
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SupplierList'
  '/Suppliers/{supplierId}':
    get:
      summary: Get a Supplier details
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
               $ref: '#/components/schemas/Supplier'
  "/Suppliers/{supplierId}/Branchs":
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Branch"
  "/Suppliers/{supplierId}/Branchs/{BranchId}":
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: BranchId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Branch"
  "/Suppliers/{supplierId}/Contacts":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/AddSupplierContactCommand"
      responses:
        '201':
          description: Created
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: Term
        in: query
        schema:
          type: string
          nullable: true
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/ContactCompany"
  "/Suppliers/{supplierId}/Contacts/{ContactId}":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/AddSupplierContactItemCommand"
      responses:
        '201':
          description: Created
    put:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/UpdateSupplierContactCommand"
      responses:
        '204':
          description: No Content
    delete:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '204':
          description: No Content
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/ContactCompany"
  "/Suppliers/{supplierId}/Registrations":
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Registration"
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/Partners":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/AddPartnerCommand"
      responses:
        '201':
          description: Created
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Partner"
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/Partners/{PartnerId}":
    put:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/UpdatePartnerCommand"
      responses:
        '204':
          description: Success
    delete:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '204':
          description: Success
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Partner"
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/Partners/{PartnerId}/Contacts":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/AddPartnerContactItemCommand"
      responses:
        '201':
          description: Created
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/Partners/{PartnerId}/Contacts/{ContactId}":
    put:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/UpdatePartnerContactItemCommand"
      responses:
        '204':
          description: Success
    delete:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: PartnerId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ContactId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '204':
          description: Success
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/UploadDocuments":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/AddRegistrationDocumentCommand"
      responses:
        '201':
          description: Success
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/UploadDocument"
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/UploadDocuments/{UploadDocumentId}":
    put:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/UpdateRegistrationDocumentCommand"
      responses:
        '204':
          description: Success
    delete:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '204':
          description: Success
    get:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/UploadDocument"
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/UploadDocuments/{UploadDocumentId}/Files":
    post:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          multipart/form-data:
            schema:
              required:
              - File
              - SupplierId
              - SupplierRegistrationId
              - UploadDocumentId
              type: object
              properties:
                SupplierId:
                  type: integer
                  format: int32
                SupplierRegistrationId:
                  type: integer
                  format: int32
                UploadDocumentId:
                  type: integer
                  format: int32
                File:
                  type: string
                  format: binary
                ExternalId:
                  type: string
                  nullable: true
            encoding:
              SupplierId:
                style: form
              SupplierRegistrationId:
                style: form
              UploadDocumentId:
                style: form
              File:
                style: form
              ExternalId:
                style: form
      responses:
        '201':
          description: Created
  "/Suppliers/{supplierId}/Registrations/{SupplierRegistrationId}/UploadDocuments/{UploadDocumentId}/Files/{UploadDocumentFileId}":
    put:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentFileId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      requestBody:
        content:
          multipart/form-data:
            schema:
              required:
              - File
              - SupplierId
              - SupplierRegistrationId
              - UploadDocumentFileId
              - UploadDocumentId
              type: object
              properties:
                SupplierId:
                  type: integer
                  format: int32
                SupplierRegistrationId:
                  type: integer
                  format: int32
                UploadDocumentId:
                  type: integer
                  format: int32
                UploadDocumentFileId:
                  type: integer
                  format: int32
                File:
                  type: string
                  format: binary
                ExternalId:
                  type: string
                  nullable: true
            encoding:
              SupplierId:
                style: form
              SupplierRegistrationId:
                style: form
              UploadDocumentId:
                style: form
              UploadDocumentFileId:
                style: form
              File:
                style: form
              ExternalId:
                style: form
      responses:
        '201':
          description: Success
    delete:
      tags:
      - Suppliers
      parameters:
      - name: supplierId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: SupplierRegistrationId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: UploadDocumentFileId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: ExternalId
        in: query
        schema:
          type: string
          nullable: true
      responses:
        '204':
          description: Success
  '/Suppliers/{supplierId}/Users':
    get:
      summary: Get a Users list
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
        - name: name
          in: query
          schema:
            type: string
            description: User's name
        - name: email
          in: query
          schema:
            type: string
            format: email
            description: User's email
        - name: isEnabled
          in: query
          schema:
            type: boolean
            description: Get users if enabled or not
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserList'
    post:
      summary: Create a new user
      description: Perform an add operation of user
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserCommand'
      responses:
        '204':
          description: Success
  '/Suppliers/{supplierId}/Users/{userId}':
    get:
      summary: Get a User detail
      description: All filters are optionals and can be use to improve your search.
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Ok - Request executed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    put:
      summary: Update a user information
      description: All the provided fields will be updated, including null values, if possible
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserCommand'
      responses:
        '204':
          description: Request accepted.
    delete:
      summary: Perform a delete operation for the user
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  '/Suppliers/{supplierId}/Users/{userId}/enableDisable':
    patch:
      summary: Enable or disable a user
      tags:
        - Suppliers
      parameters:
        - name: supplierId
          in: path
          required: true
          schema:
            type: integer
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Success
  "/Suppliers/Types/UploadDocument":
    get:
      tags:
      - Suppliers
      summary: List upload document's type
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/UploadDocumentType"
  '/Invoices':
    get:
      summary: Get a invoices by filters.
      description: All filters are optionals and can be used to improve your search.
      tags:
        - Invoices
      parameters:
        - name: buyerId
          in: query
          schema:
            type: integer
        - name: supplierId
          in: query
          schema:
            type: integer
        - name: startDueDate
          in: query
          schema:
            type: string
            format: date-time
        - name: endDueDate
          in: query
          schema:
            type: string
            format: date-time
        - name: startValue
          in: query
          schema:
            type: number
            format: decimal
        - name: endValue
          in: query
          schema:
            type: number
            format: decimal
        - name: paymentOrderStatusId
          in: query
          schema:
            type: array
            items:
              type: integer
              format: int32
            nullable: true
        - name: paymentTypeId
          in: query
          schema:
            type: array
            items:
              type: integer
              format: int32
            nullable: true
        - $ref: '#/components/parameters/page'
        - $ref: '#/components/parameters/pageSize'
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/InvoiceList'
  '/Invoices/{invoiceId}':
    get:
      summary: Get a invoice detail.
      description: All filters are optionals and can be used to improve your search.
      tags:
        - Invoices
      parameters:
        - name: invoiceId
          in: path
          required: true
          description: Id of the invoice to get the detail
          schema:
            type: integer
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Invoice'
  "/Buyers/Invoices/{invoiceId}/PaymentOrders":
    get:
      tags:
      - Invoices
      summary: List Invoice's Payment Order
      parameters:
      - name: invoiceId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/PaymentOrderList"
  "/Invoices/{invoiceId}/FiscalDocuments":
    get:
      tags:
      - Invoices
      summary: List Invoice's Payment Order
      parameters:
      - name: invoiceId
        in: path
        required: true
        schema:
          type: integer
          format: int32
      - name: Page
        in: query
        schema:
          type: integer
          format: int32
      - name: PageSize
        in: query
        schema:
          type: integer
          format: int32
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/FiscalDocumentList"
  "/Invoices/Types/Payment":
    get:
      tags:
      - Invoices
      summary: List payment's type
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/PaymentType"
  "/Invoices/Types/OrderStatus":
    get:
      tags:
      - Invoices
      summary: List order's status
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/OrderStatusType"
components:
  parameters:
    page:
      in: query
      name: page
      required: false
      schema:
        type: integer
        minimum: 1
        default: 1
      description: The number of items to skip before starting to collect the result set
    pageSize:
      in: query
      name: pageSize
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 500
        default: 10
      description: The numbers of items to return.
    CNPJ:
      in: query
      name: document
      required: false
      schema:
        type: integer
        minimum: 14
        maximum: 14
      description: Document number of company to filter.
  schemas:
    BadRequest:
      title: Bad Request
      type: object
      properties:
        error:
          type: object
          properties:
            message:
              type: string
    NotFound:
      title: Not Found
      type: object
      properties:
        error:
          type: object
          properties:
            message:
              type: string
    User:
      type: object
      description: Model containing baisc information about an user
      properties:
        id:
          type: integer
          example: "1"
        firstName:
          type: string
          nullable: true
          example: "Ethan"
        lastName:
          type: string
          nullable: true
          example: "Schneider"
        email:
          type: string
          format: email
          nullable: true
          example: "ethan@email.com"
        userGroupId:
          type: integer
          example: "1"
        userGroup:
          type: string
          nullable: true
          example: "Admin"
        userGroupDescription:
          type: string
          nullable: true
          example: "System's Admin"
        enabled:
          type: boolean
          example: "true"
        pictureUrl:
          type: string
          nullable: true
          example: "https://antecipa.com/assets/home/images/logo-white.png"
        lastAccessOn:
          type: string
          format: date-time
          example: "2020-06-05T19:28:48.216Z"
    UserList:
      type: object
      description: Model containing aggregated information about user
      properties:
        id:
          type: integer
          example: "1"
        firstName:
          type: string
          nullable: true
          example: "Ethan"
        lastName:
          type: string
          nullable: true
          example: "Schneider"
        email:
          type: string
          format: email
          nullable: true
          example: "ethan@email.com"
        userGroupId:
          type: integer
          example: "1"
        userGroup:
          type: string
          nullable: true
          example: "Admin"
        userGroupDescription:
          type: string
          nullable: true
          example: "System's Admin"
        enabled:
          type: boolean
          example: "true"
        lastAccessOn:
          type: string
          format: date-time
          example: "2020-06-05T19:28:48.216Z"
    CreateUserCommand:
      description: Model containing all needed informations to create new user
      required:
        - email
        - firstName
        - lastName
        - userGroupId
      type: object
      properties:
        firstName:
          maxLength: 100
          minLength: 0
          type: string
          example: "FirstName"
        lastName:
          maxLength: 100
          minLength: 0
          type: string
          example: "LastName"
        email:
          maxLength: 100
          minLength: 0
          type: string
          format: email
          example: "user@email.com"
        userGroupId:
          type: integer
          example: "1"
        sendWelcomeEmail:
          type: boolean
          example: "false"
      additionalProperties: false
    UpdateUserCommand:
      required:
        - email
        - firstName
        - lastName
        - userGroupId
      type: object
      properties:
        firstName:
          maxLength: 100
          minLength: 0
          type: string
          example: "FirstName"
        lastName:
          maxLength: 100
          minLength: 0
          type: string
          example: "LastName"
        userGroupId:
          type: integer
          example: "1"
        enabled:
          type: boolean
          example: true
        email:
          type: string
          format: email
          example: "user@email.com"
      additionalProperties: false
    CreateHolidayCommand:
      required:
        - name
        - startDate
        - endDate
      type: object
      properties:
        name:
          type: string
          minLength: 0
          maxLength: 50
          example: "New Year"
        description:
          type: string
          minLength: 0
          maxLength: 100
          example: "New Year"
        startDate:
          type: string
          format: "yyyy-mm-dd"
          example: "2020-01-01"
        endDate:
          type: string
          format: "yyyy-mm-dd"
          example: "2020-01-01"
      additionalProperties: false
    UpdateHolidayCommand:
      required:
        - name
        - startDate
        - endDate
      type: object
      properties:
        name:
          type: string
          minLength: 0
          maxLength: 50
          example: "New Year"
        description:
          type: string
          minLength: 0
          maxLength: 100
          example: "New Year"
        startDate:
          type: string
          format: "yyyy-mm-dd"
          example: "2020-01-01"
        endDate:
          type: string
          format: "yyyy-mm-dd"
          example: "2020-01-01"
      additionalProperties: false
    AddSupplierContactCommand:
      required:
      - firstName
      type: object
      properties:
        firstName:
          type: string
        lastName:
          type: string
          nullable: true
        default:
          type: boolean
      additionalProperties: false
    AddSupplierContactItemCommand:
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        contactId:
          type: integer
          format: int32
        contactTypeId:
          type: integer
          format: int32
        value:
          type: string
          nullable: true
        buyerId:
          type: integer
          format: int32
          nullable: true
        contactItemERPId:
          type: string
          nullable: true
      additionalProperties: false
    UpdateSupplierContactCommand:
      type: object
      properties:
        firstName:
          type: string
          nullable: true
        lastName:
          type: string
          nullable: true
        default:
          type: boolean
      additionalProperties: false
    ContactItem:
      type: object
      properties:
        contactTypeId:
          type: integer
          format: int32
        contactType:
          type: string
          nullable: true
        value:
          type: string
          nullable: true
      additionalProperties: false
    ContactCompany:
      type: object
      properties:
        id:
          type: integer
          format: int32
        firstName:
          type: string
          nullable: true
        lastName:
          type: string
          nullable: true
        default:
          type: boolean
        contactItems:
          type: array
          items:
            "$ref": "#/components/schemas/ContactItem"
          nullable: true
      additionalProperties: false
    Contact:
      type: object
      properties:
        id:
          type: integer
          example: 1
        typeId:
          type: integer
          example: 1
        type:
          type: string
          nullable: true
          example: "Phone"
        value:
          type: string
          nullable: true
          example: "55555555"
        updatedByUserEmail:
          type: string
          nullable: true
          example: 1
        updatedOn:
          type: string
          format: date-time
          example: "2020-06-05T19:28:48.216Z"
      additionalProperties: false
    AddContactCommand:
      required:
        - typeId
        - value
      type: object
      properties:
        typeId:
          type: integer
        value:
          maxLength: 300
          minLength: 0
          type: string
      additionalProperties: false
    UpdateContactCommand:
      required:
        - contactId
        - typeId
        - userId
        - value
      type: object
      properties:
        userId:
          type: integer
        contactId:
          type: integer
        typeId:
          type: integer
        value:
          maxLength: 300
          minLength: 0
          type: string
    ChangePasswordWithTokenCommand:
      required:
        - requestToken
      type: object
      properties:
        requestToken:
          type: string
        password:
          type: string
          nullable: true
        confirmPassword:
          type: string
          nullable: true
    ChangePasswordCommand:
      required:
        - userId
      type: object
      properties:
        userId:
          type: integer
        password:
          type: string
          nullable: true
        confirmPassword:
          type: string
          nullable: true
    RequestChangePasswordCommand:
      required:
        - email
      type: object
      properties:
        email:
          type: string
          format: email
    BuyerList:
      type: object
      description: Model containing aggregated buyer informations
      properties:
        id:
          type: integer
          nullable: false
          example: 1
        name:
          type: string
          nullable: false
          example: Buyer Name
        CorporateName:
          type: string
          nullable: false
          example: Buyer CorporateName
        isActive:
          type: boolean
          nullable: false
          example: true
        isSyncActive:
          type: boolean
          nullable: false
          example: true
        document:
          type: string
          nullable: false
          example: '55555555555555'
        groupName:
          type: string
          nullable: false
          example: 'Buyer Group'
        paymentOrderQuantity:
          type: integer
          nullable: false
          default: 0
          example: 10
        paymentOrderValue:
          type: number
          format: decimal
          nullable: false
          default: 0
          example: '1000.88'
        paymentOrderAnticipableValue:
          type: number
          format: decimal
          nullable: false
          default: 0
          example: '574.88'
    Buyer:
      type: object
      description: Model containing buyer informations
      properties:
        id:
          type: integer
          nullable: false
          example: '1'
        name:
          type: string
          nullable: false
          example: Buyers Name
        CorporateName:
          type: string
          nullable: false
          example: Buyer CorporateName
        isActive:
          type: boolean
          nullable: false
          example: true
        document:
          type: string
          nullable: false
          example: '55555555555555'
        groupName:
          type: string
          nullable: false
          example: 'Buyer Group'
    SupplierList:
      type: object
      description: Model containing aggregated supplier's information
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "Supplier Name"
        document:
          type: string
          nullable: false
          example: "55555555555555"
        PaymentOrderValue:
          type: number
          format: decimal
          nullable: false
          default: 0
          example: "0.0"
        PaymentOrderQuantity:
          type: integer
          nullable: false
          default: 0
          example: "0"
        PaymentOrderAnticipableValue:
          type: number
          format: decimal
          nullable: false
          default: 0
          example: "0.0"
        PaymentOrderAnticipableQuantity:
          type: integer
          nullable: false
          default: 0
          example: "0"
    Supplier:
      type: object
      description: Model containing supplier's information
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "Supplier Name"
        document:
          type: string
          nullable: false
          example: "55555555555555"
    CapitalSourceList:
      type: object
      description: Model containing aggregated capital source
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "CapitalSouce Name"
        type:
          type: string
          nullable: false
          example: "Caixa de Terceiros"
        balance:
          type: number
          format: decimal
          nullable: false
          example: "0.0"
          default: 0.0
        costRate:
          type: number
          format: decimal
          nullable: true
          example: "1.00"
        rebate:
          type: number
          format: decimal
          nullable: true
          example: "0.5"
        isActive:
          type: boolean
          nullable: false
          example: "true"
    CapitalSource:
      type: object
      description: Model containing capital source
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "CapitalSouce Name"
        type:
          type: string
          nullable: false
          example: "External"
        balance:
          type: number
          format: decimal
          nullable: false
          example: "0.0"
          default: 0.0
        creditLimit:
          type: number
          format: decimal
          nullable: false
          example: "0.0"
          default: 0.0
        isActive:
          type: boolean
          nullable: false
          example: "true"
    HolidayList:
      type: object
      description: Model containing aggregated holiday
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "New Year"
        startDate:
          type: string
          format: "yyyy-mm-dd"
          nullable: false
          example: "2020-01-01"
        endDate:
          type: string
          format: "yyyy-mm-dd"
          nullable: false
          example: "2020-01-01"
        isGlobal:
          type: boolean
          nullable: false
          example: "true"
    Holiday:
      type: object
      description: Model containing holiday
      properties:
        id:
          type: integer
          nullable: false
          example: "1"
        name:
          type: string
          nullable: false
          example: "New Year"
        description:
          type: string
          nullable: false
          example: "New Year"
        startDate:
          type: string
          format: "yyyy-mm-dd"
          nullable: false
          example: "2020-01-01"
        endDate:
          type: string
          format: "yyyy-mm-dd"
          nullable: false
          example: "2020-01-01"
        isGlobal:
          type: boolean
          nullable: false
          example: "true"
    Branch:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        documentId:
          type: integer
          format: int32
          example: 2
        document:
          type: string
          nullable: true
          example: "55555555"
        addressId:
          type: integer
          format: int32
          example: 1
        name:
          type: string
          nullable: true
          example: "Branch Name"
        corporateName:
          type: string
          nullable: true
          example: "Branch CorporateName"
        root:
          type: boolean
          example: true
        enabled:
          type: boolean
          example: true
        buyers:
          type: array
          items:
            "$ref": "#/components/schemas/BranchBuyer"
          nullable: true
    BranchBuyer:
      type: object
      properties:
        buyerId:
          type: integer
          format: int32
        supplierBranchERPName:
          type: string
          nullable: true
        supplierBranchERPId:
          type: string
          nullable: true
    Registration:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        canceledByUserId:
          type: integer
          format: int32
          nullable: true
          example: null
        canceledOn:
          type: string
          format: date-time
          nullable: true
          example: null
        contractKey:
          type: string
          nullable: true
          example: null
        notePendingInformation:
          type: string
          nullable: true
          example: null
        registerApprovedByUserId:
          type: integer
          format: int32
          nullable: true
          example: null
        registerApprovedOn:
          type: string
          format: date-time
          nullable: true
          example: null
        registerFinishedByUserId:
          type: integer
          format: int32
          nullable: true
          example: null
        registerFinishedOn:
          type: string
          format: date-time
          nullable: true
          example: null
        sendContractByUserId:
          type: integer
          format: int32
          nullable: true
          example: null
        sendContractOn:
          type: string
          format: date-time
          nullable: true
          example: null
        signed:
          type: boolean
          example: false
        statusRegister:
          type: string
          nullable: true
          example: "New"
        statusRegisterId:
          type: integer
          format: int32
          example: "1"
        updatedByUserId:
          type: integer
          format: int32
          nullable: true
          example: null
        updatedOn:
          type: string
          format: date-time
          nullable: true
          example: null
      additionalProperties: false
    AddPartnerCommand:
      required:
      - cpf
      - name
      - supplierId
      - supplierRegistrationId
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        cpf:
          type: string
        name:
          type: string
      additionalProperties: false
    Partner:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        documentId:
          type: integer
          format: int32
          example: 1
        document:
          type: string
          nullable: true
          example: "55555555555555"
        name:
          type: string
          nullable: true
          example: "Jonh Steve"
        contactItems:
          type: array
          items:
            "$ref": "#/components/schemas/ContactItem"
          nullable: true
      additionalProperties: false
    AddPartnerContactItemCommand:
      required:
      - contactTypeId
      - partnerId
      - supplierId
      - supplierRegistrationId
      - value
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        partnerId:
          type: integer
          format: int32
        contactTypeId:
          type: integer
          format: int32
        value:
          type: string
      additionalProperties: false
    UpdatePartnerCommand:
      required:
      - cpf
      - name
      - partnerId
      - supplierId
      - supplierRegistrationId
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        partnerId:
          type: integer
          format: int32
        cpf:
          type: string
        name:
          type: string
      additionalProperties: false
    UpdatePartnerContactItemCommand:
      required:
      - contactId
      - contactTypeId
      - partnerId
      - supplierId
      - supplierRegistrationId
      - value
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        partnerId:
          type: integer
          format: int32
        contactId:
          type: integer
          format: int32
        contactTypeId:
          type: integer
          format: int32
        value:
          type: string
      additionalProperties: false
    AddRegistrationDocumentCommand:
      required:
      - supplierId
      - supplierRegistrationId
      - uploadDocumentTypeId
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        uploadDocumentTypeId:
          type: integer
          format: int32
        notes:
          type: string
          nullable: true
      additionalProperties: false
    UpdateRegistrationDocumentCommand:
      required:
      - supplierId
      - supplierRegistrationId
      - uploadDocumentId
      - uploadDocumentTypeId
      type: object
      properties:
        supplierId:
          type: integer
          format: int32
        supplierRegistrationId:
          type: integer
          format: int32
        uploadDocumentId:
          type: integer
          format: int32
        uploadDocumentTypeId:
          type: integer
          format: int32
        notes:
          type: string
          nullable: true
      additionalProperties: false
    UploadDocumentFile:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: "1"
        fileName:
          type: string
          nullable: true
          example: "picture.jpg"
        originalFileName:
          type: string
          nullable: true
          example: "picture.jpg"
      additionalProperties: false
    UploadDocument:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        uploadDocumentTypeId:
          type: integer
          format: int32
          example: 2
        uploadDocumentType:
          type: string
          nullable: true
          example: "Contract"
        note:
          type: string
          nullable: true
          example: "notes"
        uploadDocumentFiles:
          type: array
          items:
            "$ref": "#/components/schemas/UploadDocumentFile"
          nullable: true
      additionalProperties: false
    UploadDocumentType:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        name:
          type: string
          nullable: true
          example: "Social contract"
      additionalProperties: false
    InvoiceList:
      type: object
      description: Model containing aggregated information about Invoices
      properties:
        id:
          type: integer
          example: "1"
        externalId:
          type: string
          example: "9000-EF-01"
        buyerId:
          type: integer
          example: "1"
        supplierId:
          type: integer
          example: "2"
        issueDate:
          type: string
          format: date-time
          nullable: true
          example: "2020-05-01T08:03:28.000Z"
        dueDate:
          type: string
          format: date-time
          example: "2020-06-01T19:28:48.216Z"
        paymentDate:
          type: string
          format: date-time
          nullable: true
          example: null
        value:
          type: number
          format: double
          nullable: false
          example: "800.50"
        netValue:
          type: number
          format: double
          nullable: false
          example: "789.89"
    Invoice:
      type: object
      description: Model containing information about Invoices
      properties:
        id:
          type: integer
          example: "1"
        externalId:
          type: string
          example: "9000-EF-01"
        buyerId:
          type: integer
          example: "1"
        supplierId:
          type: integer
          example: "2"
        issueDate:
          type: string
          format: date-time
          nullable: true
          example: "2020-05-01T08:03:28.000Z"
        dueDate:
          type: string
          format: date-time
          example: "2020-06-01T19:28:48.216Z"
        daysToDue:
          type: integer
          format: int32
          example: "30"
        paymentDate:
          type: string
          format: date-time
          nullable: true
          example: null
        value:
          type: number
          format: double
          nullable: false
          example: "800.50"
        discount:
          type: number
          format: double
          nullable: false
          example: "10.61"
        netValue:
          type: number
          format: double
          nullable: false
          example: "789.89"
    PaymentOrderList:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: "1"
        externalId:
          type: string
          example: "9000-PF-01"
        buyerId:
          type: integer
          example: "1"
        supplierId:
          type: integer
          example: "2"
        dueDate:
          type: string
          format: date-time
          example: "2020-06-01T19:28:48.216Z"
        paymentDate:
          type: string
          format: date-time
          nullable: true
          example: null
        value:
          type: number
          format: double
          nullable: false
          example: "800.50"
        discount:
          type: number
          format: double
          nullable: false
          example: "10.61"
        interest:
          type: number
          format: double
          nullable: false
          example: "0.0"
        taxes:
          type: number
          format: double
          nullable: false
          example: "0.0"
        netValue:
          type: number
          format: double
          nullable: false
          example: "789.89"
        paymentValue:
          type: number
          format: double
          nullable: true
          example: null
        paymentTypeId:
          type: integer
          format: int32
          example: "1"
        paymentType:
          type: string
          example: "TED"
        barCode:
          type: string
          nullable: true
          example: null
        description:
          type: string
          nullable: true
          example: "Customer's Service"
        status:
          type: string
          nullable: true
          example: "Unpaid"
    FiscalDocumentList:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: "1"
        externalId:
          type: string
          nullable: true
          example: "9000-NF-01"
        number:
          type: string
          nullable: true
          example: "1234"
        seriesNumber:
          type: string
          nullable: true
          example: "1"
        portionNumber:
          type: string
          nullable: true
          example: "1"
        issueDate:
          type: string
          format: date-time
          nullable: true
          example: "2020-05-01T08:03:28.000Z"
        value:
          type: number
          format: double
          example: "800.50"
      additionalProperties: false
    PaymentType:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        name:
          type: string
          nullable: true
          example: "TED"
      additionalProperties: false
    OrderStatusType:
      type: object
      properties:
        id:
          type: integer
          format: int32
          example: 1
        name:
          type: string
          nullable: true
          example: "Unpaid"
      additionalProperties: false
  responses:
    NotFound:
      description: The specified resource was not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/NotFound'
          examples:
            example-1:
              value:
                error:
                  message: 'The item you are looking for, does not exist'
    BadRequest:
      description: Bad Request - Invalid item ID supplied
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/BadRequest'
          examples:
            example-1:
              value:
                error:
                  message: Provided Id is invalid
  securitySchemes:
    bearerAuth:            # arbitrary name for the security scheme
      type: http
      scheme: bearer
      bearerFormat: JWT

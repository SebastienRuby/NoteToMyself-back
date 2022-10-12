//~ MISE EN PLACE DE SWAGGER POUR LA DOC
import swagger from 'swagger-jsdoc';
const swaggerJSDoc = swagger;
import { serve, setup } from 'swagger-ui-express';
import { swaggerDarkCss } from './swagger-utils/swaggerDark.js';



const options = {

    definition: {

        // Les informations principales
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'doc API note_to_my_self', 
            description: `mise en place de la documentation swagger pour l'API REST.`,
            license: {
                name: 'MIT',
            },
        },

        // Les liens extérieurs
        externalDocs: {
            description: 'Find out more about Swagger',
            url: 'http://swagger.io',
        },
      
        // Tous les serveurs
        servers: [
            {
                url: '',
                description: 'Local server',

            },
        ],
       
        // Tous les chemins ( GET / POST / PATCH / DELETE )
        paths: {

            //~ ------------- USERS
            '/signup': {
                post: {
                    tags: ['users'],
                    summary: 'Create a new user',
                    description: 'Create a new user',
                    operationId: 'createUser',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'User created',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/login': {
                post: {
                    tags: ['users'],
                    summary: 'Login a user',
                    description: 'Login a user',
                    operationId: 'loginUser',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'User logged',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/user': {
                patch: {
                    tags: ['users'],
                    summary: 'Update a user',
                    description: 'Update a user',
                    operationId: 'updateUser',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'User updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/user': {
                delete: {
                    tags: ['users'],
                    summary: 'Delete a user',
                    description: 'Delete a user',
                    operationId: 'deleteUser',
                    responses: {
                        '200': {
                            description: 'User deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            // ~------------- RESTAURANTS
            '/restaurants': {
                get: {
                    tags: ['restaurants'],
                    summary: 'Get all restaurants',
                    description: 'Get all restaurants',
                    operationId: 'getRestaurants',
                    responses: {
                        '200': {
                            description: 'Restaurants found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Restaurants',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/restaurant': {
                post: {
                    tags: ['restaurant'],
                    summary: 'Create a new restaurant',
                    description: 'Create a new restaurant',
                    operationId: 'createRestaurant',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Restaurant created',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Restaurant',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/restaurant': {
                patch: {
                    tags: ['restaurant'],
                    summary: 'Update a restaurant',
                    description: 'Update a restaurant',
                    operationId: 'updateRestaurant',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Restaurant updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Restaurant',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/restaurant': {
                delete: {
                    tags: ['restaurant'],
                    summary: 'Delete a restaurant',
                    description: 'Delete a restaurant',
                    operationId: 'deleteRestaurant',
                    responses: {
                        '200': {
                            description: 'Restaurant deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Restaurant',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },
            
            // ~------------- Meals

            '/meals': {
                get: {
                    tags: ['meals'],
                    summary: 'Get all meals',
                    description: 'Get all meals',
                    operationId: 'getMeals',
                    responses: {
                        '200': {
                            description: 'Meals found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Meals',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/meal': {
                post: {
                    tags: ['meal'],
                    summary: 'Create a new meal',
                    description: 'Create a new meal',
                    operationId: 'createMeal',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Meal',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Meal created',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Meal',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },
            
            '/meal': {
                patch: {
                    tags: ['meal'],
                    summary: 'Update a meal',
                    description: 'Update a meal',
                    operationId: 'updateMeal',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Meal',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Meal updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Meal',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/meal': {
                delete: {
                    tags: ['meal'],
                    summary: 'Delete a meal',
                    description: 'Delete a meal',
                    operationId: 'deleteMeal',
                    responses: {
                        '200': {
                            description: 'Meal deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Meal',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            // ~------------- Memento

            '/memento': {
                post : {
                    tags: ['memento'],
                    summary: 'Create a new memento',
                    description: 'Create a new memento',
                    operationId: 'createMemento',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Memento',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Memento created',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Memento',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                        },
                    },
                },
            },

            '/upload': {
                post : {
                    tags: ['upload'],
                    summary: 'Upload a file',
                    description: 'Upload a file',
                    operationId: 'uploadFile',
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        file: {
                                            type: 'string',
                                            format: 'binary',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        username: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                    },
                },
                Users: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/User',
                    },
                },
                Restaurant: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        name: {
                            type: 'string',
                        },
                        slug : {
                            type: 'string',
                        },
                        photo_url: {
                            type: 'string',
                        },
                        location : {
                            type: 'string',
                        },
                        coordinate : {
                            type: 'string',
                        },
                        Comment: {
                            type: 'string',
                        },
                        favorite : {
                            type: 'boolean',
                        },
                        user_id : {
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                },
                Restaurants: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Restaurant',
                    },
                },
                Meal: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        name: {
                            type: 'string',
                        },
                        slug : {
                            type: 'string',
                        },
                        photo_url: {
                            type: 'string',
                        },
                        review : {
                            type: 'string',
                        },
                        favorite : {
                            type: 'boolean',
                        },
                        meal_restaurnat_id : {
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                },
                Meals: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Meal',
                    },
                },
            },
        },
    },
    apis: ['../router/*.js'],
};

const specs = swaggerJSDoc(options);

const cssOptions = {
    customCss :swaggerDarkCss,
    customSiteTitle: "Yumedo"
}

export { specs, serve, setup, cssOptions };
const swaggerJsDoc = require('swagger-jsdoc');

const path = require('path');
// Swagger configuration
const swaggerOptions = {
    definition: { 
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for the Task Manager application',
        },
        servers: [
            {
                url: 'https://taskmanagerapi-xdba.onrender.com/',
                description: 'Production server',
            },
        ],
         
    },
    
    apis: [
        path.join(__dirname, './docs/*.js'),   
        path.join(__dirname, './routes/*.js'), 
      ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = swaggerDocs; 

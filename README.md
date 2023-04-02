# Proyecto 4 - Backend para una clínica dental

Version deploy remote del proyecto 4, para revisar el proyecto en local visitar el repositorio <a href="https://github.com/JoseOliver/proyecto-4-backend-clinica-dental">Proyecto 4: clinica dental database local</a>

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#work-flow">Work-flow</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#desarrollo">Desarrollo</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos con al menos una relación de uno a muchos y una relación de muchos a muchos.

## Sobre el proyecto
Para este proyecto en el bootcamp de GeeksHubs se nos entrega el siguiente enunciado:
"Desde el departamento de producto nos piden crear el backend correspondiente al sistema de gestión de citas para una Clínica Dental.

Para ello el cliente deberá ser capaz de registrarse en la aplicación, hacer login y acceder a su área de cliente. En su área de cliente deberá poder ver una lista de las citas que tiene a futuro, crear citas, modificarlas y anularlas. También existirá una zona de usuario con sus datos personales, que solo podrá ver él mismo. Además, los dentistas deberán poder registrarse como profesionales, hacer
login y ver todas las citas y clientes registrados." 

Se valorará la ejecución técnica, así como el trabajo en equipo. Siendo un equipo de dos miembros ha sido importante la comunicación, el apoyo mutuo, la toma de decisiones consensuadas y por supuesto, el manejo de Git y el repositorio de Github: creación de ramas de trabajo, resolución de conflictos, trabajo individual en local ... 

## Stack
Tecnologías utilizadas:

<div align="center">

<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://www.sequelize.org/">
    <img src= "https://img.shields.io/badge/sequelize-3C76C3?style=for-the-badge&logo=sequelize&logoColor=white"/>
</a>
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white"/>
</a>
<a href=" https://www.postman.com/">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
</a>
<a href=" https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>

<a href="https://www.docker.com/">
    <img src= "https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</a>
 </div>


## Diagrama BD
!['imagen-db'](./img/db.JPG)

## Instalación en local

1. Clonar el repositorio
2. ` npm install ` Instalamos dependencias  
3. ` npm run create ` Preparamos la base de datos para atacarla con la app  
4. ` npm run dev ` Dejamos la app preparada y escuchando las requests

## Workflow
<details>
<summary>Project Workflow</summary>

1. Crear package.json con npm init -y.
2. Crear archivo index.js en la ruta principal. Crear .env y .env.example. Crear .gitignore con /node_modules y .env dentro. Ejecutar comando git init. 
3. Instalar express, nodemon, sequelize, sequelize-cli, mysql2, dotenv, jsonwebtoken y bcrypt. 
4. Sequelize init. Ejecutar sequelize.
5. Crear script "dev": "nodemon index.js", para mantener el servidor ejecutándose.
6. ` $ npm run dev ` comando para ejecutar el servidor. ctrl + c para pararlo.
7. Required express en index.js, y la variable instance app. También asignar PORT a nuestro servidor y usar un método listen para ejecutarlo:
```
const express = require('express');
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));
```
8. Crear models Role, Doctor, User, Service and Appointment en ese orden:
```
npx sequelize-cli model:generate --name Users --attributes name:string,...
``` 
9. Añadir las foreign keys de services, doctors y users en appointments migration js file con sus respectivas relaciones. Hacer lo mismo con las que correspondan en todos los modelos.
```
references: {
          model: "Services",
          key:"id"
        }
```
10. Crear carpetas controllers y view.
En carpeta view crear las Routes.

11. Crear router.js en la ruta principal:
```
const router = require('express').Router();
module.exports = router;
```
12. Route.js conectado al index principal: 
```
const router = require('./router'); 
app.use(router);
```
13. Refactorizar a route:
```
const router = require('express').Router();

router.use('/services', servicesRouter);
router.use('/users', usersRouter)

module.exports = router;
```
14. Refactorizar controllers:
```
const serviceController = {};

serviceController.getServices = (req, res) => {return res.send('Get Services')}
serviceController.createServices = (req, res) => {return res.send('Create Services')}

module.exports = serviceController;
```
15. Crear seeders para Role, User, Doctor, Service, Appointment
```
npx sequelize-cli seed:generate --name User
npx sequelize-cli db:seed:all
```
16. Crear middlewares para controlar el nivel de acceso a la información o a las funcionalidades de la base de datos según roles.
16. Crear endpoints, los cuales describimos a continuación:
</details>

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH  
    - REGISTRO DE USUARIOS  
    Te permite registrar nuevos usuarios  
        POST http://localhost:3000/auth/register/  
        body:
        ``` js
          {
            "name":"Ramón",
            "first_surname":"Folguera",
            "second_surname":"Carbonell",
            "phone": "666666666",
            "address":"Abbey Road 1",
            "email": "ramon@ramon.com",
            "password": "mipassword123"
          }
        ```
    - LOGIN DE USUARIOS  
    Te permite hacer login con tu usuario y tu pass  
        POST http://localhost:3000/auth/login/  
        body:
        ``` js
            {
                "email": "ramon@ramon.com",
                "password": "mipassword123"
            }
        ```
- USER  
    - PERFIL DE USUARIO  
        - AUTENTIFICACIÓN COMO USUARIO  
            Copia el TOKEN generado por el AUTH del LOGIN. Utiliza este USER como ejemplo:
            ``` js
                {
                    "email": "ramon@ramon.com",
                    "password": "mipassword123"
                }
            ```
            En AUTHORIZATION. Type BEARER TOKEN. Pega el TOKEN generado.  
        - AUTENTIFICACIÓN COMO DOCTOR:  
            Copia el TOKEN generado por el AUTH del LOGIN. Utiliza este USER con privilegios de DOCTOR como ejemplo:
            ``` js
                {
                "email":"amparo@amparo.com",
                "password": "456789"
                }
            ```
            En AUTHORIZATION. Type BEARER TOKEN. Pega el TOKEN generado.  
    - CRUD Usuarios  
        - Get  
        GET http://localhost:3000/users/me
        Obtiene tu perfil de usuario
        - Update  
        PUT http://localhost:3000/users/me
        Actualiza tu perfil de usuario pasando los cambios dentro de changes  
        body:
        ``` js
            {
                "changes":{
                    "name": "Francisco",
                    "first_surname": "Martínez"
                    }
            }
        ```
        - Get All (Medic)
        GET  http://localhost:3000/users
        Obtiene todos los usuarios solo si tienes privilegios de Médico
- APPOINTMENT
    - CRUD Citas  
        - Create (User)  
        POST http://localhost:3000/appointments/
        El cliente crea una cita en estado Pendiente de Verificar por el doctor.  
        body:
        ``` js
            {
                "date": "2023-03-01 00:00:00",
                "service_id": 1,
                "doctor_id":1
            }
        ```
        - Update (User)  
        PUT http://localhost:3000/appointments
        El cliente actualiza los datos de la cita y reestablece su verificación a estado pendiente  
        body:
        ``` js
            {
                "id":"7",
                "changes":{
                    "service_id":2
                }
            }
        ```
        - Delete (User)  
        DELETE http://localhost:3000/appointments
        El cliente borra una de sus citas  
        body:
        ``` js
            {
                "id":"7"
            }
        ```
        - Get All mine (User)  
            GET http://localhost:3000/appointments/user
            El cliente revisa los datos de todas sus citas
        - Get All Mine (Medic)  
            GET  http://localhost:3000/appointments/doctor/my
            El doctor revisa los datos de todas sus citas como doctor
        - Get All (Medic)  
            GET  http://localhost:3000/appointments/doctor
            El doctor obtiene todos los datos de todas las citas del sistema
        - Verify (Medic)  
            PUT  http://localhost:3000/appointments/verify
            El doctor verifica una cita, esa cita pasa a estar verificada  
        body:
        ``` js
            {
                "id":5,
                "comments":"must"
            }
        ```
</details>

## Futuras funcionalidades
+ Añadir un rol SuperAdmin que sea el rol del programador con acceso a todo el sistema menos a los datos privados de los pacientes y doctores.
+ Añadir funcionalidades para crear, modificar y eliminar servicios por los doctores.  
+ Añadir funcionalidades para crear, modificar o eliminar roles por el SuperAdmin
+ Especificar que el rol admin será para administración desde recepción con los privilegios necesarios para llevar a cabo su trabajo, como por ejemplo (añadido en el siguiente punto):
+ Añadir funcionalidad para crear, modificar y eliminar doctores.

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

## Licencia
Este proyecto se encuentra bajo licencia de [MIT License](https://github.com/RamonFolguera/rfc-jaoa-geekshubs-fsd-val-project4-05032023/blob/master/LICENSE).

## Webgrafia:
Para conseguir mi objetivo hemos recopilado información de:
- [Sequelize documentation](https://sequelize.org/docs/v6/)

## Desarrollo:

``` js
 const developers = "Ramón" + "Jose";
```  

Proyecto realizado por:

- **Ramón**  
<a href="https://github.com/RamonFolguera" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>

- **Jose**  
<a href="https://github.com/JoseOliver" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
## Contacto
- **Ramón**  
<a href = "mailto:folguera.ramon@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/ram%C3%B3n-folguera-0ab32776/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>

- **Jose**  
<a href = "mailto:olikver_ja@outlook.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/joseoliver1/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>














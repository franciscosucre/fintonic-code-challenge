# fintonic-code-challenge

## Instrucciones

---

### **Prueba técnica:**

Crear una api con Node.js que permita insertar, listar y eliminar productos.

Cada producto tiene:

- identificador único
- nombre(obligatorio)
- descripción

Almacenar los datos en una base de datos mongodb

**Extra**: la acción de insertar y eliminar sólo se debería de poder hacer de manera autenticada(aplicando algún tipo de seguridad)

El entregable debe ser una url a un repositorio de github/gitlab/bitbucket

Se valorará:

- Simplicidad de la solución: se intenta que se dedique a la prueba unas 3 horas como máximo. Se pueden aportar TODOs en un README para indicar que cosas se añadirían y como.
- Ceñirse a lo requerido en el enunciado
- Que la prueba sea coherente con las respuestas aportadas al cuestionario inicial

## Autenticación

---

El usuario debe autenticarse utilizando Json Web Tokens. Esto se logra agregando el header tipo 'authorization' a cualquier request hecho a este API con el formato 'Bearer <token>'. El token es obtenido cuando el usuario inicia sesión.

## Rutas

---

## POST /auth/login

**Necesita Authenticación:** No

**Entrada:**

```json
{
  "email": "user@user.com",
  "password": "userpassword"
}
```

**Salida:**

```json
{
  "user": {
    "email": "user@user.com",
    "updatedAt": "2019-04-15T14:39:52.960Z",
    "createdAt": "2019-04-15T14:39:52.960Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I0OTdiODNjZjg5ZDJkN2ExZTEwNGQiLCJpYXQiOjE1NTUzNDAzMjZ9.YtGf9yKJTsvo1ka5nJeT_t17Xig_k6v2cg40pPF6Qd4"
}
```

## GET /auth/verify

**Necesita Authenticación:** Si

**Salida:**

```json
{
  "user": {
    "email": "user@user.com",
    "updatedAt": "2019-04-15T14:39:52.960Z",
    "createdAt": "2019-04-15T14:39:52.960Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I0OTdiODNjZjg5ZDJkN2ExZTEwNGQiLCJpYXQiOjE1NTUzNDAzNTB9.KbMrR66OtuxtlqDKThkd3WeCV2oejGVMyFCZO-yoU0M"
}
```

## GET /users/

**Necesita Authenticación:** No

**Salida:**

```json
[
  {
    "email": "frank91frank@gmail.com",
    "updatedAt": "2019-04-15T14:06:34.460Z",
    "createdAt": "2019-04-15T14:06:34.460Z"
  },
  {
    "email": "user@user.com",
    "updatedAt": "2019-04-15T14:39:52.960Z",
    "createdAt": "2019-04-15T14:39:52.960Z"
  }
]
```

## POST /users/

**Necesita Authenticación:** Si

**Entrada:**

```json
{
  "email": "user@user.com",
  "password": "userpassword"
}
```

**Salida:**

```json
{
  "email": "user@user.com",
  "updatedAt": "2019-04-15T15:00:41.798Z",
  "createdAt": "2019-04-15T15:00:41.798Z"
}
```

## GET /users/:id

**Necesita Authenticación:** No

**Salida:**

```json
{
  "email": "user@user.com",
  "updatedAt": "2019-04-15T15:00:41.798Z",
  "createdAt": "2019-04-15T15:00:41.798Z"
}
```

## PUT /users/:id

**Necesita Authenticación:** Si

**Entrada:**

```json
{
  "email": "user@user234.com"
}
```

**Salida:**

```json
{
  "email": "user@user.com",
  "updatedAt": "2019-04-15T15:00:41.798Z",
  "createdAt": "2019-04-15T15:00:41.798Z"
}
```

## DELETE /users/:id

**Necesita Authenticación:** Si

**Salida:**

```json
{
  "email": "user@user.com",
  "updatedAt": "2019-04-15T15:00:41.798Z",
  "createdAt": "2019-04-15T15:00:41.798Z"
}
```

## GET /products/

**Necesita Authenticación:** No

**Salida:**

```json
[
  {
    "_id": "5cb49db8f02c753a570c2c92",
    "name": "Pera",
    "description": "Una fruta",
    "createdAt": "2019-04-15T15:05:28.266Z",
    "updatedAt": "2019-04-15T15:05:28.266Z",
    "__v": 0
  }
]
```

## POST /products/

**Necesita Authenticación:** Si

**Entrada:**

```json
{
  "name": "Pera",
  "description": "Una fruta"
}
```

**Salida:**

```json
{
  "_id": "5cb49db8f02c753a570c2c92",
  "name": "Pera",
  "description": "Una fruta",
  "createdAt": "2019-04-15T15:05:28.266Z",
  "updatedAt": "2019-04-15T15:05:28.266Z",
  "__v": 0
}
```

## GET /products/:id

**Necesita Authenticación:** No

**Salida:**

```json
{
  "_id": "5cb49db8f02c753a570c2c92",
  "name": "Pera",
  "description": "Una fruta",
  "createdAt": "2019-04-15T15:05:28.266Z",
  "updatedAt": "2019-04-15T15:05:28.266Z",
  "__v": 0
}
```

## PUT /products/:id

**Necesita Authenticación:** Si

**Entrada:**

```json
{
  "name": "Manzana"
}
```

**Salida:**

```json
{
  "_id": "5cb49db8f02c753a570c2c92",
  "name": "Manzana",
  "description": "Una fruta",
  "createdAt": "2019-04-15T15:05:28.266Z",
  "updatedAt": "2019-04-15T15:05:28.266Z",
  "__v": 0
}
```

## DELETE /products/:id

**Necesita Authenticación:** Si

**Salida:**

```json
{
  "_id": "5cb49db8f02c753a570c2c92",
  "name": "Pera",
  "description": "Una fruta",
  "createdAt": "2019-04-15T15:05:28.266Z",
  "updatedAt": "2019-04-15T15:05:28.266Z",
  "__v": 0
}
```

## Librerias utilizadas

---

Las librerias @sugo fueron desarrolladas por mi, se puede encontrar el código fuente aqui:

- [sugo-server](https://github.com/franciscosucre/sugo-server)
- [sugo-logger](https://github.com/franciscosucre/sugo-logger)
- [sugo-mongodb-queryparams](https://github.com/franciscosucre/sugo-mongodb-queryparams)
- [sugo-cors](https://github.com/franciscosucre/sugo-cors)
- [sugo-body-parser-json](https://github.com/franciscosucre/sugo-body-parser-json)
- [sugo-router](https://github.com/franciscosucre/sugo-router)

Se utlizó [mongoose](https://mongoosejs.com/) para conectarse a la base de datos MongoDB. Se decidió utilizar mongoose ya que cuenta con capacidades para hacer validacion de modelos facilmente sin perder la flexibilidad de MongoDB.

Se utilizó [jsonwebtoken](https://link) para implementar la autenticación.

## Iniciar Api

Con variables de entorno del archivo **.env**

```bash
npm run start-dev
```

Con variables de entorno del sistema

```bash
npm start
```

Con Dockercompose

```bash
docker-compose up
```

## Como correr las pruebas

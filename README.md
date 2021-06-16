<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


# PRUEBA TÉCNICA BACKEND PARA KUBIDE https://www.linkedin.com/in/robertovillares/

## ENUNCIADO

Tu jefe está loco, todos lo sabemos, porque si no, no es lógica la conversación que has tenido esta mañana con él.

Ha llegado con los pelos canosos, largos y revueltos y lo primero que te ha dicho es que tiene una gran idea innovadora: “quiere hacer un muro donde la gente pueda poner frases y que el resto de la gente las pueda ver”. Además de poder “marcar como favoritas las notas/frases” y poder listar las que están marcadas como favoritas.

Y te ha pedido a tí que te encargues de hacer el API del proyecto, es el momento de demostrarle que no eres un gallina!

Te has sentido como Marty Mcfly en Regreso al Futuro, y le has preguntado si conocía Twitter, pero él se ha negado a escucharte y ha seguido con lo suyo, así que te has resignado y has conseguido sacarle un listado de historias de usuario.

Como USUARIO quiero poder llamar al API, es decir, quiero poder tener un servidor local al que hacer una llamada HTTP y que me devuelva algo.
Como USUARIO quiero poder llamar al API para crear notas.
Como USUARIO quiero poder llamar al API para consultar las notas.
Como USUARIO quiero poder llamar al API para consultar una sóla nota.
Como USUARIO quiero poder llamar al API para marcar como favorita una nota.
Como USUARIO quiero poder llamar al API para consultar las notas marcadas como favoritas.

En cuanto a tecnologías, no presta ninguna atención a ese punto, pero sí que te ha pedido que sea con NestJS porque ha oído por ahí que existe ese framework que mola mucho, así que ya sabes que muchas veces es mejor hacer caso a sus “locuras”.

Para comprobar cómo has realizado el trabajo, tu jefe te pide que subas el proyecto a un sistema de control de versiones GIT (puede ser Github u otro) y que vayas haciendo subidas iteradas.

Y, por último, para no quedar mal delante del jefe, te recomendamos que realices pruebas unitarias sobre el proyecto. No es que sea obligatorio, pero ya sabes que siempre es bueno quedar bien con el jefe.

## MI SOLUCIÓN

Como se pide en el enunciado se realiza una aplicación backend sobre el framework **NestJS**. Para la persistencia de datos se usa **mongoDB** a través de su ORM **mongoose**. La aplicación está escrita en **typescript** que es el lenguaje nativo de nestJS.
Se hace testing con **Jest** y **supertest** que ya vienen de serie con nestJS.

### Modelo de datos

* **_id** *objectID* Id autogestionado por mongoose

* **title** *string* Contenido de la nota

* **isFav** *boolean* Marca como favorito una nota

* **date** *Date* Fecha de creación de la nota


### Endpoints

* *GET* **/** ("Hello World" para verificar que el servidor está levantado)

* *GET* **/note** Recibe todas las notas

* *GET* **/note/:id** Recibe la nota con ese id

* *POST* **/note/** Crea una nueva nota

* *GET* **/note/fav** Recibe todas las notas favoritas

* *PATCH* **/note/fav** Intercambia el estado de favorito de una nota de true a false


### Testing

Se hace testing unitario de las funciones de note.service y end2end de los endpoints (app.controller).

### Instalación

* Clonar el repositorio:

```bash
  git clone https://github.com/rovilram/kubide-notes
```

* Instalar dependencias:

```bash
  npm install
```

* Arrancar el servidor API:
```bash
  npm start
```

### Testing

Se hace testing unitario de las funciones de note.service y end2end de los endpoints (app.controller). En ambos casos se hace directamente sobre mongoDB con una base de datos distinta a la de producción.

Para pasar los test:

* Test **end2end**: 
```bash
  npm run test:es2
```

* Test **unitarios**:
```bash
  npm run test
```

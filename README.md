# MISW4103 Semana 7

## Genración de datos
Equipo #3
- Laura Alejandra Carrillo Guzmán, l.carrillog@uniandes.edu.co​​
- Sandra Victoria Hurtado Gil, sv.hurtadog@uniandes.edu.co​​
- Leidy Viviana Osorio Jimenez, l.osorioj@uniandes.edu.co​​
- Tim Ulf Pambor, t.pambor@uniandes.edu.co​​

## Funcionalidades bajo pruebas

[Funcionalidades bajo pruebas](https://github.com/tpambor/MISW4103-E2E/wiki/Funcionalidades-bajo-pruebas)

## Instrucciones para ejecutar pruebas Cypress
1. Clonar este repositorio
2. Ir a la carpeta Cypress
3. Instalar las dependencias con `npm install`
4. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
5. Si Ghost está ubicado en una dirección differente a http://localhost:2368, hay que cambiar el `baseUrl` en `cypress.config.js`
6. Si aun **no** ha creado un sitio en Ghost
    * se puede crear de forma automatizado, ir a punto 8
    * se puede crear de forma manual en http://127.0.0.1:2368/ghost/#/setup/one, ir a punto 7
7. Si ya ha creado un sitio en Ghost, se puede configurar `username` y `password` en `cypress.config.js` con los datos del usuario para ejecutar las pruebas
8. Iniciar Cypress (ubicado en la carpeta cypress):
    * Para Linux, ejecuta `./node_modules/.bin/cypress open` para iniciar Cypress
    * Para Windows, ejecuta `node_modules\.bin\cypress open` para iniciar Cypress
9. Seleccionar `E2E Testing`
10. Seleccionar `Chrome`/`Chromium` y haz clic en `Start E2E Testing in Chromium`
11. Seleccionar el archivo que se desea ejecutar (create-post, create-tag o editar-perfil).
12. Se pueden observar los screenshot en la carpeta "screenshots" que se crea.

## Instrucciones para ejecutar pruebas Kraken
1. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
2. Crear, en Ghost, un usuario (puede ser el usuario administrador) y tener un sitio (puede ser el que se crea por defecto).
2. Clonar este repositorio
3. Ir a la carpeta Kraken
4. Instalar Kraken con el comando `npm install kraken-node`. Se puede ver más información sobre el uso de Kraken en este [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html)
5. Abrir el archivo `properties.json` y actualizar los enlaces, el email y el password correspondientes a la instalación que tiene de Ghost
6. En la carpeta features: **Renombrar el archivo que se desee ejecutar** para que tenga la extensión "feature" (solo un archivo con esta extensión cada vez).
7. Ejecutar las pruebas, estando en la caperta Kraken, con el comando: `node "./node_modules/kraken-node/bin/kraken-node" run`
8. Se pueden observar los screenshot en la carpeta "screenshots" que se crea.

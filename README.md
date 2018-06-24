# easycredit

> plataforma de prestamos

## Build Setup

``` bash
# 1 Descargar la aplicacion
# 2 colocar en una carpeta
# 3 installar las dependecias
    npm install

# 4 ejecutar el spa
npm run dev

# 6 Importar la base de datos easycredit en mysql
# ya sea estando dentro de mysql y usando el archivo o desde comandos
mysql> user easycredit;
mysql> source /home/user/Desktop/easycredit.sql;

mysql -u yourusername -p yourpassword easycredit < easycredit.sql


# 7 ejecutar el server backend
node /src/server.js

# 8 testear :like:


#notas: si tienes contraseña diferente de root,en mysql agregar al archivo src/server.js
```
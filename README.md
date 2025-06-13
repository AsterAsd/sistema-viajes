# SistemaViajes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Estructura de la base de datos

Se utlizó phpMyAdmin para crear las tablas esenciales de la base de datos.

![image](https://github.com/user-attachments/assets/d52a2e5a-f2df-4e24-b5ef-aa4030c7344b)


# Pantalla
Permite registrar nuevos viajes y mustra los viajes registrados. Cuenta con dos restricciones:
- El lugar de origen y el lugar de destino tienen que ser diferentes.
- La fecha hora fin no puede ser menor a la fecha hora inicio.

![image](https://github.com/user-attachments/assets/e9087833-ff13-4470-bee1-ff5cf80fe2a5)

Se obtiene la informacion almacenada sobre los lugares y los operadores por medio de la [api viajes](https://github.com/AsterAsd/ViajesAPI).

Lugares:

![image](https://github.com/user-attachments/assets/d92672b5-5553-472f-8493-1b003b406af9)

Operadores:

![image](https://github.com/user-attachments/assets/fdfcdda5-b8ab-4c43-a6c0-dd2ede5cf238)

Una vez que se registren viajes apareceran en la tabla.

![image](https://github.com/user-attachments/assets/38f939d1-f095-4229-a4d3-d4c224615cb6)

Al editar un viaje se mandaran los datos a los campos y apareceran dos botones de acciones.

![image](https://github.com/user-attachments/assets/ce255e1c-b79a-485e-963f-1b0b2804c586)

Datos actualizados:

![image](https://github.com/user-attachments/assets/7910176a-1b5f-4cbd-9f96-edc4b1c25c74)

## Diseño propuesto para la base de datos

Posibles tablas/catálogos para el proyecto.

![image](https://github.com/user-attachments/assets/44f32819-b7b7-4685-8fd9-2a36d34b634e)



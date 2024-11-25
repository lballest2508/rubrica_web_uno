# React Project

Se requiere por parte de la biblioteca de la universidad de la costa que se desarrolle
una aplicación web que gestione el proceso de préstamo de libros a sus estudiantes,
profesores y funcionarios en general de dicha organización.
El frontend del sistema será desarrollado en REACT y Bootstrap (También puede
trabajar con HTML y CSS).
La parte del backend estará soportada en los servicios de autenticación (Auth),
almacenamiento (firestore).

# Caracteristicas:
* Interfaz de usuario responsive e intuitiva
* Autenticación de usuarios (email y password)
* Rutas protegidas (solo los usuarios registrados pueden buscar libros, hacer
préstamos y devolver libros, solo los usuarios tipo administrador pueden
gestionar libros)
* Módulo admin de gestión de libros (crud de libros – solo para usuarios
administradores)
* Módulo de búsqueda de libros por título
* Módulo de registro de préstamo y devolución de libros.(crud de préstamos)

# Requerimientos:
* La aplicación cuenta con página de inicio (información sobre la biblioteca),
navbar (presente en todo el sitio), el cual cuenta con links a:
> formularios de registro/logueo

> consultas, búsquedas y registro de prestamos y devoluciones (solo para
usuarios logueados).

> link cerrar sesión(disponible una vez el usuario este logueado).

* La aplicación debe contar con formulario de registro/logueo de usuarios (solo
tipo solicitante, Usuario administrador creado directamente sobre BD), utilizar el
servicio de autenticación de firebase (email, contraseña).
* Una vez el usuario inicia sesión, hay una sección del sitio donde se carga una lista
de libros disponibles, aqui encontraran una funcionalidad para consultar (tipo filtro) los
libros disponibles.
* Para registrar préstamos de libros el libro debe estar disponible (maneje 2
estados para la disponibilidad si y no). Una vez un libro es prestado, sale de la lista de
libros disponibles y pasa a una lista de libros prestados por el usuario.
5. El usuario solo puede registrar la devolución de un libro anteriormente prestado
(asegúrese de cambiar el estado para la disponibilidad de no a si, una vez sea devuelto el
libro). Una vez un libro es devuelto, sale de la lista de libros prestados por el usuario y
pasa a la lista de libros disponibles.
6. El modulo administrador constituye un crud para la gestión de los libros en firestore
# rubrica_web_uno

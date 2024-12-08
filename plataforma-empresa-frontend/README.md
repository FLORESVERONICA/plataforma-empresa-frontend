 
# Frontend - Plataforma de Gestión

## Descripción
Este proyecto representa el frontend de una plataforma de gestión empresarial, diseñada para administrar diferentes áreas como **RRHH**, **Producción**, **Logística** y **Calidad**. Cada departamento tiene su propio conjunto de funcionalidades accesibles a través de una interfaz moderna y responsiva.

---

## Características
- **Inicio de sesión y Registro**: Gestión de usuarios a través de componentes dedicados.
- **Navegación estructurada**:
  - **RRHH**: Listado de trabajadores, fichajes, calendario y formularios de gestión.
  - **Producción**: Gestión de personal, producción y puestos de trabajo.
- **Dashboard**: Resumen de las funcionalidades principales.
- **Portal del Empleado**: Espacio personal para cada usuario.
- Arquitectura modular con componentes y contextos reutilizables.

---

## Tecnologías Utilizadas
- **React**: Framework para construir interfaces de usuario.
- **React Router**: Gestión de rutas en la aplicación.
- **Context API**: Manejo de estados globales para autenticación.
- **CSS**: Estilización de los componentes.
- **Axios** (opcional): Para consumir APIs.
- **date-fns** libreria para trabajar con fechas

---

## Estructura del Proyecto
```
src/
├── components/          # Componentes reutilizables
│   ├── AssigRole.jsx
│   ├── LoggedInUser.jsx
│   ├── Login.jsx
│   ├── ProducNavbar.jsx
│   ├── Register.jsx
│   ├── RRHHNavbar.jsx
│   ├── WorkerForm.jsx
│   ├── WorkerList.jsx
│
├── context/             # Contextos globales
│   ├── AuthContext.jsx
│
├── pages/               # Páginas generales
│   ├── Dashboard.jsx
│   ├── PortalEmpleado.jsx
│
├── pages/pagesHome/     # Página de inicio
│   ├── Home.jsx
│
├── pagesProduccion/     # Páginas del módulo Producción
│   ├── GestionPuestos.jsx
│   ├── ListadoPersonal.jsx
│   ├── Personal.jsx
│   ├── Produccion.jsx
│
├── pagesrrhh/           # Páginas del módulo RRHH
│   ├── Calendar.jsx
│   ├── ListadeTrabajadores.jsx
│   ├── RRHH.jsx
│   ├── WorkDetails.jsx
│
├── tempRout/            # Rutas temporales o auxiliares
│   ├── Route.jsx
│
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
```

---

## Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone  https://github.com/FLORESVERONICA/plataforma-empresa-frontend.git
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:  
   Crea un archivo `.env` en la raíz del proyecto y añade:
   ```env
   REACT_APP_URL=https://plataforma-empresa-backend.onrender.com
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```

5. Abre tu navegador en [http://localhost:5000](http://localhost:5173).

---

## Funcionalidades por Carpeta

### `components/`
- **AssigRole.jsx**: Asignación de roles a los usuarios.
- **LoggedInUser.jsx**: Muestra información del usuario conectado.
- **Login.jsx** y **Register.jsx**: Formularios de autenticación.
- **ProducNavbar.jsx** y **RRHHNavbar.jsx**: Barras de navegación específicas para los departamentos.
- **WorkerForm.jsx** y **WorkerList.jsx**: Formulario y listado de trabajadores en RRHH.

### `context/`
- **AuthContext.jsx**: Manejo del estado global de autenticación.

### `pages/`
- **Dashboard.jsx**: Vista principal de acceso a las funcionalidades.(solo para el admi principal)
- **PortalEmpleado.jsx**: Espacio personal de los empleados.(no me dio tiempo a terminarlo la idea es que todos los empleados puedan desde aqui acceder a sus datos, documentos, fichajes, hacer peticiones de dias libres y vacacones y notificar sus ausencias y jutstificarlas adjuntando documentacion)

### `pages/pagesHome/`
- **Home.jsx**: Página inicial con opciones de login y registro.

### `pagesProduccion/`
- **GestionPuestos.jsx**: Gestión de puestos de trabajo en Producción.
- **ListadoPersonal.jsx**: Listado del personal en Producción.
- **Personal.jsx** y **Produccion.jsx**: Vistas generales del departamento.

### `pagesrrhh/`
- **Calendar.jsx**: Calendario para gestionar ausencias y horarios.
- **ListadeTrabajadores.jsx**: Lista completa de los trabajadores.
- **RRHH.jsx**: Vista principal del departamento de RRHH.
- **WorkDetails.jsx**: Detalles del trabajo de un empleado.

### `tempRout/`
- **Route.jsx**: Configuración de rutas temporales o auxiliares.

---

## Contribución
Si deseas contribuir al proyecto:
1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b nombre-rama
   ```
3. Realiza tus cambios.
4. Envía un Pull Request explicando tus contribuciones.

---



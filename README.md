# 📋 Gestor de Ítems

Este proyecto consiste en implementar un gestor de ítems con las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) utilizando JavaScript, HTML y CSS. La aplicación permite gestionar dos tipos de ítems: simples y visuales, y garantizar la persistencia de datos introducidos por el usuario.

## ✅ Requisitos funcionales

### 🖥️ Interfaz de usuario

- Una ventana principal para visualizar el listado de ítems y realizar búsquedas.
- Cada ítem muestra:
  - Una imagen (si está disponible) en tamaño pequeño.
  - El nombre del ítem.
  - Fecha de creación.
  - Fecha de última modificación.
- **Funcionalidades principales**:
  - Visualizar todas las propiedades de un ítem y editarlas.
  - Eliminar un ítem del listado.
  - Filtrar ítems en base al nombre según las siguientes prioridades:
    1. Exacta coincidencia.
    2.  Nombres que comienzan con el texto introducido.
    3. Nombres que contienen el texto introducido.
  - Crear un nuevo ítem en una ventana dedicada.
  - Editar ítems en una ventana similar a la de creación, con los datos precargados.

### 📂 Estructura de datos

- **Ítems simples**: Contienen nombre, descripción, fecha de creación y fecha de última modificación.
- **Ítems visuales**: Además, incluyen la URL de una imagen relacionada.
- Los datos deben ser persistentes, es decir, almacenarse y recuperarse al abrir la aplicación.

### 💾 Persistencia

La aplicación debe guardar automáticamente los cambios realizados (crear, actualizar y eliminar ítems).

---

## 🛠️ Requisitos técnicos

### 🔧 Lógica del programa

1. Mostrar todos los ítems al cargar la aplicación.
2. Implementar operaciones CRUD para ambos tipos de ítems:
   - Crear un ítem con las propiedades correspondientes.
   - Editar ítems, actualizando la fecha de última modificación.
   - Eliminar ítems, reflejando el cambio en la interfaz y en los datos persistentes.
3. Gestionar ítems sin nombres duplicados (nombre como identificador único).

### 🔍 Filtrado del listado

- Ordenar los resultados del filtro según las prioridades indicadas.
- Evitar ítems duplicados o no relevantes al aplicar filtros.

### ⚡ Optimización del DOM

- Aunque se permite regenerar el listado completo en cada operación, se recomienda modificar únicamente los elementos afectados en el DOM.

### 📄 Paginación (opcional)

- Mostrar ítems en bloques de 10 elementos.
- Implementar navegación entre páginas con feedback visual.

---

## 📂 Estructura del proyecto

```
gestor-items/
│
├── index.html         # Archivo principal de la interfaz de usuario
├── css/
│   └── styles.css     # Estilos del proyecto
├── js/
│   ├── main.js        # Punto de entrada del programa
│   ├── classes/
│   │   ├── Item.js    # Clase base para los ítems
│   │   ├── SimpleItem.js  # Clase para ítems simples
│   │   ├── VisualItem.js  # Clase para ítems visuales
│   │   └── Manager.js # Clase principal del programa
│   └── utils.js       # Funciones auxiliares (persistencia, filtros, etc.)
└── data/
    └── items.json     # Archivo para guardar los ítems (persistencia)
```
---

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-repositorio/gestor-items.git
   cd gestor-items
   ```
2. Abrir el archivo index.html en un navegador web.

3. Interactuar con la aplicación:

- Crear nuevos ítems.
- Editar o eliminar ítems existentes.
- Aplicar filtros al listado.
- Navegar entre páginas de ítems (si se implementa la paginación).

## ⚠️ Observaciones importantes
- Uso de JSON: Al guardar y cargar datos como JSON, los métodos de las clases no se conservarán. Para recuperar la funcionalidad, se recomienda reinstanciar los objetos usando los atributos cargados del JSON.
- Actualizaciones dinámicas: Se recomienda usar plantillas para generar elementos HTML y facilitar las modificaciones en el DOM.

## 👥 Contribuciones
El proyecto se realiza en grupos de 2-3 personas.


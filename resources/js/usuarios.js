document.addEventListener('DOMContentLoaded', function() {
    // Simular datos de usuarios
    const users = [
        { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', registrationDate: '2024-01-15' },
        { id: 2, name: 'María López', email: 'maria.lopez@example.com', registrationDate: '2024-02-20' }
    ];

    // Cargar usuarios en la tabla
    function loadUsers() {
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de recargar
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.registrationDate}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#editUserModal">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Rellenar el modal de edición con los datos del usuario
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-edit')) {
            const userId = event.target.getAttribute('data-id');
            const user = users.find(user => user.id == userId);

            document.getElementById('editUserId').value = user.id;
            document.getElementById('editUserName').value = user.name;
            document.getElementById('editUserEmail').value = user.email;
        }

        if (event.target.classList.contains('btn-delete')) {
            userIdToDelete = event.target.getAttribute('data-id');
        }
    });

    // Manejar la edición de usuario
    document.getElementById('editUserForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = document.getElementById('editUserId').value;
        const userName = document.getElementById('editUserName').value;
        const userEmail = document.getElementById('editUserEmail').value;

        // Actualizar el usuario
        const user = users.find(user => user.id == userId);
        if (user) {
            user.name = userName;
            user.email = userEmail;
        }

        $('#editUserModal').modal('hide');
        loadUsers(); // Recargar la tabla
    });

    // Manejar la eliminación de usuario
    let userIdToDelete;
    document.getElementById('confirmDeleteUser').addEventListener('click', function() {
        if (userIdToDelete) {
            const userIndex = users.findIndex(user => user.id == userIdToDelete);
            if (userIndex > -1) {
                users.splice(userIndex, 1);
            }
            $('#deleteUserModal').modal('hide');
            loadUsers(); // Recargar la tabla
        }
    });

    // Cargar usuarios al inicio
    loadUsers();
});

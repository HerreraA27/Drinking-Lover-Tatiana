document.addEventListener('DOMContentLoaded', function() {
    // Simular datos de inventario
    const inventory = [
        { id: 1, name: 'Vino Tinto', category: 'Vinos', stock: 50 },
        { id: 2, name: 'Cerveza Rubia', category: 'Cervezas', stock: 100 }
    ];

    // Cargar inventario en la tabla
    function loadInventory() {
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de recargar
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#editInventoryModal">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#deleteInventoryModal">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Rellenar el modal de edición con los datos del inventario
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-edit')) {
            const itemId = event.target.getAttribute('data-id');
            const item = inventory.find(item => item.id == itemId);

            document.getElementById('editItemId').value = item.id;
            document.getElementById('editItemName').value = item.name;
            document.getElementById('editItemCategory').value = item.category;
            document.getElementById('editItemStock').value = item.stock;
        }

        if (event.target.classList.contains('btn-delete')) {
            itemIdToDelete = event.target.getAttribute('data-id');
        }
    });

    // Manejar la edición de inventario
    document.getElementById('editInventoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const itemId = document.getElementById('editItemId').value;
        const itemName = document.getElementById('editItemName').value;
        const itemCategory = document.getElementById('editItemCategory').value;
        const itemStock = document.getElementById('editItemStock').value;

        // Actualizar el inventario
        const item = inventory.find(item => item.id == itemId);
        if (item) {
            item.name = itemName;
            item.category = itemCategory;
            item.stock = itemStock;
        }

        $('#editInventoryModal').modal('hide');
        loadInventory(); // Recargar la tabla
    });

    // Manejar la eliminación de inventario
    let itemIdToDelete;
    document.getElementById('confirmDeleteInventory').addEventListener('click', function() {
        if (itemIdToDelete) {
            const itemIndex = inventory.findIndex(item => item.id == itemIdToDelete);
            if (itemIndex > -1) {
                inventory.splice(itemIndex, 1);
            }
            $('#deleteInventoryModal').modal('hide');
            loadInventory(); // Recargar la tabla
        }
    });

    // Cargar inventario al inicio
    loadInventory();
});

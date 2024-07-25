document.addEventListener('DOMContentLoaded', function() {
    const inventory = [
        { id: 1, name: 'Producto A', category: 'Categoría 1', quantity: 100, price: 10.00 },
        { id: 2, name: 'Producto B', category: 'Categoría 2', quantity: 50, price: 20.00 }
    ];

    function loadInventory() {
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = '';
        inventory.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#editInventoryModal">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#deleteInventoryModal">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    document.getElementById('editInventoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const productId = document.getElementById('editInventoryId').value;
        const productName = document.getElementById('editProductName').value;
        const productCategory = document.getElementById('editProductCategory').value;
        const productQuantity = document.getElementById('editProductQuantity').value;
        const productPrice = document.getElementById('editProductPrice').value;
        console.log(`Producto ${productId} editado: ${productName}, ${productCategory}, ${productQuantity}, $${productPrice}`);
        $('#editInventoryModal').modal('hide');
    });

    let productIdToDelete;
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            productIdToDelete = this.getAttribute('data-id');
        });
    });

    document.getElementById('confirmDeleteInventory').addEventListener('click', function() {
        console.log(`Producto ${productIdToDelete} eliminado`);
        $('#deleteInventoryModal').modal('hide');
    });

    loadInventory();
});

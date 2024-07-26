document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para los gráficos
    const productCategories = ['Vinos', 'Cervezas', 'Licores', 'Refrescos', 'Jugos'];
    const productCounts = [10, 25, 15, 20, 30];

    // Gráfico de cantidad de productos por categoría
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: productCategories,
            datasets: [{
                label: 'Cantidad de Productos',
                data: productCounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de porcentaje de productos por categoría
    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: productCategories,
            datasets: [{
                label: 'Porcentaje de Productos',
                data: productCounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true
        }
    });
});

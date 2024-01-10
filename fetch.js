document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('crudForm').addEventListener('submit', event => {
        event.preventDefault();
    });
});

async function agregarJugador() {
    try {
        const nombre = document.getElementById('nombre').value;
        const numero = document.getElementById('numero').value;

        const response = await fetch('http://127.0.0.1:3000/api/cr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, numero })
        });
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('output').innerHTML = JSON.stringify(result);
    } catch(e) {
        console.error('Hubo un error', e)
    };
};

async function mostrarJugador() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/re');
        
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('output').innerHTML = JSON.stringify(result);
    } catch (error) {
        console.error('Error al mostrar el jugador:', error.message);
    }
}
async function mostrarJugadorID() {
    try {
        const id = document.getElementById('id').value;
        const response = await fetch(`http://127.0.0.1:3000/api/re/${id}`);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        const result = await response.json();
        document.getElementById('output').innerHTML = JSON.stringify(result);
    } catch(e) {
        console.error('Hubo un error', e)
    };
};

async function actualizarJugador() {
    try {
        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value;
        const numero = document.getElementById('numero').value;    

        const response = await fetch(`http://127.0.0.1:3000/api/up/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ nombre, numero })
        });
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('output').innerHTML = JSON.stringify(result);
    } catch(e) {
        console.error('Hubo un error', e)
    }
};

async function eliminarJugador() {
    try {
        const id = document.getElementById('id').value;
        const response = await fetch(`http://127.0.0.1:3000/api/del/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('output').innerHTML = JSON.stringify(result)
    } catch(e) {
        console.error('Hubo un error', e)
    }
};
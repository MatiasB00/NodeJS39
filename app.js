const express = require("express");
const db = require("./connection");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();
const cors = require("cors");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {title: 'API MySQL', version: '1.0.0'},
    },
    apis: ['./app.js']
};
const SwaggerSpec = swaggerJSDoc(options);

const port = 3000;
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));
app.use(cors());

//CREATE
/**
 * @swagger
 * /api/cr:
 *   post:
 *     summary: Crea un jugador.
 *     description: Crea un jugador en la tabla Jugadores.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del jugador.
 *               numero:
 *                 type: integer
 *                 description: Numero de camiseta del jugador.
 *     responses:
 *       200:
 *         description: Éxito, se creó un nuevo jugador.
 *       500:
 *         description: Error al intentar crear un jugador nuevo.
 */
router.post('/cr', async (req, res)=> {
    const { nombre, numero } = req.body;
    try {
        await db.query('INSERT INTO Jugadores (nombre, numero) VALUE (?, ?)', [nombre, numero])
        res.status(200).json({msg:'Se ha ingresado un nuevo jugador.'});
    } catch(e) {
        res.status(500).json({error:'Hubo un error al ingresar el usuario.', details:e.message})
    };
});

//READ
/**
 * @swagger
 * /api/re/{id}:
 *   get:
 *     summary: Lee la información de un jugador.
 *     description: Lee la información del jugador especificado por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador a leer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, devuelve la información del usuario.
 *       500:
 *         description: Error al intentar obtener la información del usuario.
*/
router.get('/re/:id', async (req, res)=> {  
        const { id } = req.params;
        await db.query('SELECT * FROM Jugadores WHERE id = ?', [id], (err, results) => {
            if (err) {
                res.status(500).json({error:'Hubo un error al traer el jugador especificado.', details:err.message})    
            } else {
                res.status(200).json(results);
            }
        });
});


/**
 * @swagger
 * /api/re:
 *   get:
 *     summary: Muestra la información de todos los jugadores.
 *     description: Muestra la información de todos los jugadores.
 *     responses:
 *       200:
 *         description: Éxito, la información del usuario ha sido actualizada.
 *       500:
 *         description: Error al intentar actualizar la información del usuario.
 */
router.get('/re', async (req, res)=> {
    await db.query('SELECT * FROM Jugadores', (err, results) => {
        if (err) {
            res.status(500).json({error:'Hubo un error al mostrar los jugadores.', details: err.message});
        } else {
            res.status(200).json(results)
        }
    });
});

//UPDATE
/**
 * /api/up/{id}:
 *   put:
 *     summary: Actualiza la información de un jugador por ID
 *     description: Actualiza la información de un jugador específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del jugador.
 *               numero:
 *                 type: integer
 *                 description: Nuevo numero del jugador.
 *     responses:
 *       200:
 *         description: Éxito, la información del jugador ha sido actualizada.
 *       500:
 *         description: Error al intentar actualizar la información del jugador.
 */
router.put('/up/:id', async (req, res)=> {
    const { id } = req.params;
    const { nombre, numero } = req.body;

    await db.query('UPDATE Jugadores SET nombre = ?, numero = ? WHERE id = ?', [nombre, numero, id], (err, results) => {
        if(err) {
            res.status(500).json({error:`No se pudo actualizar el jugador ${id}.`, details:err.message})    
        } else {
            res.status(200).json({msg:`Se ha actualizado el jugador ${id}.`, results});    
        }
    }); 
});

//DELETE
/**
 * @swagger
 * /api/del/{id}:
 *   delete:
 *     summary: Elimina un jugador por ID.
 *     description: Elimina un jugador específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, el jugador ha sido eliminado.
 *       500:
 *         description: Error al intentar eliminar el jugador.
 */
router.delete('/del/:id', async (req,res)=> {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Jugadores WHERE id = ?', [id])
        res.status(200).json({msg:`Se ha eliminado el jugador ${id}.`})
    } catch(e) {
        res.status(500).json({error:`No se pudo eliminar el jugador ${id}.`, details:e.message})
    };     
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}.`)
});

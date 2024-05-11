const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

////////////////////////////////////////////////

const puerto = process.env.PORT || 3001;
const host = process.env.HOST || 'https://localhost';

const user = process.env.USER;
const pass = process.env.PASS;
const database = process.env.DB;

////////////////////////////////////////////////////////////
app.listen(puerto, () => {
	console.log("corriendo en el puerto " + puerto);
	// console.log(process.env.REACT_APP_LOCALHOST + 'y ' + database )  Funciona el .env
});

const db = mysql.createConnection({
	host: 'https://server-beta-five-86.vercel.app/',
	user: user,
	password: pass,
	database: database,
});

app.use(express.json());
app.use(cors());


///////	CREATE	/////////
app.post("/create", (req, res) => {
	const producto = req.body.producto;
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;

	db.query(
		"INSERT INTO `restob`(`producto`, `descripcion`, `precio`) VALUES (?, ?, ?)",
		[producto, descripcion, precio], // Utilizar parámetros de consulta para evitar la inyección de SQL
		(err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error en el servidor"); // Enviar un estado de error si hay un error en la consulta
			} else {
				res.send(result);
			}
		}
	);
});
//////	GET	///////////////
app.get("/productos", (req, res) => {
	db.query("SELECT * FROM restob", (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send("Error en el servidor");
		} else {
			res.send(result);
		}
	});
});
//////////	UPDATE	///////////
app.put("/update", (req, res) => {
	const id = req.body.id;
	const producto = req.body.producto;
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;

	db.query(
		"UPDATE  `restob` SET `producto`=?, `descripcion`=?, `precio`=? WHERE `id`= ?",
		[producto, descripcion, precio, id],

		(err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error en el servidor"); // Enviar un estado de error si hay un error en la consulta
			} else {
				res.send(result);
			}
		}
	);
});
////////////	DELETE	////////////////
app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	const producto = req.body.producto;
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;

	db.query(
		"DELETE FROM `restob`  WHERE `id`= ?",
		[id],

		(err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error en el servidor"); // Enviar un estado de error si hay un error en la consulta
			} else {
				res.send(result);
			}
		}
	);
});


app.get("/", (req, res) => {
	res.send("Conectado y funcionando");
});
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Programacion web fullstack', babel: 'Babel funcionando'});
});

/* Primer Ejercicio */
router.get('/PrimerEjercicio', function(req, res, next) {
  res.send('Bienvenido al curso de programación web fullstack este es el primer ejercicio')
});

/* Segundo Ejercicio */
router.get('/SegundoEjercicio', function(req, res, next) {
  res.status(200).json({ message: 'Es el Segundo ejercicio'})
});

module.exports = router;
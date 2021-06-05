import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// Consultando el modo en el que se esta ejecutando la aplicacion
const env = process.env.NODE_ENV || 'development';

var app = express();

// Se crea la aplicacion en express
if (env === 'development') {
  console.log('> Executing in Development Mode: Webpack Hot Realoding');
  // 1. Agregando la Ruta HMR
  // Reload = true: Habilita la recarga del frontend cuando hay cambios en el codigo
  // Fuente del frontend
  // Timeout = 1000: Tiempo de espera entre la recarga de página
  webpackDevConfig.entry['webpack-hot-middleware/client?reload=true&timeout=1000', webpackDevConfig.entry];

  // 2. Agregamos el plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // 3. Crear el compilador de webpack
  const compiler = webpack(webpackDevConfig);

  // 4. Agregando el middleware a la cadena de middlewares de nuestra aplicación
  app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackDevConfig.output.publicPath
  }));

  // 5. Agregando el Webpack Hot Middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('> Excecuting in Production Mode...');
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/SextoEjercicio', function(req, res, next) {
  console.log('Sexto ejercicio');
  next()
}, function(req, res, next) {
  res.send('Revisar la terminal');
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * The main server file for the React_Node application.
 * @module index
**/
// Express importation
import express, { Express } from "express";
import path from 'path';

// Environnement library need
require('dotenv').config();

// ConfigServer importation
import ServerConfig from "./infrastructure/server/server.config"

// user app components routes


// Color importation
import { CONSOLE_COLORS } from "./shared/constants/console-colors.constants";


// Middleware importation
import CorsMiddleware from "./presentation/middlewares/cors.middleware";


const server: Express = express();

// get port server number from ServerConfig
server.listen(ServerConfig.getApiListenPort(), () => {
  console.warn(CONSOLE_COLORS.magenta, "Server listened on port number ", ServerConfig.getApiListenPort());
  console.warn(CONSOLE_COLORS.bgMagenta, `API NAME -> ${ServerConfig.getName()} - API VERSION -> ${ServerConfig.getVersion()}`);
});

// CORS configuration
try {
  const corsConfig = CorsMiddleware.getCorsConfig();
  const cors = require("cors");
  server.use(cors(corsConfig));
} catch (error: any) {
  console.error("Error during CORS config : ", error.message);
}


import tagRoutes from "./presentation/routes/tag.routes"
import articleRoutes from "./presentation/routes/article.routes"
server.use('', tagRoutes);
server.use('', articleRoutes);

// Define static folders
server.use('/articles', express.static(path.join(__dirname, '../uploads/articles'), {
  maxAge: '7d',
  etag: true
}));

server.get('/', (req, res) => {
	res.send('Asmtariste API public route');
  });
  
  export default server;
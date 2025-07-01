
import express from 'express'
import ejsmate from 'ejs-mate'
import SequelizeSurvey from './database/db.mjs'
import path from 'path'
import { fileURLToPath } from 'url'

/* File Paths */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const __dirpublic = path.join(__dirname, ".." ,"public")
const __dirviews = path.join(__dirname , "views")

/* Controller Imports */
import { Port3000Start } from './controllers/portcontroller.mjs'

/* Routing Imports */
import domainrouter from './routes/domainrouter.mjs'


const app = express();
app.engine('ejs', ejsmate);

/* Application Middleware Mounting */
/*                                 */
app.use(express.static(__dirpublic));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Application Variables */
/*                       */
app.set('view engine', 'ejs');
app.set('views', __dirviews);
app.set('public', __dirpublic);

/* Routes */
/*        */
app.use("/", domainrouter);

app.listen(3000, Port3000Start);
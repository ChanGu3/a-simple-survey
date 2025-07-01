import Sequelize from 'sequelize'
import SurveyRows from './models/surveyrows.mjs';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const __filedb = path.join(__dirname, "survey.db");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: __filedb,
});

/*  Initializes The Tables */
SurveyRows.Initialize(sequelize);

const SequelizeSurvey = {
    sequelize,
    SurveyRows,
}

await sequelize.sync();

export default SequelizeSurvey;
/* File Paths */
import express from 'express'

import domaincontroller from '../controllers/domaincontroller.mjs'
const domainrouter = express.Router();

domainrouter.use((req, res, next) => {
    res.locals.title = "Express + EJS + Tailwind";
    next();
});

domainrouter.post('/', domaincontroller.AttemptAddSurvey);

domainrouter.get('/', domaincontroller.InitRenderSurveyPage);

export default domainrouter;

import SequelizeSurvey from '../database/db.mjs';

async function AttemptAddSurvey(req, res)
{
    const {fullname, major, favorite_fpl, prefer_foip} = req.body;

    try{
        const newRow = await SequelizeSurvey.SurveyRows.create({fullname, major, favorite_fpl, prefer_foip});
        await newRow.save();
        res.status(200).end();
    }
    catch (error) {
        res.status(500).end();
    }
}

async function InitRenderSurveyPage(req, res)
{
    res.locals.title = "Home";
    const surveyList = (await SequelizeSurvey.SurveyRows.findAll()).map((row) => row.toJSON());
    res.render('home.ejs', {surveyList: surveyList});
}

const domaincontroller = {
    AttemptAddSurvey,
    InitRenderSurveyPage
};

export default domaincontroller; 
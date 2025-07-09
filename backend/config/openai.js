const {Configuration,OpenAIApi} = require('openai');
require('dotenv').config();

const configuration = new  Configuration({
    apikey:process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
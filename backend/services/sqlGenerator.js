const openai = require('../config/openai');
const AppError = require('../utils/appError');

const generateSQL = async (naturalLanguageQuery, tables) => {
  try {
    const prompt = `Given the following database schema:\n\n${JSON.stringify(
      tables,
      null,
      2
    )}\n\nGenerate a SQL query to answer this question: "${naturalLanguageQuery}"\n\nOnly return the SQL query, no additional explanation.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const sqlQuery = response.data.choices[0].text.trim();
    return sqlQuery;
  } catch (err) {
    throw new AppError('Failed to generate SQL query: ' + err.message, 500);
  }
};

module.exports = { generateSQL };
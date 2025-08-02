const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const scoresFile = path.resolve(__dirname, 'scores.json');

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  if (!data.name || typeof data.strokes !== 'number') {
    return { statusCode: 400, body: 'Invalid input' };
  }

  let scores = [];
  if (fs.existsSync(scoresFile)) {
    scores = JSON.parse(fs.readFileSync(scoresFile));
  }

  scores.push({ name: data.name, strokes: data.strokes, time: Date.now() });
  fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Score added!' }),
  };
};

const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const scoresFile = path.resolve(__dirname, 'scores.json');

  let scores = [];
  if (fs.existsSync(scoresFile)) {
    scores = JSON.parse(fs.readFileSync(scoresFile));
  }

  scores.sort((a, b) => a.strokes - b.strokes);
  return {
    statusCode: 200,
    body: JSON.stringify(scores.slice(0, 10)),
  };
};

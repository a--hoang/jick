const { HighScore } = require("../../models");

export default async (req, res) => {
  if (req.method === 'POST') {
    const [score, _created] = await HighScore.findOrCreate({
      where: {},
      defaults: {
        total: 0,
      }
    });

    let { id, total } = score;
    total += 1;
    await HighScore.update({ total }, { where: { id } });

    const newScore = await HighScore.findByPk(id);

    res.statusCode = 200;
    return res.json({
      total: newScore.total
    });
  } else if (req.method === 'GET') {
    const scores = await HighScore.findAll();
    if (scores.length === 1) {
      const score = scores[0];
      res.statusCode = 200;
      res.json({
        total: score.total
      });
      return res.end()
    }
  } else {
    res.statusCode = 500;
    return res.end();
  }
}

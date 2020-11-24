//import ScoreModel from '../model/score'
const ScoreModel = require('../model/score')

const scoreRoute = (app) => {
    
    app.route('/score/:id?')
        .get(async (req, res) => {
            try {
                const scores = await ScoreModel.findOne()
                res.send(scores)
                
            } catch (error) {
                res.status(400).send({ error: 'Failed to find score' })
            }
        })
        .post(async (req, res) => {
            console.log(req.body)
            try {
                const score = new ScoreModel(req.body)
                await score.save()

                res.status(201).send('OK')
            } catch (error) {
                res.send(error)   
            }
        })
        .put(async (req, res) => {
            const { id } = req.params
            console.log('req params: s', req.params)
            console.log('req body ', req.body)
            if (!id) {
                return res.status(400).send({ error: 'Score ID is missing.' })
            }

            try {
                const updatedScore = await ScoreModel.findOneAndUpdate({ _id: id }, {"score": req.body}, {
                    new: true,
                });

                console.log('update score api: ',updatedScore)

                if (updatedScore) {
                    return res.status(200).send('ok')
                }

                res.status(400).send({ error: 'Could not update the score' })

                
            } catch (error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'score ID is missing.' })
            }

            try {
                const deletedScore = await ScoreModel.deleteOne({ _id: id })

                if (deletedScore.deletedCount) {
                    return res.send('OK')
                }

                res.status(400).send({ error: 'Could not delete the score' })

            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = scoreRoute
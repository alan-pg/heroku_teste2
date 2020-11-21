import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    name: String,
    score: [{}],    
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

const ScoreModel = Mongoose.model('Score', schema)

export default ScoreModel
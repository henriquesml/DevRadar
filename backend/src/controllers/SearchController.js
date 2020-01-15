const DevSchema = require('../models/DevSchema')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const { techs, latidude, longitude  } = request.query
        
        const techsArray = parseStringAsArray(techs)
        
        const devs = await DevSchema.find({
            techs: {
                $in: techsArray
            }, 
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latidude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return response.json(devs)
    }
}
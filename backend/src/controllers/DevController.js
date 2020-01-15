const axios = require('axios')
const DevSchema = require('../models/DevSchema')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const devs = await DevSchema.find()
        return response.json(devs)
    },
    async store(request, response) {
        const { github_username, techs, latidude, longitude  } = request.body

        let dev = await DevSchema.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const { name = login, avatar_url, bio } = apiResponse.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latidude]
            }
        
            dev = await DevSchema.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
    
        return response.json(dev)
    }
}
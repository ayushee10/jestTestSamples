const service = require('./service')

class controller { }

controller.createUser = async(req, res) => {
    const data = req.body
    try{
        await new service().createUser(data)
        res.status(201).json({
            msg: 'data posted successfully'
        })
    } catch(err) {
        res.status(500).json({
            err: err
        })
    }
}

controller.getUser = async(req, res) => {
    const { id } = req.query
    try {
        const response = await new service().getUser(id);
        res.status(200).send({
            response
        })
    }catch(err) {
        res.status(500).json({
            err: err
        })
    }
}

controller.updateUser = async(req, res) => {
    const data = req.body;
    try{
        await new service().updateUser(data);
        res.status(200).json({
            msg: 'data updated successfully'
        })
    } catch(err) {
        res.status(500).json({
            err: err
        })
    }
}

module.exports = controller

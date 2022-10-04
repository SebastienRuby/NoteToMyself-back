const memento = require('../models/memento');

const controllerMemento = {
    // Method: POST
    // Path: /memento
    // Description: Create a memento
    createMemento: (req, res) => {
        try {
            memento.create(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: PATCH
    // Path: /memento
    // Description: Update a memento
    updateMemento: (req, res) => {
        try {
            memento.update(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method: DELETE
    // Path: /memento
    // Description: Delete a memento
    deleteMemento: (req, res) => {
        try {
            memento.delete(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};



module.exports = controllerMemento;

const { Message } = require('../models');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const method = req.method.toLowerCase();

  const handlers = {
    post(req, res, next) {
      Message.create(data)
        .then(data => {
          res.status(201).send({ message: `message ${data.status}ed`, data });
        })
        .catch(error => next(error));
    },

    get(req, res, next) {
      const query = id ? { where: { id } } : {};
      Message.findOne(query)
        .then(data => {
          return data
            ? res.status(200).send({ message: 'Found', data })
            : res.status(404).send({ message: 'data not Found', data });
        })
        .catch(error => next(error));
    },

    delete(req, res, next) {
      Message.destroy({ where: { id } })
        .then(
          data =>
            data
              ? res.status(200).send({ deleted: true, message: 'Deleted' })
              : res.status(200).send({ deleted: false, message: 'Not deleted' })
        )
        .catch(error => next(error));
    },

    methodNotAllowed(req, res, next) {
      return res.status(405).send({ error: { message: 'Method not allowed' } });
    }
  };

  const handler = handlers[method] || handlers.methodNotAllowed;

  return handler(req, res, next);
};

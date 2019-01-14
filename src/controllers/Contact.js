const { Contact, Message } = require('../models');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const method = req.method.toLowerCase();
  const include =
    req.method === 'GET' && id && req.url.split('/').pop() === 'messages'
      ? [
          { model: Message, as: 'sentMessages' },
          { model: Message, as: 'receivedMessages' }
        ]
      : null;

  const query = include ? { where: { id }, include } : { here: { id } };

  const handlers = {
    post(req, res, next) {
      Contact.create(data)
        .then(data => {
          res
            .status(201)
            .send({ message: `Successfully added ${data.name}`, data });
        })
        .catch(error => next(error));
    },

    get(req, res, next) {
      const Service = id ? Contact.findOne : Contact.findAll;
      return Service.call(Contact, query)
        .then(data => {
          return data
            ? res.status(200).send({ message: 'Found', data })
            : res.status(404).send({ message: 'Contact not Found', data });
        })
        .catch(error => next(error));
    },

    delete(req, res, next) {
      return Contact.destroy(query)
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

exports.contactMessages = (req, res, next) => {};

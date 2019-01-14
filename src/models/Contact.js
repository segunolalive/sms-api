
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          },
          len: {
            args: [2, 65],
            msg: 'name nust be between 2 and 65 characters'
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'This number is registered to an existing Contact'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Number cannot be empty'
          },
          isInt: {
            args: true,
            msg: 'Only valid integers are allowed'
          }
        }
      }
    },
    {}
  );
  Contact.associate = models => {
    // associations can be defined here
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages'
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessages'
    });
  };
  return Contact;
};

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Message cannot be empty'
          }
        }
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['DRAFT', 'SENT'],
        defaultValue: 'DRAFT',
      }
    },
    {}
  );
  Message.associate = models => {
    // associations can be defined here
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};

module.exports = class Models {
    static async Users (Sequelize, sequelize) {
        return sequelize.define("users", {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING(256),
          },
          phone: {
            type: Sequelize.STRING(12),
            is: /^998[389][01345789][0-9]{7}$/,
          },
          isAdmin: {
            type: Sequelize.STRING(),
            isIn: [["user"], ["admin"]],
            defaultValue: "user",
          },
        });
    }
}
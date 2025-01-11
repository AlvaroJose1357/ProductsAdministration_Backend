import { Sequelize } from "sequelize-typescript";
import colors from "colors";
import { POSTGRES_URL } from "./Process";
/* existe diferentes maneras de instanciar sequelize,
  https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
  en este caso se hace pasandole una uri de la siguiente manera*/

const sequelize = new Sequelize(POSTGRES_URL, {
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
  models: [__dirname + "/../models/**/*.ts"],
});

export async function connectBD() {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log(
      colors.cyan.bold("Connection has been established successfully.")
    );
  } catch (error) {
    console.log(
      colors.bgRed.white.bold(`Error connecting to the database: ${error}`)
    );
  }
}

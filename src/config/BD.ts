import { Sequelize } from "sequelize";
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
});

export async function connectBD() {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
}

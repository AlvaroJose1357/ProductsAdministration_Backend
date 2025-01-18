import { exit } from "node:process";
import { sequelize } from "../config/BD";
const clearBD = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database cleared");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};
// lo que es el process.argv es para obtener los argumentos que se le pasan por medio de un script el cual es el que estamos llamando en el package.json
// el process.argv[2] es para obtener el tercer argumento que se le pasa al script
if (process.argv[2] === "--clear") {
  clearBD();
}
// en el package.json se le coloco pretest ya que este comando automaticamente se ejecuta antes de correr los test, tambien existe el posttest que se ejecuta despues de correr los test

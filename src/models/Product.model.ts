import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
})
// para visualizar los diferentes tipos de datos disponibles en sequelize https://sequelize.org/docs/v7/models/data-types/

// en nuestro caso solamente llevara el nombre, price, y disponibilidad
export default class Product extends Model {
  @Column({
    type: DataType.STRING(100), // para el tipo de dato
    allowNull: false, // para que no sea nulo
  })
  name: string;

  @Column({
    type: DataType.FLOAT(7, 2),
    allowNull: false,
  })
  price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  availability: boolean;
}

// export class Product extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   name: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   description: string;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   price: number;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   image: string;

//   @Default(0)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   stock: number;
// }

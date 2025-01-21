import { connectBD, sequelize } from "../BD";

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    // Mockeamos sequelize.authenticate para que simule un error
    jest
      .spyOn(sequelize, "authenticate")
      .mockRejectedValueOnce(
        new Error("Fake Error connecting to the database")
      );
    // Mockeamos console.log para capturar los mensajes
    const consoleSpy = jest.spyOn(console, "log");
    // Ejecutamos la función que estamos probando
    await connectBD();
    // Verificamos que console.log se llamó con el mensaje esperado
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error connecting to the database:")
    );
  });
});

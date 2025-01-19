import { connectBD, sequelize } from "../BD";

jest.mock("../BD");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(sequelize, "authenticate")
      .mockRejectedValueOnce(new Error("Error connecting to the database:"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectBD();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error connecting to the database:")
    );
  });
});

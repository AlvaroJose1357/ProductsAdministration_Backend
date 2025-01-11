import colors from "colors";
import app from "./server";
import { PORT } from "./config/Process";

app.listen(PORT, () => {
  console.log(colors.blue.bold(`Server running on port ${PORT}`));
});

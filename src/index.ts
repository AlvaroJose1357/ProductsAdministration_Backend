import app from "./server";
import { PORT } from "./config/Process";

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

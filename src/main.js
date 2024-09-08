import { logger } from "./application/logging.js";
import { web } from "./application/web.js";
const API = process.env.API_URL;
web.listen(3000, () => {
  logger.info(`Server started on http://${API}:3000`);
});

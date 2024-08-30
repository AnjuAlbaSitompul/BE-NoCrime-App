import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(3000, `192.168.100.32`, () => {
  logger.info("Server started on http://192.168.100.32:3000");
});

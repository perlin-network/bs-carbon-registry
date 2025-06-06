import { AnalyticsAPIModule } from "./analytics-api/analytics.api.module";
import { handler } from "./ledger-replicator/handler";
import { handler as asyncHandler } from "./async-operations-handler/handler";
import { handler as importHandler } from "./data-importer/handler";
import * as setupHandler from "./setup/handler";
import { NationalAPIModule } from "./national-api/national.api.module";
import { buildNestApp } from "./shared/server";
import { join } from "path";
const fs = require("fs");

async function bootstrap() {
  let module;
  let httpPath;

  const modules = process.env.RUN_MODULE.split(",");
  for (const moduleName of modules) {
    console.log("Starting module", moduleName);
    switch (moduleName) {
      case "national-api":
        module = NationalAPIModule;
        httpPath = "national";
        break;
      case "analytics-api":
        module = AnalyticsAPIModule;
        httpPath = "stats";
        break;
      case "replicator":
        await handler();
        console.log("Module initiated", moduleName);
        continue;
      case "async-operations-handler":
        await asyncHandler();
        console.log("Module initiated", moduleName);
        continue;
      case "data-importer":
        await importHandler({ importTypes: "ITMO_SYSTEM" });
        console.log("Module initiated", moduleName);
        continue;
      default:
        module = NationalAPIModule;
        httpPath = "national";
    }

    const app = await buildNestApp(module, "/" + httpPath, process.env.STAGE);
    if (moduleName == "national-api") {

      if (fs.existsSync('organisations.csv') && fs.lstatSync('organisations.csv').isFile()) {
        const orgs = await fs.readFileSync("organisations.csv", "utf8");
        console.log("Inserting orgs", orgs);
        await setupHandler.handler({ type: "IMPORT_ORG", body: orgs });
      }
      
      if (fs.existsSync('users.csv') && fs.lstatSync('users.csv').isFile()) {
        const users = await fs.readFileSync("users.csv", "utf8");
        console.log("Inserting users", users);
        await setupHandler.handler({ type: "IMPORT_USERS", body: users });
      }

      const staticPath = join(__dirname, "..", "public");
      console.log("Static file path:", staticPath);
      app.useStaticAssets(staticPath);
      await setupHandler.handler();
    }
    await app.listen(process.env.RUN_PORT || 3000);
    console.log("Module initiated", moduleName);
  }
  // global.baseUrl = await app.getUrl();
}
bootstrap();

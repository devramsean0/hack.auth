import express from "express";
import handlebars from "express-handlebars";
import "dotenv/config";
import session from "express-session";
import createRouter from "express-file-routing";
import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import SlackBolt from "@slack/bolt";
// Express.js Shenanigans
const app = express();
const port = Number(process.env.PORT) || 3000;
console.log("Hello World! 1");
app.use(express.json());
// Configure sessions
app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		resave: false,
		saveUninitialized: true,
		cookie: { secure: "auto" },
	}),
);
// Configure rendering engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${process.cwd()}/views`);
app.use(express.static(`${process.cwd()}/public`));
console.log("Hello World! 1.75");
(async () => {
	await createRouter(app, {
		directory: `${process.cwd()}/dist/routes/`,
	});
	console.log("Loaded Routes");
})();
// Connect to DB
const prismaClient = new PrismaClient();
// Extend to add encryption
export const db = prismaClient.$extends(fieldEncryptionExtension());

// Slack Bot shenangians
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_SOCKET_MODE = process.env.NODE_ENV === "development" || true;
const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;
if (!SLACK_BOT_TOKEN) {
	throw new Error("No SLACK_BOT_TOKEN provided");
}
if (!SLACK_SIGNING_SECRET) {
	throw new Error("No SLACK_SIGNING_SECRET provided");
}
if (!SLACK_APP_TOKEN) {
	throw new Error("No SLACK_APP_TOKEN provided");
}
const bot = new SlackBolt.App({
	token: SLACK_BOT_TOKEN,
	signingSecret: SLACK_SIGNING_SECRET,
	socketMode: SLACK_SOCKET_MODE,
	appToken: SLACK_APP_TOKEN,
});

await db.$connect();
console.log("Connected to DB");

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

await bot.start();
console.log("Bot ready!");

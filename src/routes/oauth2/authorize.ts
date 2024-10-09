import { db } from "../../index.js";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import { slackGenAuthEndpoint } from "../../lib/slackOauth.js";

export const get = async (req: Request, res: Response) => {
	if (!(req.session as any).session_id) {
		// No session ID, so we need to completely reauth
		const sessionDB = await db.session.create({
			data: {
				cookie: nanoid(),
				user_agent: String(req.headers["User-Agent"] || ""),
				ip: String(Array(req.headers["x-forwarded-for"] || "")),
			},
		});
		(req.session as any).session_id = sessionDB.cookie;
		res.redirect(slackGenAuthEndpoint((req.query as any).client_id));
	}
};

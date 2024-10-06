import { db } from "../../index.js";
import { nanoid } from "nanoid";

export const get = async (req: Request, res: Response) => {
	if (!req.session.session_id) {
		// No session ID, so we need to completely reauth
		const sessionDB = await db.session.create({
			data: {
				cookie: nanoid(),
				user_agent: String(req.headers.get("User-Agent")),
				ip: String(Array(req.headers.get("x-forwarded-for"))[0]),
			},
		});
		req.session.session_id = sessionDB.cookie;
	}
};

// Helper functions for Slack Oauth
export function slackGenAuthEndpoint() {
	// Grab client id, and redirect URL
	const client_id = process.env.SLACK_CLIENT_ID;
	const redirect_uri = process.env.SLACK_REDIRECT_URI;
	if (typeof client_id !== "string") {
		throw new SlackOauthError("SLACK_CLIENT_ID must be a string");
	}
	if (typeof redirect_uri !== "string") {
		throw new SlackOauthError("SLACK_REDIRECT_URI must be a string");
	}
	const scopes = "users:read,users:read.email"; // Request scopes needed to grab email
	return `https://slack.com/oauth/v2/authorize?client_id=${client_id}&user_scopes=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
}

class SlackOauthError extends Error {}

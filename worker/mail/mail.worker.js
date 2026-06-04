import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env"), // this thing is literally configuring the dotenv
}); // by telling it where to look for the .env file in the project

const resend = new Resend(process.env.RESEND_API_KEY);

async function mailHandler(from, to, subject, text) {
    try {
        const output = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            text: text,
        });
        console.log(output);
    } catch (err) {
        console.log(err);
    }
}

export { mailHandler };

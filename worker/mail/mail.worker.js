import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function mailHandler(from, to, subject, text) {
    try {
        return await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            text: text,
        });
    } catch (err) {
        return err;
    }
}

export { mailHandler };

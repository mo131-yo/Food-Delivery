import { Resend } from "resend";
import { configDotenv } from "dotenv";

configDotenv();


const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyUserEmail = async (receiver: string, verifyLink: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiver,
      subject: "Burtgel batalgaajlaa",
      html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center;">
              <h2>Welcome</h2>
              <p>Odoo ter Tom nogoon deer darj Email ee batalgaajuulna uu!</p>
              <a href="${verifyLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                Mail batalgaajuulah
              </a>
            </div>
          `,
    });

    if (error) {
      console.error("Signup Email Error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected Signup Email Error:", err);
    return { success: false, err };
  }
};

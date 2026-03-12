import { configDotenv } from "dotenv";
import { Resend } from "resend";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const ResetPasswordVerificationEmail = async (receiver: string, resetLink: string) => {
  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiver,
      subject: "Нууц үг сэргээх хүсэлт",
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 40px; background-color: #f9f9f9;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Нууц үг сэргээх</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">Та доорх товчлуур дээр дарж нууц үгээ шинэчилнэ үү. Энэхүү холбоос 15 минутын дараа хүчингүй болно.</p>
          
          <div style="margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">
               Reset Password
            </a>
          </div>
          
          <p style="color: #888; font-size: 13px; margin-top: 30px;">
            Хэрэв та энэ хүсэлтийг гаргаагүй бол энэ и-мэйлийг үл тоомсорлож болно.
          </p>
        </div>
      </div>
      `,
    });
    console.log("Email sent successfully:", data?.id);
    return { success: true, data };

  } catch (error) {
    console.error("Unexpected Email Error:", error);
    return { success: false, error };
  }
};

// export const ResetPasswordVerificationEmail = async (
//   reciever: string,
//   otpCode: string
// ) => {
//   try {
//     const { data } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: reciever,
//       subject: "Nuuts ug batalgaajuulah code",
//       html: `
//       <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f7f6;">
//         <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 15px;">
//           <h2 style="color: #333;">Nuuts ug sergeeh</h2>
//           <p>Batalgaajuulah code</p>
//           <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; padding: 20px; border: 2px dashed #007bff; display: inline-block;">
//             ${otpCode}
//           </div>
//           <p style="color: #888; margin-top: 20px;">Ene code 10 min-iin daraa huchingui bolno</p>
//         </div>
//       </div>
//       `,
//     });
//     console.log("Email sent successfully:", data?.id);
//     return { success: true, data };

//   } catch (error) {
//     console.error("Unexpected Email Error:", error);
//     return { success: false, error };
//   }
// };
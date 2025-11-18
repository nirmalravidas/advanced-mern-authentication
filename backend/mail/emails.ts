import {client, sender} from "./mailtrap"
import {
  generatePasswordResetEmail,
  generatePasswordResetSuccessEmail,
  generateVerificationCodeEmail,
  generateWelcomeEmail,
} from "./emailTemplate";

export const sendVerificationCodeEmail = async (email: string, verificationToken: string) => {
  const recipient = [{email}];
  const htmlContent = generateVerificationCodeEmail(verificationToken);
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "verify your email.",
      html: htmlContent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification email.");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{email}];
  const htmlContent = generateWelcomeEmail(name);

  try {
      await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome",
      html: htmlContent,
    });

  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email.");
  }
};

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  const recipient = [{email}];
  const htmlContent = generatePasswordResetEmail(resetUrl);
  try {
      await client.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: htmlContent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send password reset email");
  }
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const recipient = [{email}];
  const htmlContent = generatePasswordResetSuccessEmail();
  try {
      await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully.",
      html: htmlContent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset successful email");
  }
};

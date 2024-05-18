import nodemailer from 'nodemailer';
import env from 'config/env';

interface SendAssignmentEmailParams {
  to: string;
  assigneeName: string;
  assigningUserName: string;
  reporterName: string;
  issue: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    type: string;
  };
}

export const sendAssignmentEmail = async ({
  to,
  assigneeName,
  assigningUserName,
  reporterName,
  issue,
}: SendAssignmentEmailParams) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.email_user,
        pass: env.email_pass,
      },
    });
  console.log("Mail From:",env.email_user);
  console.log("Mail To:",to);
  console.log("Text:",assigneeName);
  console.log("Assigne Name:",assigningUserName);
  console.log("Title:",issue.title);
  console.log("Description:",issue.description);
  console.log("Priority:",issue.priority);
  console.log("Status:",issue.status);
  console.log("Type:",issue.type);
  console.log("Reporter:",reporterName);
    const mailOptions = {
      from: env.email_user,
    to,
    subject: 'New Issue Assigned to You',
    text: `Hello ${assigneeName},

You have been assigned a new issue by ${assigningUserName}. Here are the details:

Title: ${issue.title}
Description: ${issue.description}
Priority: ${issue.priority}
Status: ${issue.status}
Type: ${issue.type}
Reporter: ${reporterName}

Please check the issue tracker for more details.

Best Regards,
Your Project Management Team`,
  };
  
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

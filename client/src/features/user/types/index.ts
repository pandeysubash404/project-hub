export type WelcomeFormValues = {
 // organization: '65d5739d9d227d23df09ed6e';
  organization: string;
  position: string;
  role: 'admin' | 'project manager' | 'member';
  name: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};

export default interface IOtpCache {
  userId: number;
  user: { email: string; phone: string };
  code: string;
  eat: number; // milliseconds
}

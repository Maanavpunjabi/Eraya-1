// This is the only file that should export GET/POST for NextAuth
import { handlers } from '@/app/auth'  // points to your src/auth.ts

export const { GET, POST } = handlers
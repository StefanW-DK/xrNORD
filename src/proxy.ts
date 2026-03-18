import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude static assets — updated path matches new /assets/ folder structure
  matcher: ["/((?!api|_next|_vercel|images|assets|.*\\..*).*)"],
};

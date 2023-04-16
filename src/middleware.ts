// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/session";


// se middleware vérifie si l'utilisateur est connecté et si il est admin pour lui permettre d'accéder aux pages admin
// se middleware est appelé avant chaque page admin (/admin/*)
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  console.log("from middleware", { user });

  // demo:
  if (user?.isAdmin !== true) {
    // unauthorized to see pages inside admin/*
    return NextResponse.redirect(new URL('/errors/unauthorized', req.url)) // redirect to /unauthorized page
  }

  return res;
};

export const config = {
	matcher: "/admin/:path*",
}; 
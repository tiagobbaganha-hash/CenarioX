import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Revalidation webhook endpoint. Use POST with x-strapi-secret header.",
    webhookConfigured: !!process.env.STRAPI_WEBHOOK_SECRET,
  });
}

export async function POST(req: Request) {
  const secret = req.headers.get("x-strapi-secret");

  if (!process.env.STRAPI_WEBHOOK_SECRET || secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const paths = Array.isArray(body?.paths) && body.paths.length > 0
    ? body.paths
    : ["/", "/markets", "/whats-new"];

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}

import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export default async function Page({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
}) {
  const shortUrl = (await params).shortUrl;

  const client = await clientPromise;
  const db = client.db("shortify");
  const collection = db.collection("url");

  const doc = await collection.findOne({
    alias: shortUrl,
  });
  if (doc) {
    redirect(doc.longUrl);
  }
  else {
    redirect(`${process.env.NEXXT_PUBLIC_HOST}`)
  }

  return {shortUrl};
}

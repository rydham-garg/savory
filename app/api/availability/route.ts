import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { dateKeyToUtc } from "../../../lib/slots";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = Number(searchParams.get("guests") || 1);
  if (!date || !time || !Number.isFinite(guests)) return NextResponse.json({error:"Missing parameters"},{status:400});

  const day = dateKeyToUtc(date);
  const bookings = await prisma.booking.findMany({
    where: { date: day, time, status: { in:["PENDING","CONFIRMED"] } },
    select: { tableId:true }
  });
  const booked = new Set(bookings.map(b=>b.tableId));
  const tables = await prisma.table.findMany({
    where: { active:true, capacity:{gte:guests}, id:{notIn:[...booked]} },
    orderBy: [{capacity:"asc"},{name:"asc"}],
    select: {id:true,name:true,capacity:true}
  });
  return NextResponse.json({tables});
}
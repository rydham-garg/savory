import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { dateKeyToUtc } from "../../../lib/slots";
import { z } from "zod";

const schema = z.object({
  name:z.string().min(2), email:z.email(), phone:z.string().min(7),
  guests:z.number().int().min(1).max(20), date:z.string(), time:z.string(), tableId:z.string().min(1)
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({error:"Please provide valid booking details."},{status:400});
  const x = parsed.data;
  const date = dateKeyToUtc(x.date);

  const table = await prisma.table.findFirst({where:{id:x.tableId,active:true}});
  if (!table || table.capacity < x.guests) return NextResponse.json({error:"Selected table is no longer available."},{status:409});

  // Transaction + serializable isolation prevents two simultaneous requests
  // from successfully claiming the same table/time slot.
  try {
    const booking = await prisma.$transaction(async tx => {
      const existing = await tx.booking.findFirst({
        where:{tableId:x.tableId,date,time:x.time,status:{in:["PENDING","CONFIRMED"]}}
      });
      if (existing) throw new Error("SLOT_TAKEN");
      return tx.booking.create({
        data:{name:x.name,email:x.email,phone:x.phone,guests:x.guests,date,time:x.time,tableId:x.tableId}
      });
    }, { isolationLevel:"Serializable" });
    return NextResponse.json({booking:{id:booking.id}});
  } catch (e:any) {
    if (e.message === "SLOT_TAKEN") return NextResponse.json({error:"That table was just booked by someone else. Please choose another table."},{status:409});
    return NextResponse.json({error:"Could not create booking."},{status:500});
  }
}
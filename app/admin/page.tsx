import { prisma } from "../../lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const bookings = await prisma.booking.findMany({
    orderBy:{date:"asc"},
    take:50,
    include:{table:true}
  });
  const tables = await prisma.table.findMany({orderBy:{name:"asc"}});
  return <main className="container" style={{padding:"45px 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:25}}>
      <div><div style={{color:"#b88a2b",textTransform:"uppercase",letterSpacing:2,fontSize:12}}>Restaurant Admin</div><h1 style={{fontFamily:"Georgia,serif",fontSize:40,margin:"8px 0"}}>Dashboard</h1></div>
      <Link className="btn secondary" href="/booking">Customer View</Link>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:25}}>
      <div className="card" style={{padding:20}}><div style={{color:"#777"}}>Total bookings</div><b style={{fontSize:30}}>{bookings.length}</b></div>
      <div className="card" style={{padding:20}}><div style={{color:"#777"}}>Tables</div><b style={{fontSize:30}}>{tables.length}</b></div>
      <div className="card" style={{padding:20}}><div style={{color:"#777"}}>Active tables</div><b style={{fontSize:30}}>{tables.filter(t=>t.active).length}</b></div>
    </div>
    <div className="card" style={{padding:20,overflowX:"auto"}}>
      <h2 style={{fontFamily:"Georgia,serif"}}>Reservations</h2>
      <table style={{width:"100%",borderCollapse:"collapse",marginTop:12}}>
        <thead><tr>{["Date","Time","Guest","Guests","Table","Status"].map(h=><th key={h} style={{textAlign:"left",padding:10,borderBottom:"1px solid #eee"}}>{h}</th>)}</tr></thead>
        <tbody>{bookings.map(b=><tr key={b.id}>{[
          b.date.toISOString().slice(0,10),b.time,b.name,b.guests,b.table.name,b.status
        ].map((v,i)=><td key={i} style={{padding:10,borderBottom:"1px solid #f1eee8"}}>{v}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </main>;
}
"use client";
import { useEffect, useMemo, useState } from "react";
import { SLOT_TIMES } from "../lib/slots";

type Table = { id:string; name:string; capacity:number };

export default function BookingForm() {
  const [date,setDate] = useState("");
  const [guests,setGuests] = useState(2);
  const [time,setTime] = useState(SLOT_TIMES[0]);
  const [tables,setTables] = useState<Table[]>([]);
  const [tableId,setTableId] = useState("");
  const [form,setForm] = useState({name:"",email:"",phone:""});
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().slice(0,10), []);

  useEffect(() => {
    if (!date || !time) return;
    fetch(`/api/availability?date=${date}&time=${encodeURIComponent(time)}&guests=${guests}`)
      .then(r => r.json()).then(d => { setTables(d.tables || []); setTableId(""); });
  }, [date,time,guests]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setMessage(""); setLoading(true);
    try {
      const r = await fetch("/api/bookings", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,date,time,guests,tableId})});
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not create booking.");
      setMessage(`Booking confirmed. Your booking ID is ${d.booking.id}.`);
      setForm({name:"",email:"",phone:""});
      setTableId("");
    } catch(e:any) { setMessage(e.message); }
    finally { setLoading(false); }
  }

  return <form className="card" onSubmit={submit} style={{padding:28}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <label>Date<input className="field" type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)} required/></label>
      <label>Guests<select className="field" value={guests} onChange={e=>setGuests(Number(e.target.value))}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n}</option>)}</select></label>
    </div>
    <label style={{display:"block",marginTop:16}}>Time Slot<select className="field" value={time} onChange={e=>setTime(e.target.value)}>{SLOT_TIMES.map(s=><option key={s}>{s}</option>)}</select></label>
    <div style={{marginTop:20}}>
      <b>Available Tables</b>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginTop:10}}>
        {tables.length ? tables.map(t=>
          <button type="button" key={t.id} onClick={()=>setTableId(t.id)} style={{padding:14,borderRadius:10,border:tableId===t.id?"2px solid #b88a2b":"1px solid #ddd",background:tableId===t.id?"#fbf3df":"white",cursor:"pointer"}}>
            <b>{t.name}</b><div style={{fontSize:12,color:"#777"}}>{t.capacity} seats</div>
          </button>
        ) : <div style={{color:"#777",gridColumn:"1/-1"}}>{date ? "No suitable tables are available for this slot." : "Select a date to see availability."}</div>}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:22}}>
      <label>Name<input className="field" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label>
      <label>Phone<input className="field" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></label>
    </div>
    <label style={{display:"block",marginTop:16}}>Email<input className="field" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label>
    <button className="btn" disabled={!tableId || loading} style={{width:"100%",marginTop:24,opacity:(!tableId||loading)?.55:1}}>{loading ? "Booking..." : "Confirm Booking"}</button>
    {message && <div style={{marginTop:16,padding:14,borderRadius:10,background:"#f5f1e8"}}>{message}</div>}
  </form>;
}
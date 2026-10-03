import BookingForm from "../../components/BookingForm";

export default function BookingPage() {
  return (
    <main className="container" style={{padding:"55px 0"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:30}}>
          <div style={{color:"#b88a2b",letterSpacing:2,textTransform:"uppercase",fontSize:12}}>Reservations</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:44,margin:"10px 0"}}>Reserve Your Table</h1>
          <p style={{color:"#6d655b"}}>Choose your date, time, guests, and available table.</p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div style={{maxWidth:650}}>
            <div style={{letterSpacing:3,textTransform:"uppercase",fontSize:13}}>Welcome to Savory</div>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(48px,7vw,82px)",lineHeight:.98,margin:"18px 0"}}>Good Food.<br/>Great Moments.</h1>
            <p style={{fontSize:19,lineHeight:1.7,color:"#eee"}}>A warm dining experience crafted around fresh ingredients, thoughtful cooking, and memorable evenings.</p>
            <Link className="btn" href="/booking" style={{marginTop:18}}>Reserve a Table</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{padding:"70px 0"}}>
        <div style={{textAlign:"center",maxWidth:650,margin:"0 auto 40px"}}>
          <div style={{color:"#b88a2b",letterSpacing:2,textTransform:"uppercase",fontSize:12}}>Our Promise</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:40,margin:"10px 0"}}>Dinner worth remembering</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
          {["Fresh ingredients","Cozy ambience","Thoughtful service","Perfect for groups"].map(x =>
            <div className="card" key={x} style={{padding:26}}><h3 style={{fontFamily:"Georgia,serif"}}>{x}</h3><p style={{color:"#6d655b",lineHeight:1.6}}>Designed to make every visit feel special.</p></div>
          )}
        </div>
      </section>
    </main>
  );
}
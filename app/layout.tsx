import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Savory — Restaurant",
  description: "Restaurant reservations and dining.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header style={{background:"#fff", borderBottom:"1px solid #eee"}}>
        <div className="container" style={{height:72,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Link href="/" style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700}}>🍴 Savory</Link>
          <nav style={{display:"flex",gap:22,alignItems:"center"}}>
            <Link href="/">Home</Link>
            <Link href="/booking">Book a Table</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer style={{padding:"45px 0",marginTop:60,background:"#201c17",color:"#eee"}}>
        <div className="container" style={{display:"flex",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
          <div><b style={{fontFamily:"Georgia,serif",fontSize:22}}>Savory</b><div style={{marginTop:8,color:"#bbb"}}>Good food. Great moments.</div></div>
          <div style={{color:"#aaa"}}>© 2026 Savory Restaurant</div>
        </div>
      </footer>
    </>
  );
}
"use client"
import { withAuth } from "@/hoc/withAuth";

 const Home = () =>{
  return (
    <main >
      <div >
        <p>Welcome to home page</p>
      </div>
    </main>
  );
}
export default withAuth(Home)

import React from 'react';
import SinglePerson from "./components/SinglePerson";
function App() {
  return (
   <main>

     <section className={"container"}>
       <div className={"title"}>
         <h2>
           Person
         </h2>
         <div className={"underline"}></div>
       </div>

         <SinglePerson />
     </section>

   </main>
  );
}

export default App;

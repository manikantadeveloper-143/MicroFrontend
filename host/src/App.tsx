import React,{Suspense} from 'react';

const Header = React.lazy(() => import("headerApp/Header"));
console.log("Header:", Header);

// const FooterComponent = React.lazy(() => import('FooterComponent/FooterComponent'));
// console.log("Footer:", FooterComponent);


const App = () => {
  return (
    <div>
    <Suspense fallback={<div>Loading Header...</div>}>
      <Header/>
    </Suspense>

    {/* <Suspense fallback={<div>Loading Header...</div>}>
      <FooterComponent/>
    </Suspense> */}


    </div>
  )
}

export default App

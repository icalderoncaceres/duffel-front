import {useState,useEffect} from 'react';

const ButtonScroll = () => {
    const [showButtonScroll, setShowButtonScroll] = useState(false);

    useEffect (()=>{
        window.addEventListener( "scroll", ()=>{
            if(window.scrollY > 200) {
                setShowButtonScroll(true);
            } else {
                setShowButtonScroll(false);
            }
        })
    },[]);

    const scrollTo =  () => {
        window.scroll({top: 0, behavior: "smooth"});
    };

  return (
    <>
    {showButtonScroll && <i className="top-btn-position bi bi-arrow-up-circle " onClick={scrollTo}></i>}
    </>
  )
}

export default ButtonScroll;
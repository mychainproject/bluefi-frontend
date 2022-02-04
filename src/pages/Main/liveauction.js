import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import AnimatedNumber from "react-animated-number";

function LiveAuction() {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");    script.async = true;    script.src = "./purecounter.js";    document.getElementById('pureArea').appendChild(script); 
  },[])
  useEffect(() => {
    getNFTLists();
  }, []);
  const getNFTLists = async () => {
    try {
      setLoading(true);
      let res = firestore.collection("nfts");
      res = res.where("saleType", "==", "auction");
      res = res.limit(4);
      const nfts = await res.get();
      let nfts_list = [];
      for (let i = 0; i < nfts.docs.length; i++) {
        const x = nfts.docs[i];
        const temp = x?.data();
        if (temp?.tokenURI)
          fetch(temp.tokenURI)
            .then((res) => res.json())
            .then((result) => {
              const ite = { id: x.id, ...temp, ...result };
              nfts_list.push(ite);
            });
      }
      setTimeout(() => {
        setNfts(nfts_list);
      }, 1000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Spinner play={play || playNFT} /> */}
      <div id="pureArea"></div>
      <p className="nft-text-center nft-font-36 text-white nft-mt-100 mb-50">
        Stats
      </p>
      <p className="nft-text-center nft-font-18 text-white statsArea row">
        <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4'>
          <h3 style={{fontWeight: 300}}>
            <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter stats-no"></span>K
          </h3>
          <h5 style={{fontWeight: 400}} className="animatedComment">Daily Sales</h5>
        </div>
        <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4'>
          <h3 style={{fontWeight: 300}}>
          <AnimatedNumber
          className=" stats-no"
          value={100}
          style={{
            fontWeight: 300
          }}
          duration={2000}
          formatValue={(n) => n.toFixed(1)}
          frameStyle={(percentage) =>
            percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
          }/>M</h3>
          <h5 style={{fontWeight: 400}} className="animatedComment">Total Sales</h5>
        </div>
        <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4'>
          <h3 style={{fontWeight: 300}}>
            <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter stats-no"></span>
          </h3>
          <h5 style={{fontWeight: 400}} className="animatedComment">Daily $BleuFi Volume</h5>
        </div>
        <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4'>
          <h3 style={{fontWeight: 300}}>
          <AnimatedNumber
          className=" stats-no"
          value={100}
          style={{
            fontWeight: 300
          }}
          duration={2000}
          formatValue={(n) => n.toFixed(1)}
          frameStyle={(percentage) =>
            percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
          }/>T</h3>
          <h5 style={{fontWeight: 400}} className="animatedComment">Total $BleuFi Volume</h5>
        </div>
        
      </p>
      
    </>
  );
}

export default LiveAuction;

import React, { useEffect } from "react";
import wallet from 'assets/img/wallet.png'
import tag from 'assets/img/tag.png'
import create from 'assets/img/create.png'
import addTo from 'assets/img/addTo.png'
import Aos from 'aos'
import 'aos/dist/aos.css'

function GetStarted() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    })
  })
  return (
    <div class="container">
      <div className="row row--grid mb-50">
        {/* <!-- title --> */}
        <div className="col-12">
          <p className="nft-text-center nft-font-36 text-white nft-mt-60 nft-mb-60 mt-150 mb-75">
            How to Get Started
          </p>
        </div>
        {/* <!-- end title --> */}

        <div className="col-12 col-md-6 col-lg-4 " data-aos-delay="100" data-aos="fade-right"> {/* data-aos="fade-down" */}
          <div className="feature bleuFrosted p-4">
            <div className="headTag">
              <span className="feature__icon">
                <img src={wallet} alt="no wallet" />
              </span>
              <h3 className="feature__title">Connect Wallet</h3>
            </div>
            <p className="feature__text">
            Welcome to BleuFi. Getting started on our NFT Marketplace is pretty simple. Just connect your wallet on the BSC Network by clicking on "Connect Wallet".
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 " data-aos-delay="500" data-aos="fade-right">
          <div className="feature bleuFrosted p-4 getStartedPanelMargin100">
            <div className="headTag">
              <span className="feature__icon feature__icon--green">
                <img src={create} alt="no wallet" />
              </span>
              <h3 className="feature__title">Create Profile</h3>
            </div>
            <p className="feature__text">
            Once you're connected you can set up your profile. Tell us a bit about you and link your socials.
              Upload an avatar and banner image to showcase your work. Next step is creating your first NFT.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 " data-aos-delay="900" data-aos="fade-right">
          <div className="feature bleuFrosted p-4 getStartedPanelMargin200">
            <div className="headTag">
              <span className="feature__icon feature__icon--purple">
                <img src={addTo} alt="no wallet" />
              </span>
              <h3 className="feature__title">Create NFT</h3>
            </div>
            <p className="feature__text">
            You decide what you want to upload. BleuFi supports images, audio and video. You can be as creative as you want to. Mining is free of charge so start creating your NFTs now and list them with one click.+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;

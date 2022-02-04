import React from "react";
import {Link} from "react-router-dom";
import FLOKIN from "assets/img/bleu_bg_main.svg";
import BNB from "assets/img/bnb.png";
import BgF from 'assets/img/bg_flokinomics.png'
import BFW from 'assets/img/bleu_whale.svg'
import chain1 from 'assets/img/Chain 1.png'
import chain2 from 'assets/img/Chain 2.png'
import chain3 from 'assets/img/Chain 3.png'
import chain4 from 'assets/img/Chain 4.png'
import Particles from "react-tsparticles";

const particlesInit = (main) => {
    console.log(main);

};

const particlesLoaded = (container) => {
    console.log(container);
    setTimeout(function (){
        document.getElementsByClassName('heroParticles')[0].style.position="absolute"
        },50
    )
};

function Banner() {
    return (
        <div className="hero ">

            <div id="particles-js">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    canvasClassName={"heroParticles"}
                    options={{
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                grab: {
                                    distance: 800,
                                    opacity: 0.5,
                                },
                                bubble: {
                                    distance: 800,
                                    size: 80,
                                    duration: 2,
                                    opacity: 0.8,
                                    speed: 3,
                                },
                                repulse: {
                                    distance: 400,
                                    duration: 0.4,
                                },
                                push: {
                                    particles_nb: 4,
                                },
                                remove: {
                                    particles_nb: 2,
                                }
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 200,
                                enable: true,
                                opacity: 0.3,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "out",
                                random: false,
                                speed: 1.2,
                                straight: false,
                                bounce: false,
                                attract: {
                                    enable: false,
                                    rotateX: 600,
                                    rotateY: 1200,
                                }
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 70,
                            },
                            opacity: {
                                value: 0.3,
                                random: false,
                                anim: {
                                    enable: false,
                                    speed: 0.5,
                                    opacity_min: 0.1,
                                    sync: false,
                                }
                            },
                            shape: {
                                type: "circle",
                                stroke: {
                                    width: 0,
                                    color: "#000000",
                                },
                                polygon: {
                                    nb_sides: 8,
                                },
                                image: {
                                    src: "img/github.svg",
                                    width: 100,
                                    height: 100,
                                }
                            },
                            size: {
                                random: true,
                                value: 4,
                                anim: {
                                    enable: false,
                                    speed: 80,
                                    size_min: 0.2,
                                    sync: false,
                                }
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="container w-80 align-self-center">
                            <p className="heroSubHeadline">
                                Create, Explore, & Collect Digital NFTs, as well as connecting artists and collectors
                            </p>
                            <p className="heroHeadline text-white">
                                The #1 Community-Focused NFT Marketplace
                            </p>


                            <div className="heroButtons">
                                <a className="btn-glow-small btn-hover-shine">
                                    <Link to="/explore" >
                                        Explore
                                    </Link>
                                </a>
                                <a className="btn-glow-outline d-none">
                                    <Link to="/explore" class="btn-glow-outline">
                                        Explore
                                    </Link></a>
                            </div>


                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center d-flex align-content-center">
                        <img src={BFW} className="bfLogoHero"/>
                    </div>
                </div>
            </div>

            <div className="supportedBlockchains pt-5 d-none">
                <p className="supportContents">Supported Blockchains</p>
                <div className="supportIcons">
                    <img src={chain3} alt="no chain" className="bannerIcon"/>
                    <img src={chain1} alt="no chain" className="bannerIcon"/>
                    <img src={chain2} alt="no chain" className="bannerIcon"/>
                    <img src={chain4} alt="no chain" className="bannerIcon"/>
                </div>

            </div>

        </div>
    );
}

export default Banner;

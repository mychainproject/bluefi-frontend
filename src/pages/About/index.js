import Team from 'components/Team'
import test from 'assets/img/test.jpg'
import BgF from 'assets/img/bg_flokinomics.png'

function About() {
  return(
    <div className="buyFlokin">
      <div className="overlay">
        <div className="container align-self-center width80" style={{position: 'relative', textAlign: 'center', top: 50}}>
          <p className="nft-text-left nft-font-36 text-white nft-pt-60 ">
            About Us
          </p>
          <p className="nft-text-left nft-font-18 text-white mb-5 aboutuscomment">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="nft-text-left nft-font-32 text-white mt-3">
            The Team
          </p>
          <div class="row" style={{paddingBottom: 120}}>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 teamMember">
              <Team image={test} comment1="Human Person" comment2="Founder/CEO" />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 teamMember">
              <Team image={test} comment1="Human Person" comment2="Founder/CEO" />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 teamMember">
              <Team image={test} comment1="Human Person" comment2="Founder/CEO" />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 teamMember">
              <Team image={test} comment1="Human Person" comment2="Founder/CEO" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
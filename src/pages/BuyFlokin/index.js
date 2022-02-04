import BgF from 'assets/img/bg_flokinomics.png'

function BuyFlokin() {
  return(
    <div className="buyFlokin">
      <div className="bgArea">
        <img src={BgF} alt="no bgf" style={{width: '180%'}} />
      </div>
      <div className="overlay">
        <div className="container align-self-center width60" style={{position: 'relative', textAlign: 'center'}}>
          <p className="nft-text-left nft-font-36 text-white nft-pt-60 ">
            Buy $FLOKIN
          </p>
          <p className="nft-text-left nft-font-18 text-white mb-5">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="nft-text-left nft-font-32 text-white mt-5">
            Link to Exhanges
          </p>
          <a href="www.thispersondoesnotexist.com" target="_blank" style={{color: 'white', textDecoration: 'underline', display: 'block'}} className="nft-font-10 mb-3">www.thispersondoesnotexist.com</a>
          <a href="www.thispersondoesnotexist.com" target="_blank" style={{color: 'white', textDecoration: 'underline', display: 'block'}} className="nft-font-10 mb-3">www.thispersondoesnotexist.com</a>
          <a href="www.thispersondoesnotexist.com" target="_blank" style={{color: 'white', textDecoration: 'underline', display: 'block'}} className="nft-font-10 mb-3">www.thispersondoesnotexist.com</a>
          <a href="www.thispersondoesnotexist.com" target="_blank" style={{color: 'white', textDecoration: 'underline', display: 'block'}} className="nft-font-10 mb-3">www.thispersondoesnotexist.com</a>
          <a href="www.thispersondoesnotexist.com" target="_blank" style={{color: 'white', textDecoration: 'underline', display: 'block'}} className="nft-font-10 mb-3">www.thispersondoesnotexist.com</a>
        </div>
      </div>
    </div>
  )
}

export default BuyFlokin
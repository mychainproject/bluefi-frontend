import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

import BreadCrumb from "../../components/BreadCrumb";
import Product from 'components/Product'
import Check from 'components/Check'
import Loader from "components/Loader";
import { client } from "../../utils/algolia";
import {
  PaymentList,
  MAX_LIMIT_FOR_BNB,
  MAX_LIMIT_FOR_TOKEN,
} from "../../constants";

import test from 'assets/img/test.jpg'

import "styles/explore.css";
import "./styles.css"

const breadCrumb = [
  { title: "Home", page: "/" },
  { title: "Explorer", page: "/explorer" },
];

let timer = null;

function Explore() {
  const [price, setPrice] = useState(100);
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [play, setPlay] = useState(true);
  const [filter, setFilter] = useState(false);
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState(true);
  const [payment, setPayment] = useState(true);
  const [pageNFT, setPageNFT] = useState(0);
  const [order, setOrder] = useState("new");
  const [saleType, setSaleType] = useState("all");
  const [category, setCategory] = useState("all");
  const [paymentType, setPaymentType] = useState("BNB");

  const getNFTList = async (isNew = false) => {
    try {
      setPlay(true);

      let algolia;
      if (order === "least") algolia = client.initIndex("nft_likesCount_asc");
      else if (order === "most") algolia = client.initIndex("nft_likesCount_desc");
      else if (order === "old") algolia = client.initIndex("nft_created_asc");
      else algolia = client.initIndex("nft");

      const filter = [];
      filter.push([`paymentType:${paymentType}`]);
      if (saleType !== "all") filter.push([`saleType:${saleType}`]);
      if (category !== "all") filter.push([`category:${category}`]);

      const res = await algolia.search(searchText, {
        hitsPerPage: 9,
        page: isNew ? 0 : pageNFT,
        facets: [
          "*",
          "category",
          "creator",
          "owner",
          "saleType",
          "paymentType",
        ],
        facetFilters: filter,
      });
      const lists = [];
      for (let i = 0; i < res.hits.length; i++) {
        let doc = res.hits[i];
        fetch(doc.tokenURI)
          .then((res) => res.json())
          .then((result) => {
            const nft_data =
              result !== undefined && result !== null
                ? { id: doc.objectID, ...doc, ...result }
                : { id: doc.objectID, ...doc };
            lists.push(nft_data);
          })
          .catch((err) => console.log(err));
      }
      setTimeout(() => {
        setCards(isNew ? lists : [...cards, ...lists]);
      }, 1000);
      setPageNFT(isNew ? 1 : pageNFT + 1);
      setPlay(false);
    } catch (err) {
      setPlay(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      getNFTList(true);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    order,
    price,
    searchText,
    paymentType,
  ]);

  return (
    
    <main className="main">
      <div className="p-0">

        <div className="row explorerPanel">

          {/* Filter Sidebar */}
          <div className="col-12 col-xl-3 exploreFilter bleuFrosted" >
            <div className="image-card exploreFilterSidenav">
              <div className="image-caption">
                <div className={filter ? "praktyka ": "praktyka"}>
                  <h4 style={{fontSize: '16px'}} onClick={() => setFilter(!filter)}>Filter</h4>
                  <div className="praktyka-content">
                    <select
                      name="order"
                      className="explore__select"
                      value={order}
                      onChange={(e) => {
                        setOrder(e.target.value);
                      }}
                    >
                      <option value="new">Newest</option>
                      <option value="old">Oldest</option>
                      <option value="most">Most liked</option>
                      <option value="least">Least liked</option>
                    </select>
                    {/* <ul className="filter__checkboxes">
                      <li>
                        <input id="10" type="checkbox" name="10" defaultChecked/>
                        <label htmlFor="10">Newest</label>
                      </li>
                      <li>
                        <input id="11" type="checkbox" name="11" />
                        <label htmlFor="11">Oldest</label>
                      </li>
                      <li>
                        <input id="12" type="checkbox" name="12" />
                        <label htmlFor="12">Most Liked</label>
                      </li>
                      <li>
                        <input id="13" type="checkbox" name="13" />
                        <label htmlFor="13">Least Liked</label>
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className={status ? "praktyka ": "praktyka"}>
                  <h4  style={{fontSize: '16px'}} onClick={() => setStatus(!status)}>Status</h4>
                  <div className="praktyka-content">

                    <select
                      name="saleType"
                      className="explore__select"
                      value={saleType}
                      onChange={(e) => {
                        setSaleType(e.target.value);
                      }}
                    >
                      <option value="all">All</option>
                      <option value="fix">Buy Now</option>
                      <option value="auction">On Auction</option>
                    </select>
                    {/* <ul className="filter__checkboxes">
                      <li>
                        <input id="14" type="checkbox" name="14" defaultChecked/>
                        <label htmlFor="14">Buy Now</label>
                      </li>
                      <li>
                        <input id="15" type="checkbox" name="15" />
                        <label htmlFor="15">On Auction</label>
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className={categories ? "praktyka ": "praktyka"}>
                  <h4  style={{fontSize: '16px'}} onClick={() => setCategories(!categories)}>Categories</h4>
                  <div className="praktyka-content">
                    <select
                      name="category"
                      className="explore__select"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option value="all">All</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="film">Film</option>
                      <option value="sports">Sports</option>
                      <option value="education">Education</option>
                      <option value="photography">Photography</option>
                      <option value="games">Games</option>
                      <option value="other">Other</option>
                    </select>
                    {/* <ul className="filter__checkboxes">
                      <li>
                        <input id="16" type="checkbox" name="16" defaultChecked/>
                        <label htmlFor="16">Artwork</label>
                      </li><li>
                        <input id="17" type="checkbox" name="17"/>
                        <label htmlFor="17">Music</label>
                      </li><li>
                        <input id="18" type="checkbox" name="18"/>
                        <label htmlFor="18">Trading Cards</label>
                      </li><li>
                        <input id="19" type="checkbox" name="19"/>
                        <label htmlFor="19">Least Collectibles</label>
                      </li><li>
                        <input id="20" type="checkbox" name="20"/>
                        <label htmlFor="20">Utillities</label>
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className={payment ? "praktyka ": "praktyka"}>
                  <h4  style={{fontSize: '16px'}} onClick={() => setPayment(!payment)}>Payment</h4>
                  <div className="praktyka-content">
                    <select
                      name="paymentType"
                      className="explore__select"
                      value={paymentType}
                      onChange={(e) => {
                        setPaymentType(e.target.value);
                      }}
                    >
                      <option value="all">All</option>
                      <option value="bnb">BNB</option>
                      <option value="flokin">FLOKIN</option>
                    </select>
                    {/* <ul className="filter__checkboxes">
                      <li>
                        <input id="21" type="checkbox" name="21" defaultChecked/>
                        <label htmlFor="21">BNB</label>
                      </li><li>
                        <input id="22" type="checkbox" name="22"/>
                        <label htmlFor="22">FLOKIN</label>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-9 my-4 explorerRight">
            <Loader isLoading={play} />
            <div className="explorerHead">
              <p style={{fontSize: '17px', width: '275%'}}>{cards.length} Results</p>
              {/* <div className="sign__group mr-3">
                <select
                  name="paymentType"
                  className="explore__select"
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}
                >
                    <option value="all items">
                      All Items
                    </option>
                </select>
              </div>
              <div className="sign__group">
                <select
                  name="paymentType"
                  className="explore__select"
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}
                >
                    <option value="sort by">
                      Sort By
                    </option>
                </select>
              </div> */}
            </div>

            <div className="row row--grid relative">
              {cards.map((card, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={index}>
                  <Product data={card} image={test} comment1="Pixel Birds Collection" comment2="Pixel Pigeon #23456" comment3="@ArtistPerson" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Explore;
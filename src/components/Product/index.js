import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useWeb3React } from "@web3-react/core";
// import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import "./style.css";

import { firestore } from "../../firebase";
import AudioImage from "../Card/AudioImage";
import VideoImage from "../Card/VideoImage";

function Product(props) {
  const {
    id,
    type,
    image,
    category,
    isSale,
    imageAttach,
    time,
    name,
    owner,
    creator,
    price,
    saleType,
    likes,
    auctionCreator
  } = props.data;

  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const dispatchNftItem = async (payload) => {
    await dispatch({ type: "SET_SELECTED", payload });
  };

  const [nickName, setNickName] = useState("@unkown");
  const [follow, setFollow] = useState(likes);

  const getAvatar = async () => {
    const url = (
      await firestore
        .collection("users")
        .doc(time > 0 && auctionCreator ? auctionCreator : owner)
        .get()
    ).data();
    if (url) {
      setNickName(url?.nickName);
    }
  };

  
  const increaseLikes = () => {
    if (account) {
      const user_index = follow.indexOf(account);
      if (creator === account) {
        toast.error("You are a creator");
        return;
      }
      let temp = [...follow];
      if (user_index > -1) {
        temp[user_index] = temp[temp.length - 1];
        temp.pop();
      } else {
        temp = [...temp, account];
      }
      firestore
        .collection("nfts")
        .doc(id)
        .update({ likes: temp, likesCount: temp.length })
        .then(() => {
          setFollow(temp);
          toast.success(`You ${user_index === -1 ? "" : "un"}like the NFT`);
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Please connect your wallet first");
    }
  };

  useEffect(() => {
    getAvatar();
  });

  useEffect(() => {
    setFollow(props.data.likes);
  }, [props.data]);
  return (
    <div className="product">
      {type === "image" && (
        <Link
          to={`/item/${id}`}
          onClick={() => dispatchNftItem(props.data)}
        >
          <img src={image} alt="" className="product_image" />
        </Link>
      )}
      {type === "audio" && (
        <Link
          to={`/item/${id}`}
        >
          <AudioImage
            src={image}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </Link>
      )}
      {type === "video" && (
        <Link
          to={`/item/${id}`}
          onClick={() => dispatchNftItem(props.data)}
        >
          <VideoImage src={image} />
        </Link>
      )}
      <h3 className="product_comment">
        {/* <a href="/" className="product_comment2">{comment1}</a> */}
        <div className="productCategory">{category}</div>
        <div className="productTitle">{name}</div>
        <div className="productCreator">{nickName}</div>
        <div className="product_comment5">{price} BNB</div>

        <div class="d-flex mt-10">
          <div>
            <Link to={`/item/${id}`} className="product_comment1">
              {(time === 0 && props.data?.owner === account) || (time > 0 && props.data?.auctionCreator === account)
                  ? props.data?.isSale ? "Delist" : "List for sale"
                  : "Buy"}
            </Link>
          </div>
          <div className="product_comment6 hearLike" onClick={increaseLikes}>
            {follow?.length} {follow?.includes(account) ? <HeartIcon className="heartIcon" />  : <HeartIcon className="heartIcon" />}

          </div>

        </div>



      </h3>
    </div>
  );
}
export default Product;
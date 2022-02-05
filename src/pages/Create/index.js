import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import NFTDropzone from "../../components/Dropzone";
import Switch from "react-switch";
import {firestore} from "../../firebase";
import {toast} from "react-toastify";
import {NFTStorage} from "nft.storage";
import {NFTStorageKey} from "../../constants/index";
import ipfs from "utils/ipfsApi.js";
import "styles/create.css";
import moment from "moment";
import ReactSlider from "react-slider";
import {parseUnits} from "@ethersproject/units";
import {Contract} from "@ethersproject/contracts";
import {NFT_ADDRESS, NFT_MARKET_ADDRESS, PaymentList} from "../../constants";
import Market_INFO from "artifacts/contracts/Marketplace.sol/FlokinomicsNFTMarketplace.json";
import NFT_INFO from "artifacts/contracts/FlokinomicsNFT.sol/FlokinomicsNFT.json";
import {algolia} from "../../utils/algolia";
import bluefiabi from "../../services/smart-contract/BLEUFINFT"
import Web3 from "web3"

const client = new NFTStorage({token: NFTStorageKey});

function Create() {

    const web3 = new Web3(Web3.givenProvider || window.etherum)
    const newContract = "0xA20B92E0a08B6c32E81958A4955F138589C2084a"
    const abiFile = bluefiabi.abi
    const contractInstance = new web3.eth.Contract(abiFile,newContract)

    const {library, account} = useWeb3React();
    const [user, setUser] = useState({
        account: account,
        avatar: "assets/img/avatars/avatar.jpg",
        ownerAvatar: "assets/img/avatars/avatar.jpg",
        imageCover: "/assets/img/bg/bg.png",
        firstName: "User",
        lastName: "",
        nickName: "@user",
        bio: "",
        twitter: "",
        telegram: "",
        instagram: "",
        subscribe: "",
        followers: [],
    });
    const [type, setType] = useState("image");
    // eslint-disable-next-line no-unused-vars
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("art");
    const [name, setName] = useState("");
    const [royalties, setRoyalties] = useState(7);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [saleType, setSaleType] = useState("fix");
    const [buffer, setBuffer] = useState(null);
    const [attachBuffer, setAttachBuffer] = useState(null);
    const [isCreateProcess, setCreateProcess] = useState(false);
    const [isSale, setIsSale] = useState(false);
    const [auctionLength, setAuctionLength] = useState("Auction Length");
    const [paymentType, setPaymentType] = useState("BNB");

    const history = useHistory();
    const dispatch = useDispatch();
    

    const getFile = (file, isAttach = false) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            if (!isAttach) setBuffer(binaryStr);
            else setAttachBuffer(binaryStr);
        };
        reader.readAsArrayBuffer(file);
    };

    const createNFT = async () => {
        if (!name || !description || !buffer) {
            toast.error("Please fill the NFT information.");
            return;
        }
        if (isSale && price <= 0) {
            toast.error("Price should not be zero.");
            return;
        }
        try {
            if (!account) toast.error("Please connect your wallet first.");
            const userExist = (await firestore.collection("users").doc(account).get())
                .exists;
            if (!userExist) {
                // await creatProfile(account);
                toast.error("Please create your profile first.");
                return;
            }
            // if (!isSale || (isSale && saleType === "fix"))
                // await library
                //     .getSigner(account)
                //     .signMessage("Please check this account is yours");
            if (account) {
                setCreateProcess(true);
                const result = await ipfs.files.add(Buffer.from(buffer));
                const cid = await client.storeDirectory([
                    new File(
                        [
                            JSON.stringify({
                                name: name,
                                description: description,
                                creator: account,
                                type,
                                category,
                                royalties: royalties,
                                image: `https://ipfs.io/ipfs/${result[0].hash}`,
                            }),
                        ],
                        "metadata.json"
                    ),
                ]);
                if (cid) {
                    const tokenURI = `https://ipfs.io/ipfs/${cid}/metadata.json`;
                    if (isSale && saleType === "auction") {
                        const contract = new Contract(
                            NFT_MARKET_ADDRESS,
                            Market_INFO.abi,
                            library.getSigner()
                        );
                        const nftContract = new Contract(
                            NFT_ADDRESS,
                            NFT_INFO.abi,
                            library.getSigner()
                        );
                        const auction_length = parseInt(auctionLength) * 3600;
                        // const auction_length = 1200;
                        const isApproved = await nftContract.isApprovedForAll(
                            account,
                            NFT_MARKET_ADDRESS
                        );
                        if (!isApproved) {
                            const approve = await nftContract.setApprovalForAll(
                                NFT_MARKET_ADDRESS,
                                true
                            );
                            await approve.wait();
                        }
                        // const res = await contract.createAuction(
                        //     0,
                        //     true,
                        //     tokenURI,
                        //     auction_length,
                        //     parseUnits(price.toString()),
                        //     paymentType,
                        //     account
                        // );
                        // res
                        //     .wait()
                        //     .then(async (result) => {
                        //         const events = result?.events;
                        //         if (events.length > 0) {
                        //             const args = events[events.length - 1].args;
                        //             const ress = await firestore.collection("nfts").add({
                        //                 tokenId: parseInt(args.tokenId),
                        //                 tokenURI,
                        //                 ownerAvatar:
                        //                     user?.avatar || "/assets/img/avatars/avatar.jpg",
                        //                 owner: account,
                        //                 creator: account,
                        //                 price: parseFloat(price),
                        //                 isSale,
                        //                 saleType: "auction",
                        //                 paymentType: paymentType,
                        //                 auctionLength: auction_length,
                        //                 auctionCreator: account,
                        //                 time:
                        //                     (parseInt(args.duration) + parseInt(args.auctionStart)) *
                        //                     1000,
                        //                 likes: [],
                        //                 created: moment().valueOf(),
                        //             });
                        //             if (ress?.id) {
                        //                 algolia.saveObject({
                        //                     objectID: ress?.id,
                        //                     id: ress?.id,
                        //                     tokenId: parseInt(args.tokenId),
                        //                     tokenURI,
                        //                     ownerAvatar:
                        //                         user?.avatar || "/assets/img/avatars/avatar.jpg",
                        //                     owner: account,
                        //                     creator: account,
                        //                     price: parseFloat(price),
                        //                     isSale,
                        //                     saleType: "auction",
                        //                     paymentType: paymentType,
                        //                     auctionLength: auction_length,
                        //                     auctionCreator: account,
                        //                     time:
                        //                         (parseInt(args.duration) +
                        //                             parseInt(args.auctionStart)) *
                        //                         1000,
                        //                     likes: [],
                        //                     created: moment().valueOf(),
                        //                 });
                        //                 firestore.collection("history").add({
                        //                     userId: account,
                        //                     oldUserId: account,
                        //                     nftId: ress.id,
                        //                     actionType: 0,
                        //                     price: parseFloat(price),
                        //                     paymentType: paymentType,
                        //                     time: moment().valueOf(),
                        //                 });
                        //                 firestore.collection("history").add({
                        //                     userId: account,
                        //                     oldUserId: account,
                        //                     nftId: ress.id,
                        //                     actionType: 3,
                        //                     price: parseFloat(price),
                        //                     paymentType: paymentType,
                        //                     time: moment().valueOf(),
                        //                 });
                        //                 toast.success("Create NFT and start auction");
                        //                 setCreateProcess(false);
                        //                 history.push(`/creator/${account}`);
                        //             } else {
                        //                 setCreateProcess(false);
                        //                 toast.error("Create failed.");
                        //             }
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         toast.error("Create failed.");
                      
                        //     });
                    } else {
                       
                            const resNonce = await firestore.collection("nonce").get();
                            let variblelNonse = resNonce.docs[0].data().nonce;
                            // const check = contractInstance.methods.mintedNonce(variblelNonse)
                            // if(check){
                            //     console.log("update nonce")
                            // }
                            variblelNonse= variblelNonse + 1

                            console.log("&&&&&&&&&&&&&&&&&",variblelNonse)
                            
                            await firestore.collection("nonce").doc(resNonce.docs[0].id).update({
                                nonce: variblelNonse})
                            let accounts = await web3.eth.getAccounts()
                            const hash = await contractInstance.methods.getMessageHash(
                                variblelNonse,
                              0,
                              tokenURI  
                            ).call()
                            const encodedhash = await contractInstance.methods.getEthSignedMessageHash(hash).call()
                            const signature = await web3.eth.sign(encodedhash, accounts[0])
                            console.log(signature)

                        await firestore.collection("newNFTs").add({
                            tokenId: 0,
                            tokenURI,
                            ownerAvatar: user?.avatar || "/assets/img/avatars/avatar.jpg",
                            owner: account,
                            creator: account,
                            price: parseFloat(price),
                            paymentType: paymentType,
                            isSale,
                            saleType: "fix",
                            auctionLength: 0,
                            auctionCreator: null,
                            time: 0,
                            likes: [],
                            created: moment().valueOf(),
                            type,
                            category,
                            name,
                            description,
                            signature,
                            nonce:variblelNonse,
                            royalties
                        });
                        const res = await firestore.collection("nfts").add({
                            tokenId: 0,
                            tokenURI,
                            ownerAvatar: user?.avatar || "/assets/img/avatars/avatar.jpg",
                            owner: account,
                            creator: account,
                            price: parseFloat(price),
                            paymentType: paymentType,
                            isSale,
                            saleType: "fix",
                            auctionLength: 0,
                            auctionCreator: null,
                            time: 0,
                            likes: [],
                            created: moment().valueOf(),
                            type,
                            category,
                            name,
                            description,
                            signature,
                            nonce:variblelNonse,
                            royalties
                        });

                        if (res?.id) {
                            algolia.saveObject({
                                objectID: res?.id,
                                id: res?.id,
                                tokenId: 0,
                                tokenURI,
                                ownerAvatar: user?.avatar || "/assets/img/avatars/avatar.jpg",
                                owner: account,
                                creator: account,
                                price: parseFloat(price),
                                paymentType: paymentType,
                                isSale,
                                saleType: "fix",
                                auctionLength: 0,
                                auctionCreator: null,
                                time: 0,
                                likes: [],
                                created: moment().valueOf(),
                                type,
                                category,
                                name,
                                description,
                            });
                            firestore.collection("history").add({
                                userId: account,
                                oldUserId: account,
                                nftId: res.id,
                                actionType: 0,
                                price: parseFloat(price),
                                paymentType: paymentType,
                                time: moment().valueOf(),
                            });
                            toast.success("Create NFT");
                            setCreateProcess(false);
                            history.push(`/creator/${account}`);
                        } else {
                            setCreateProcess(false);
                            toast.error("Create failed.");
                        }
                    }
                } else {
                    toast.error("Uploading failed");
                    setCreateProcess(false);
                }
            }
        } catch (err) {
            setCreateProcess(false);
            console.log(err);
        }
    };

    const dispatchUser = async (user_id) => {
        if (user_id) {
            const userInfo = (
                await firestore.collection("users").doc(user_id).get()
            ).data();
            dispatch({type: "SET_PROFILE", userInfo});
            setUser(userInfo);
        }
    };
    useEffect(() => {
        dispatchUser(account);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);
    return (
        <main className="buyFlokin" style={{paddingTop: 90}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 pr-1 createPart">

                        <h2 class="createStepLabel">Upload file</h2>
                        {type === "audio" ? (
                            <div className="nftdropzone">
                                <NFTDropzone
                                    nftType="Audio"
                                    onChange={(newfile) => {
                                        setFile(newfile);
                                        getFile(newfile);
                                    }}
                                />
                            </div>
                        ) : type === "video" ? (
                            <div className="nftdropzone">
                                <NFTDropzone
                                    nftType="Video"
                                    onChange={(newfile) => {
                                        setFile(newfile);
                                        getFile(newfile);
                                    }}
                                />
                            </div>
                        ) : type === "image" ? (
                            <div className="nftdropzone">
                                <NFTDropzone
                                    nftType="image"
                                    onChange={(newfile) => {
                                        setFile(newfile);
                                        getFile(newfile);
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="sign__group">
                            <h2 className="createStepLabel mb-20">NFT Type</h2>
                            <select
                                id="type"
                                name="type"
                                className="sign__select inputBg"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="image">NFT Type</option>
                                <option value="image">Image</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                            </select>
                        </div>

                        <div className="sign__group">
                            <select
                                id="category"
                                name="category"
                                className="sign__select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Category</option>
                                <option value="art">Art</option>
                                <option value="music">Music</option>
                                <option value="film">Film</option>
                                <option value="sports">Sports</option>
                                <option value="education">Education</option>
                                <option value="photography">Photography</option>
                                <option value="games">Games</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="sign__group">
                            <select
                                id="type"
                                name="type"
                                className="sign__select inputBg"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="image">Image</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6  pr-1 createPart">
                        <h2 className="createStepLabel">Information</h2>
                        <div className="sign__group">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="sign__input "
                                placeholder="Title"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{border: '1px solid #FFFFFF33'}}
                            />
                        </div>

                        <div className="sign__group">
              <textarea
                  id="description"
                  name="description"
                  className="sign__textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{border: '1px solid #FFFFFF33'}}
              ></textarea>
                        </div>
                        <div class="mt-50">
                            <h2 className="createStepLabel">Sale & Price</h2>
                        </div>
                        <div className="sign__group">
                            <label className="sign__label mr-3" htmlFor="sale">
                                List for Sale
                            </label>
                            <Switch
                                onChange={() => {
                                    setIsSale(!isSale);
                                }}
                                checked={isSale}
                                height={26}
                                class="createListSwitch"
                            />
                        </div>

                <div className="sign__group">
                    <label className="sign__label" htmlFor="royalties">
                        Royalties
                    </label>
                    <button className="royaltyBtn">{royalties}%</button>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        defaultValue={7}
                        value={royalties}
                        onChange={(e) => {
                            setRoyalties(e);
                        }}
                        min={1}
                        max={20}
                        renderTrack={(props, state) => (
                            <div {...props}>{state.valueNow}</div>
                        )} //custom track
                    />
                </div>

                {isSale && (
                    <div className="sign__group">

                        <select
                            id="saleType"
                            name="saleType"
                            className="sign__select "
                            value={saleType}
                            onChange={(e) => setSaleType(e.target.value)}
                        >
                            <option>Sale Type</option>
                            <option value="fix">Fixed</option>
                            <option value="auction">Auction</option>
                        </select>

                        <div className="sign__group">
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="price"
                                className="sign__input"
                                placeholder="BNB Price"
                            />
                        </div>
                        {saleType === "auction" && (
                            <div className="sign__group">
                                <select
                                    id="length"
                                    name="length"
                                    className="sign__select mt-0"
                                    value={auctionLength}
                                    onChange={(e) => setAuctionLength(e.target.value)}
                                >
                                    <option>Auction Length</option>
                                    <option value="1">1 hour</option>
                                    <option value="12">12 hours</option>
                                    <option value="24">24 hours</option>
                                    <option value="72">3 days</option>
                                    <option value="168">7 days</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}
                    </div>
                    </div>
                <div className="col-12 text-center mb-100">
                    <button
                        type="button"
                        className="btn-glow btn-hover-shine"
                        onClick={createNFT}
                        disabled={isCreateProcess}
                    >
                        {isCreateProcess ? "Creating..." : "Create NFT"}
                    </button>
                </div>
            </div>


        </main>
    )
        ;
}

export default Create;
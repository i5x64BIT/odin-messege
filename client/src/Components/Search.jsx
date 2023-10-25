import { useEffect, useRef, useState } from "react";
import MessegeItem from "./MessegeItem";
import { getMesseges, sendMessege } from "../API";
import { upvoteMessege, downvoteMassage } from "../API";

export default function Search() {
  const [messeges, setMesseges] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const ref = useRef();

  useEffect(() => {
    getMesseges().then((data) => setMesseges(data));
  }, []);
  const handleVote = (messege, action) => {
    setDisabled(true);
    (async () => {
      let newDoc = null;
      if (action === "up") {
        newDoc = await upvoteMessege(messege._id);
      } else {
        newDoc = await downvoteMassage(messege._id);
      }
      setMesseges(
        [...messeges.filter((m) => m._id != messege._id), newDoc].sort(
          (a, b) => b.upvotes - a.upvotes
        )
      );
      setDisabled(false);
    })();
  };
  useEffect(() => setSearchResults(messeges), [messeges]);

  const handleSend = () => {
    if (ref.current.value) {
      setDisabled(true)
      sendMessege(ref.current.value).then(() => {
        getMesseges().then((m) => {
          setMesseges(m);
          setDisabled(false)
        });
      });
    }
  };
  const handleSearch = (e) => {
    setSearchResults(messeges.filter((m) => m.text.includes(e.target.value)));
  };


  if (messeges.length) {
    return (
      <>
        <input
          className="messege_search"
          type="text"
          placeholder="Search Messege Text"
          onChange={handleSearch}
        />
        <main className="messege-container" aria-description="Messege Board">
          {!messeges.length ? (
            <p>Loading messeges...</p>
          ) : (
            searchResults.map((m) => (
              <MessegeItem
                key={m._id}
                messege={m}
                handleVote={handleVote}
                disabled={disabled}
              />
            ))
          )}
          <div className="new-messege-container">
            <textarea
              ref={ref}
              placeholder="Messege"
              className="new-messege-field"
            ></textarea>
            <button
              className="btn-new-messege partial"
              onClick={() => handleSend()}
            >
              Send
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return <p>Loading messeges...</p>;
  }
}

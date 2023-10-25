import { format } from "date-format-parse";
import { upvoteMessege, downvoteMassage } from "../API";
import { useState } from "react";

export default function MessegeItem({ messege, handleVote, disabled }) {
  return (
    <div className="messege_item">
      <section className="messege_header" aria-description="Messege Header">
        <p className="messege_name" aria-description="By">
          {messege.name}
        </p>
        <p className="messege_date" aria-description="At">
          {format(messege.date_created, "DD MMM ,YY") +
            " at " +
            format(messege.date_created, "hh:mm")}
        </p>
      </section>
      <div className="messege_content">
        <p className="messege_text">{messege.text}</p>
        <div className="upvote-container">
          <p className="messege_upvotes">🏆{messege.upvotes}</p>
          <div className="messege_upvote_controls">
            <button 
              className="btn-new-messege"
              onClick={() => handleVote(messege, "up")}
              disabled={disabled}
            >
              +
            </button>
            <button
              className="btn-new-messege"
              onClick={() => handleVote(messege, "down")}
              disabled={disabled}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

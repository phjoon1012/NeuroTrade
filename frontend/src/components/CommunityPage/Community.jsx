import React, { useEffect, useState } from "react";
import { fetchFeedbacks, submitFeedback } from "../../api/communityApi";
import "./Community.css";
import Header from "../LandingPage/Header";

const Community = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    useEffect(() => {
        fetchFeedbacks()
            .then(data => setFeedbacks(data))
            .catch(error => console.error("❌ Error:", error));
    }, []);

    // ✅ Handle Feedback Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("🔍 Sending feedback...");
            const newFeedback = await submitFeedback(rating, comment);
            setFeedbacks([newFeedback, ...feedbacks]); // ✅ Add new feedback at the top
            setComment("");
            setRating(5);
        } catch (error) {
            console.error("🚨 Submission failed:", error);
        }
    };

    return (    
    <>
        <Header />
        <div className="community">
            
            <h2>커뮤니티 피드백</h2>

            {/* ✅ Feedback Form */}
            <form onSubmit={handleSubmit} className="feedback-form">
                <h3>의견을 남겨주세요</h3>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}⭐</option>
                    ))}
                </select>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="당신의 의견을 작성해주세요..."
                    required
                />
                <button type="submit">제출</button>
            </form>

            {/* ✅ Display Feedbacks */}
            <div className="feedback-list">
                {feedbacks.length === 0 ? (
                    <p>아직 피드백이 없습니다.</p>
                ) : (
                    feedbacks.map((fb) => (
                        <div key={fb.id} className="feedback-card">
                            <h4>{fb.user}</h4>
                            <p>{fb.comment}</p>
                            <span>{fb.rating} ⭐</span>
                            <small>{new Date(fb.created_at).toLocaleString()}</small>
                        </div>
                    ))
                )}
            </div>
        </div>
    </>
    );

        
};

export default Community;
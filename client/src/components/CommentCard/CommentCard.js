import './CommentCard.scss';

export const CommentCard =(props)=>{

    const date = new Date(props.createdAt).toDateString()
    return(
        <>
            <div className="comment-container">
                <div className="comment-user-info">
                    <h2>User</h2>
                </div>
                <div className="comment-content">
                    {props.commentText}
                </div>
                <div className="comment-date">
                    {date}
                </div>
            </div>
        </>
    )
}
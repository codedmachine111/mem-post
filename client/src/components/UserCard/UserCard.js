import './UserCard.scss'
import {WhatsappIcon, WhatsappShareButton, TwitterShareButton, TwitterIcon} from "react-share"

export const UserCard = (props) => {
    const { username, createdAt, userId } = props;
    const date = createdAt ? new Date(createdAt).toDateString() : null;
    return(
        <>
        <div className='user-card-container'>
            <div className='user-card-info'>
                <div className='user-card-title'>
                    {username}
                </div>
                <div className='user-card-joined-info'>
                    Joined on {date}
                </div>
                <div className='user-share-buttons'>
                    <WhatsappShareButton url={`https://localhost:3000/profile/${userId}`} title={`Hey there! Check out my profile on Stories. A web-app where you share a picture with a memory.`} id="share-btn">
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    <TwitterShareButton url={`https://localhost:3000/profile/${userId}`} title={`Hey there! Check out my profile on Stories. A web-app where you share a picture with a memory.`}>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </div>
            </div>
        </div>
        </>
    )
}
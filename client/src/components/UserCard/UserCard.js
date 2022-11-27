import './UserCard.scss'

export const UserCard = (props) => {
    const { username, createdAt } = props;
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
            </div>
        </div>
        </>
    )
}
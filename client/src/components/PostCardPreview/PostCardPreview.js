import './PostCardPreview.scss'
import {useNavigate} from 'react-router-dom';

export const PostCardPreview = (props) => {
    const navigate = useNavigate();
    return (
        <div className='post-card-preview-container' onClick={()=>{navigate(`/post/${props.id}`)}}>
            <h2 className='post-card-preview-title'>{props.id}. {props.title}</h2>
            <p className='post-card-preview-desc'>{props.desc}</p>
            <p className='post-card-preview-username'>{props.username}</p>
        </div>
    )
}
import './Button.scss';

export const Button = (props)=>{
    return(
        <>
            <button className='btn' id={props.id} type={props.type} onSubmit={props.onSubmit}>{props.title}</button>
        </>
    )
}
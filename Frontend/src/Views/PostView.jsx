import React from 'react'

//This probably needs an ID prop to render the component, and/or I need to set up routing to include the PostID that has been requested

const PostView = () => {
    const user = localStorage.getItem('user')
    
    return (
        <div>PostView</div>
    )
}

export default PostView
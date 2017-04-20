const blogReducer = ( state = {
    open : false,
    posts : [],
    post : {},
    comments : [],
    username : "admin",
    stats :{},
    showEdit : false
} , action) => {
    switch (action.type){
        case "OPEN_MODAL":
            state = {
                ...state,
                open : action.payload
            }
            return state
        case "GET_POSTS_FULFILLED":
            state = {
                ...state,
                posts : action.payload.data
            }
            return state
        case "GET_POST_FULFILLED":
            state = {
                ...state ,
                post :action.payload.data,
                comments :action.payload.data.comments
            }
            return state
        case "ADD_COMMENT_FULFILLED":
            let comment = action.payload.data
            comment.user_name = state.username
            let comments = state.comments
            comments.push(comment)
            state = {
                ...state ,
                comments
            }
            return state
        case "EDIT_COMMENT_FULFILLED":
            var comment = action.payload.data
            var comments = state.comments
            for(let index in comments){
                if(comments[index].id == comment.id)
                    comments[index].content = comment.content
            }
            state = {
                ...state ,
                comments
            }
            return state
        case "DELETE_COMMENT_FULFILLED":
            var comment = action.payload.data
            var comments = state.comments
            for(let index in comments){
                if(comments[index].id == comment.id){
                    comments.splice(index,1)
                }
            }
            state = {
                ...state ,
                comments
            }
            return state
        case "ADD_POST_FULFILLED":
            var post = action.payload.data
            var posts = state.posts
            posts.push(post)
            state = {
                ...state ,
                open : false,
                posts :posts
            }
            return state
        case "GET_STATS_FULFILLED":
            var data= action.payload.data
            console.log("========",data)
            state = {
                ...state ,
                stats : data
            }
            return state
        case "SET_POST":
            var data = action.payload
            state= {
                ...state ,
                post : data
            }
            return state
        case "DELETE_POST_FULFILLED":
            var post= state.post
            var posts = state.posts
            for(let index in posts){
                if(posts[index].id ==post.id) {
                    posts.splice(index,1)
                }
            }
            state = {
                ...state ,
                posts: posts
            }
            return state
        case "SET_SHOW_EDIT":
            state = {
                ...state ,
                showEdit : action.payload
            }
            return state
        default:
            return state
    }
}
export default blogReducer
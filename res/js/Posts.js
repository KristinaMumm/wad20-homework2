let posts = [];

$(function () {

    loadPostsInfo()
        .then( function (response) {
            for (let post of response){
                alert(post.id)
                let postitus = new Post (
                    post.id,
                    new Profile(post.author.firstname, post.author.lastname, post.author.avatar),
                    post.createTime,
                    post.text,
                    new Media(post.media.type, post.media.url),
                    post.likes
                )
                posts.push(postitus)

            }
            displayPosts();
        })
        .catch(function () {
            alert('Error loading posts')
        })
    ;
});

function loadPostsInfo() {
    return $.get(
        {
            url: "https://private-anon-3ff49e5e4e-wad20postit.apiary-mock.com/posts",
            success: function (response) {
                return response ;
            },
            error: function() {
                alert("Error with reading posts")
            }
        }
    )
}

function displayPosts() {
    for (let post of posts){
        let postDiv = $('<div>').attr('class', 'post')
        let authorDiv = $('<div>').attr('class', 'post-author')
        let authorInfoSpan = $('<span>').attr('class', 'post-author-info')
        let authorAvatar = $('<img>').attr('src', post.author.avatar)
        let authorSmall = $('<small>').text(post.author.firstname + ' ' + post.author.lastname)
        let postDatetimeSmall = $('<small>').text(post.createTime)
        let postImageContainer = $('<div>').attr('class', 'post-image')
        let postType = post.media.type;
        let postMedia = null
        if (postType !== null || postType !== "null") {
            if (postType === "image") {
                let postMedia = $('<img>').attr('src', post.media.url)
            } else {
                let postMedia = $('<video>').attr('src', post.media.url)
            }
            postImageContainer.append(postMedia)
        }
        let postTitleContainer = $('<div>').attr('class', 'post-title')
        let postTitle = $('<h3>').text(post.postText)
        let postActions = $('<div>').attr('class', 'post-actions')
        let likeButton = $('<button>').attr({'type' : 'button',
            'name' : 'like',
            'class' : 'like-button'})

        postDiv.append(authorDiv)
        authorDiv.append(authorInfoSpan)
        authorInfoSpan.append(authorAvatar)
        authorInfoSpan.append(authorSmall)
        authorDiv.append(postDatetimeSmall)
        postDiv.append(postImageContainer)
        postDiv.append(postTitleContainer)
        postTitleContainer.append(postTitle)
        postDiv.append(postActions)
        postActions.append(likeButton)

        $('.main-container').append(profileDiv)
    }
}
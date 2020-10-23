let profiles = [];

$(function () {

    loadProfilesInfo()
        .then( function (response) {
            for (let profile of response){
                profiles.push(new Profile (
                    profile.firstname,
                    profile.lastname,
                    profile.avatar
                    )
                )
            }

            displayProfiles();
        })
        .catch(function () {
            alert('Error loading profiles')
        })
    ;

});

function loadProfilesInfo() {
    return $.get(
        {
            url: "https://private-anon-b63c1d7892-wad20postit.apiary-mock.com/profiles",
            success: function (response) {
                return response ;
            },
            error: function() {
                alert("Error with reading profiles")
            }
        }
    )
}

function displayProfiles() {
    for (let profile of profiles){
        let profileDiv = $('<div>').attr('class', 'profile-container')
        let avatar = $('<img>').attr('src', profile.avatar)
        let name = $('<p>').text(profile.firstName + ' ' + profile.lastName)
        let followButton = $('<button>').text('Follow')
        unfollow(followButton)

        profileDiv.append(avatar)
        profileDiv.append(name)
        profileDiv.append(followButton)

        $('.main-container').append(profileDiv)
    }
}

function unfollow(button) {
    button.attr('class', 'unfollowed')
    button.text('Follow')

    button.click(function () {
        follow($(this))
    })
}

function follow(button) {
    button.attr('class', 'followed')
    button.text('Followed')

    button.click(function () {
        unfollow($(this))
    })
}
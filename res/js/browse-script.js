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
        });
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
        let profileDiv = $('div')
        let avatar = $('<img>').attr('src', profile.avatar)
        let name = $('<p>').text(profile.firstName + ' ' + profile.lastName)
        let followButton = $('<button>').text('Follow')

        profileDiv.append(avatar)
        profileDiv.append(name)
        profileDiv.append(followButton)

        $('section#main-container tbody').append(profileDiv)
    }
}
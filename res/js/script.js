$(function () {

    loadUserInfo()
        .then (function (response) {
            let user = new User (
                response.firstname,
                response.lastname,
                response.email,
                response.avatar
            );
            displayUserAvatar(user)
            displayUserInfo(user)
    })
        .catch(function () {
            alert('Error loading user info')
        });



    $('.avatar-container').click(function () {
        $('#dropdown-content').toggle()
    })

});


function loadUserInfo() {
    return $.get(
        {
            url: "https://private-anon-2af5d11a64-wad20postit.apiary-mock.com/users/1",
            success: function (response) {
                return response;
            },
            error: function() {
                alert("Error with reading user info")
            }
        }
    );
}

function displayUserAvatar(user) {
    $(".avatar").attr("src", user.avatar);
}

function displayUserInfo(user) {
    $('#dropdown-content #name').text(user.firstname + ' ' + user.lastname);
    $("#dropdown-content #email").text(user.email);
}

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
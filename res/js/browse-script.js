$(function () {
    
    loadProfilesInfo()
        .then( function (response) {
            for (profile in response){
                let profile = new Profile(
                    profile.firstname,
                    profile.lastname,
                    profile.avatar
                );
            }
        })
        .catch(function () {
            alert('Error loading profiles')
        });
};

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
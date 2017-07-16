export default {
    
    getLocation: (state, actions) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(actions.location.setPosition)
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    },

    setPosition: (state, actions, position) => {
        const nearby = actions.location.getNearbyGoogleLocations(position)
        
        const sortedChallengesByLocation = sortChallengeByLocation(position, state.data.challenges)

        return({
            location: {
                lat: position.coords.latitude, 
                long: position.coords.longitude 
            },
            data: {challenges: sortedChallengesByLocation}
        })
    },

    getNearbyGoogleLocations: (state, actions, position) => {
        if(state.nearbyGoogleLocations.length == 0) {
            const pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            //dont know if i need map and map html el for this to work
            const map = new google.maps.Map(document.getElementById('map'), {
                center: pyrmont,
                zoom: 15
            });

            const request = {
                location: pyrmont,
                radius: '500'
            };

            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
            actions.location.setNearbyGoogleLocations({results: results, status: status})
            });
        }
    },

    setNearbyGoogleLocations: (state, actions, {results, status}) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            
            return ({nearbyGoogleLocations: results})
        
        }
    }
}

//if they are close enough we sort by number of votes then we sort by location
//@@DEV THIS NEEDS TESTING
function sortChallengeByLocation(position, challenges) {
    var mindif = 99999;
    var closest;

    var sortLocations = challenges.map(challenge => {
        var dif = PythagorasEquirectangular(
                                            parseFloat(position.coords.latitude), 
                                            parseFloat(position.coords.longitude),
                                            parseFloat(challenge.location.lat),
                                            parseFloat(challenge.location.long)
                                            )
        challenge.dif = dif
        return challenge
    
    })
    .sort((a, b) => {
        if(a.dif - b.dif < 5000) {
            return b.votes.length - a.votes.length
        } else {
            return a.dif - b.dif
        }
    })

    return sortLocations
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}
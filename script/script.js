
function selectRestaurant(id) {
    const restaurantLinks = [
        "page_2.html", 
        "page_3.html", 
        "page_4.html"
    ];

    window.location.href = restaurantLinks[id - 1];
}


/*********************************************
 * Model
 ********************************************/
var model = {

    init: function() {
        this.cats = [];
        this.currentCat = undefined;
        var catFiles = ['images/anton.png', 'images/jeff.png',
            'images/joey.png', 'images/maurice.png', 'images/paul.png',
            'images/randy.png', 'images/sarah.png'];
        // Create array of cat ojects
        for (var cat in catFiles) {
            // Create cat name from url of named file
            var catName = catFiles[cat].slice(0, -4).slice(7);
            catName = catName.charAt(0).toUpperCase() + catName.slice(1);
            model.cats.push({
                'name' : catName,
                'clicks' : 0,
                'url' : catFiles[cat]
            });
        }
    }
};

/*********************************************
 * Octopus (Controller)
 ********************************************/
var octopus = {

    init: function() {
        model.init();
        viewImage.init();
        viewList.init();
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    addLiListener: function(cat, li) {
        li.addEventListener('click', function(e) {
            model.currentCat = model.cats.indexOf(cat);
            viewImage.render();
        }, false);
    },

    incrementClick: function() {
        if (model.currentCat >= 0) {
            model.cats[model.currentCat].clicks++;
            viewImage.render();
        }
    }
};

/*********************************************
 * View: Cat Image
 ********************************************/
var viewImage = {

    init: function() {
        this.name = document.getElementById("name");
        this.catPic = document.getElementById("cat-pic");
        this.clicksBox = document.getElementById("clicks");
        this.frameImg = document.getElementById("frame-outer");
        this.frameImg.addEventListener('click', function(e) {
            octopus.incrementClick();
        }, false);
    },

    render: function() {
        var cats = octopus.getCats();
        var currentCat = octopus.getCurrentCat();
        if (currentCat >= 0) {
            // Display Name
            this.name.textContent = cats[currentCat].name;
            // Display Image in frame
            this.catPic.src = cats[currentCat].url;
            // Display number of clicks
            this.clicksBox.textContent =
                `Number of clicks: ${cats[currentCat].clicks}`;
        }
    }
};

/*********************************************
 * View: List of Cats
 ********************************************/
var viewList = {
    init: function() {
        var catListUl = document.getElementById("cat-list");
        // Fill ul with cat list items
        octopus.getCats().forEach(function(cat) {
            var elem = document.createElement('li');
            elem.innerHTML = `${cat.name}`;
            catListUl.appendChild(elem);
            octopus.addLiListener(cat, elem);
        });
    }
};

octopus.init();
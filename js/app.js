/*********************************************
 * Model
 ********************************************/
var model = {

    init: function() {
        this.adminIsHidden = true;
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
        viewAdmin.init();
    },

    getAdminHidden: function() {
        return model.adminIsHidden;
    },

    setAdminHidden: function() {
        model.adminIsHidden = model.adminIsHidden ? false : true;
    },

    addAttribute: function(targetElement, sourceAttribute) {
        if (model.currentCat >= 0) {
            var att = document.createAttribute('value');
            att.value = model.cats[model.currentCat][sourceAttribute];
            targetElement.setAttributeNode(att);
        }
    },

    updateAttributes: function(name, clicks, url) {
        model.cats[model.currentCat].name = name;
        model.cats[model.currentCat].clicks = clicks;
        model.cats[model.currentCat].url = url;
        viewImage.render();
        viewList.render();
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
            viewAdmin.render();
        }, false);
    },

    incrementClick: function() {
        if (model.currentCat >= 0) {
            model.cats[model.currentCat].clicks++;
            viewImage.render();
            viewAdmin.render();
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
            elem.textContent = cat.name;
            catListUl.appendChild(elem);
            octopus.addLiListener(cat, elem);
        });
    },

    render: function() {
        var lis = document.getElementsByTagName("li");
        var cats = octopus.getCats();
        for (var i = 0; i < lis.length; i++) {
            lis[i].textContent = cats[i].name;
        }
    }
};

/*********************************************
 * View: Admin Area
 ********************************************/
 var viewAdmin = {

    init: function() {
        var adminButton = document.getElementById("admin-button");
        var adminBlock = document.getElementById("admin-form");
        var cancel = document.getElementById("button-cancel");
        var enter = document.getElementById("button-enter");
        // Set listener for show/hide admin button
        adminButton.addEventListener('click', function(e) {
            octopus.setAdminHidden();
            adminBlock.className = octopus.getAdminHidden() ? 'hidden' : '';
        }, false);

        // Set listener for cancel input button
        cancel.addEventListener('click', function(e) {
            adminBlock.reset();
        }, false);

        // Set listener for enter button
        enter.addEventListener('click', function(e) {
            var fieldName = document.getElementById('form-cat-name').value;
            var fieldClicks = document.getElementById('form-cat-clicks').value;
            var fieldUrl = document.getElementById('form-cat-url').value;
            // Check that fieldClicks is a valid number
            if (!isNaN(fieldClicks)) {
                octopus.updateAttributes(fieldName, fieldClicks, fieldUrl);
            }
            else {
                alert('Please enter valid number for clicks');
            }
        }, false);
    },

    render: function() {
        // Clear form from any prior, unsent entries
        document.getElementById("admin-form").reset();
        var fieldName = document.getElementById('form-cat-name');
        var fieldClicks = document.getElementById('form-cat-clicks');
        var fieldUrl = document.getElementById('form-cat-url');

        // Apply current cat info into fields
        octopus.addAttribute(fieldName, 'name');
        octopus.addAttribute(fieldClicks, 'clicks');
        octopus.addAttribute(fieldUrl, 'url');
    }
 };

octopus.init();
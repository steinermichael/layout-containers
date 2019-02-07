function Layout() {
    this.$layoutContainer = $('#layout-container');
    this.layoutContainers = {};
}

Layout.prototype.updateLayoutContainers = function(layoutContainerPropertiesArray) {
    for (layoutContainerProperties of layoutContainerPropertiesArray) {
        var layoutContainerToUpdate = this.layoutContainers[layoutContainerProperties.id];

        //Remove id from layoutContainerProperties
        delete layoutContainerProperties['id'];

        $(layoutContainerToUpdate.$domElement).animate(layoutContainerProperties, 1000);
    }
};

Layout.prototype.addLayoutContainers = function(layoutContainerPropertiesArray) {

    for (layoutContainerProperties of layoutContainerPropertiesArray) {

        var newLayoutContainer = new LayoutContainer(
            this,
            layoutContainerProperties.id,
            layoutContainerProperties.width,
            layoutContainerProperties.height,
            layoutContainerProperties.backgroundColor
        );
        this.layoutContainers[layoutContainerProperties.id] = newLayoutContainer;
    }
};

function LayoutContainer(layout, id, width, height, backgroundColor) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.$domElement = null;

    //Add element to DOM
    var tmp = $("<div>").attr({
        'id': this.id,
        'class': 'resize-container',
        'data-resize-index': this.index,
        'style': "height:" + this.height + "; width:" + this.width + "; background-color:" + this.backgroundColor
    }).appendTo(layout.$layoutContainer);
    this.$domElement = tmp[0];
}


LayoutContainer.prototype.updateLayoutContainer = function(width, height, backgroundColor) {
    this.$domElement.animate({
        'width': width,
        'height': height,
        'background-color': backgroundColor,
    }, 1000);
};

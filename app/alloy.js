// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.data = [];

// * UI "global constructors"

// Defines width and height of each cell of the table
Alloy.Globals.cellWidthAndHeight = (columns) => {
    var cellWidthAndHeight = 0;

    switch (columns) {
        case 2:
            if(Ti.Platform.name === "android"){
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / columns) < 200){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / columns) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / columns) - 149);
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / columns) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / columns) - 229);
                }
            } else {
                cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 50;
            }
            break;
        case 3:
            if(Ti.Platform.name === "android"){
                if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - 145 < 100){
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - 160);
                }else{
                    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - 240);
                }
            } else {
                cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.75) - 194) / columns) - 16;
            }
            break;
        default:
            break;
    }

    return cellWidthAndHeight;
};

// Creates a table as a grid with xGrid columns and yGrid rows
Alloy.Globals.setTable = (xGrid, yGrid, cellWidthAndHeight, horizontalPadding, data, specie = null) => {
    var tableData = [];
    var verticalPadding = 30;
    var cellIndex = 0;

    for (var y = 0; y < yGrid; y++){

        var row = Ti.UI.createTableViewRow({
            className : 'grid',
            layout : 'horizontal',
            height : cellWidthAndHeight + horizontalPadding,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent'
        });

        var nameRow = ((Ti.Platform.name === "android") ? (Ti.UI.createTableViewRow({
            layout : 'horizontal',
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent',
            top : 5,
            bottom : 16,
        })) : undefined );

        for (var x = 0; x < xGrid; x++){
            var view;

            if(Ti.Platform.name == "android"){
                view = Ti.UI.Android.createCardView({
                    id : data[cellIndex].name,
                    left : verticalPadding,
                    right : verticalPadding,
                    height : cellWidthAndHeight,
                    width : cellWidthAndHeight,
                    borderRadius : 4,
                    borderWidth: 0,
                    elevation: 8
                });
            }else{
                view = Ti.UI.createView({
                    id : data[cellIndex].name,
                    left : verticalPadding,
                    right : verticalPadding,
                    height : cellWidthAndHeight,
                    width : cellWidthAndHeight,
                    viewShadowColor: 'rgba(0, 0, 0, 0.5)',
                    viewShadowRadius: 4,
                    viewShadowOffset: { x: 0, y: 8 }
                });
            }

            var image = Alloy.Globals.cellImage(cellWidthAndHeight, data[cellIndex]);

            var imageSaturation = Ti.UI.createLabel({
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                borderRadius : 4,
                borderWidth : 0,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                id : data[cellIndex].name,
            });

            view.add(image);
            if(xGrid != 2 && yGrid != 2){
                view.add(imageSaturation);
            }

            var name = Ti.UI.createLabel({
                bottom: (Ti.Platform.name === "android" ? 0 : -35),
                font : {
                    fontSize : (Ti.Platform.name === "android" ? 20 : 22),
                    fontFamily : 'Roboto-Regular'
                },
                color : 'rgba(0, 0, 0, 0.87)',
                text : data[cellIndex].name,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                touchEnabled : false,
                id : data[cellIndex].name,
                maxLines : 1
            });

            if(nameRow != undefined){
                var nameView = Ti.UI.createView({
                    left : verticalPadding,
                    right : verticalPadding,
                    height : Ti.UI.SIZE,
                    width : cellWidthAndHeight
                });
    
                nameView.add(name);
                nameRow.add(nameView);
            }else{
                view.add(name);
            }

            if(Alloy.Globals.data.length > 0){
                Alloy.Globals.data.forEach(element => {
                    if(xGrid != 2 && yGrid != 2){
                        if(element.specie === data[cellIndex].name){
                            view.remove(imageSaturation);
                            view.add(Alloy.Globals.selectedBackground(cellWidthAndHeight, 'rgba(255, 255, 255, 0.01)'));
                            view.add(Alloy.Globals.selectedIconBackground());
                            view.add(Alloy.Globals.selectedIcon());
                        }
                    }else{
                        if(element.amount === data[cellIndex].name && element.specie === specie) {
                            view.add(Alloy.Globals.selectedBackground(cellWidthAndHeight, 'rgba(101, 167, 209, 0.15)'));
                            view.add(Alloy.Globals.selectedIconBackground());
                            view.add(Alloy.Globals.selectedIcon());
                        }
                    }
                });
            }

            row.add(view);

            cellIndex++;
        }

        if(nameRow != undefined){
            row.add(nameRow);
        }

        tableData.push(row);
    }

    return tableData;
};

Alloy.Globals.cellImage = (cellWidthAndHeight, data) => {
    return Ti.UI.createImageView({
        image : data.logo,
        height : cellWidthAndHeight,
        width : cellWidthAndHeight,
        borderRadius : 4,
        borderWidth: 0,
        id : data.name,
        touchEnabled : false
    });
};

Alloy.Globals.selectedBackground = (cellWidthAndHeight, color) => {
    return Ti.UI.createLabel({
        width : cellWidthAndHeight,
        height : cellWidthAndHeight,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : '#2B8CCC',
        backgroundColor : color,
        touchEnabled: false
    });
};

Alloy.Globals.selectedIconBackground = () => {
    return Ti.UI.createLabel({
        width : (Ti.Platform.name === "android") ? 40 : 35,
        height : (Ti.Platform.name === "android") ? 40 : 35,
        borderRadius : (Ti.Platform.name === "android") ? 40 : 18,
        borderWidth : 0,
        backgroundColor : '#2B8CCC',
        top : 10,
        right : 10
    });
};

Alloy.Globals.selectedIcon = () => {
    return Ti.UI.createLabel({
        text : '✓',
        color : '#fff',
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font : {
            fontSize : 30,
            fontFamily : 'Roboto-Regular'
        },
        top : 10,
        right : (Ti.Platform.name === "android") ? 16 : 14
    });
};

var selectedBackground = Alloy.Globals.selectedBackground(Alloy.Globals.cellWidthAndHeight(2), 'rgba(101, 167, 209, 0.15)');
var selectedIconBackground = Alloy.Globals.selectedIconBackground();
var selectedIcon = Alloy.Globals.selectedIcon();

Alloy.Globals.selectOnlyOne = (e, data, cellWidthAndHeight, choice) => {
    if(Ti.Platform.name === "android"){
        if(choice != null){
            var cellIndex = 0;

            for(var x = 0; x < e.section.rows.length; x++){
                for (let y = 0; y < e.section.rows[x].children.length - 1; y++) {
                    e.section.rows[x].children[y].removeAllChildren();
                    e.section.rows[x].children[y].add(Alloy.Globals.cellImage(cellWidthAndHeight, data[cellIndex]));
                    cellIndex++;
                }
            }
        }

        choice = e.source.id;

        for(var x = 0; x < 2; x++){
            for (let y = 0; y < 2; y++) {
                if(e.section.rows[x].children[y].id === choice){
                    e.section.rows[x].children[y].add(selectedBackground);
                    e.section.rows[x].children[y].add(selectedIconBackground);
                    e.section.rows[x].children[y].add(selectedIcon);
                }
            }
        }
    } else {
        if(choice != null){
            for(var x = 0; x < 2; x++){
                for (let y = 0; y < 2; y++) {
                    e.section.rows[x].children[y].remove(selectedBackground);
                    e.section.rows[x].children[y].remove(selectedIconBackground);
                    e.section.rows[x].children[y].remove(selectedIcon);
                }
            }
        }

        choice = e.source.id;

        e.source.add(selectedBackground);
        e.source.add(selectedIconBackground);
        e.source.add(selectedIcon);
    }

    return choice;
};
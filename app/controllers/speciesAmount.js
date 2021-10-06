// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var choice = null;

var tableData = [];

var teams = [
    {name : '1', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '2', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '3', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '> 3', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' }
];

var cellWidthAndHeight = 0;

if(Ti.Platform.name === "android"){
    if(Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) < 200){
        cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 149);
    }else{
        cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - (Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 229);
    }
} else {
    cellWidthAndHeight = Math.floor(((Ti.Platform.displayCaps.platformWidth * 0.5) - 82) / 2) - 16;
}

$.leftView.addEventListener('postlayout', (e) => {
    if($.grid.data.length === 0){
        var verticalPadding = 30;
        var xGrid = 2;
        var yGrid = 2;

        var cellIndex = 0;

        for (var y = 0; y < yGrid; y++){

            var row = Ti.UI.createTableViewRow({
                className : 'grid',
                layout : 'horizontal',
                height : cellWidthAndHeight + 50,
                backgroundSelectedColor : 'transparent',
                backgroundColor: 'transparent'
            });

            var nameRow = ((Ti.Platform.name === "android") ? (Ti.UI.createTableViewRow({
                layout : 'horizontal',
                height : Ti.UI.SIZE,
                width : Ti.UI.SIZE,
                backgroundSelectedColor : 'transparent',
                backgroundColor: 'transparent',
                top : 10,
                bottom : 16,
            })) : undefined );

            for (var x = 0; x < xGrid; x++){
                var view;

                if(Ti.Platform.name == "android"){
                    view = Ti.UI.Android.createCardView({
                        teamID : teams[cellIndex].name + cellIndex.toString(),
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
                        teamID : teams[cellIndex].name + cellIndex.toString(),
                        left : verticalPadding,
                        right : verticalPadding,
                        height : cellWidthAndHeight,
                        width : cellWidthAndHeight,
                        viewShadowColor: 'rgba(0, 0, 0, 0.5)',
                        viewShadowRadius: 4,
                        viewShadowOffset: { x: 0, y: 8 }
                    });
                }
                
                var teamLogo = Ti.UI.createImageView({
                    image : teams[cellIndex].logo,
                    height : cellWidthAndHeight,
                    width : cellWidthAndHeight,
                    borderRadius : 4,
                    borderWidth: 0,
                    teamID : teams[cellIndex].name + cellIndex.toString()
                });

                view.add(teamLogo);

                var teamName = Ti.UI.createLabel({
                    top: (Ti.Platform.name === "android" ? 0 : -35),
                    font : {
                        fontSize : 18,
                        fontFamily : 'Roboto-Regular'
                    },
                    color : 'rgba(0, 0, 0, 0.87)',
                    text : teams[cellIndex].name,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    touchEnabled : false,
                    teamID : teams[cellIndex].name + cellIndex.toString()
                });

                if(nameRow != undefined){
                    var nameView = Ti.UI.createView({
                        left : verticalPadding,
                        right : verticalPadding,
                        height : Ti.UI.SIZE,
                        width : cellWidthAndHeight
                    });
        
                    nameView.add(teamName);
                    nameRow.add(nameView);
                }else{
                    view.add(teamName);
                }

                row.add(view);

                cellIndex++;
            }

            if(nameRow != undefined){
                row.add(nameRow);
            }

            tableData.push(row);
        }

        $.grid.setData(tableData);
    }
});

$.grid.addEventListener('click', (e) => {
    if(e.source.teamID){
        if(Ti.Platform.name === "android"){
            /* if(choice != null){
                for(var x = 0; x < 2; x++){
                    e.row.children[x].remove();
                }
            } */
            
            choice = e.source.teamID;

            for(var x = 0; x < 2; x++){
                if(e.row.children[x].teamID === e.source.teamID){
                    e.row.children[x].add(Ti.UI.createLabel({
                        width : cellWidthAndHeight,
                        height : cellWidthAndHeight,
                        borderRadius : 4,
                        borderWidth : 0,
                        backgroundColor : 'rgba(101, 167, 209, 0.15)'
                    }));

                    e.row.children[x].add(Ti.UI.createLabel({
                        width : 40,
                        height : 40,
                        borderRadius : 40,
                        borderWidth : 0,
                        backgroundColor : '#2B8CCC',
                        top : 10,
                        right : 10
                    }));

                    e.row.children[x].add(Ti.UI.createLabel({
                        text : '✓',
                        color : '#fff',
                        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
                        font : {
                            fontSize : 30,
                            fontFamily : 'Roboto-Regular'
                        },
                        top : 10,
                        right : 16
                    }));
                }
            }
        } else {
            e.source.add(Ti.UI.createLabel({
                width : 35,
                height : 35,
                borderRadius : 35,
                borderWidth : 0,
                backgroundColor : '#2B8CCC',
                top : 10,
                right : 10
            }));

            e.source.add(Ti.UI.createLabel({
                text : '✓',
                color : '#fff',
                textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
                font : {
                    fontSize : 30,
                    fontFamily : 'Roboto-Regular'
                },
                top : 10,
                right : 14
            }));
        }

        e.source.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        e.source.borderRadius = 4;
        e.source.borderWidth = 2;
        e.source.borderColor = '#2B8CCC';

        $.nextBtn.opacity = 1;
    }
});


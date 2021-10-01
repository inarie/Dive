var tableData = [];

var teams = [
    {name : 'Dragons', logo : 'http://wave-labs.org/api/image/dive/1' },
    {name : 'Tigers', logo : 'http://wave-labs.org/api/image/dive/2' },
    {name : 'Foxes', logo : 'http://wave-labs.org/api/image/dive/3' },
    {name : 'Dare Devils', logo : 'http://wave-labs.org/api/image/dive/4' },
    {name : 'Cyclones', logo : 'http://wave-labs.org/api/image/dive/5' },
    {name : 'Majors', logo : 'http://wave-labs.org/api/image/dive/6' },
    {name : 'Hawks', logo : 'http://wave-labs.org/api/image/dive/7' },
    {name : 'Stallions', logo : 'http://wave-labs.org/api/image/dive/8' },
    {name : 'Knights', logo : 'http://wave-labs.org/api/image/dive/9' },
    {name : 'Pirates', logo : 'http://wave-labs.org/api/image/dive/10' },
    {name : 'Crusaders', logo : 'http://wave-labs.org/api/image/dive/11' },
    {name : 'Wolves', logo : 'http://wave-labs.org/api/image/dive/12' },
	{name : 'Dragons', logo : 'http://wave-labs.org/api/image/dive/1' },
    {name : 'Tigers', logo : 'http://wave-labs.org/api/image/dive/2' },
    {name : 'Foxes', logo : 'http://wave-labs.org/api/image/dive/3' },
    {name : 'Dare Devils', logo : 'http://wave-labs.org/api/image/dive/4' },
    {name : 'Cyclones', logo : 'http://wave-labs.org/api/image/dive/5' },
    {name : 'Majors', logo : 'http://wave-labs.org/api/image/dive/6' },
    {name : 'Hawks', logo : 'http://wave-labs.org/api/image/dive/7' },
    {name : 'Stallions', logo : 'http://wave-labs.org/api/image/dive/8' },
    {name : 'Knights', logo : 'http://wave-labs.org/api/image/dive/9' },
    {name : 'Pirates', logo : 'http://wave-labs.org/api/image/dive/10' },
    {name : 'Crusaders', logo : 'http://wave-labs.org/api/image/dive/11' },
    {name : 'Wolves', logo : 'http://wave-labs.org/api/image/dive/12' },
];

$.index.open();

/* $.nextBtn.addEventListener('click', () => {
    var dMain = Alloy.createController('amountSpecies').getView();
    dMain.open();
}); */


$.leftView.addEventListener('postlayout', () => {
    var cellWidthAndHeight = 0;

    if(Ti.Platform.name === "android"){
        cellWidthAndHeight = 240;
    } else {
        cellWidthAndHeight = 190;
    }

    var verticalPadding = 30;
    var xGrid = 3;
    var yGrid = 6;

    var cellIndex = 0;

    for (var y = 0; y < yGrid; y++){

        var row = Ti.UI.createTableViewRow({
            className : 'grid',
            layout : 'horizontal',
            height : cellWidthAndHeight + 50,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent'
        });

        var nameRow = Ti.UI.createTableViewRow({
            className : 'grid',
            layout : 'horizontal',
            height : Ti.UI.SIZE,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent',
            top : (Ti.Platform.name === "android" ? 10 : undefined),
            bottom : 16
        });

        for (var x = 0; x < xGrid; x++){
            var view = Ti.UI.createView({
                teamID : teams[cellIndex].name + cellIndex.toString(),
                left : verticalPadding,
                right : verticalPadding,
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                viewShadowColor: (Ti.Platform.name === "android" ? undefined :  'rgba(0, 0, 0, 0.5)'),
                viewShadowRadius: (Ti.Platform.name === "android" ? undefined :  4),
                viewShadowOffset: (Ti.Platform.name === "android" ? undefined :  { x: 0, y: 8 }),
                shadowRadius: (Ti.Platform.name === "android" ? 4 :  undefined),
                shadowColor: (Ti.Platform.name === "android" ? 'rgba(0, 0, 0, 0.5)' :  undefined),
                shadowOffset: (Ti.Platform.name === "android" ? { x: 0, y: 8 } :  undefined),
            });
            
            var teamLogo = Ti.UI.createImageView({
                image : teams[cellIndex].logo,
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                borderRadius : 4,
                borderWidth: 0
            });

            var teamLogoSaturation = Ti.UI.createLabel({
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                borderRadius : 4,
                borderWidth : 0,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                teamID : teams[cellIndex].name + cellIndex.toString(),
            });

            view.add(teamLogo);
            view.add(teamLogoSaturation);
            row.add(view);

            var nameView = Ti.UI.createView({
                left : verticalPadding,
                right : verticalPadding,
                height : Ti.UI.SIZE,
                width : cellWidthAndHeight
            });
            
            var teamName = Ti.UI.createLabel({
                top: (Ti.Platform.name === "android" ? 0 : 10),
                font : {
                    fontSize : 20,
                    fontFamily : 'Roboto-Regular'
                },
                color : 'rgba(0, 0, 0, 0.87)',
                text : teams[cellIndex].name,
                touchEnabled : false,
                teamID : teams[cellIndex].name + cellIndex.toString()
            });

            nameView.add(teamName);
            nameRow.add(nameView);
            
            cellIndex++;
        }
        row.add(nameRow);
        tableData.push(row);
    }

    $.grid.setData(tableData);
});

function gridOnClick(e) {
    var cellWidthAndHeight = 0;

    if(e.source.teamID){
        Ti.API.info('Clicked: ' + e.source.teamID);

        if(Ti.Platform.name === "android"){
            cellWidthAndHeight = 240;

            for(var x = 0; x < 3; x++){
                if(e.row.children[x].teamID === e.source.teamID){
                    e.row.children[x].add(Ti.UI.createLabel({
                        width : 40,
                        height : 40,
                        borderRadius : 4,
                        borderWidth : 2,
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
            cellWidthAndHeight = 190;

            e.source.add(Ti.UI.createLabel({
                width : 40,
                height : 40,
                borderRadius : 4,
                borderWidth : 2,
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
                right : 16
            }));
        }

        e.source.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        e.source.borderRadius = 4;
        e.source.borderWidth = 2;
        e.source.borderColor = '#2B8CCC';

        $.nextBtn.opacity = 1;
    }
}
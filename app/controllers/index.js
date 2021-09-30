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
    var horizontalPadding = 50; 
    var xGrid = 3;
    var yGrid = 6;

    var cellIndex = 0;

    for (var y = 0; y < yGrid; y++){

        var row = Ti.UI.createTableViewRow({
            className : 'grid',
            layout : 'horizontal',
            height : cellWidthAndHeight + horizontalPadding,
            backgroundSelectedColor : 'transparent',
            backgroundColor: 'transparent'
        });

        for (var x = 0; x < xGrid; x++){
            var view = Ti.UI.createView({
                teamID : teams[cellIndex].name + cellIndex.toString(),
                left : verticalPadding,
                right : verticalPadding,
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                viewShadowColor: 'rgba(0, 0, 0, 0.5)',
                viewShadowRadius: 4,
                viewShadowOffset: { x: 0, y: 8 }
            });
            
            var teamLogo = Ti.UI.createImageView({
                image : teams[cellIndex].logo,
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                borderRadius : 4,
                borderWidth : 0
            });

            var teamLogoSaturation = Ti.UI.createLabel({
                height : cellWidthAndHeight,
                width : cellWidthAndHeight,
                borderRadius : 4,
                borderWidth : 0,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                teamID : teams[cellIndex].name + cellIndex.toString(),
            });
            
            var teamName = Ti.UI.createLabel({
                bottom : -40,
                font : {
                    fontSize : 20,
                    fontFamily : 'Roboto-Regular'
                },
                color : 'rgba(0, 0, 0, 0.87)',
                text : teams[cellIndex].name,
                touchEnabled : false
            });

            view.add(teamLogo);
            view.add(teamLogoSaturation);
            view.add(teamName);
            row.add(view);

            cellIndex++;
        }
        tableData.push(row);
    }

    $.grid.setData(tableData);
});

function gridOnClick(e) {
    var cellWidthAndHeight = 0;

    if(Ti.Platform.name === "android"){
        cellWidthAndHeight = 240;
    } else {
        cellWidthAndHeight = 190;
    }

    if(e.source.teamID){
        Ti.API.info('Clicked: ' + e.source.teamID);

        e.source.backgroundColor = 'rgba(255, 255, 255, 0.01)';

        var border = Ti.UI.createLabel({
            height : cellWidthAndHeight,
            width : cellWidthAndHeight,
            borderRadius : 4,
            borderWidth : 2,
            borderColor: '#2B8CCC',
            touchEnabled : false
        });

        var checked = Ti.UI.createLabel({
            top : 10,
            right : 10,
            font : {
                fontSize : 30,
                fontFamily : 'FontAwesome'
            },
            color : '#2B8CCC',
            text : '\uf14a',
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
            touchEnabled : false
        });

        border.add(checked);
        e.source.add(checked);

        $.nextBtn.opacity = 1;
    }
}
var duration;

Alloy.Globals.data.forEach(element => {
    if(element.duration){
        duration = element.duration;
    } else {
        duration = null;
    }
});

var data = [
    {name : '5 to 30 min', logo : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/hourglass.png' },
    {name : '30 to 60 min', logo : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/hourglass.png' },
    {name : '60 to 90 min', logo : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/hourglass.png' },
    {name : '90 to 120 min', logo : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/hourglass.png' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(2);

$.win.addEventListener('focus', () => {
    if(Alloy.isHandheld){
        $.grid.setData(Alloy.Globals.setTable(4, 1, cellWidthAndHeight, 50, data));
    } else {
        $.grid.setData(Alloy.Globals.setTable(2, Math.ceil(data.length / 2), cellWidthAndHeight, 50, data));
    }

    if(Alloy.Globals.data.forEach(element => {
        if(element.duration){
            $.nextBtn.opacity = 1;
        }
    }));
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        duration = Alloy.Globals.selectOnlyOne(e, data, cellWidthAndHeight, 1, duration);
        $.nextBtn.opacity = 1;
    }
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        var hasData = false;

        Alloy.Globals.data.forEach(element => {
            if(element.duration){
                hasData = true;
            }
        });

        if(hasData){
            Alloy.Globals.data.forEach(element => {
                element.duration = duration;
            });
        }else{
            Alloy.Globals.data.push({"duration" : duration});
        }
        
        var divingSpot = Alloy.createController('divingSpot').getView();
        divingSpot.open();
    }
});
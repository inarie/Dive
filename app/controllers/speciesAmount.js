// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var choice;

Alloy.Globals.data.forEach(element => {
    if(element.specie === args){
        choice = element.amount;
    } else {
        choice = null;
    }
});

var data = [
    {name : '1', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '2', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '3', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' },
    {name : '> 3', logo : 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/fish.png' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(2);

$.win.addEventListener('focus', () => {
    if(Alloy.isHandheld){
        $.grid.setData(Alloy.Globals.setTable(4, 1, cellWidthAndHeight, 50, data, args));
    } else {
        $.grid.setData(Alloy.Globals.setTable(2, Math.ceil(data.length / 2), cellWidthAndHeight, 50, data, args));
    }

    if(Alloy.Globals.data.forEach(element => {
        if(element.specie === args){
            $.doneBtn.opacity = 1;
        }
    }));
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        choice = Alloy.Globals.selectOnlyOne(e, data, cellWidthAndHeight, 1, choice);
        $.doneBtn.opacity = 1;
    }
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.doneBtn.addEventListener('click', () => {
    if($.doneBtn.opacity == 1){
        var hasData = false;

        Alloy.Globals.data.forEach(element => {
            if(element.specie === args){
                hasData = true;
            }
        });

        if(hasData){
            Alloy.Globals.data.forEach(element => {
                if(element.specie === args){
                    element.amount = choice;
                }
            });
        }else{
            Alloy.Globals.data.push({ "specie" : args, "amount" : choice });
        }
        
        $.win.close();
    }
});
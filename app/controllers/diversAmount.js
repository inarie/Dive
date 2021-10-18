var diversAmount;

Alloy.Globals.data.forEach(element => {
    if(element.diversAmount){
        diversAmount = element.diversAmount;
    } else {
        diversAmount = null;
    }
});

var data = [
    {name : '2 - 5', logo : 'https://ih1.redbubble.net/image.339457859.7180/flat,128x128,075,t-pad,128x128,f8f8f8.u6.jpg' },
    {name : '6 - 10', logo : 'https://ih1.redbubble.net/image.339457859.7180/flat,128x128,075,t-pad,128x128,f8f8f8.u6.jpg' },
    {name : '11 - 15', logo : 'https://ih1.redbubble.net/image.339457859.7180/flat,128x128,075,t-pad,128x128,f8f8f8.u6.jpg' },
    {name : '16 - 20', logo : 'https://ih1.redbubble.net/image.339457859.7180/flat,128x128,075,t-pad,128x128,f8f8f8.u6.jpg' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(2);

$.win.addEventListener('focus', () => {
    if(Alloy.isHandheld){
        $.grid.setData(Alloy.Globals.setTable(4, 1, cellWidthAndHeight, 50, data));
    } else {
        $.grid.setData(Alloy.Globals.setTable(2, Math.ceil(data.length / 2), cellWidthAndHeight, 50, data));
    }

    if(Alloy.Globals.data.forEach(element => {
        if(element.diversAmount){
            $.nextBtn.opacity = 1;
        }
    }));
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        if(diversAmount === e.source.id){
            diversAmount = null;
            $.nextBtn.opacity = 0;
        }else{
            diversAmount = e.source.id;
            $.nextBtn.opacity = 1;
        }

        Alloy.Globals.selectOnlyOne(e, data, cellWidthAndHeight, 1, diversAmount);  
    }
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        var hasData = false;

        Alloy.Globals.data.forEach(element => {
            if(element.diversAmount){
                hasData = true;
            }
        });

        if(hasData){
            Alloy.Globals.data.forEach(element => {
                element.diversAmount = diversAmount;
            });
        }else{
            Alloy.Globals.data.push({"diversAmount" : diversAmount});
        }
        
        var litter = Alloy.createController('litter').getView();
        litter.open({
            activityEnterTransition: (Ti.Platform.Android) ? Titanium.UI.Android.SLIDE_RIGHT : Titanium.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT,
            activityExitTransition: (Ti.Platform.Android) ? Titanium.UI.Android.TRANSITION_EXPLODE : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE 
        });
    }
});
var data = [
    { name : 'Monk seal', logo : 'http://wave-labs.org/api/image/dive/1' },
    { name : 'Seagrass', logo : 'http://wave-labs.org/api/image/dive/2' },
    { name : 'Seahorse', logo : 'http://wave-labs.org/api/image/dive/3' },
    { name : 'Dusky grouper', logo : 'http://wave-labs.org/api/image/dive/4' },
    { name : 'Red hogfish', logo : 'http://wave-labs.org/api/image/dive/5' },
    { name : 'Black coral', logo : 'http://wave-labs.org/api/image/dive/6' },
    { name : 'Swimming crab', logo : 'http://wave-labs.org/api/image/dive/7' },
    { name : 'Green reef coral', logo : 'http://wave-labs.org/api/image/dive/8' },
    { name : 'Harpoon weed', logo : 'http://wave-labs.org/api/image/dive/9' },
    { name : 'Button tunicate', logo : 'http://wave-labs.org/api/image/dive/10' },
    { name : 'Loggerhead turtle', logo : 'http://wave-labs.org/api/image/dive/11' },
    { name : 'Fire Coral', logo : 'http://wave-labs.org/api/image/dive/12' },
	{ name : 'Bushy encrusting anemone', logo : 'http://wave-labs.org/api/image/dive/13' },
    { name : 'Warty umbrella snail', logo : 'http://wave-labs.org/api/image/dive/14' },
    { name : 'Caulerpa seaweed', logo : 'http://wave-labs.org/api/image/dive/15' },
    { name : 'Octopus', logo : 'http://wave-labs.org/api/image/dive/16' },
    { name : 'Gilthead seabream', logo : 'http://wave-labs.org/api/image/dive/17' },
    { name : 'Leafy flat-blade algae', logo : 'http://wave-labs.org/api/image/dive/18' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.index.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data, '', true));

    Alloy.Globals.data.forEach(element => {
        if(element.specie){
            $.nextBtn.opacity = 1;
            $.skipBtn.opacity = 0;
        }
    });
});


$.grid.addEventListener('click', (e) => {
    var hasData = false;

    if(e.source.id){
        Alloy.Globals.data.forEach(function(item, index, object) {
            if(item.specie === e.source.id){
                hasData = true;
                object.splice(index, 1);
            }
        });

        if(!hasData){
            var speciesAmount = Alloy.createController('speciesAmount', e.source.id).getView();
            speciesAmount.open({
                activityEnterTransition: (Ti.Platform.Android) ? Titanium.UI.Android.SLIDE_RIGHT : Titanium.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT,
                activityExitTransition: (Ti.Platform.Android) ? Titanium.UI.Android.TRANSITION_EXPLODE : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE 
            });
        } else {
            var cellIndex = 0;

            for(var x = 0; x < e.section.rows.length; x++){
                for (let y = 0; y < ((Ti.Platform.name === "android") ? e.section.rows[x].children.length - 1 : e.section.rows[x].children.length) ; y++) {

                    if(e.section.rows[x].children[y].id === e.source.id){
                        e.section.rows[x].children[y].removeAllChildren();
                        e.section.rows[x].children[y].add(cellImage(cellWidthAndHeight, data[cellIndex]));
                        e.section.rows[x].children[y].add(Ti.UI.createLabel({
                            height : cellWidthAndHeight,
                            width : cellWidthAndHeight,
                            borderRadius : 4,
                            borderWidth : 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            id : data[cellIndex].name,
                        }));
            
                        if(Ti.Platform.name !== "android"){
                            e.section.rows[x].children[y].add(cellName(data[cellIndex]));
                        }
                    }

                    cellIndex++;
                }
            }

            $.nextBtn.opacity = 0;

            var hasData = false;
            Alloy.Globals.data.forEach(element => {
                if(element.specie){
                    hasData = true;
                }
            });
    
            if(!hasData)
                $.skipBtn.opacity = 1;
        }
    }
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        var duration = Alloy.createController('duration').getView();
        duration.open({
            activityEnterTransition: (Ti.Platform.Android) ? Titanium.UI.Android.SLIDE_RIGHT : Titanium.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT,
            activityExitTransition: (Ti.Platform.Android) ? Titanium.UI.Android.TRANSITION_EXPLODE : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE 
        });
    }
});

$.skipBtn.addEventListener('click', () => {
    var hasData = false;

    if($.skipBtn.opacity == 1){
        Alloy.Globals.data.forEach(element => {
            if(element.specie){
                hasData = true;
            }
        });

        if(!hasData)
            Alloy.Globals.data.push({ "specie" : null, "amount" : null });
        
        var duration = Alloy.createController('duration').getView();
        duration.open({
            activityEnterTransition: (Ti.Platform.Android) ? Titanium.UI.Android.SLIDE_RIGHT : Titanium.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT,
            activityExitTransition: (Ti.Platform.Android) ? Titanium.UI.Android.TRANSITION_EXPLODE : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE 
        });
    }
});

$.index.open();
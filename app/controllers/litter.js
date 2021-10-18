var data = [
    { name : 'Artificial polymer materials', logo : 'http://wave-labs.org/images/litter-reporter/menu/1.png' },
    { name : 'Metal', logo : 'http://wave-labs.org/images/litter-reporter/menu/2.png' },
    { name : 'Rubber', logo : 'http://wave-labs.org/images/litter-reporter/menu/3.png' },
    { name : 'Cloth/textile', logo : 'http://wave-labs.org/images/litter-reporter/menu/4.png' },
    { name : 'Paper/Cardboard', logo : 'http://wave-labs.org/images/litter-reporter/menu/5.png' },
    { name : 'Processed/worked wood', logo : 'http://wave-labs.org/images/litter-reporter/menu/6.png' },
    { name : 'Glass/ceramics', logo : 'http://wave-labs.org/images/litter-reporter/menu/7.png' },
    { name : 'Chemicals', logo : 'http://wave-labs.org/images/litter-reporter/menu/8.png' },
    { name : 'Food waste', logo : 'http://wave-labs.org/images/litter-reporter/menu/9.png' },
    { name : 'Other', logo : 'http://wave-labs.org/images/litter-reporter/menu/10.png' },
    { name : 'Fishing gear', logo : 'http://wave-labs.org/images/litter-reporter/menu/11.png' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.win.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data, null, false));

    Alloy.Globals.data.forEach(element => {
        if(element.litter){
            $.nextBtn.opacity = 1;
            $.skipBtn.opacity = 0;
        }
    });
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.grid.addEventListener('click', (e) => {
    var hasData = false;

    if(e.source.id){
        Alloy.Globals.data.forEach(function(item, index, object) {
            if(item.litter === e.source.id){
                hasData = true;
                object.splice(index, 1);
            }
        });

        if(!hasData){
            var litterType = Alloy.createController('litterType', e.source.id).getView();
            litterType.open({
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
                if(element.litter){
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
        /* var summary = Alloy.createController('summary').getView();
        summary.open(); */
    }
});

$.skipBtn.addEventListener('click', () => {
    var hasData = false;

    if($.skipBtn.opacity == 1){
        Alloy.Globals.data.forEach(element => {
            if(element.litter){
                hasData = true;
            }
        });

        if(!hasData)
            Alloy.Globals.data.push({ "litter" : null, "litterType" : [] });

        /* var summary = Alloy.createController('summary').getView();
        summary.open(); */
    }
});
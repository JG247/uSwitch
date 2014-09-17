/**
 * Created by jgpro_000 on 06/09/14.
 */
define([
    'controllers/UserController'
], function(UserController){
    var options = {
        ajax : {
            get : "GET",
            path: "js/data/data.json"
        },
        compare : {
            undefined : "undefined"
        },
        localStorage: {
            Data: "Data"
        },
        selectors: {
            panel : "panel"
        },
        panelTypes : {
            quotes : "panel quote QUOTES",
            multiManager: "panel mmp MMPPANELS",
            manager: "panel moneyManager MANAGERPANEL"
        },
        delay : {
            min : 2000,
            max : 2000
        }
    },o = options;
    function DataModel () {}
    DataModel.prototype.getJsonConstructor =  function (path, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (success)
                            success(JSON.parse(xhr.responseText));
                    } else {
                        if (error)
                            error(xhr);
                    }
                }
            };
            xhr.open("GET", path, true);
            xhr.send();
    };
    DataModel.prototype.getJson = function () {
        var getJsonConstructor = new DataModel();
        getJsonConstructor.getJsonConstructor('js/data/data.json',
            function(data) {
                dataModel.selectNewPanelData(data);
                dataModel.getAllApiPanelIds(data);
            },
            function(xhr) {
//                console.error(xhr);
            });
    };

    DataModel.prototype.selectRandomPanel = function () {
        var panels = document.querySelectorAll('[selected="false"]'),
        randomPanelPosition = Math.floor((Math.random() * panels.length) + 0),
        randomPanel = panels[randomPanelPosition],
        randomPanelType = randomPanel.attributes.class.value,
        randomPanelId = randomPanel.attributes[1].value,
        randomPanelData = [{"randomPanel" : randomPanel}, {"randomPanelPosition": randomPanelPosition}, {"randomPanelType" : randomPanelType},{"randomPanelId" : randomPanelId}],
        previousPanel = document.querySelectorAll('[selected="true"]');
        previousPanel[0].setAttribute("selected","false");
        randomPanel.setAttribute("selected","true");

        if ( randomPanelType == o.panelTypes.quotes ) {
            return randomPanelData;
        } else if ( randomPanelType == o.panelTypes.manager ) {
            console.log(randomPanel.attributes)
            return randomPanelData;
        } else if ( randomPanelType == o.panelTypes.multiManager ) {
            return randomPanelData;
        }
    };
    DataModel.prototype.triggerNewPanelData = function () {
        window.setInterval(function () { dataModel.getJson()}, o.delay.min);
    };
    DataModel.prototype.getAllPanelIds = function () {
        var panels = document.getElementsByClassName('panel');
        var panelIds = [];
        for (var i = 0; i < panels.length; i++) {
            var panelId = panels[i].attributes[1].value;
            panelIds.push(panelId);
            if ( i == panels.length - 1) {

                return panelIds;
            }
        }
    };
    DataModel.prototype.getAllApiPanelIds = function (data) {

        var panelApiIds = [];
        for (var i = 0; i < data.length; i++) {
            var panelApiId = data[i].id;
            panelApiIds.push(panelApiId);
            if ( i == data.length - 1 ) {
                return panelApiIds;
            }
        }
    };

    DataModel.prototype.getNewPanelId = function (data, selectedRandomPanelData) {
        var dataModel = new DataModel(),
        panelIds = dataModel.getAllPanelIds(),
        panelApiIds = dataModel.getAllApiPanelIds(data);

        function filterArray(src, filt) {
            var temp = {}, i, result = [];
            // load contents of filt into object keys for faster lookup
            for (i = 0; i < filt.length; i++) {
                temp[filt[i]] = true;
            }

            // go through src
            for (i = 0; i < src.length; i++) {
                if (!(src[i] in temp)) {
                    result.push(src[i]);
                }
            }
            return(result);
        }
       var filteredPanelIds = filterArray( panelApiIds, panelIds),
       newSelectedPanel = "",
       newPanelId = "";
        console.log(selectedRandomPanelData[0].randomPanel);
//        console.log(data);

//        var collection = selectedRandomPanelData[0].randomPanel.getAttribute("dataCollection");
//
//        if ( collection != undefined) {
//            for ( var i =0; i < filteredPanelIds.length; i++) {
//                for ( var j = 0; j < data.length; j++) {
//                    if ( data[j].datacollection != undefined ) {
////                        console.log(data[j].datacollection)
////                        console.log(data[j].id);
//                        if ( data[j].id == filteredPanelIds[i] ) {
//                            console.log(filteredPanelIds);
//                            console.log(data[j].id);
//                            filteredPanelIds.splice(i,1);
//                            console.log(filteredPanelIds)
//                        }
//                    }
//                }
//            }
//            console.log(collection);
//        }

        var panels = document.querySelectorAll('[selected="false"]');

        for (var i = 0; i < panels.length; i++ ) {
            if ( panels[i].attributes.datacollection != undefined ) {
                console.log(panels[i]);
//                console.log("Test");
//                console.log(panels[i].attributes.datacollection)
//                console.log(panels[i].attributes.dataid)
                for ( var j = 0; j < data.length; j++ ) {
                    if ( data[j].datacollection != undefined ) {
//                        console.log(data[j].datacollection);
//                        console.log(panels[i].attributes[4].value);
                        if ( data[j].datacollection ==  panels[i].attributes[4].value ) {
//                        console.log( data[j].datacollection );
//                            console.log( data[j].id);
                            for ( var k = 0; k < filteredPanelIds.length; k++) {
                                if ( data[j].id == filteredPanelIds[k] ) {

                                    console.log(filteredPanelIds);
                                    filteredPanelIds.splice(k,1);
                                    console.log(filteredPanelIds);
                                    if ( filteredPanelIds.length == 1 ) {
                                        newPanelId = filteredPanelIds[0];
                                        dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
                                        return newPanelId;
                                    } else {
                                        newSelectedPanel = Math.floor((Math.random() * filteredPanelIds.length  ) + 0),
                                            newPanelId = filteredPanelIds[newSelectedPanel];
                                        dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
                                        return newPanelId;
                                    }
                                }
                            }
//                            console.log(filteredPanelIds);
//                            filteredPanelIds.splice(j,1);
//                            console.log(filteredPanelIds);
                        }
                    }
                }
//                var n = filteredPanelIds.indexOf(panels[i].attributes.dataid);
//                console.log(n);
            } else {
                if ( filteredPanelIds.length == 1 ) {
                    newPanelId = filteredPanelIds[0];
                    dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
                    return newPanelId;
                } else {
                    newSelectedPanel = Math.floor((Math.random() * filteredPanelIds.length  ) + 0),
                        newPanelId = filteredPanelIds[newSelectedPanel];
                    dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
                    return newPanelId;
                }
            }
        }

        if ( filteredPanelIds.length == 1 ) {
            newPanelId = filteredPanelIds[0];
            dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
            return newPanelId;
        } else {
            newSelectedPanel = Math.floor((Math.random() * filteredPanelIds.length  ) + 0),
            newPanelId = filteredPanelIds[newSelectedPanel];
            dataModel.getNewPanelData(data, newPanelId, selectedRandomPanelData);
            return newPanelId;
        }
    };
    DataModel.prototype.getNewPanelData = function (data, newPanelId, selectedRandomPanelData) {
        var userController = new UserController();
        for ( var i = 0; i < data.length; i++) {
            if ( data[i].id == newPanelId) {
                var newPanelData = data[i];
                if ( newPanelData.PUBLISHERSHORTNAME == "Dan Plettner" ) {
                    selectedRandomPanelData[0].randomPanel.setAttribute("dataCollection","Dan Plettner");
                    userController.getPanelData(newPanelData, newPanelId, selectedRandomPanelData);
                    return newPanelData;
                } else {
                    userController.getPanelData(newPanelData, newPanelId, selectedRandomPanelData);
                    return newPanelData;
                }
            }
        }
    };
    DataModel.prototype.selectNewPanelData = function (data) {
        var dataModel = new DataModel(),
        selectedRandomPanelData = dataModel.selectRandomPanel();

        if ( selectedRandomPanelData[2].randomPanelType == o.panelTypes.quotes) {
            dataModel.getNewPanelId(data.QUOTES, selectedRandomPanelData);
        } else if ( selectedRandomPanelData[2].randomPanelType == o.panelTypes.manager) {
            dataModel.getNewPanelId(data.MANAGERPANEL, selectedRandomPanelData);
        } else if ( selectedRandomPanelData[2].randomPanelType == o.panelTypes.multiManager) {
            dataModel.getNewPanelId(data.MMPPANELS, selectedRandomPanelData);
        }
    };
    var dataModel = new DataModel();
//    dataModel.selectNewPanelData();
    dataModel.triggerNewPanelData();
    return DataModel;

});
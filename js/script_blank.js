// Crea objeto mapa indexado al archivo .html
var map = L.map('map', {maxZoom: 24, minZoom: 18, zoom: 17, zoomControl: true}).setView([-36.831800, -73.013000], 20);

// carga un mapa base (WMS) en el objeto previamente creado	
var osmBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap',
maxZoom: 24, maxNativeZoom: 18, minZoom: 18, minNativeZoom: 18
});
osmBase.addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 28,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

// Especifica las opciones del PopUp
var customOptions ={
    'maxWidth': 'auto',
   // 'className' : 'custom',
    //'keepInView': 'true',
    'maxHeight': 'auto'
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función para resaltar 
function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 40,
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToBack();
        }
    }
function highlightFeature1(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 15,
            dashArray: '',
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }
function highlightFeature2(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 15,
            fillColor: "red",
            color: "red",
            dashArray: '',
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }
// Función para desresaltar 
function resetHighlight(e) {
         var layer = e.target;

        layer.setStyle({
            weight: 30,
            dashArray: '',
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToBack();
        }
    }
// Función para desresaltar para redesAS
function resetHighlight1(e) {
         var layer = e.target;

        layer.setStyle({
            weight: 3,
            dashArray: '',
            fillOpacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToBack();
        }
}
// Función para desresaltar para redesAS
function resetHighlight2(e) {
         var layer = e.target;

        layer.setStyle({
            weight: 3,
            color:"red",
            fillColor: "red",
            dashArray: '',
            fillOpacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
}
function resetHighlight3(e) {
         var layer = e.target;

        layer.setStyle({
            weight: 3,
            dashArray: '',
            fillOpacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
}
// Función para hacer zoom al click
//function zoomToFeature(e) {
    //   map.fitBounds(e.target.getBounds());S
 // }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUncion de popups para fotos   ' style='width:500px;height:400px;'
function popup0 (feature,layer){
    layer.bindPopup('<pre>'+ "</b><br> <center><img src='" + feature.properties.imagen + "' style='width:400px;height:300px;''></center>" 
        + "<center>" + "<p><b>" + feature.properties.defecto + "<p><b>" + "</center>" + '</pre>', customOptions);
}
//Funcion de popups para ITV
function popupitv (feature,layer){
    layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
       //     click: zoomToFeature
        });
        if (feature.properties) {
            layer.bindPopup('<pre>' + "<b>" + "Código Inspección: " + "</b>" + feature.properties.id_itv + '<br>' + "<b>" + "Sección: " + "</b>" +
             feature.properties.seccion + '<br>' + "<b>" + "CIN ID Inicio: " + "</b>" +
            feature.properties.ref_inicio + '<br>' + "<b>" + "CIN ID Término: " + "</b>" +
            feature.properties.ref_final + '</pre>', customOptions) 
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//funcion de popups para redesAS 
function popupcol (feature,layer){
    layer.on({
            mouseover: highlightFeature1,
            mouseout: resetHighlight1,
          //  click: zoomToFeature
        });
        if (feature.properties) {
    layer.bindPopup('<pre>' + "<b>" + "Colector ID: "+ "</b>" + feature.properties.IDENTIFICA  + '</pre>', customOptions)
    }
}

//funcion de popups para Colectores Irregulares
function popupcolirr (feature,layer){
    layer.on({
            mouseover: highlightFeature1,
            mouseout: resetHighlight1,
           // click: zoomToFeature
        });
        if (feature.properties) {
        layer.bindPopup('<pre>' + "<b>" + "Denominación: " + "</b>" + feature.properties.Nombre + '</pre>', customOptions)
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//funcion de popups para Camaras 
function popupcam (feature,layer){
    layer.on({
            mouseover: highlightFeature1,
            mouseout: resetHighlight3,
        //    click: zoomToFeature
        });
        if (feature.properties) {
        layer.bindPopup('<pre>' + "<b>" + "CIN: "+ "</b>" + feature.properties.IDENTIFICA  + '<br>' + "<b>" + "Prioridad: "+ "</b>" + feature.properties.PRIORIDAD + '</pre>', customOptions)
    }
}
function popupcamirr (feature,layer) {
    layer.on({
            mouseover: highlightFeature2,
            mouseout: resetHighlight2,
     //       click: zoomToFeature
        });
        if (feature.properties) {
        layer.bindPopup('<pre>' + "<b>" + "Denominación: " + "</b>" + feature.properties.Nombre, customOptions)
    }
}

// CUSTOM ICONS
//Opciones de estilo de los marcadores
var geojsonMarkerOptions2 = {
    radius: 8,
    fillColor: "red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
var geojsonMarkerOptions3 = {
    radius: 8,
    fillColor: "black",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Icono modificado para defectos (fotos)

// replace Leaflet's default blue marker with a custom icon
function createCustomIcon (feature, latlng) {
    let myIcon = L.icon({
    iconUrl: 'icons/redicon.png',
    iconSize:     [30, 30], // width and height of the image in pixels
    shadowSize:   [35, 20], // width, height of optional shadow image
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, {icon: myIcon})
}
// create an options object that specifies which function will called on each feature
let myLayerOptions = {
  pointToLayer: createCustomIcon,
  onEachFeature: popup0
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Variables a cargar en el mapas
var itvs = L.geoJson(itv, {color: "green", weight: 30, onEachFeature: popupitv}).addTo(map);

var direccion = L.geoJson(flujos, {color: "black"}).addTo(map);

var col_irr = L.geoJson(col_irr, {color: "red", weight: 5, onEachFeature: popupcolirr}).addTo(map);

var colectores = L.geoJson(redesAS, {color: "black", onEachFeature: popupcol}).addTo(map);

var fotos = L.geoJson(fotositv, myLayerOptions).addTo(map);

var cam_irr = L.geoJson(camirreg, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions2);
    }, onEachFeature: popupcamirr}).addTo(map);

var camaras = L.geoJson(camarasAS, {pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions3);
    }, onEachFeature: popupcam, resetHighlight2}).addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Leyenda: Control de capas
//var baseMaps = {"<span style='color: gray'>Grayscale</span>": osmBase};
var baseMaps = {"Trazado de Calles": osmBase, "Imágen de Satélite": googleSat};

var overlayMaps = {
    "Defectos observados": fotos,
    "Cámaras Irregulares": cam_irr,
    "Colectores Irregulares": col_irr,
    "Direccion del flujo": direccion,
    "Inspecciones realizadas": itvs,
    "Redes": colectores,
    "CIN": camaras,
};
// Leyenda Control de Capas
L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false, autoZIndex:false}).addTo(map);

//Escala gráfica
L.control.betterscale().addTo(map);

//Ubicacion de los popups (inhabilita la función zoom al click)
map.on('popupopen', function(e) {
    var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
    px.x -= (e.popup._container.clientHeight/2) // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    px.y -= (e.popup._container.clientHeight/2) // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});

//Side-by-Side toolbox
//L.control.sideBySide(osmBase, googleSat).addTo(map);

//minimapa
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; OpenStreetMap contributors';
var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true,  width:200, height:200}).addTo(map);

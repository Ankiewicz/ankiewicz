
                (function(d3){
                  var active = d3.select(null);
                  var states = null;
                  var counties = null;
                  var caption = null;
                  var bruce = null;


                var urls = {
                        counties: "mapjson/us-counties.geojson",
                        states: "mapjson/us-states.geojson"
                    },
                    margin = {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    width = 960 - margin.right - margin.left,
                    height = 500,
                    path = d3.geo.path(),
                    map;

                var q = d3.queue().defer(d3.json, "mapjson/us-counties.geojson").defer(d3.json, "mapjson/us-states.geojson").defer(d3.csv, "mapjson/nationwide_Data_BJM.csv").await(ready);

                function showCaptionState(d, i) {
                    var name = '<h2>' + d.properties.name + '</h2>';
                    caption.html(name);
                }

                function showCaption(d, i) {
                    // var name = [d.properties.name, d.properties.state].join(', ');
                    var name = d.properties.state+ '<br/>' + d.properties.name;

                    // county and state name
                    var countyHovered = d.properties.name;
                    var stateHovered = d.properties.state;
                    var countyDetails = '';

                    //TODO ADD forEach loop to receive specificially the county data
                    // console.log(d.properties.name) - this is the call to receive the statename
                    //datavariable.forEach(d => { set varible data to a variable  }


                    bruce.forEach(function(d) {
                    //TODO plug in county data variable into the  display window
                        if (d.County === countyHovered && d.State === stateHovered) {

                            countyDetails += '<table width="100%"  align="center" valign="middle" id="dataContent">'
                            countyDetails += '<tr><td align="center" valign="middle" colspan="2"><h2>' + name + '</h2></td></tr>'
                            countyDetails += '<tr class="countyDataDisplay">'
                            countyDetails += '<td align="center" valign="middle" class="totalListedCell"> <span class="greenData">' + d.Total_List
                            countyDetails += '</span> </td>'
                            countyDetails += '<td align="center" valign="middle" id="donutChart"></td> '
                            countyDetails += '  </tr>'
                            countyDetails += ' <tr><td align="center" valign="top">TOTAL LISTED</td> '
                            countyDetails += ' <td align="center" valign="top"><span class="greenData">' + d.Brought_To_Sale + '</span> BROUGHT<br/> TO SALE</td> </tr>'
                            countyDetails += '</table>'

                            // countyDetails += '<p> Cancelled: ' + d.Cancelled + '</p>' countyDetails += '<p> Cancelled_: ' + d.Cancelled_Percent + '</p>' countyDetails += '<p> Postponed: ' + d.Postponed + '</p>' countyDetails += '<p> Postponed_: ' + d.Postponed_Percent +
                            // '</p>' countyDetails += '<p> TotalFallout: ' + d.Total_Fallout + '</p>' countyDetails += '<p> Total_Fallout_: ' + d.Total_Fallout_Percent + '</p>' countyDetails += '<p> Pending_OutbidNC: ' + d.Brought_To_Sale_Percent + '</p>' countyDetails += '<p>
                            // Pending_Sales_Results: ' + d.Brought_To_Sale + '</p>' countyDetails += '<p> BTS_from_total_list: ' + d.Sold + '</p>' countyDetails += '<p> BTS: ' + d.Sold_Percent + '</p>' countyDetails += '<a
                            // href="https://www.auction.com/residential/foreclosures_at/tx/dallas-county/bm_st/48_rpp/1_cp/"></a>'
                            caption.html(countyDetails);

                            // Showing the data as a donut display
                            var dataFromFile = Math.round(d.Brought_To_Sale_Percent * 100);
                            var wholeFrom = 100 - dataFromFile;
                            // console.log("dataFromFile %" + dataFromFile + '  ' + wholeFrom);
                            var dataset = {
                                apples: [dataFromFile, wholeFrom]
                            };

                            var width = 120,
                                height = 120,
                                radius = Math.min(width, height) / 2;

                            // var color = d3.scale.category20();
                            var color = d3.scale.ordinal().range(["#5DD82A", "#555"]);

                            var pie = d3.layout.pie().sort(null);

                            var arc = d3.svg.arc().innerRadius(radius - 30).outerRadius(radius - 10);

                            var svg = d3.select("#donutChart").insert("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                            var path = svg.selectAll("path").data(pie(dataset.apples)).enter().append("path").attr("fill", function(d, i) {
                                return color(i);
                            }).attr("d", arc);

                            var text = svg.append('text').text(Math.round(d.Brought_To_Sale_Percent * 100) + "%").attr("text-anchor", "middle");
                        }
                    })

                }

                function clicked(d) {
                    if (active.node() === this)
                        return reset(states, active, counties);
                    active.classed("active", false);
                    active = d3.select(this).classed("active", true);
                    // console.log(d.properties.name)

                    var bounds = path.bounds(d),
                        dx = bounds[1][0] - bounds[0][0],
                        dy = bounds[1][1] - bounds[0][1],
                        x = (bounds[0][0] + bounds[1][0]) / 2,
                        y = (bounds[0][1] + bounds[1][1]) / 2,
                        scale = 0.9 / Math.max(dx / width, dy / height),
                        translate = [
                            width / 2 - scale * x,
                            height / 2 - scale * y
                        ];
                        states.style('fill', '#eee');
                        active.style("fill", 'none');

                        //.style('fill', function(d){if(d.state === active){return 'red'}}).
                    states.transition().duration(750).style("stroke-width", 1.5 / scale + "px").attr("transform", "translate(" + translate + ")scale(" + scale + ")");
                    counties.transition().duration(750).style("stroke-width", 1.5 / scale + "px").attr("transform", "translate(" + translate + ")scale(" + scale + ")");

                    counties.style('display', 'block');
                    // states.style('fill', 'none');

                    //TODO ADD AJAX FOR STATE DATA CALL HERE
                    // console.log(d.properties.name) - this is the call to receive the statename

                }
                function reset() {
                    active.classed("active", false);
                    active = d3.select(null);

                    counties.transition().duration(750).style("stroke-width", ".5px").attr("transform", "");

                    states.transition().duration(750).style("stroke-width", ".5px").attr("transform", "");

                    counties.style('display', 'none');
                    states.style('fill', '#0098ee');

                }

                function ready(error, countylines, statelines, brucy) {
                    window.error = error;
                    window.countylines = countylines;
                    window.statelines = statelines;

                    if (error) throw error;

                    bruce = brucy;

                    var stateIds = {};
                    var brucesCountyData = {};
                    statelines.features.forEach(function(d) {
                        stateIds[d.id] = d.properties.name;
                    });

                    countylines.features.forEach(function(d) {
                        d.properties.state = stateIds[d.id.slice(0, 2)];
                    });

                    // remove the loading text
                    d3.select('.loading').remove();

                    map = d3.select('#map').append('svg').style('width', width).style('height', height);

                    map.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", reset);

                    var g = map.append("g").style("stroke-width", "1.5px");

                    counties = map.append('g').attr('class', 'counties').selectAll('path').data(countylines.features).enter().append('path').on("click", reset).attr('d', path);

                    caption = d3.select('#caption');
                    starter = caption.html();

                    counties.on('mouseover', showCaption).on('mousemove', showCaption)
                    .on('mouseout', function() {     caption.html(starter);});

                    states = map.append('g').attr('class', 'states').selectAll('path').data(statelines.features).enter().append('path').on("click", clicked).attr('d', path);

                    states.on('mouseover', showCaptionState).on('mousemove', showCaptionState)
                    .on('mouseout', function() {     caption.html(starter); });


                    d3.selectAll('pre').attr('class', 'prettyprint');

                }})(d3);



                function getSlider(argument) {


var url = "https://cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js";
$.getScript(url, function() {


    $('.slidingSection').slick({
        dots: true,
        speed: 600,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        respondTo: 'min',
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

});
};
getSlider();

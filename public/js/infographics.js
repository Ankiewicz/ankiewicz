
d3.select("input[value=\"total\"]").property("checked", true);

var svg = d3.select("#infographicSkills")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labelName");
svg.append("g")
	.attr("class", "labelValue");
svg.append("g")
	.attr("class", "lines");

var width = 500,
    height = 225,
	  radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.7);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.04;


var div = d3.select("#infographicSkills").append("div").attr("class", "toolTip");

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
	.range(colorRange.range());


datasetTotal = [
		    {id:1, label:"HTML5", value:99},
        {id:2, label:"CSS3", value:99},
        {id:3, label:"jQuery", value:70},
        {id:4, label:"Javascript", value:85},
        {id:5, label:"Problem Solving", value:99},
        {id:6, label:"Velocity(Java)", value:50},
        {id:7, label:"React.js", value:60},
        {id:8, label:"Redux", value:10},
        {id:9, label:"Node.js", value:60},
        {id:10, label:"Mongodb", value:30},
        {id:11, label:"Angular 1", value:40},
        {id:12, label:"SEO", value:40}
        ];

datasetOption1 = [
		    {id:1, label:"Photoshop", value:70},
        {id:2, label:"Illustrator", value:80},
        {id:3, label:"Sketch", value:70},
        {id:4, label:"Sketching", value:96},
        {id:5, label:"Ideas", value:99},
        {id:6, label:"Video Editing", value:70},
        {id:7, label:"UX/UI", value:70},
        {id:8, label:"Communication Skills", value:80},
        {id:9, label:"Photography", value:60},
        {id:10, label:"Branding", value:90},
        ];

datasetOption2 = [
		    {id:1, label:"Art Director", value:70},
        {id:2, label:"Creative Strategy", value:70},
        {id:3, label:"Copy Writing", value:50},
        ];

datasetTotal3 = [
		    {id:1, label:"+ Kind", value:99},
        {id:2, label:"+ Team Player", value:99},
        {id:3, label:"+ Drama Free", value:99},
        {id:4, label:"+ Self Driven", value:99},
        {id:5, label:"+ Passionate", value:99},
        {id:6, label:"+ Inspires others", value:99},
        {id:7, label:"- Can't Say NO", value:60},
        {id:8, label:"+ Dedication", value:110},
        {id:9, label:"+ Candor", value:99},
        {id:10, label:"+ Integrity", value:99},
        {id:11, label:"+ Honorable", value:99},
        ];

change(datasetTotal);


d3.selectAll("input")
	.on("change", selectDataset);

function selectDataset()
{
	var value = this.value;
	if (value == "total")
	{
    $('input[type="radio"]').removeClass('checked')
    $('input[value="total"]').attr('class', 'checked')
		change(datasetTotal);
	}
	else if (value == "option1")
	{
    $('input[type="radio"]').removeClass('checked')
    $('input[value="option1"]').attr('class', 'checked')
		change(datasetOption1);
	}
	else if (value == "option2")
	{
    $('input[type="radio"]').removeClass('checked')
    $('input[value="option2"]').attr('class', 'checked')
		change(datasetOption2);
	}
  else if (value == "option3")
	{
    $('input[type="radio"]').removeClass('checked')
    $('input[value="option3"]').attr('class', 'checked')
		change(datasetTotal3);
	}
}

function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), function(d){ return d.data.id });

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");

    slice
        .transition().duration(600)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })
    slice
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX-10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.data.label)+"<br>"+(d.data.value)+"%");
        });
    slice
        .on("mouseout", function(d){
            div.style("display", "none");
        });

    slice.exit()
        .remove();

    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length / 2;
            var horz = -5 * legendRectSize;
            var vert = i * (height + 8) - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.transition().duration(600)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                };
            })
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('x', legendRectSize + legendSpacing - 8)
        .attr('y', legendRectSize - legendSpacing - 20)
        .style('fill', color)
        .style('stroke', color);

        legend.remove();

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing + 4)
        .attr('y', legendRectSize - legendSpacing - 13)
        .text(function(d) {
          return d; });


    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labelName").selectAll("text")
        .data(pie(data), function(d){ return d.data.label });

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
            return (d.data.label+": "+d.value+"%");
        });

    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text
        .transition().duration(1000)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            };
        })
        .styleTween("text-anchor", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
            };
        })
        .text(function(d) {
            return (d.data.label+": "+d.value+"%");
        });


    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), function(d){ return d.data.label });

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
};

// Webseiten mit Datenbankanfragen
function diagram(data) {
    var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var formatNumber = d3.format(",.0f"),
        format = function(d) { return formatNumber(d) + " TWh"; },
        color = d3.scaleOrdinal(d3.schemeCategory10);

    var mwes = data

    var sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .nodeAlign(d3.sankeyLeft)
        .extent([[1, 1], [width - 1, height - 6]]);

    var link = svg.append("g")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.3)
        .selectAll("path");

    var node = svg.append("g")
        .attr("xlink:href", "http://en.wikipedia.org")
        .attr("class", "nodes")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("g");

    sankey(mwes);

    link = link
        .data(mwes.links)
        .enter().append("path")
        .attr("d", d3.sankeyLinkHorizontal())
    // .attr("stroke", function(d) { return d.value > 30 ? "#F00" : "#000"})// if changed to red, Changes fill of all the nodes to red.
        .attr("stroke", function(d) { return d.reverse == 1 ? "#F00" : "#000"})// if changed to red, Changes fill of all the nodes to red.
        .attr("stroke-width", function(d) { return Math.max(1, d.width); });

    // link hover values
    link.append("title")
        .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    node = node
        .data(mwes.nodes)
        .attr("xlink:href", function (d) {return "http://example.com/" + "dddd";})
        .enter().append("g");

    node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      // .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      // .attr("fill", "coral") // FME: FILL
      // .attr("fill", function(d) { return d.ncol == 1 ? "coral" : "cyan"})
      .attr("stroke", "#000");

    node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

}

function search() {
    var inputToken = $('.form-control').val();
    console.log("Input query:" + inputToken)

    $.ajax({
        type: "POST",
        url: "find_bigrams.py",
        data: {inputToken},
        dataType: "json",
        success: function(response) {
            console.log(response);
            var sankey_result = diagram(response);
            $(sankey_result).appendTo(".results");

            // for data
            // var mwe = response;
            // for (var key in mwe) {
            //     $(".results").html(key);
                // $(key).appendTo(".results")

            // $(".results").html(response.keys);

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

$ (document).ready(function() {
    $('.btn').click(function() {
        search();
        $('.media-object').hide();
    });
});

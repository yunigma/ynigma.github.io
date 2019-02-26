// Webseiten mit Datenbankanfragen

function diagram(data) {
    var margin = {top: 5, right: 5, bottom: 5, left: 5},
        width = 900 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // var svg = d3.select('#diagram_area').attr("style", "outline: thin solid grey;").append("svg"),
    //     width = +svg.attr("width"),
    //     height = +svg.attr("height");

    var svg = d3.select('#diagram_area').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .attr("font-size", 12)
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
        .enter().append("g")
        .attr("id", function(d, i) { return i; })
        .on("click", function(d) {
            var nextInput = d.name;
            alert(nextInput);
        });

    node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      // .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      // .attr("fill", "coral") // FME: FILL
      // .attr("fill", function(d) { return d.ncol == 1 ? "coral" : "cyan"})
      // .text(function(d) { return d.name; })
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

// function clickworks(d) {
//     // var nextInput = node.text(function(d) { return d.target.name; })
//     var nextInput = d3.selectAll("path").text();
//     alert(nextInput);
// };


// function getLanguage() {
//     var checkedValue = document.getElementById("checkboxDe").checked;
//     // console.log("CheckBox:" + checkedValue);

// }


function search_mwe_with_token(input, language) {

    var inputToken = input;

    $.ajax({
        type: "POST",
        url: "find_bigrams.py",
        data: {inputToken, language},
        dataType: "json",
        success: function(response) {
            // console.log(response);
            var sankey_result = diagram(response);

        },
        error: function (xhr, status, error) {
            console.log(error);
            alert("Nothing found... Try to change the language!")
        }
    });
}


// function translate_mwe(input, language) {

//     var inputToken = input;

//     $.ajax({
//         type: "POST",
//         url: "find_bigrams.py",
//         data: {inputToken, language},
//         dataType: "json",
//         success: function(response) {
//             // console.log(response);
//             var sankey_result = diagram(response);

//         },
//         error: function (xhr, status, error) {
//             console.log(error);
//             alert("Nothing found... Try to change the language!")
//         }
//     });
// }


$(document).ajaxSend(function(event, request, settings) {
    $('#loading-indicator').show();
});

$(document).ajaxComplete(function(event, request, settings) {
    $('#loading-indicator').hide();
});


$ (document).ready(function() {
    $('.btn').click(function() {
        $('#diagram_area').html('');

        var inputToken = $('.form-control').val();
        var checkedValue = document.getElementById("checkboxDe").checked;
        // console.log("Input query:" + inputToken + " and CheckBox:" + checkedValue);

        if (checkedValue === true) {
            var setLanguage = $('#checkboxDe').val();
                console.log("Input query:" + inputToken + " and CheckBox:" + setLanguage );
            search_mwe_with_token(inputToken, setLanguage);
        }

        else if (checkedValue === false) {
            var setLanguage = $('#checkboxEn').val();
                console.log("Input query:" + inputToken + " and CheckBox:" + setLanguage );
            search_mwe_with_token(inputToken, setLanguage);
        }
        $('.media-object').hide();
    });
});

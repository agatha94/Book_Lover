(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['itemPhoto'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<img class=\"image\" src="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ">\n";
},"useData":true});
})();
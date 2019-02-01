(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.itemPhoto,depth0,{"name":"itemPhoto","data":data,"indent":"             ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"item\">\r\n        <div class=\"image-container\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.photos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n\r\n        <div class=\"item-content\">\r\n          <p class=\"item-name\">\r\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"item-location\">\r\n            "
    + alias4(((helper = (helper = helpers.locationName || (depth0 != null ? depth0.locationName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"locationName","hash":{},"data":data}) : helper)))
    + "\r\n          </p>\r\n          <div class=\"item-description-container\">\r\n            <p class = \"item-description\">\r\n              "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\r\n            </p>\r\n          </div>\r\n        </div>\r\n</article>\r\n";
},"usePartial":true,"useData":true});
})();
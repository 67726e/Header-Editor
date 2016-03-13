/**/

var HeaderSDK = {
	Models: {},
	Collections: {},
	Views: {}
};

(function($) {
	HeaderSDK.Models.Header = Backbone.Model.extend({
		defaults: function() {
			return {
				description: "",
				header: "",
				value: "",
				pattern: ".*",
				active: true
			};
		}
	});

	HeaderSDK.Collections.Request = Backbone.Collection.extend({
		models: HeaderSDK.Models.Header,
		localStorage: new Backbone.LocalStorage("backbone.requestHeaders"),
		comparator: "header"
	});

	HeaderSDK.Collections.Response = Backbone.Collection.extend({
		models: HeaderSDK.Models.Header,
		localStorage: new Backbone.LocalStorage("backbone.responseHeaders"),
		comparator: "header"
	});

	HeaderSDK.Views.Header = Backbone.View.extend({
		tagName: "tr",
		className: "options-headers-row",
		events: {
			"click .header-delete": "deleteHeader",
			"focusout .options-header-input": "updateHeader",
			"change .options-header-checkbox": "updateCheckbox"
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		render: function() {
			// TODO: Consider a templating engine for this
			var $descriptionCell = $(document.createElement("td"))
				.append(this.model.get("description"))
				.append($(document.createElement("input"))
					.attr("type", "text")
					.attr("name", "description")
					.val(this.model.get("description"))
					.addClass("options-header-input"))
				.addClass("options-header-cell");

			var $headerCell = $(document.createElement("td"))
				.append(this.model.get("header"))
				.append($(document.createElement("input"))
					.attr("type", "text")
					.attr("name", "header")
					.val(this.model.get("header"))
					.addClass("options-header-input"))
				.addClass("options-header-cell");
			
			var $valueCell = $(document.createElement("td"))
				.append(this.model.get("value"))
				.append($(document.createElement("input"))
					.attr("type", "text")
					.attr("name", "value")
					.val(this.model.get("value"))
					.addClass("options-header-input"))
				.addClass("options-header-cell");
				
			var $patternCell = $(document.createElement("td"))
				.append(this.model.get("pattern"))
				.append($(document.createElement("input"))
					.attr("type", "text")
					.attr("name", "pattern")
					.val(this.model.get("pattern"))
					.addClass("options-header-input"))
				.addClass("options-header-cell");
			
			var $activeCell = $(document.createElement("td"))
				.append($(document.createElement("input"))
					.attr("type", "checkbox")
					.attr("name", "active")
					.prop("checked", this.model.get("active"))
					.addClass("options-header-checkbox"))
				.addClass("");
			
			var $actionCell = $(document.createElement("td"))
				.append($(document.createElement("button"))
					// TODO: Get text from i18n
					.text("Delete")
					.addClass("header-delete"))
				.addClass("");

			// TODO: Figure out why this is called twice on add
			this.$el.empty();
			this.$el.append($descriptionCell);
			this.$el.append($headerCell);
			this.$el.append($valueCell);
			this.$el.append($patternCell);
			this.$el.append($activeCell);
			this.$el.append($actionCell);

			return this;
		},

		/* Actions */
		deleteHeader: function() {
			this.model.destroy();
		},
		updateHeader: function(event) {
			var $input = $(event.target);

			var name = $input.attr("name");
			var value = $input.val();
			var data = {};
			data[name] = value;

			this.model.save(data);
		},
		updateCheckbox: function(event) {
			var $checkbox = $(event.target);

			var name = $checkbox.attr("name");
			var value = $checkbox.is(":checked");
			var data = {};
			data[name] = value;

			this.model.save(data);
		}
	});



	$(function() {
		// Set the text of anything with `data-text` to the messages file text
		(function() {
			$("[data-text]").each(function() {
				var $element = $(this);

				$element.html(chrome.i18n.getMessage($element.data("text")));
			});
		})();
	});
})(jQuery);


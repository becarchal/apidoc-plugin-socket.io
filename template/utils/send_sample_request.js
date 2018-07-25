define([
  'jquery',
  'lodash'
], function($, _) {
  var ws;
  var initDynamic = function() {
    // Button send
    $(".sample-request-send").off("click");
    $(".sample-request-send").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      sendSampleRequest(group, name, version, $(this).data("sample-request-type"));
    });

    // Button clear
    $(".sample-request-clear").off("click");
    $(".sample-request-clear").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      clearSampleRequest(group, name, version);
    });

    // websocket connect
    $(".websocket-request-connect").off("click");
    $(".websocket-request-connect").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      websocketConnect(group, name, version);
    });
    // websocket beautify
    $(".websocket-request-format").off("click");
    $(".websocket-request-format").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      websocketFormat(group, name, version);
    });
    // websocket mini
    $(".websocket-request-mini").off("click");
    $(".websocket-request-mini").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      websocketMini(group, name, version);
    });

    // websocket send
    $(".websocket-request-send").off("click");
    $(".websocket-request-send").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      websocketSend(group, name, version);
    });

    // websocket clear
    $(".websocket-request-clear").off("click");
    $(".websocket-request-clear").on("click", function(e) {
      e.preventDefault();
      var $root = $(this).parents("article");
      var group = $root.data("group");
      var name = $root.data("name");
      var version = $root.data("version");
      websocketClear(group, name, version);
    });

    ws = null;

  }; // initDynamic

  function websocketMini(group, name, version) {
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');
    var json = $root.find(".websocket-request-param").val();
    try {
      $root.find(".websocket-request-param").val(vkbeautify.jsonmin(json));
    } catch (e) {
      throw {
        type: "json error",
        message: "make sure it's a json data"
      }
    }
    refreshScrollSpy();
  }

  function websocketFormat(group, name, version) {
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');
    var json = $root.find(".websocket-request-param").val();
    try {
      $root.find(".websocket-request-param").val(vkbeautify.json(json, 4));
    } catch (e) {
      throw {
        type: "json error",
        message: "make sure it's a json data"
      }

    }
    refreshScrollSpy();
  }

  function websocketClear(group, name, version) {
    ws = null;
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    // hide sample response
    $root.find(".websocket-request-response-json").html("");
    $root.find(".websocket-request-response").hide();

    refreshScrollSpy();
  }

  function websocketSend(group, name, version) {
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    if (!ws || ws.readyState !== 1) {
      if (!$root.find(".websocket-request-response").is(":visible")) {
        $root.find(".websocket-request-response").fadeTo(250, 1);
      }
      $root.find(".websocket-request-response-json").html('connection is closed');

    } else {
      var msg = $root.find('.websocket-request-param').val();
      if (msg && msg.length > 0) {
        ws.onmessage = function(event) {
          if (!$root.find(".websocket-request-response").is(":visible")) {
            $root.find(".websocket-request-response").fadeTo(250, 1);
          }
          var data = event.data;
          // 处理数据
          if (typeof data === "string") {
            try {
              data = vkbeautify.json(data, 4)
            } catch (e) {
            }
            $root.find(".websocket-request-response-json").html(data);
          }

          if (data instanceof ArrayBuffer) {
            $root.find(".websocket-request-response-json").html(JSON.stringify(data));
          }

          refreshScrollSpy();

        };
        try {
          msg = vkbeautify.jsonmin(msg);
        } catch (e) {
        }
        ws.send(msg);
      } else {
        $root.find('.websocket-request-param').focus();
      }
    }


  }

  function websocketConnect(group, name, version) {

    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');
    if (ws && ws.readyState === 1) {
      if (!$root.find(".websocket-request-response").is(":visible")) {
        $root.find(".websocket-request-response").fadeTo(250, 1);
      }
      $root.find(".websocket-request-response-json").html('connected already!');
      return;
    }
    var url = $root.find(".websocket-request-url").val();

    $root.find(".websocket-request-response").fadeTo(250, 1);
    $root.find(".websocket-request-response-json").html("Connecting...");

    try {
      ws = new WebSocket(url);
    } catch (e) {
      $root.find(".websocket-request-response-json").html(e.message);
      return;
    }

    ws.onopen = function() {
      $root.find(".websocket-request-response-json").html("Connected");
    }

    ws.onmessage = function(event) {
      var data = event.data;
      // 处理数据
      if (typeof data === "string") {
        $root.find(".websocket-request-response-json").html(data);
      }

      if (data instanceof ArrayBuffer) {
        $root.find(".websocket-request-response-json").html(JSON.stringify(data));
      }

      refreshScrollSpy();

    };;

    ws.onclose = function() {
      $root.find(".websocket-request-response-json").html("closed");
    };

  }

  function sendSampleRequest(group, name, version, type) {
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    // Optional header
    var header = {};
    $root.find(".sample-request-header:checked").each(function(i, element) {
      var group = $(element).data("sample-request-header-group-id");
      $root.find("[data-sample-request-header-group=\"" + group + "\"]").each(function(i, element) {
        var key = $(element).data("sample-request-header-name");
        var value = element.value;
        if (!element.optional && element.defaultValue !== '') {
          value = element.defaultValue;
        }
        header[key] = value;
      });
    });

    // create JSON dictionary of parameters
    var param = {};
    var paramType = {};
    $root.find(".sample-request-param:checked").each(function(i, element) {
      var group = $(element).data("sample-request-param-group-id");
      $root.find("[data-sample-request-param-group=\"" + group + "\"]").not(function() {
        return $(this).val() == "" && $(this).is("[data-sample-request-param-optional='true']");
      }).each(function(i, element) {
        var key = $(element).data("sample-request-param-name");
        var value = element.value;
        if (!element.optional && element.defaultValue !== '') {
          value = element.defaultValue;
        }
        param[key] = value;
        paramType[key] = $(element).next().text();
      });
    });

    // grab user-inputted URL
    var url = $root.find(".sample-request-url").val();

    // Insert url parameter
    var pattern = pathToRegexp(url, null);
    var matches = pattern.exec(url);
    for (var i = 1; i < matches.length; i++) {
      var key = matches[i].substr(1);
      if (param[key] !== undefined) {
        url = url.replace(matches[i], encodeURIComponent(param[key]));

        // remove URL parameters from list
        delete param[key];
      }
    } // for

    $root.find(".sample-request-response").fadeTo(250, 1);
    $root.find(".sample-request-response-json").html("Loading...");
    refreshScrollSpy();

    _.each(param, function(val, key) {
      var t = paramType[key].toLowerCase();
      if (t === 'object' || t === 'array') {
        try {
          param[key] = JSON.parse(val);
        } catch (e) {}
      }
    });

    // send AJAX request, catch success or error callback
    var ajaxRequest = {
      url: url,
      headers: header,
      data: param,
      type: type.toUpperCase(),
      success: displaySuccess,
      error: displayError
    };

    $.ajax(ajaxRequest);


    function displaySuccess(data, status, jqXHR) {
      var jsonResponse;
      try {
        jsonResponse = JSON.parse(jqXHR.responseText);
        jsonResponse = JSON.stringify(jsonResponse, null, 4);
      } catch (e) {
        jsonResponse = data;
      }
      $root.find(".sample-request-response-json").html(jsonResponse);
      refreshScrollSpy();
    };

    function displayError(jqXHR, textStatus, error) {
      var message = "Error " + jqXHR.status + ": " + error;
      var jsonResponse;
      try {
        jsonResponse = JSON.parse(jqXHR.responseText);
        jsonResponse = JSON.stringify(jsonResponse, null, 4);
      } catch (e) {
        jsonResponse = escape(jqXHR.responseText);
      }

      if (jsonResponse)
        message += "<br>" + jsonResponse;

      // flicker on previous error to make clear that there is a new response
      if ($root.find(".sample-request-response").is(":visible"))
        $root.find(".sample-request-response").fadeTo(1, 0.1);

      $root.find(".sample-request-response").fadeTo(250, 1);
      $root.find(".sample-request-response-json").html(message);
      refreshScrollSpy();
    };
  }

  function clearSampleRequest(group, name, version) {
    var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    // hide sample response
    $root.find(".sample-request-response-json").html("");
    $root.find(".sample-request-response").hide();

    // reset value of parameters
    $root.find(".sample-request-param").each(function(i, element) {
      element.value = "";
    });

    // restore default URL
    var $urlElement = $root.find(".sample-request-url");
    $urlElement.val($urlElement.prop("defaultValue"));

    refreshScrollSpy();
  }

  function refreshScrollSpy() {
    $('[data-spy="scroll"]').each(function() {
      $(this).scrollspy("refresh");
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Exports.
   */
  return {
    initDynamic: initDynamic
  };

});

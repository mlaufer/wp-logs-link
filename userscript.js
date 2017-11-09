// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wowprogress.com/character/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var link = getLogsLink();
    injectLogsLink(link);

    function getLogsLink() {
        var $name = $(".primary").find("h1").first();
        var name = $name.text().toLowerCase();
        var $server = $name.next();

        var parsedServer = parseServer($server);

        return "https://www.warcraftlogs.com/character/" + parsedServer.region + "/" + parsedServer.server + "/" + name;
    }

    function parseServer($server) {
        var serverText = $server.text();
        var serverSplit = serverText.split("-");
        var region = serverSplit[0].toLowerCase();

        var server = serverSplit[1].replace(new RegExp("'", 'g'), "").replace(new RegExp(" ", 'g'), "-").toLowerCase();

        return {
            server: server,
            region: region
        };
    }

    function injectLogsLink(link) {
        var $armoryLink = $(".armoryLink").first();
        var $logsLink = $("<a target='_blank'>(logs)</a>").addClass("armoryLink").attr("href", link).css("margin-left", "10px");
        $armoryLink.after($logsLink);
    }
})();
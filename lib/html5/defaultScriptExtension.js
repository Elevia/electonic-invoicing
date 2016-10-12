/*
 *  externalScriptSample.js
 * This JavaScript file is an example of ReaderControl customizations located in an isolated file.
 * This file can be hosted externally if defined as a full URL path in ReaderControlConfig.js
 */

/**
 * Add an about button to the tool bar that pops up
 * a dialog with viewer branding and information.
 */
var container = $('<div>').addClass('group');
$('#control .right-aligned').append(container);

var button = $('<span>').attr({
    'id': 'optionsButton',
    'class': 'glyphicons circle_info'
})
.on('click', function() {
    var message = '<div style="margin: 5px 0"><img src="//www.pdftron.com/assets/images/logos/pdftron_logo.gif"></div>';
    message += '<div>WebViewer HTML5 Version ' + readerControl.docViewer.version + '<br/><a href="http://www.pdftron.com" target="_blank">www.pdftron.com</a></div>';
    message += "<p>The ReaderControl is a full-featured and customizable web component extended from the PDFNet WebViewer library.</p>";


    $.alert(message, "About ReaderControl");
});

//container.append(button);

//////////////////////////////////////////////


// STAMP APPROVED
function stampApproved (args){
    var annotManager = readerControl.docViewer.getAnnotationManager();
    var freeText = new Annotations.FreeTextAnnotation();
    freeText.X = 800;
    freeText.Y = 30;
    freeText.Width = 350;
    freeText.Height = 250;
    freeText.setPadding(new Annotations.Rect(0, 0, 0, 0)); // this is a workaround for creating free text annotations, we'll improve this in the future so this line isn't required
    freeText.PageNumber = 1;
    freeText.setContents("\n\n\n\n\nApproved");
    //freeText.FillColor = new Annotations.Color(0, 0, 0);
    freeText.FontSize = "20pt";
    freeText.Rotation = -45;
    freeText.StrokeThickness = 0;
    annotManager.addAnnotation(freeText);
}


//=========================================================
// Add a button to the toolbar
//=========================================================
//  Add an about button to the tool bar that pops up
//  a dialog with viewer branding and information.

var rightAlignedElements = $('#control .right-aligned');
var container = $('<div>').addClass('group');
rightAlignedElements.append(container);



//=========================================================
// Add a button with a dropdown menu to the toolbar
//=========================================================
$('<ul>').addClass('ui-widget ui-menu-dropdown ui-menu ui-widget-content').attr('id', 'optionsMenuList').hide()
    .append("<li class='ui-menu-item'><a onclick ='window.stampRejectText();' href=\"javascript:void(0)\">Reject</a></li>")
    .append("<li class='ui-menu-item'><a onclick ='window.stampApprovedText();' href=\"javascript:void(0)\">Approve</a></li>")
    .appendTo('body');


//var disp = '<div id="optionsMenuList2">fff<div>'.appendTo('body');


var dropdownButtonContainer = $('<div>').addClass('group');
rightAlignedElements.append(dropdownButtonContainer);

var dropdownButton = $('<span>').attr({
    'id': 'dropdownButton',
    'class': 'glyphicons cogwheel'
})
    .on('click', function() {
        var menu = $('#optionsMenuList');
        if (menu.data("isOpen")) {
            menu.hide();
            menu.data("isOpen", false);
        } else {
            menu.show().position({
                my: "left top",
                at: "left bottom",
                of: this
            });

            $(document).one("click", function() {
                menu.hide();
                menu.data("isOpen", false);
            });
            menu.data("isOpen", true);
        }
        return false;
    });

dropdownButtonContainer.append(dropdownButton);

//=========================================================
// Hide a button
//=========================================================
$('#fullScreenButton').hide();


//=========================================================
// Skip to page 3 on document load
//=========================================================
$(document).bind("documentLoaded", function(event) {
    //document finished loading
    readerControl.setCurrentPageNumber(3);
});



var casper = require('casper').create();

const sites = [
  "https://github.com/shogochiai",
  "http://ethresear.ch",
  "https://twitter.com/_sgtn/lists/sgtn"
]
casper.options.viewportSize = {width: 900, height: 500};

casper.options.onResourceRequested = function(C, requestData, request) {
  if (
    (
      (/https?:\/\/.+?\.css/gi).test(requestData['url']) ||
      requestData['Content-Type'] == 'text/css'
    ) && 
    (
      requestData['url'].indexOf('https://assets-cdn.github.com/assets/github') == 0
      ||
      requestData['url'].indexOf('https://assets-cdn.github.com/assets/framework') == 0
      ||
      requestData['url'].indexOf('https://assets-cdn.github.com/assets/site') == 0
      ||
      requestData['url'].indexOf('https://github.githubassets.com/assets/github') == 0
      ||
      requestData['url'].indexOf('https://github.githubassets.com/assets/framework') == 0
    )
  ) {
    console.log('Skipping CSS file: ' + requestData['url']);
    request.abort();
  }
}

casper.start("google,com");
casper.then(function() {});


var rand = Math.floor(Math.random()*sites.length)
// if (rand == 0) {
  casper.thenOpen(sites[0], function() {
    casper.wait(5000, function(){
      this.echo(this.getTitle());
      this.captureSelector('/tmp/site1.png', '.contribution-activity-listing');
    })
  });
// } else if (rand == 1) {
  casper.thenOpen(sites[1], function() {
    casper.wait(2000, function(){
      this.echo(this.getTitle());
      this.captureSelector('/tmp/site2.png', '.topic-list.ember-view');
    })
  });
// } else {
  casper.thenOpen(sites[2], function() {
    casper.wait(2000, function(){
      this.echo(this.getTitle());
      this.captureSelector('/tmp/site3.png', '.stream-container');
    })
  });
// }

casper.run();

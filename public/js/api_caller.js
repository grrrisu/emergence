var ApiCaller = function(){
  var base_url = 'http://localhost:4567',
      self = this;

  this.init = function(){
  };

  this.get = function(path, onsuccess){
    request(path, 'GET', null, onsuccess);
  };

  this.post = function(path, data, onsuccess){
    request(path, 'POST', data, onsuccess);
  };

  this.put = function(path, data, onsuccess){
    request(path, 'PUT', data, onsuccess);
  };

  this.delete = function(path, onsuccess){
    request(path, 'DELETE', null, onsuccess);
  };

  this.handle_error = function(jqXHR, textStatus, errorThrown){
    console.log("XHR ERROR: " + errorThrown + ', ' + textStatus);
  };

  // private methods

  var request = function(path, type, data, onsuccess){
    $.ajax({
      url: base_url + path,
      type: type,
      data: data
    })
    .done(onsuccess)
    .fail(self.handle_error);
  };

};

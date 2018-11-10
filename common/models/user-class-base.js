'use strict';

module.exports = function(Userclassbase) {
    Userclassbase.on('attached', function(app) {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    // initialize role mapping
    Userclassbase.find().then(function(users) {
      if(users) {
          users.forEach(user => {
              RoleMapping.findOne({
                  where: {
                      principalId: user.id
                  }
              }).then(function(principal) {
                  if(principal) {
                      principal.updateAttribute({roleId: user.roleId})
                  } else {
                      RoleMapping.create({
                          principalType: RoleMapping.USER,
                          principalId: user.id,
                          roleId: user.roleId
                      }, function(err, principal) {
                          if(err) {
                              throw err;
                          }
                      })
                  }
              })
          })
      } else {
          console.log("No user registered");
      }
    }).catch(function(err) {
        console.log(err.message);
        throw err;
    })
  });
};

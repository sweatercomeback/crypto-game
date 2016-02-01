if (Meteor.isClient) {
  let srcLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let arrLetters = srcLetters.split('');
  let letters = _.map(arrLetters, function(l){
    return {key: l, value: ''}
  });

  Session.set('letters', letters);

  Template.replacement.helpers({
    replacementLetters: function() {
      return Session.get('letters');
    }
  });

  Template.replacement.events({
    "change input": function(e, i) {
      var letters = Session.get('letters');
      var newReplacement = $(e.currentTarget).val().toUpperCase();
      let existingRep = _.findWhere(letters, {value: newReplacement});
      if(!!existingRep) {
        existingRep.value = '';
      }

      let rep = _.findWhere(letters, {key: this.key});

      rep.value = newReplacement;

      Session.set('letters', letters);
    }
  })
}
